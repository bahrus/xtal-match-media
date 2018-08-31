import { XtallatX } from "./node_modules/xtal-latx/xtal-latx.js";
import { define } from "./node_modules/xtal-latx/define.js";
var mediaQueryString = 'media-query-string';
var matchesMediaQuery = 'matches-media-query';
/**
 * `xtal-match-media`
 * Custom Element that watches for media matches
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 */

var XtalMatchMedia =
/*#__PURE__*/
function (_XtallatX) {
  babelHelpers.inherits(XtalMatchMedia, _XtallatX);

  function XtalMatchMedia() {
    babelHelpers.classCallCheck(this, XtalMatchMedia);
    return babelHelpers.possibleConstructorReturn(this, (XtalMatchMedia.__proto__ || Object.getPrototypeOf(XtalMatchMedia)).apply(this, arguments));
  }

  babelHelpers.createClass(XtalMatchMedia, [{
    key: "attributeChangedCallback",
    value: function attributeChangedCallback(name, oldValue, newValue) {
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
  }, {
    key: "connect",
    value: function connect() {
      this._mql.addListener(this._boundMediaQueryHandler);
    }
  }, {
    key: "disconnect",
    value: function disconnect() {
      if (this._mql) this._mql.removeListener(this._boundMediaQueryHandler);
    }
  }, {
    key: "handleMediaQueryChange",
    value: function handleMediaQueryChange(e) {
      this.updateValue(e.matches);
    }
  }, {
    key: "updateValue",
    value: function updateValue(val) {
      this.value = val;
      this.matchesMediaQuery = val;
      this.de(matchesMediaQuery, {
        value: val
      });
    }
  }, {
    key: "connectedCallback",
    value: function connectedCallback() {
      this._upgradeProperties(['mediaQueryString']);
    }
  }, {
    key: "disconnectedCallback",
    value: function disconnectedCallback() {
      this.disconnect();
    }
  }, {
    key: "mediaQueryString",
    get: function get() {
      return this._mediaQueryString;
    },
    set: function set(val) {
      this.attr(mediaQueryString, val);
    }
  }, {
    key: "matchesMediaQuery",
    get: function get() {
      return this._matchesMediaQuery;
    },
    set: function set(val) {
      this.attr(matchesMediaQuery, val, '');
    }
  }], [{
    key: "is",
    get: function get() {
      return 'xtal-match-media';
    }
  }, {
    key: "observedAttributes",
    get: function get() {
      return babelHelpers.get(XtalMatchMedia.__proto__ || Object.getPrototypeOf(XtalMatchMedia), "observedAttributes", this).concat([mediaQueryString]);
    }
  }]);
  return XtalMatchMedia;
}(XtallatX(HTMLElement));

define(XtalMatchMedia); //# sourceMappingURL=xtal-match-media.js.map