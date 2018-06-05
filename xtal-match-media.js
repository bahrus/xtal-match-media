import { XtallatX } from 'xtal-latx/xtal-latx.js';
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
    static get is() { return 'xtal-match-media'; }
    get mediaQueryString() {
        return this._mediaQueryString;
    }
    set mediaQueryString(val) {
        this.setAttribute(mediaQueryString, val);
    }
    get matchesMediaQuery() {
        return this._matchesMediaQuery;
    }
    set matchesMediaQuery(val) {
        if (val) {
            this.setAttribute(matchesMediaQuery, '');
        }
        else {
            this.removeAttribute(matchesMediaQuery);
        }
    }
    static get observedAttributes() {
        return super.observedAttributes.concat([
            mediaQueryString, matchesMediaQuery
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
                }
                break;
            case matchesMediaQuery:
                const val = newValue !== null;
                this.updateResultProp(val, matchesMediaQuery, '_matchesMediaQuery');
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
        if (e.matches) {
            this.setAttribute(matchesMediaQuery, '');
        }
        else {
            this.removeAttribute(matchesMediaQuery);
        }
        this.detail = e;
        this.setResult(e.matches, null);
    }
    connectedCallback() {
        this._upgradeProperties(['mediaQueryString']);
    }
    disconnectedCallback() {
        this.disconnect();
    }
}
customElements.define(XtalMatchMedia.is, XtalMatchMedia);
//# sourceMappingURL=xtal-match-media.js.map