import { XtallatX } from 'xtal-element/xtal-latx.js';
import {define} from 'trans-render/define.js';
import {hydrate} from 'trans-render/hydrate.js';

const mediaQueryString = 'media-query-string';
const matchesMediaQuery = 'matches-media-query';
/**
 * Custom Element that watches for media matches
 * @element xtal-match-media
 *
 */
class XtalMatchMedia extends XtallatX(hydrate(HTMLElement)) {
  static get is() { return 'xtal-match-media'; }
  _mediaQueryString!: string;
  /**
   * Media Query String to monitor
   */
  get mediaQueryString() {
    return this._mediaQueryString;
  }
  set mediaQueryString(val: string) {
    this.attr(mediaQueryString, val);
  }
  _matchesMediaQuery!: boolean;
  get matchesMediaQuery(){
    return this._matchesMediaQuery;
  }

  static get observedAttributes() {
    return super.observedAttributes.concat([
      mediaQueryString
    ]);
  }

  _boundMediaQueryHandler!: any;
  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
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

  _mql!: MediaQueryList
  connect() {
    this._mql.addListener(this._boundMediaQueryHandler);
  }
  disconnect() {
    if (this._mql) this._mql.removeListener(this._boundMediaQueryHandler);
  }
  handleMediaQueryChange(e: MediaQueryList) {
    this.updateValue(e.matches);
  }
  value = false;
  updateValue(val: boolean){
    this.value = val;
    this._matchesMediaQuery = val;
    this.de(matchesMediaQuery, {
      value: val
    })
  }
  connectedCallback() {
    this.propUp(['mediaQueryString']);
  }
  disconnectedCallback() {
    this.disconnect();
  }
}
define(XtalMatchMedia);

declare global {
  interface HTMLElementTagNameMap {
      "xtal-match-media": XtalMatchMedia,
  }
}
