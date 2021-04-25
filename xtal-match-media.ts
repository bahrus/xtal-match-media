import { XtallatX, define, AttributeProps } from 'xtal-element/xtal-latx.js';
import {hydrate} from 'trans-render/hydrate.js';

export const linkMediaQueryHandler = ({disabled, mediaQueryString, self}: XtalMatchMedia) => {
  if(disabled || mediaQueryString === undefined) return;
  self._mql = window.matchMedia(mediaQueryString);
  self._boundMediaQueryHandler = self.handleMediaQueryChange.bind(self);
  self.connect();
  self.matchesMediaQuery = (self._mql.matches);
}
export const linkValue = ({matchesMediaQuery, self}: XtalMatchMedia) => {
  self.value = matchesMediaQuery;
}
export const propActions = [linkMediaQueryHandler, linkValue];

/**
 * Custom Element that watches for media matches
 * @element xtal-match-media
 *
 */
class XtalMatchMedia extends XtallatX(hydrate(HTMLElement)) {
  static is = 'xtal-match-media';
  static attributeProps = ({mediaQueryString, matchesMediaQuery, value}: XtalMatchMedia) => ({
    str:[mediaQueryString],
    bool: [matchesMediaQuery, value],
    notify: [matchesMediaQuery, value]
  } as AttributeProps);
  /**
   * Media Query String to monitor
   */

  mediaQueryString: string | undefined;

  matchesMediaQuery: boolean | undefined;
  value: boolean | undefined;
  _boundMediaQueryHandler!: (e: MediaQueryListEvent) => void;
  _mql: MediaQueryList | undefined;

  propActions = propActions;

  connect() {
    this.disconnect();
    this._mql!.addEventListener('change', this._boundMediaQueryHandler);
  }
  disconnect() {
    if (this._mql) this._mql.removeEventListener('change', this._boundMediaQueryHandler);
  }
  handleMediaQueryChange(e: MediaQueryListEvent) {
    this.matchesMediaQuery = e.matches;
  }
  connectedCallback(){
    this.style.display = 'none';
    super.connectedCallback();
  }
  disconnectedCallback() {
    this.disconnect();
  }
}
define(XtalMatchMedia);

// declare global {
//   interface HTMLElementTagNameMap {
//       "xtal-match-media": XtalMatchMedia,
//   }
// }
