/**
 * Build styles
 */
import './index.css';

export default class Mention {

    static get isReadOnlySupported() {
        return true;
    }

    constructor({data, config, api, readOnly}) {

        this.api = api;
        this.config = config;
        this.readOnly = readOnly;
        this._CSS = {
            block: this.api.styles.block,
            wrapper: 'ce-mention',
            mention: {
                arobase: 'ce-mention--arobase',
                dollar: 'ce-mention--dollar',
                hashtag: 'ce-mention--hashtag'
            }
        }

        this.CSS = {
            baseClass: this.api.styles.block,
            loading: this.api.styles.loader,
            input: this.api.styles.input,
            settingsButton: this.api.styles.settingsButton,
            settingsButtonActive: this.api.styles.settingsButtonActive,
        }

        this.settings = [
            {
                name: 'hashtag',
                marker: '#',
                color: "red",
                icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18"><path d="m 20.540674,10.19821 a 1.4973787,1.7835812 0 0 0 0,-3.567162 H 17.860285 L 18.489276,2.49314 A 1.4993624,1.785944 0 0 0 15.5394,1.8510508 L 14.790576,6.631048 H 11.12225 L 11.750962,2.49314 A 1.4993624,1.785944 0 0 0 8.801086,1.8510508 L 8.05254,6.631048 H 4.8181269 a 1.4973787,1.7835812 0 1 0 0,3.567162 H 7.5358585 L 6.9893581,13.765373 H 3.7699943 a 1.4973787,1.7835811 0 0 0 0,3.567161 h 2.6803879 l -0.628991,4.137909 a 1.4993623,1.7859439 0 1 0 2.9498758,0.642089 l 0.748547,-4.779998 h 3.691177 L 12.582,21.470443 a 1.4993625,1.7859441 0 1 0 2.949876,0.642089 l 0.748826,-4.779998 h 3.211838 a 1.4973787,1.7835811 0 1 0 0,-3.567161 h -2.717731 l 0.5465,-3.567163 z m -6.813002,3.567163 h -3.691177 l 0.5465,-3.567163 h 3.691177 z" /></svg>`
            },
            {
                name: 'arobase',
                marker: '@',
                color: "blue",
                icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18"><path d="M 3.28397,12.1083 C 3.70912,7.22201 8.02178,3.25 12.8523,3.25 c 2.8113,0 4.8463,0.91965 6.1287,2.31536 1.2808,1.39388 1.9387,3.40094 1.7315,5.83104 -0.4514,3.4808 -1.851,4.4288 -2.5167,4.5733 -0.3603,0.0782 -0.6204,-0.021 -0.7629,-0.1435 -0.1273,-0.1095 -0.2439,-0.3052 -0.1951,-0.6518 l 1.0343,-7.757 C 18.3451,6.86996 17.9605,6.367 17.413,6.29401 L 16.9174,6.22792 C 16.37,6.15493 15.867,6.53955 15.794,7.08699 L 15.7793,7.19766 C 15.2714,6.70421 14.6546,6.30909 13.9342,6.05059 10.8495,4.94365 7.58806,6.96619 6.43793,10.0817 c -1.15155,3.1193 0.03057,6.7562 3.12789,7.8677 1.95948,0.7031 3.99018,0.1436 5.50578,-1.1568 0.1801,0.3528 0.427,0.6674 0.7312,0.9291 0.7853,0.6752 1.8613,0.9216 2.9233,0.6911 2.1772,-0.4726 3.9617,-2.7554 4.4694,-6.7241 0.0021,-0.0165 0.0039,-0.033 0.0053,-0.0495 C 23.4647,8.62581 22.6623,5.87667 20.8219,3.87384 18.9789,1.86813 16.2234,0.75 12.8523,0.75 6.70601,0.75 1.32927,5.73254 0.79338,11.8917 0.250578,18.1302 4.86475,23.25 11.1008,23.25 c 1.9247,0 3.1569,-0.1588 4.9633,-0.9225 l 0.2302,-0.0974 c 0.5087,-0.2151 0.7468,-0.8018 0.5317,-1.3105 l -0.1947,-0.4605 c -0.2151,-0.5087 -0.8018,-0.7467 -1.3105,-0.5316 l -0.2303,0.0973 C 13.6716,20.6247 12.7897,20.75 11.1008,20.75 6.35995,20.75 2.86574,16.9152 3.28397,12.1083 Z M 8.78321,10.9475 C 9.57932,8.79101 11.6022,7.86986 13.0898,8.40367 c 1.475,0.52929 2.4217,2.49623 1.627,4.64883 -0.7961,2.1565 -2.819,3.0776 -4.3066,2.5438 C 8.93524,15.067 7.98852,13.1001 8.78321,10.9475 Z" /></svg>`
            },
            {
                name: 'dollar',
                marker: '$',
                color: "green",
                icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18"><path d="m 10.333281,2.1749368 c 0,1.1239937 -0.01069,1.2582018 -0.08551,1.2582018 -0.149646,0 -1.1704466,0.3746645 -1.5018066,0.5480169 -1.1437262,0.6095289 -1.9454023,1.5433943 -2.3195179,2.6953479 -0.4008378,1.2470181 -0.2137799,2.868701 0.4596278,3.9479586 0.2725701,0.430585 0.8711549,1.051298 1.3094041,1.353266 0.753576,0.520057 1.459051,0.822025 3.7144326,1.571355 2.292794,0.766105 2.923445,1.274977 3.003613,2.432523 0.03741,0.542425 -0.04276,0.827618 -0.342049,1.157546 -0.283259,0.318745 -0.716164,0.559201 -1.325437,0.732553 -0.352738,0.09506 -0.582552,0.117433 -1.309405,0.123025 -0.764264,0.0056 -0.945977,-0.01118 -1.357505,-0.128616 C 9.7133184,17.631249 8.9971544,17.256584 8.3985694,16.725343 L 8.1420334,16.501663 7.361735,17.278952 C 6.9341746,17.703945 6.4692025,18.16249 6.3302457,18.291106 l -0.2458474,0.240456 0.2672251,0.262825 c 0.9192559,0.894721 2.079014,1.554578 3.393762,1.912467 l 0.5611736,0.156575 0.01603,1.207874 0.01069,1.213467 h 1.416294 1.416295 v -1.191099 -1.191097 l 0.384803,-0.0671 c 0.523763,-0.09506 1.432329,-0.419401 1.859889,-0.659857 1.117003,-0.637489 1.854544,-1.543395 2.201937,-2.706533 0.106891,-0.369073 0.122924,-0.53124 0.122924,-1.314121 0,-0.693409 -0.02138,-0.978602 -0.101546,-1.274978 -0.40618,-1.588134 -1.282678,-2.605878 -2.94482,-3.427904 C 14.042368,11.133337 13.716353,11.015905 11.936632,10.423152 10.70205,10.014935 9.9164084,9.6626382 9.5850484,9.3718538 9.4781584,9.2767899 9.3231674,9.0698852 9.2376564,8.9077175 9.0986984,8.6393008 9.0773204,8.5498285 9.0773204,8.1304283 c 0,-0.419401 0.01603,-0.5088732 0.144302,-0.732553 0.187058,-0.3355213 0.470317,-0.5871612 0.8711546,-0.7828817 1.074245,-0.5256484 2.752421,-0.5759771 4.115271,-0.1286158 0.149645,0.050329 0.47566,0.1901278 0.737541,0.3187445 0.256536,0.1230241 0.470317,0.2124964 0.481006,0.2013122 0.122924,-0.1677603 1.480428,-2.4157479 1.480428,-2.4548918 0,-0.078288 -1.266648,-0.7045932 -1.758343,-0.8667614 C 14.614231,3.517019 13.898067,3.3436666 13.47585,3.2933384 L 13.165869,3.2541948 V 2.0854647 0.91673492 h -1.416293 -1.416295 z" /></svg>`
            },
        ]

        this.onKeyUp = this.onKeyUp.bind(this)

        this._data = {
            text: data.text || ''
        };

        this._element = this.drawView();
        this.data = data;

        this._preserveBlank = config.preserveBlank !== undefined ? config.preserveBlank : false;
    }

    /**
     * Check if text content is empty and set empty string to inner html.
     * We need this because some browsers (e.g. Safari) insert <br> into empty contenteditanle elements
     *
     * @param {KeyboardEvent} e - key up event
     */
    onKeyUp(e) {
        if (e.code !== 'Backspace' && e.code !== 'Delete') {
            return;
        }

        const {textContent} = this._element;

        if (textContent === '') {
            this._element.innerHTML = '';
        }
    }

    /**
     * Create Tool's view
     * @return {HTMLElement}
     * @private
     */
    drawView() {
        let div = document.createElement('DIV');

        div.classList.add(this._CSS.wrapper, this._CSS.block, this._CSS.alignment[this.data.alignment]);
        div.contentEditable = !this.readOnly;
        div.dataset.placeholder = this.api.i18n.t(this._placeholder);
        div.innerHTML = this.data.text;

        div.addEventListener('keyup', this.onKeyUp);

        return div;
    }

    /**
     * Return Tool's view
     * @returns {HTMLDivElement}
     * @public
     */
    render() {
        return this._element;
    }

    /**
     * Method that specified how to merge two Text blocks.
     * Called by Editor.js by backspace at the beginning of the Block
     * @param {ParagraphData} data
     * @public
     */
    merge(data) {

        let newData = {
            text: this.data.text += data.text,
            alignment: this.data.alignment,
        };

        this._element.innerHTML = this.data.text;

        this.data = newData;
    }

    /**
     * Validate Paragraph block data:
     * - check for emptiness
     *
     * @param {ParagraphData} savedData — data received after saving
     * @returns {boolean} false if saved data is not correct, otherwise true
     * @public
     */
    validate(savedData) {
        if (savedData.text.trim() === '' && !this._preserveBlank) {
            return false;
        }

        return true;
    }

    /**
     * Extract Tool's data from the view
     * @param {HTMLDivElement} toolsContent - Paragraph tools rendered view
     * @returns {ParagraphData} - saved data
     * @public
     */
    save(toolsContent) {
        return Object.assign(this.data, {
            text: toolsContent.innerHTML,
        });
    }

    /**
     * On paste callback fired from Editor.
     *
     * @param {PasteEvent} event - event with pasted data
     */
    onPaste(event) {
        const data = {
            text: event.detail.data.innerHTML,
            alignment: this.config.defaultAlignment || this.defaultAlignment,
            mention: undefined
        };

        this.data = data;
    }

    /**
     * Get current Tools`s data
     * @returns {ParagraphData} Current data
     * @private
     */
    get data() {
        return this._data;
    }

    /**
     * Store data in plugin:
     * - at the this._data property
     * - at the HTML
     *
     * @param {ParagraphData} data — data to set
     * @private
     */
    set data(data) {
        this._data = {
            text: data.text || '',
            alignment: data.alignment || this.config.defaultAlignment || this.defaultAlignment,
            mention: data.mention || undefined
        }
        this._element.innerHTML = this._data.text || '';
    }


    /**
     * Enable Conversion Toolbar. Paragraph can be converted to/from other tools
     */
    static get conversionConfig() {
        return {
            export: 'text', // to convert Paragraph to other block, use 'text' property of saved data
            import: 'text' // to covert other block's exported string to Paragraph, fill 'text' property of tool data
        };
    }

    /**
     * Sanitizer rules
     */
    static get sanitize() {
        return {
            text: {
                br: true,
            },
            alignment: {}
        };
    }

    /**
     * Used by Editor paste handling API.
     * Provides configuration to handle P tags.
     *
     * @returns {{tags: string[]}}
     */
    static get pasteConfig() {
        return {
            tags: ['P']
        };
    }

    /**
     *
     * @returns {HTMLDivElement}
     */
    renderSettings() {
        const wrapper = document.createElement('div');

        // Paragraph alignment feature
        this.alignmentSettings.map(tune => {

            const button = document.createElement('div');
            button.classList.add('cdx-settings-button');
            button.innerHTML = tune.icon;

            button.classList.toggle(this.CSS.settingsButtonActive, tune.name === this.data.alignment);

            wrapper.appendChild(button);

            return button;

        }).forEach((element, index, elements) => {

            element.addEventListener('click', () => {

                this._toggleAlignmentTune(this.alignmentSettings[index].name);

                elements.forEach((el, i) => {
                    const {name} = this.alignmentSettings[i];
                    el.classList.toggle(this.CSS.settingsButtonActive, name === this.data.alignment);
                    this._element.classList.toggle(this._CSS.alignment[name], name === this.data.alignment)
                });
            });
        });

        // Mention setting
        this.settings.map(tune => {

            const button = document.createElement('div');
            button.classList.add('cdx-settings-button');
            button.innerHTML = tune.icon;

            button.classList.toggle(this.CSS.settingsButtonActive, tune.name === this.data.alignment);

            wrapper.appendChild(button);

            return button;

        }).forEach((element, index, elements) => {

            element.addEventListener('click', () => {

                this._toggleMentionTune(this.settings[index].name);

                elements.forEach((el, i) => {
                    const {name} = this.settings[i];
                    el.classList.toggle(this.CSS.settingsButtonActive, name === this.data.mention);
                    this._element.classList.toggle(this._CSS.mention[name], name === this.data.mention)
                });

                console.log(this.data.mention);
            });
        });

        return wrapper;
    }

    _toggleAlignmentTune(tune) {
        this.data.alignment = tune;
    }

    _toggleMentionTune(tune) {
        this.data.mention = (tune == this.data.mention) ? undefined : tune;
    }

    /**
     * Icon and title for displaying at the Toolbox
     *
     * @return {{icon: string, title: string}}
     */
    static get toolbox() {
        return {
            icon: '<svg xmlns="http://www.w3.org/2000/svg" style="color:transparent; height:12px; width:17px;" viewBox="0.2 -0.3 9 11.4" width="12" height="14"><path d="M0 2.77V.92A1 1 0 01.2.28C.35.1.56 0 .83 0h7.66c.28.01.48.1.63.28.14.17.21.38.21.64v1.85c0 .26-.08.48-.23.66-.15.17-.37.26-.66.26-.28 0-.5-.09-.64-.26a1 1 0 01-.21-.66V1.69H5.6v7.58h.5c.25 0 .45.08.6.23.17.16.25.35.25.6s-.08.45-.24.6a.87.87 0 01-.62.22H3.21a.87.87 0 01-.61-.22.78.78 0 01-.24-.6c0-.25.08-.44.24-.6a.85.85 0 01.61-.23h.5V1.7H1.73v1.08c0 .26-.08.48-.23.66-.15.17-.37.26-.66.26-.28 0-.5-.09-.64-.26A1 1 0 010 2.77z"/></svg>',
            title: 'Text',
        };
    }
}
