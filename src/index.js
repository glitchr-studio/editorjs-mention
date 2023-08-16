/**
 * Build styles
 */
import './index.css';

export default class Mention {

    static get isInline() {
        return true;
    }
    
    get state() {
        return this._state;
    }
    
    set state(state) {
        this._state = state;
    
        this.button.classList.toggle(this.api.styles.inlineToolButtonActive, state);
    }
    
    constructor({config, api}) {

        this.api = api;
        this.config = config;

        this.button = null;
        this._state = false;

        this.mentionMarker = undefined;

        this.tag = 'MARK';
        this.classToolbar = 'ce-inline-toolbar__mention';
        this.classToolbarIcon = 'ce-inline-toolbar__mention__icon';
        this.classToolbarIconActive = 'ce-inline-toolbar__mention__icon--active';
        this.classToolbarInput = 'ce-inline-tool-input';
        this.classToolbarInputShow = 'ce-inline-tool-input--showed'

        this.classToolbarSearchbar = 'ce-inline-toolbar__mention__searchbar';
        this.classToolbarSearchbox = 'ce-inline-toolbar__mention__searchbox';
        this.classEntry = 'ce-mention';
        this.classEntryHighlight = 'ce-mention-highlight';

        this.settings = this.mergeDictionary({
            'arobase': {
                marker: '@',
                color: "#6565ff",
                placeholder: "Search for a user",
                icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80" width="15" height="15"><path d="m 13.685243,40.158234 c 1.27545,-14.65887 14.21343,-26.5749 28.70499,-26.5749 8.4339,0 14.5389,2.75895 18.3861,6.94608 3.8424,4.18164 5.8161,10.20282 5.1945,17.49312 -1.3542,10.4424 -5.553,13.2864 -7.5501,13.7199 -1.0809,0.2346 -1.8612,-0.063 -2.2887,-0.4305 -0.3819,-0.3285 -0.7317,-0.9156 -0.5853,-1.9554 l 3.1029,-23.271 c 0.219,-1.64232 -0.9348,-3.1512 -2.5773,-3.37017 l -1.4868,-0.19827 c -1.6422,-0.21897 -3.1512,0.93489 -3.3702,2.57721 l -0.0441,0.33201 c -1.5237,-1.48035 -3.3741,-2.66571 -5.5353,-3.44121 -9.2541,-3.32082 -19.03842,2.7468 -22.48881,12.09333 -3.45465,9.3579 0.09171,20.2686 9.38367,23.6031 5.87844,2.1093 11.97054,0.4308 16.51734,-3.4704 0.5403,1.0584 1.281,2.0022 2.1936,2.7873 2.3559,2.0256 5.5839,2.7648 8.7699,2.0733 6.5316,-1.4178 11.8851,-8.2662 13.4082,-20.1723 0.0063,-0.0495 0.0117,-0.099 0.0159,-0.1485 0.7917,-9.04017 -1.6155,-17.28759 -7.1367,-23.29608 -5.529,-6.0171306 -13.7955,-9.3715206 -23.9088,-9.3715206 -18.43887,0 -34.5690904,14.9476206 -36.1767604,33.4251006 -1.628406,18.7155 12.2141104,34.0749 30.9222604,34.0749 5.7741,0 9.4707,-0.4764 14.8899,-2.7675 l 0.6906,-0.2922 c 1.5261,-0.6453 2.2404,-2.4054 1.5951,-3.9315 l -0.5841,-1.3815 c -0.6453,-1.5261 -2.4054,-2.2401 -3.9315,-1.5948 l -0.6909,0.2919 c -4.2567,1.7997 -6.9024,2.1756 -11.9691,2.1756 -14.22255,0 -24.70518,-11.5044 -23.45049,-25.9251 z m 16.49772,-3.4824 c 2.38833,-6.46947 8.45697,-9.23292 12.91977,-7.63149 4.425,1.58787 7.2651,7.48869 4.881,13.94649 -2.3883,6.4695 -8.457,9.2328 -12.9198,7.6314 -4.42488,-1.5879 -7.26504,-7.4886 -4.88097,-13.9464 z" /></svg>`
            },
            'hashtag': {
                marker: '#',
                color: "#f07272",
                placeholder: "Search for a thread",
                icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80" width="15" height="15"><path d="m 65.416899,35.036362 a 4.5090054,5.1286673 0 0 0 0,-10.257333 h -8.071341 l 1.894055,-11.898507 a 4.5149847,5.1354682 0 0 0 -8.882872,-1.84632 L 48.101845,24.779029 H 37.055527 l 1.893212,-11.898507 a 4.5149788,5.1354616 0 0 0 -8.882842,-1.84632 l -2.254083,13.744827 h -9.739668 a 4.5090054,5.1286673 0 1 0 0,10.257333 h 8.183806 L 24.610296,45.2937 h -9.694349 a 4.5090054,5.1286671 0 0 0 0,10.257331 h 8.071337 l -1.894056,11.898522 a 4.5149849,5.1354686 0 1 0 8.882872,1.846321 l 2.254054,-13.744843 h 11.115127 l -1.894057,11.898522 a 4.5149849,5.1354686 0 1 0 8.882872,1.846321 l 2.254897,-13.744843 h 9.671708 a 4.5090054,5.1286671 0 1 0 0,-10.257331 H 54.07689 L 55.722549,35.036362 Z M 44.901141,45.2937 H 33.786044 l 1.645657,-10.257338 h 11.115096 z" style="stroke-width:0.814638" /></svg>`
            },
            'dollar': {
                marker: '$',
                color: "#82bd82",
                placeholder: "Search for a keyword",
                icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80" width="15" height="15"><path d="m 35.583234,7.3877686 c 0,3.7363614 -0.03843,4.1824934 -0.307136,4.1824934 -0.537577,0 -4.204524,1.245456 -5.394846,1.821711 -4.108538,2.026187 -6.988335,5.130531 -8.332242,8.959835 -1.439902,4.145321 -0.767946,9.536096 1.651086,13.12375 0.979141,1.431345 3.129377,3.49471 4.70367,4.498507 2.707033,1.728766 5.241242,2.732563 13.343119,5.223476 8.236228,2.546674 10.501667,4.23826 10.789656,8.086157 0.134349,1.803121 -0.153747,2.751156 -1.228722,3.847898 -1.017534,1.059567 -2.572611,1.858887 -4.761284,2.435141 -1.267124,0.315998 -2.092653,0.39037 -4.703665,0.408958 -2.745433,0.01861 -3.398177,-0.03716 -4.876487,-0.427543 -3.110187,-0.780735 -5.682798,-2.026191 -7.83307,-3.792134 l -0.921515,-0.743554 -2.803015,2.583853 c -1.535897,1.412756 -3.206184,2.937044 -3.705349,3.364588 l -0.883142,0.79932 0.959937,0.873679 c 3.302163,2.974219 7.468286,5.167705 12.191169,6.357395 l 2.015851,0.520484 0.05748,4.015198 0.03843,4.033789 h 5.087674 5.087639 v -3.959434 -3.959428 l 1.382326,-0.223053 c 1.881465,-0.315997 5.145221,-1.394166 6.681114,-2.193486 4.012555,-2.119132 6.661968,-5.130531 7.909872,-8.997018 0.383974,-1.226868 0.441593,-1.76594 0.441593,-4.368382 0,-2.30502 -0.07688,-3.253055 -0.364791,-4.238263 -1.459089,-5.279252 -4.607678,-8.662422 -10.578465,-11.394988 -2.323058,-1.059564 -3.494161,-1.44993 -9.887323,-3.420352 -4.43493,-1.35699 -7.257129,-2.52809 -8.44745,-3.49471 -0.383973,-0.315997 -0.940733,-1.003801 -1.247904,-1.542878 -0.499177,-0.892264 -0.575978,-1.189689 -0.575978,-2.583852 0,-1.394167 0.05748,-1.691589 0.518394,-2.435142 0.671926,-1.115334 1.689462,-1.951832 3.129371,-2.602446 3.858951,-1.747351 9.887322,-1.914654 14.782992,-0.42754 0.537578,0.167307 1.70868,0.632017 2.649413,1.059565 0.921551,0.408955 1.689497,0.706379 1.727898,0.669198 0.441557,-0.557665 5.318043,-8.030395 5.318043,-8.160513 0,-0.26025 -4.550096,-2.342201 -6.316395,-2.881278 -1.919831,-0.557671 -4.492478,-1.133929 -6.009189,-1.301229 L 45.758474,10.975432 V 7.0903571 3.2052827 h -5.087639 -5.087637 z" /></svg>`
            }
        }, this.config.markers || {});

        this._element = undefined;
    }
    
    isObject(item) {
        return (item && typeof item === 'object' && !Array.isArray(item));
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

    getRangeFromElement = (element, positionA, positionB = -1) => {
        
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
            this.mentionMarker.classList.add(this.classEntry);
            this.mentionMarker.contentEditable = false;

            this.api.selection.expandToTag(this.mentionMarker);
        }
    }
    
    unwrap(range) {

        const mark = this.api.selection.findParentTag(this.tag, this.classEntry);
        if(mark) {
            
            const selection = this.getCurrentSelection();
                  selection.length = mark.textContent.length;

            mark.outerHTML = mark.textContent;
            this.focusOnSelection(selection);
            
            this.mentionMarker = undefined;
        }
    }
    
    checkState() {

        const mark = this.mentionMarker || this.api.selection.findParentTag(this.tag, this.classEntry);
        this.state = !!mark;

        this.mentionMarker = mark;
        if (this.state) this.showActions(mark);
        else this.hideActions();
    }
    
    renderActions() {

        this.mentionToolbar = document.createElement('div');
        this.mentionToolbar.classList.add(this.classToolbar);

        this.mentionToolbarIcon = document.createElement('div');
        this.mentionToolbarIcon.classList.add(this.classToolbarIcon);
        this.mentionToolbar.appendChild(this.mentionToolbarIcon);

        this.mentionToolbarSearchbar = document.createElement('div');
        this.mentionToolbarSearchbar.classList.add(this.classToolbarSearchbar);
        this.mentionToolbarSearchbarInput = document.createElement('input');
        this.mentionToolbarSearchbarInput.classList.add(this.classToolbarInput, this.classToolbarInputShow);
        this.mentionToolbarSearchbarInput.onfocus = (e) => {
            if (this.mentionMarker && this._element.contains(e.relatedTarget)) {
                const mention = this.settings[this.mentionMarker.dataset.mention];
                this.focusInMark(this.mentionMarker, mention);
            }
        };
        this.mentionToolbarSearchbarInput.onfocusout = (e) => {
            if (this.mentionMarker && this._element.contains(e.relatedTarget)) {
                const mention = this.settings[this.mentionMarker.dataset.mention];
                this.focusOutMark(this.mentionMarker, mention);
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
        };

        this.mentionToolbarSearchbar.appendChild(this.mentionToolbarSearchbarInput);
        this.mentionToolbar.appendChild(this.mentionToolbarSearchbar);

        this.mentionToolbarSearchbox = document.createElement('ul');
        this.mentionToolbarSearchbox.classList.add(this.classToolbarSearchbox);
        this.mentionToolbar.appendChild(this.mentionToolbarSearchbox);

        Object.keys(this.settings).forEach(function(key) {

            var el = this.settings[key];
            var button = document.createElement('button');
                button.type = "button";
                button.innerHTML = el.icon;

            this.mentionToolbarIcon.appendChild(button);

        }.bind(this));
        
        this.mentionToolbar.hidden = true;
        this.mentionToolbarSearchbar.hidden = true;
        this.mentionToolbarSearchbox.hidden = true;
    
        return this.mentionToolbar;
    }
    
    showActions(mark) {

        this.mentionToolbar.hidden = false;
        this.mentionToolbarIcon.childNodes.forEach(function(el, index) {

            var name = Object.keys(this.settings)[index];
            const mention = this.settings[name];

            el.onclick = () => {

                var markContent = mark.textContent;

                this.mentionToolbarSearchbarInput.value = markContent;
                this.mentionToolbarSearchbarInput.placeholder = mention.placeholder || "";
                this.mentionToolbarIcon.childNodes.forEach(function(_el) {
                    if(el == _el) _el.classList.toggle(this.classToolbarIconActive);
                    else _el.classList.remove(this.classToolbarIconActive);
                }.bind(this));

                this.mentionToolbarSearchbar.hidden = !this.mentionToolbarSearchbar.hidden && mark.dataset.mention == name;
                if(this.mentionToolbarSearchbar.hidden) this.focusOutMark(mark, mention);
                else this.focusInMark(mark, mention);

                mark.innerHTML = markContent;
                mark.contentEditable = false; 
                mark.dataset.mention = name;
                mark.setAttribute('data-before', mention.marker);
                
                var markRange = this.getRangeFromElement(mark, 0, markContent.length);
                this.focusOnRange(markRange);

                // Delay input focus, due to race condition with editorjs internals
                setTimeout(() => { this.mentionToolbarSearchbarInput.focus() }); 
            };

            var selectedName = mark.dataset.mention || Object.keys(this.settings)[0];
            if(name == selectedName) this.mentionToolbarIcon.childNodes[index].click();

        }.bind(this));
    }
    
    focusInMark(mark, mention) {

        if(mark == undefined || mention == undefined || mark.tagName != "MARK") return;

        mark.classList.add(this.classEntryHighlight, this.classEntry);
        mark.style.backgroundColor = mention.color;
        mark.style.outlineColor = null;
        mark.style.color = null;
    }
    
    focusOutMark(mark, mention) {

        if(mark == undefined || mention == undefined  || mark.tagName != "MARK") return;

        mark.classList.remove(this.classEntryHighlight);
        mark.style.backgroundColor = null;
        mark.style.outlineColor = mention.color;
        mark.style.color = mention.color;
    }
    
    hideActions() {

        this.mentionToolbar.hidden = true;
        this.mentionToolbarSearchbar.hidden = true;
        this.mentionToolbarSearchbox.hidden = true;
        this.mentionToolbarIcon.childNodes.forEach(function(el) {
            el.onclick = null;
        });
    }
    

    /**
     * Event listener that fetches users based on the inputted query.
     */
    // async function fetchUsers(searchQuery)
    // {
    //     if(searchQuery.trim() == "") return {};

    //     var users = {};
    //     if(classObj.endpoint == "") {

    //         const items = classObj.users.filter(user => user?.name?.toLowerCase().includes(String(searchQuery).toLowerCase()) || user?.link?.label?.toLowerCase().includes(String(searchTextbox.value).toLowerCase()) );
    //         users = {"success": 1, "items": items};
        
    //     } else {

    //         const response = await fetch(classObj.endpoint + encodeURIComponent(searchQuery.trim()));
    //         users = await response.json();
    //     }

    //     return users;
    // }

    // function searchQueryListener(e = {}) {

    //     /**
    //      * Gets the inputted search query.
    //      */
    //     if(this.value.trim() == "") {

    //         classObj.deleteUserList();
    //         return;
    //     }

    //     if(this.value.trim() == classObj.prevValue.trim()) return;

    //     const searchQuery = this.value.trim();
    //     try {

    //         /**
    //          * Fetch response from the search API
    //         */
    //         if(!(searchQuery in classObj.cacheUsers)) {
                
    //             fetchUsers(searchQuery).then(response => {
            
    //                 if(!response.success) return;

    //                 /**
    //                 * Creates user list items from the received user objects.
    //                 */
    //                 const userListItems = classObj.createUserListItems(response.items, searchQuery);

    //                 /**
    //                 * Removes all the current user list items.
    //                 */
    //                 classObj.deleteUserList();
                    
    //                 /**
    //                 * Creates a new user list from the created user list items.
    //                 */
    //                 classObj.cacheUsers[searchQuery] = classObj.createUserList(userListItems)
    //                 classObj.nodes.usersList.append(classObj.cacheUsers[searchQuery]);
    //             });

    //         } else {
                        
    //             /**
    //             * Removes all the current user list items.
    //             */
    //             classObj.deleteUserList();
                
    //             classObj.nodes.usersList.append(classObj.cacheUsers[searchQuery]);
    //         }

    //     } catch (error) {

    //         console.error(error);
    //     }
    // }

    // //on keyup, start the countdown
    // searchTextbox.addEventListener('keyup', function (e) {

    //     if(e != undefined && e.key == "Backspace") {

    //         classObj.deleteUserList();
    //         if (classObj.prevValue == "" && this.value == "") {
    
    //             classObj.hideUserMentionToolbar();
    //         }
    //     }

    //     clearTimeout(classObj.typingTimer);
    //     classObj.typingTimer = setTimeout(function() {
    //         throttle(searchQueryListener.bind(searchTextbox), e, classObj.throttle)
    //     }, classObj.typingDelay);
    // });

    // //on keydown, clear the countdown 
    // searchTextbox.addEventListener('keydown', function () { 
    //     classObj.prevValue = this.value.trim();
    //     clearTimeout(classObj.typingTimer); 
    // });

}