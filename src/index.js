/**
 * Build styles
 */
import './index.css';

export default class Mention {

    static get isReadOnlySupported() {
        return true;
    }

    static get isInline() {
        return true;
    }

    /**
     * Automatic sanitize config
     */
    static get sanitize(){
        return {

            mention: 
            {
                class: ["ce-mention", "ce-mention-highlight"],
                style: true,
                contenteditable:true,
                "data-id": true,
                "data-marker": true,
                "data-before": true,
                "data-json": true
            }
        }
    }

    constructor({ config, api, readOnly}) {

        this.api = api;
        this.config = config;
        this.readOnly = readOnly;

        this._state = false;
        this._element = undefined;

        this.tag = 'MENTION';
        this._CSS = {

            toolbar          : 'ce-inline-toolbar__mention',
            toolbarIcon      : 'ce-inline-toolbar__mention__icon',
            toolbarIconActive: 'ce-inline-toolbar__mention__icon--active',
            toolbarInput     : 'ce-inline-tool-input',
            toolbarInputShow : 'ce-inline-tool-input--showed',
            toolbarSearchbar : 'ce-inline-toolbar__mention__searchbar',

            toolbarSearchbox : 'ce-inline-toolbar__mention__searchbox',
            toolbarSearchboxEntry : 'ce-inline-toolbar__mention__searchbox__entry',
            toolbarSearchboxAvatar : 'ce-inline-toolbar__mention__searchbox__avatar',
            toolbarSearchboxLoader : 'ce-inline-toolbar__mention__searchbox__loader',
            toolbarSearchboxLoaderPending : 'ce-inline-toolbar__mention__searchbox__loader--pending',
            toolbarSearchboxLoaderError : 'ce-inline-toolbar__mention__searchbox__loader--error',

            entry            : 'ce-mention',
            entryHighlight   : 'ce-mention-highlight'
        };

        this.status = this.mergeDictionary({
            "pending": "Please wait..",
            "empty"  : "No result found..",
            "error"  : "Error happened.."
        }, this.config.status || {});

        const markers = Object.keys(Object.assign({}, this.config.data, this.config.endpoints));
        this.markers = this.mergeDictionary({

            'arobase': {
                id: '@',
                name: "User",
                color: "#6565ff",
                placeholder: "Search for a user",
                icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80" width="15" height="15"><path d="m 13.685243,40.158234 c 1.27545,-14.65887 14.21343,-26.5749 28.70499,-26.5749 8.4339,0 14.5389,2.75895 18.3861,6.94608 3.8424,4.18164 5.8161,10.20282 5.1945,17.49312 -1.3542,10.4424 -5.553,13.2864 -7.5501,13.7199 -1.0809,0.2346 -1.8612,-0.063 -2.2887,-0.4305 -0.3819,-0.3285 -0.7317,-0.9156 -0.5853,-1.9554 l 3.1029,-23.271 c 0.219,-1.64232 -0.9348,-3.1512 -2.5773,-3.37017 l -1.4868,-0.19827 c -1.6422,-0.21897 -3.1512,0.93489 -3.3702,2.57721 l -0.0441,0.33201 c -1.5237,-1.48035 -3.3741,-2.66571 -5.5353,-3.44121 -9.2541,-3.32082 -19.03842,2.7468 -22.48881,12.09333 -3.45465,9.3579 0.09171,20.2686 9.38367,23.6031 5.87844,2.1093 11.97054,0.4308 16.51734,-3.4704 0.5403,1.0584 1.281,2.0022 2.1936,2.7873 2.3559,2.0256 5.5839,2.7648 8.7699,2.0733 6.5316,-1.4178 11.8851,-8.2662 13.4082,-20.1723 0.0063,-0.0495 0.0117,-0.099 0.0159,-0.1485 0.7917,-9.04017 -1.6155,-17.28759 -7.1367,-23.29608 -5.529,-6.0171306 -13.7955,-9.3715206 -23.9088,-9.3715206 -18.43887,0 -34.5690904,14.9476206 -36.1767604,33.4251006 -1.628406,18.7155 12.2141104,34.0749 30.9222604,34.0749 5.7741,0 9.4707,-0.4764 14.8899,-2.7675 l 0.6906,-0.2922 c 1.5261,-0.6453 2.2404,-2.4054 1.5951,-3.9315 l -0.5841,-1.3815 c -0.6453,-1.5261 -2.4054,-2.2401 -3.9315,-1.5948 l -0.6909,0.2919 c -4.2567,1.7997 -6.9024,2.1756 -11.9691,2.1756 -14.22255,0 -24.70518,-11.5044 -23.45049,-25.9251 z m 16.49772,-3.4824 c 2.38833,-6.46947 8.45697,-9.23292 12.91977,-7.63149 4.425,1.58787 7.2651,7.48869 4.881,13.94649 -2.3883,6.4695 -8.457,9.2328 -12.9198,7.6314 -4.42488,-1.5879 -7.26504,-7.4886 -4.88097,-13.9464 z" /></svg>`
            }
            ,
            'hashtag': {
                id: '#',
                name: "Keyword",
                color: "#f07272",
                placeholder: "Search for a keyword",
                icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80" width="15" height="15"><path d="m 65.416899,35.036362 a 4.5090054,5.1286673 0 0 0 0,-10.257333 h -8.071341 l 1.894055,-11.898507 a 4.5149847,5.1354682 0 0 0 -8.882872,-1.84632 L 48.101845,24.779029 H 37.055527 l 1.893212,-11.898507 a 4.5149788,5.1354616 0 0 0 -8.882842,-1.84632 l -2.254083,13.744827 h -9.739668 a 4.5090054,5.1286673 0 1 0 0,10.257333 h 8.183806 L 24.610296,45.2937 h -9.694349 a 4.5090054,5.1286671 0 0 0 0,10.257331 h 8.071337 l -1.894056,11.898522 a 4.5149849,5.1354686 0 1 0 8.882872,1.846321 l 2.254054,-13.744843 h 11.115127 l -1.894057,11.898522 a 4.5149849,5.1354686 0 1 0 8.882872,1.846321 l 2.254897,-13.744843 h 9.671708 a 4.5090054,5.1286671 0 1 0 0,-10.257331 H 54.07689 L 55.722549,35.036362 Z M 44.901141,45.2937 H 33.786044 l 1.645657,-10.257338 h 11.115096 z" style="stroke-width:0.814638" /></svg>`
            },
            'dollar': {
                id: '$',
                name: "Thread",
                color: "#82bd82",
                placeholder: "Search for a thread",
                icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80" width="15" height="15"><path d="m 35.583234,7.3877686 c 0,3.7363614 -0.03843,4.1824934 -0.307136,4.1824934 -0.537577,0 -4.204524,1.245456 -5.394846,1.821711 -4.108538,2.026187 -6.988335,5.130531 -8.332242,8.959835 -1.439902,4.145321 -0.767946,9.536096 1.651086,13.12375 0.979141,1.431345 3.129377,3.49471 4.70367,4.498507 2.707033,1.728766 5.241242,2.732563 13.343119,5.223476 8.236228,2.546674 10.501667,4.23826 10.789656,8.086157 0.134349,1.803121 -0.153747,2.751156 -1.228722,3.847898 -1.017534,1.059567 -2.572611,1.858887 -4.761284,2.435141 -1.267124,0.315998 -2.092653,0.39037 -4.703665,0.408958 -2.745433,0.01861 -3.398177,-0.03716 -4.876487,-0.427543 -3.110187,-0.780735 -5.682798,-2.026191 -7.83307,-3.792134 l -0.921515,-0.743554 -2.803015,2.583853 c -1.535897,1.412756 -3.206184,2.937044 -3.705349,3.364588 l -0.883142,0.79932 0.959937,0.873679 c 3.302163,2.974219 7.468286,5.167705 12.191169,6.357395 l 2.015851,0.520484 0.05748,4.015198 0.03843,4.033789 h 5.087674 5.087639 v -3.959434 -3.959428 l 1.382326,-0.223053 c 1.881465,-0.315997 5.145221,-1.394166 6.681114,-2.193486 4.012555,-2.119132 6.661968,-5.130531 7.909872,-8.997018 0.383974,-1.226868 0.441593,-1.76594 0.441593,-4.368382 0,-2.30502 -0.07688,-3.253055 -0.364791,-4.238263 -1.459089,-5.279252 -4.607678,-8.662422 -10.578465,-11.394988 -2.323058,-1.059564 -3.494161,-1.44993 -9.887323,-3.420352 -4.43493,-1.35699 -7.257129,-2.52809 -8.44745,-3.49471 -0.383973,-0.315997 -0.940733,-1.003801 -1.247904,-1.542878 -0.499177,-0.892264 -0.575978,-1.189689 -0.575978,-2.583852 0,-1.394167 0.05748,-1.691589 0.518394,-2.435142 0.671926,-1.115334 1.689462,-1.951832 3.129371,-2.602446 3.858951,-1.747351 9.887322,-1.914654 14.782992,-0.42754 0.537578,0.167307 1.70868,0.632017 2.649413,1.059565 0.921551,0.408955 1.689497,0.706379 1.727898,0.669198 0.441557,-0.557665 5.318043,-8.030395 5.318043,-8.160513 0,-0.26025 -4.550096,-2.342201 -6.316395,-2.881278 -1.919831,-0.557671 -4.492478,-1.133929 -6.009189,-1.301229 L 45.758474,10.975432 V 7.0903571 3.2052827 h -5.087639 -5.087637 z" /></svg>`
            }

        }, this.config.markers || {});


        /**
         * Property which holds all data.
         */
        this.data     = this.mergeDictionary({'arobase':{}, 'hashtag':{}, 'dollar':{}}, this.config.data);
        this.response = this.mergeDictionary({'arobase':{}, 'hashtag':{}, 'dollar':{}});

        /**
         * Property which stores the base url
         */     
        this.endpoints = this.mergeDictionary({'arobase': undefined, 'hashtag': undefined, 'dollar': undefined}, this.config.endpoints);
        Object.keys(this.endpoints).forEach((key) => {

            if(this.endpoints[key] == undefined) 
                delete this.endpoints[key];
            else if (this.endpoints[key] != "" && !this.endpoints[key].endsWith("/"))
                this.endpoints[key] += "/";
        });

        /**
         * Restrict dictionary to fetchable content
         */
        this.markers   = this.restrictDictionary(this.markers, markers);
        this.data      = this.restrictDictionary(this.data, markers);
        this.endpoints = this.restrictDictionary(this.endpoints, markers);        

        /**
         * Throttle between two ajax call
         */
        this.throttle = config.throttle || 150;
        this.throttleTimer = undefined;
        if(Object.keys(this.config.endpoints).length == 0)
            this.throttle = 0;

        /**
         * Typing delay and timer
         */
        this.typingDelay = config.typingDelay || 100;
        this.typingTimer = undefined;
        if(Object.keys(this.config.endpoints).length == 0)
            this.typingDelay = 0;

        this.pendingDisplay = this.config.pendingDisplay || 1000;
    }
    
    preg_quote (str, delimiter) {
        return (str + '').replace(new RegExp('[.\\\\+*?\\[\\^\\]$(){}=!<>|:\\' + (delimiter || '') + '-]', 'g'), '\\$&');
    }

    isObject(item) {
        return (item && typeof item === 'object' && !Array.isArray(item));
    }

    restrictDictionary(dict, keys = []) 
    {
        return Object.fromEntries(Object.entries(dict).filter(([k,v]) => keys.includes(k)));
    }

    mergeDictionary(target, ...sources) {
        
        if (!sources.length) return target;
        const source = sources.shift();

        if (this.isObject(target) && this.isObject(source)) {

            for (const key in source) {

                if (!this.isObject(source[key])) Object.assign(target, { [key]: source[key] });
                else {

                    if (!target[key]) Object.assign(target, { [key]: {} });
                    this.mergeDictionary(target[key], source[key]);
                }
            }
        }
    
        return this.mergeDictionary(target, ...sources);
    }
    
    getCurrentTextSelection()
    {
        return this.getTextFromSelection(this.getSelectionFromRange(this.getCurrentRange()));   
    }

    getTextFromSelection(selection)
    {
        if(selection         == undefined) return "";
        if(selection.element == undefined) return "";
        return selection.element.textContent.substring(selection.start, selection.start+selection.length);
    }

    getTextFromRange(range)
    {
        return this.getTextFromSelection(this.getSelectionFromRange(range));
    }


    getSelectionFromElement = (element, positionA, positionB = -1) => { return this.getSelectionFromRange(this.getRangeFromElement(element, positionA, positionB)); }

    getRangeFromElement = (element, positionA = 0, positionB = -1) =>
    {
        var rangeA = document.createRange();
        if(positionB < 0) {

            if (element.nodeType === Node.TEXT_NODE) {

                rangeA.setStart(element, positionA);
                rangeA.setEnd(element, positionA);
                
                return rangeA;
            }

            for (let child of element.childNodes) {
                
                if (positionA <= child.textContent.length)
                    return this.getRangeFromElement(child, positionA);

                positionA -= child.textContent.length;
            }

            return rangeA;

        } 
        
        var rangeB = this.getRangeFromElement(element, positionB);

        rangeA = this.getRangeFromElement(element, positionA);
        rangeA.setEnd(rangeB.endContainer, rangeB.endOffset);

        return rangeA;
    };

    findIndexInAncestor(el, ancestor)
    {
        if(el == ancestor) return -1;
        if(el == null) return -1;

        while( el.parentNode != ancestor ) {

            el = el.parentNode;
            if(el == null) return -1;
        } 

        return Array.prototype.indexOf.call(ancestor.childNodes, el);
    }

    findOffsetInAncestor(el, ancestor)
    {
        var offset = 0;

        while( el.parentNode != ancestor ) {

            el = el.parentNode;
            if(el == null) return -1;
        } 

        return offset;
    }

    getRangeFromSelection(selection)
    {
        var range = undefined;
        if(selection == undefined) range = this.getCurrentRange();
        else range = this.getRangeFromElement(this._element, selection.start, selection.start + selection.length);

        return range;
    }

    focusOnSelection(selection)
    {
        return this.focusOnRange(this.getRangeFromSelection(selection));
    }

    focusOnRange(range)
    {
        window.getSelection().removeAllRanges();
        window.getSelection().addRange(range);

        this.lastSelection = this.getSelectionFromRange(range);
        return range;
    }

    getCurrentRange()
    {
        if(window.getSelection().rangeCount < 1)
            return document.createRange();

        var range = window.getSelection().getRangeAt(0);
        return range;
    }

    getCurrentSelection()
    {
        return this.getSelectionFromRange(this.getCurrentRange());
    }

    getSelectionFromRange(range)
    {
        var start = 0;
        var end   = 0;

        this._element = this.api.blocks.getBlockByIndex(this.api.blocks.getCurrentBlockIndex()).holder;
        var ancestorRange = document.createRange();
            ancestorRange.setStart(this._element, 0);
        
        ancestorRange.setEnd(range.startContainer, range.startOffset);
        start = ancestorRange.toString().length;

        ancestorRange.setEnd(range.endContainer, range.endOffset);
        end = ancestorRange.toString().length;

        return { start: start, length: (end-start), index: this.api.blocks.getCurrentBlockIndex(), element: this._element };
    }

    replaceSelectionWith(html, selection, selectPastedContent = false) {

        var node = document.createElement("span");
            node.innerHTML = html;

        var range = this.focusOnSelection(selection);
            range.deleteContents();
            range.insertNode(node);

        if(selectPastedContent) selection.length = html.textContent;
        else selection.length = 0;

        this.focusOnSelection(selection);
    }

    eraseSelection(selection) { this.replaceSelectionWith("", selection); }
    eraseAtCaret(text)
    {
        var selection = this.getCurrentSelection();
            selection.length = 1;
    
        while(this.getTextFromSelection(selection).startsWith(" ")) {
            selection.start += 1;
        }

        selection.length = text.trim().length;
        if (this.getTextFromSelection(selection) == text)
            this.replaceSelectionWith("", selection);
    }

    insertAtCaret(html, selectPastedContent = false) {

        if(html == "") return;
        this.replaceSelectionWith(html, this.getCurrentSelection(), selectPastedContent);
    }
    
    render() {

        this.button = document.createElement('button');
        this.button.type = 'button';
        this.button.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path d="m 6.527992,12.335704 c 0.251909,-2.926628 2.807243,-5.3056501 5.669419,-5.3056501 1.665749,0 2.871526,0.5508213 3.631372,1.3867771 0.7589,0.8348597 1.148718,2.036983 1.025948,3.492482 -0.267464,2.084814 -1.096754,2.652616 -1.491194,2.739163 -0.213485,0.04684 -0.367599,-0.01258 -0.452033,-0.08595 -0.07543,-0.06558 -0.144515,-0.182798 -0.1156,-0.390393 L 15.408746,9.5261044 C 15.452001,9.1982167 15.224118,8.8969713 14.899713,8.8532539 l -0.293652,-0.039589 c -0.324346,-0.043713 -0.622382,0.1866497 -0.665637,0.5145364 l -0.0088,0.066281 C 13.630719,9.0989315 13.265253,8.8622755 12.838401,8.7074478 11.010658,8.0444503 9.078192,9.2558443 8.396718,11.121868 c -0.682316,1.868295 0.01812,4.046604 1.853335,4.712333 1.161029,0.421119 2.364257,0.086 3.26228,-0.692861 0.106713,0.211308 0.253005,0.399737 0.43325,0.556481 0.465306,0.404409 1.102856,0.551989 1.732112,0.413932 1.290033,-0.283062 2.347383,-1.650338 2.648205,-4.027378 0.0013,-0.0098 0.0023,-0.01977 0.0031,-0.02965 C 18.485404,10.24987 18.009966,8.6032816 16.919494,7.4036928 15.827481,6.2023793 14.194795,5.532679 12.197353,5.532679 c -3.641794,0 -6.827616,2.9842761 -7.145142,6.673285 -0.32162,3.736529 2.412366,6.803016 6.107345,6.803016 1.140421,0 1.870523,-0.09512 2.94085,-0.552528 l 0.136398,-0.05834 c 0.301415,-0.128834 0.442494,-0.480235 0.315043,-0.78492 l -0.115364,-0.275815 c -0.12745,-0.304683 -0.475082,-0.447233 -0.776497,-0.3184 l -0.136456,0.05827 c -0.840726,0.359308 -1.363268,0.434356 -2.363974,0.434356 -2.809044,0 -4.879431,-2.296841 -4.631622,-5.175917 z m 3.258406,-0.695258 c 0.471709,-1.291622 1.670305,-1.843342 2.551736,-1.523618 0.873966,0.317016 1.434904,1.495108 0.964029,2.784401 -0.471705,1.291628 -1.670311,1.843318 -2.551743,1.523601 C 9.876478,14.107807 9.315528,12.929738 9.786398,11.640446 Z" style="stroke-width:0.198575" /></svg>';
        this.button.classList.add(this.api.styles.inlineToolButton);
    
        return this.button;
    }
    
    surround(range) {

        if(this.mentionMarker)
            this.api.selection.expandToTag(this.mentionMarker);

        if (this.state) {
            this.unwrap(range);
            return;
        }
    
        this.wrap(range);
    }

    wrap(range) {
    
        const selectedText = range.extractContents();
        
        const mark = document.createElement(this.tag);
              mark.innerText = selectedText.textContent;
        
        range.insertNode(mark);
        
        if(mark.parentNode.getAttribute("contenteditable")) {

            this.mentionMarker = mark;
            this.mentionMarker.classList.add(this._CSS.entry);
            this.mentionMarker.contentEditable = false;

            this.api.selection.expandToTag(this.mentionMarker);
        }
    }
    
    unwrap(range) {

        const mark = this.api.selection.findParentTag(this.tag, this._CSS.entry);
        if(mark) {
            
            const selection = this.getCurrentSelection();
                  selection.length = mark.textContent.length;

            mark.outerHTML = mark.textContent;
            this.focusOnSelection(selection);
            
            this.mentionMarker = undefined;
        }
    }
    
    checkState() {

        const mark = this.mentionMarker || this.api.selection.findParentTag(this.tag, this._CSS.entry);
        this.state = !!mark;

        this.mentionMarker = mark;
        if (this.state) this.showActions(mark);
        else this.hideActions();
    }
    
    renderActions() {

        this.mentionToolbarButton = this.button;

        this.mentionToolbar = document.createElement('div');
        this.mentionToolbar.classList.add(this._CSS.toolbar);

        this.mentionToolbarIcon = document.createElement('div');
        this.mentionToolbarIcon.classList.add(this._CSS.toolbarIcon);
        this.mentionToolbar.appendChild(this.mentionToolbarIcon);

        this.mentionToolbarSearchbar = document.createElement('div');
        this.mentionToolbarSearchbar.classList.add(this._CSS.toolbarSearchbar);
        this.mentionToolbarSearchbarInput = document.createElement('input');
        this.mentionToolbarSearchbarInput.classList.add(this._CSS.toolbarInput, this._CSS.toolbarInputShow);
        this.mentionToolbarSearchbarInput.onfocus = (e) => {
            if (this.mentionMarker && this._element.contains(e.relatedTarget)) {
                const marker = this.markers[this.mentionMarker.dataset.marker];
                this.focusInMark(this.mentionMarker, marker);
            }
        };

        this.mentionToolbarSearchbarInput.onfocusout = (e) => {
            if (this.mentionMarker && this._element.parentNode.contains(e.relatedTarget)) {
                const marker = this.markers[this.mentionMarker.dataset.marker];
                this.focusOutMark(this.mentionMarker, marker);
            }
        };
        this.mentionToolbarSearchbarInput.onkeyup = (e) => {
            this.mentionMarker.innerHTML = this.mentionToolbarSearchbarInput.value;
        };
        this.mentionToolbarSearchbarInput.onkeydown = (e) => {

            if(e.key == "Enter") {
                
                e.preventDefault();
                return false;
            }

            if(e != undefined && e.key == "Backspace") {

                this.clearSearchbox();
                return true;
            }
        };

        this.mentionToolbarSearchbarInput.oninput = function(e) {

            if (this.mentionMarker && e.target.value.trim() != this.mentionMarker.textContent.trim()) {
                this.mentionMarker.removeAttribute("data-id");
                this.mentionMarker.removeAttribute("data-json");
            }

            const throttle = (callback, time) => {
            
                if (this.throttleTimer) return;
                this.throttleTimer = setTimeout(() => {
            
                    callback();
                    this.throttleTimer = undefined;
            
                }, time);
            };

            clearTimeout(this.typingTimer);
            this.typingTimer = setTimeout(() => { 
                throttle(function() {
                    
                    this.clearSearchbox();
                    this.searchAction();

                }.bind(this), e.isTrusted ? this.throttle : 0) 
            }, e.isTrusted ? this.typingDelay : 0);

        }.bind(this);

        this.mentionToolbarSearchbar.appendChild(this.mentionToolbarSearchbarInput);
        this.mentionToolbar.appendChild(this.mentionToolbarSearchbar);

        this.mentionToolbarSearchbox = document.createElement('ul');
        this.mentionToolbarSearchbox.classList.add(this._CSS.toolbarSearchbox);
        this.mentionToolbarSearchbox.onscroll = function(e) {

            var el = e.target;
            var scrollPercent = el.scrollHeight == el.clientHeight ? 1 : el.scrollTop/(el.scrollHeight-el.clientHeight);
            if (scrollPercent > 0.75 && !this.searchActionOngoing) this.searchAction();

        }.bind(this);

        this.mentionToolbar.appendChild(this.mentionToolbarSearchbox);

        Object.keys(this.markers).forEach(function(key) {

            var el = this.markers[key];
            var button = document.createElement('button');
                button.type = "button";
                button.innerHTML = el.icon;
                button.title = el.name;

            this.mentionToolbarIcon.appendChild(button);

        }.bind(this));
        
        this.mentionToolbar.hidden = true;
        this.mentionToolbarSearchbar.hidden = true;
    
        return this.mentionToolbar;
    }
    
    searchAction() {

        /**
         * Event listener that fetches users based on the inputted query.
         */
        async function fetchRequest(query, page, endpoint, fallback = {})
        {
            var response = {};
            if(query.trim() == "") return response;

            if(endpoint) {

                var response = await fetch(endpoint, {
                    method: 'POST',
                    body: JSON.stringify({
                        query: query.trim(),
                        page: page
                    })
                })

                try {

                    if (response.ok) response = await response.json();
                    else {
                    
                        var text = await response.text();
                        return {"success": false, "text": text, "status": response.status};
                    }

                } catch(e) {

                    return {"success": false, "status": response.status};
                }

            } else {

                const results = Object.entries(fallback).filter(entry => entry?.label?.toLowerCase().includes(String(query).toLowerCase()) || entry?.link?.name?.toLowerCase().includes(String(query).toLowerCase()) );
                response = {"success": true, "results": results};
            }

            response["query"] = response["query"] || query;

            return response;
        }
    
        var value  = this.mentionToolbarSearchbarInput.value.trim();
        if(value == "") return;
        
        this.searchActionOngoing = true;
        var marker = this.mentionMarker.dataset.marker;

        var page     = this.mentionToolbarSearchbarInput.dataset.page || 1;
        var pageMore = this.mentionToolbarSearchbarInput.dataset.pageMore || true;
            pageMore = (/true/).test(pageMore);
        var prevValue = this.mentionToolbarSearchbarInput.dataset.value || "";
            prevValue = prevValue.trim();            
        var prevMarker = this.mentionToolbarSearchbarInput.dataset.marker || marker;
            prevMarker = prevMarker.trim();

        /**
         * Gets the inputted search query.
         */
        if(value != prevValue || marker != prevMarker) {
            
            this.clearSearchbox();
            page = 1;
            
        } else if(pageMore) {
        
            page++;

        } else {

            return this.clearSearchboxStatus();
        }

        const query = this.mentionToolbarSearchbarInput.value.trim();
        
        var key = this.responseKey(marker, query, page);
        var response = this.response[key] || undefined;
        if (response) this.updateSearchbox(marker, response);
        else {

            this.mentionSearchboxStatusTimeout = setTimeout(() => {

                var li = this.createSearchboxStatus(this.status["pending"]);
                    li.classList.add(this._CSS.toolbarSearchboxLoaderPending);

            }, this.pendingDisplay);

            fetchRequest(query, page, this.endpoints[marker], this.data[marker])
                .then(response => { this.updateSearchbox(marker, response); });
        }
    }

    responseKey(marker, query, page) { return marker+";"+query+";"+page; }

    focusInMark(mentionEl, marker) {

        if(mentionEl == undefined || marker == undefined || mentionEl.tagName != this.tag) return;

        mentionEl.classList.add(this._CSS.entryHighlight, this._CSS.entry);
        mentionEl.style.backgroundColor = marker.color;
        mentionEl.style.outlineColor = null;
        mentionEl.style.color = null;
    }
    
    focusOutMark(mentionEl, marker) {

        if(mentionEl == undefined || marker == undefined  || mentionEl.tagName != this.tag) return;
        if(mentionEl.dataset.id) return;

        mentionEl.classList.remove(this._CSS.entryHighlight);
        mentionEl.style.backgroundColor = null;
        mentionEl.style.outlineColor = marker.color;
        mentionEl.style.color = marker.color;
    }

    showActions(mentionEl) {

        this.mentionToolbar.hidden = false;

        setTimeout(function() {

            this.mentionToolbarButton.parentNode.parentNode.childNodes.forEach(function(actions) {
                actions.childNodes.forEach(function(el) { el.disabled = el != this.mentionToolbarButton; }.bind(this));
            }.bind(this));

        }.bind(this));

        this.mentionToolbarIcon.childNodes.forEach(function(el, i) {

            var markerName = Object.keys(this.markers)[i];
            const marker = this.markers[markerName];

            el.onclick = () => {

                var markContent = mentionEl.textContent;

                if (mentionEl.dataset.marker != markerName) { 
                    mentionEl.removeAttribute("data-id");
                    mentionEl.removeAttribute("data-json");
                }

                this.mentionToolbarSearchbarInput.value = markContent;
                this.mentionToolbarSearchbarInput.placeholder = marker.placeholder || "";
                this.mentionToolbarIcon.childNodes.forEach(function(_el) {
                    if(el == _el) _el.classList.toggle(this._CSS.toolbarIconActive);
                    else _el.classList.remove(this._CSS.toolbarIconActive);
                }.bind(this));

                this.mentionToolbarSearchbox.hidden = !el.classList.contains(this._CSS.toolbarIconActive);
                this.mentionToolbarSearchbar.hidden = !el.classList.contains(this._CSS.toolbarIconActive);
                if(this.mentionToolbarSearchbar.hidden) this.focusOutMark(mentionEl, marker);
                else this.focusInMark(mentionEl, marker);

                mentionEl.innerHTML = markContent;
                
                mentionEl.contentEditable = false; 
                mentionEl.dataset.marker = markerName;
                mentionEl.setAttribute('data-before', marker.id);
                
                var markRange = this.getRangeFromElement(mentionEl, 0, markContent.length);
                this.focusOnRange(markRange);

                this.mentionToolbarSearchbarInput.dataset.value = "";
                this.mentionToolbarSearchbarInput.dataset.page = 1;
                this.mentionToolbarSearchbarInput.dataset.pageMore = true;

                // Delay input focus, due to race condition with editorjs internals
                setTimeout(() => { 

                    this.mentionToolbarSearchbarInput.focus();
                    this.mentionToolbarSearchbarInput.dispatchEvent(new Event('input', { bubbles: true }));
                }); 
            };

            var selectedMarkerName = mentionEl.dataset.marker;
            if (selectedMarkerName == markerName) this.mentionToolbarIcon.childNodes[i].click();

        }.bind(this));
    }
    
    hideActions() {

        this.clearSearchbox();

        this.mentionToolbar.hidden = true;
        this.mentionToolbarSearchbar.hidden = true;
        this.mentionToolbarIcon.childNodes.forEach(function(el) {
            el.onclick = null;
        });

        this.mentionToolbarButton.parentNode.parentNode.childNodes.forEach(function(actions) {
            actions.childNodes.forEach(function(el) { el.disabled = false; }.bind(this));
        });
    }

    updateSearchbox(marker = undefined, response = {})
    {
        this.clearSearchboxStatus();
        
        if("success" in response && !response.success) {

            var li = this.createSearchboxStatus(response.text || this.status["error"]);
                li.classList.add(this._CSS.toolbarSearchboxLoaderError);

            return;
        }

        this.mentionToolbarSearchbarInput.dataset.page = response?.pagination?.page || 1;
        this.mentionToolbarSearchbarInput.dataset.pageMore =response?.pagination?.more ?? true;
        if(!(/true/).test(this.mentionToolbarSearchbarInput.dataset.pageMore)) this.clearSearchboxStatus();

        this.mentionToolbarSearchbarInput.dataset.value = response?.query || "";
        this.mentionToolbarSearchbarInput.dataset.marker = this.mentionMarker?.dataset?.mention;

        if(marker != undefined && "results" in response) {

            if(response.results.length < 1) {

                var li = this.createSearchboxStatus(this.status["empty"]);
                    li.classList.add(this._CSS.toolbarSearchboxLoaderError);

            } else {
                    
                Object.values(response.results).forEach(function(entry) {

                    var li = document.createElement("li");
                        li.appendChild(this.createSearchboxEntry(entry));

                    this.mentionToolbarSearchbox.appendChild(li);
        
                }.bind(this));

                var key = this.responseKey(marker, response.query, response.pagination.page || 1);
                this.response[key] = response;
            }
        }

        this.searchActionOngoing = false;

        if((/true/).test(this.mentionToolbarSearchbarInput.dataset.pageMore) && this.mentionToolbarSearchbox.scrollHeight == this.mentionToolbarSearchbox.clientHeight)
            this.searchAction();
    }

    clearSearchbox()
    {
        this.clearSearchboxStatus();
        
        if(this.mentionSearchboxStatusTimeout != undefined) clearTimeout(this.mentionSearchboxStatusTimeout);
        while (this.mentionToolbarSearchbox.firstChild) {
            this.mentionToolbarSearchbox.removeChild(this.mentionToolbarSearchbox.firstChild);
        }
    }

    clearSearchboxStatus()
    {
        if(this.mentionSearchboxStatusTimeout != undefined)
            clearTimeout(this.mentionSearchboxStatusTimeout);

        var el = this.mentionToolbarSearchbox.getElementsByClassName(this._CSS.toolbarSearchboxLoader)[0] || undefined;
        if (el != undefined) this.mentionToolbarSearchbox.removeChild(el);
    }

    createSearchboxStatus(text = undefined, pending)
    {
        var li = this.mentionToolbarSearchbox.getElementsByClassName(this._CSS.toolbarSearchboxLoader)[0] || document.createElement("li");
            li.classList = this._CSS.toolbarSearchboxEntry + " " + this._CSS.toolbarSearchboxLoader;
        
        li.innerText = text == undefined ? "" : text;
        if (li.parentNode == undefined) this.mentionToolbarSearchbox.appendChild(li);

        return li;
    }

    createSearchboxEntry(item)
    {
        // Handle click
        var preventEntryClick = false;
        var entry = document.createElement("div");
            entry.classList.add(this._CSS.toolbarSearchboxEntry);
            entry.onclick = function(e)
            {
                if (preventEntryClick) {
                    preventEntryClick = false;
                    return;
                }

                this.mentionMarker.innerHTML = item.label;

                this.mentionMarker.dataset.id = item?.id;
                this.mentionMarker.dataset.json = JSON.stringify(item?.data || {});

                var selection = this.getSelectionFromElement(this.mentionMarker, item.label.length);
                    selection.start += 1;

                this.mentionMarker.outerHTML += " ";                
                this.focusOnSelection(selection);

            }.bind(this);

        //
        // Handle searchbox avatar (if found)
        var holder = document.createElement("div");
            holder.classList.add(this._CSS.toolbarSearchboxAvatar);

        const getInitials = function(name)
        {
            let rgx = new RegExp(/(\p{L}{1})\p{L}+/, 'gu');

            let initials = [...String(name).matchAll(rgx)] || [];
                initials = ((initials.shift()?.[1] || '') + (initials.pop()?.[1] || '')).toUpperCase();

            return initials ? initials : undefined;
        }

        const random = function(min, max) {
            return Math.floor(Math.random() * (max - min + 1) + min)
        }

        var initials = getInitials(item?.link?.name) || getInitials(item?.label);
        if("avatar" in item && item["avatar"]) {

            var img = document.createElement("img");
                img.src = item?.avatar;

            holder.appendChild(img);

        } else if (initials) {

            const rgb2hex = (r, g, b) => '#' + [r, g, b].map(x => {
                const hex = x.toString(16)
                return hex.length === 1 ? '0' + hex : hex
            }).join('');

            const r = Math.floor(random(0, 255));
            const g = Math.floor(random(0, 255));
            const b = Math.floor(random(0, 255));

            const hex = rgb2hex(r,g,b);
            holder.style.backgroundColor = hex + "20";

            // NB: I added opacity to background color to mimic pastel colors 
            // const grayscale = (0.299*r + 0.587*g + 0.114*b)/255;
            // if(grayscale < 0.25) holder.style.color = "#FFF";

            holder.innerText = initials;
        }

        entry.appendChild(holder);

        //
        // Handle searchbox text
        holder = document.createElement("div");
        var name = document.createElement("div");
            name.innerText = item?.label;

        var link = document.createElement("a");
            link.onclick = function() { preventEntryClick = true; }
            link.href = item?.link?.url;
            link.innerText = item?.link?.name;
            link.target = "_blank";

        if("label" in item) holder.appendChild(name);
        if("link"  in item) holder.appendChild(link);
        entry.appendChild(holder);

        return entry;
    }
}