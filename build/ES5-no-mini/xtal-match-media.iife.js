//@ts-check
(function () {
  var disabled = 'disabled';

  function XtallatX(superClass) {
    return (
      /*#__PURE__*/
      function (_superClass) {
        babelHelpers.inherits(_class, _superClass);

        function _class() {
          var _this;

          babelHelpers.classCallCheck(this, _class);
          _this = babelHelpers.possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).apply(this, arguments));
          _this._evCount = {};
          return _this;
        }

        babelHelpers.createClass(_class, [{
          key: "attr",
          value: function attr(name, val, trueVal) {
            if (val) {
              this.setAttribute(name, trueVal || val);
            } else {
              this.removeAttribute(name);
            }
          }
        }, {
          key: "incAttr",
          value: function incAttr(name) {
            var ec = this._evCount;

            if (name in ec) {
              ec[name]++;
            } else {
              ec[name] = 0;
            }

            this.attr(name, ec[name].toString());
          }
        }, {
          key: "attributeChangedCallback",
          value: function attributeChangedCallback(name, oldVal, newVal) {
            switch (name) {
              case disabled:
                this._disabled = newVal !== null;
                break;
            }
          }
        }, {
          key: "de",
          value: function de(name, detail) {
            var eventName = name + '-changed';
            var newEvent = new CustomEvent(eventName, {
              detail: detail,
              bubbles: true,
              composed: false
            });
            this.dispatchEvent(newEvent);
            this.incAttr(eventName);
            return newEvent;
          }
        }, {
          key: "_upgradeProperties",
          value: function _upgradeProperties(props) {
            var _this2 = this;

            props.forEach(function (prop) {
              if (_this2.hasOwnProperty(prop)) {
                var value = _this2[prop];
                delete _this2[prop];
                _this2[prop] = value;
              }
            });
          }
        }, {
          key: "disabled",
          get: function get() {
            return this._disabled;
          },
          set: function set(val) {
            this.attr(disabled, val, '');
          }
        }], [{
          key: "observedAttributes",
          get: function get() {
            return [disabled];
          }
        }]);
        return _class;
      }(superClass)
    );
  } //# sourceMappingURL=xtal-latx.js.map


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

  customElements.define(XtalMatchMedia.is, XtalMatchMedia); //# sourceMappingURL=xtal-match-media.js.map
})();