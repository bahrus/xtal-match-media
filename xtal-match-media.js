import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';

/**
 * `xtal-match-media`
 * Custom Element that watches for media matches
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 */
class XtalMatchMedia extends PolymerElement {
  static get template() {
    return html`
      <style>
        :host {
          display: block;
        }
      </style>
      <h2>Hello [[prop1]]!</h2>
    `;
  }
  static get properties() {
    return {
      prop1: {
        type: String,
        value: 'xtal-match-media',
      },
    };
  }
}

window.customElements.define('xtal-match-media', XtalMatchMedia);
