import { XtallatX, define } from 'xtal-element/xtal-latx.js';
import { hydrate } from 'trans-render/hydrate.js';
export const linkMediaQueryHandler = ({ disabled, mediaQueryString, self }) => {
    if (disabled || mediaQueryString === undefined)
        return;
    self._mql = window.matchMedia(mediaQueryString);
    self._boundMediaQueryHandler = self.handleMediaQueryChange.bind(self);
    self.connect();
    self.matchesMediaQuery = (self._mql.matches);
};
export const linkValue = ({ matchesMediaQuery, self }) => {
    self.value = matchesMediaQuery;
};
export const propActions = [linkMediaQueryHandler, linkValue];
/**
 * Custom Element that watches for media matches
 * @element xtal-match-media
 *
 */
class XtalMatchMedia extends XtallatX(hydrate(HTMLElement)) {
    constructor() {
        super(...arguments);
        this.propActions = propActions;
    }
    connect() {
        this._mql.addEventListener('change', this._boundMediaQueryHandler);
    }
    disconnect() {
        if (this._mql)
            this._mql.removeEventListener('change', this._boundMediaQueryHandler);
    }
    handleMediaQueryChange(e) {
        this.matchesMediaQuery = e.matches;
    }
    connectedCallback() {
        this.style.display = 'none';
        super.connectedCallback();
    }
    disconnectedCallback() {
        this.disconnect();
    }
}
XtalMatchMedia.is = 'xtal-match-media';
XtalMatchMedia.attributeProps = ({ mediaQueryString, matchesMediaQuery, value }) => ({
    str: [mediaQueryString],
    bool: [matchesMediaQuery, value],
    notify: [matchesMediaQuery, value]
});
define(XtalMatchMedia);
