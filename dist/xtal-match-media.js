import { XtallatX } from 'xtal-element/xtal-latx.js';
import { define } from 'xtal-element/define.js';
const mediaQueryString = 'media-query-string';
const matchesMediaQuery = 'matches-media-query';
/**
 * `xtal-match-media`
 * Custom Element that watches for media matches
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 */
class XtalMatchMedia extends XtallatX(HTMLElement) {
    constructor() {
        super(...arguments);
        this.value = false;
    }
    static get is() { return 'xtal-match-media'; }
    /**
     * Media Query String to monitor
     */
    get mediaQueryString() {
        return this._mediaQueryString;
    }
    set mediaQueryString(val) {
        this.attr(mediaQueryString, val);
    }
    get matchesMediaQuery() {
        return this._matchesMediaQuery;
    }
    // set matchesMediaQuery(val: boolean){
    //   this.attr(matchesMediaQuery, val, '');
    // }
    static get observedAttributes() {
        return super.observedAttributes.concat([
            mediaQueryString
        ]);
    }
    attributeChangedCallback(name, oldValue, newValue) {
        switch (name) {
            case mediaQueryString:
                this.disconnect();
                this._mediaQueryString = newValue;
                if (newValue !== null) {
                    this._mql = window.matchMedia(this._mediaQueryString);
                    this._boundMediaQueryHandler = this.handleMediaQueryChange.bind(this);
                    this.connect();
                    this.updateValue(this._mql.matches);
                }
                break;
            case matchesMediaQuery:
                this._matchesMediaQuery = newValue != null;
                break;
        }
    }
    connect() {
        this._mql.addListener(this._boundMediaQueryHandler);
    }
    disconnect() {
        if (this._mql)
            this._mql.removeListener(this._boundMediaQueryHandler);
    }
    handleMediaQueryChange(e) {
        this.updateValue(e.matches);
    }
    updateValue(val) {
        this.value = val;
        this._matchesMediaQuery = val;
        this.de(matchesMediaQuery, {
            value: val
        });
    }
    connectedCallback() {
        this._upgradeProperties(['mediaQueryString']);
    }
    disconnectedCallback() {
        this.disconnect();
    }
}
define(XtalMatchMedia);
