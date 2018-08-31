
    //@ts-check
    (function () {
    function define(custEl) {
    let tagName = custEl.is;
    if (customElements.get(tagName)) {
        console.warn('Already registered ' + tagName);
        return;
    }
    customElements.define(tagName, custEl);
}
const disabled = 'disabled';
function XtallatX(superClass) {
    return class extends superClass {
        constructor() {
            super(...arguments);
            this._evCount = {};
        }
        static get observedAttributes() {
            return [disabled];
        }
        get disabled() {
            return this._disabled;
        }
        set disabled(val) {
            this.attr(disabled, val, '');
        }
        attr(name, val, trueVal) {
            const v = val ? 'set' : 'remove'; //verb
            this[v + 'Attribute'](name, trueVal || val);
        }
        to$(n) {
            const mod = n % 2;
            return (n - mod) / 2 + '-' + mod;
        }
        incAttr(name) {
            const ec = this._evCount;
            if (name in ec) {
                ec[name]++;
            }
            else {
                ec[name] = 0;
            }
            this.attr('data-' + name, this.to$(ec[name]));
        }
        attributeChangedCallback(name, oldVal, newVal) {
            switch (name) {
                case disabled:
                    this._disabled = newVal !== null;
                    break;
            }
        }
        de(name, detail) {
            const eventName = name + '-changed';
            const newEvent = new CustomEvent(eventName, {
                detail: detail,
                bubbles: true,
                composed: false,
            });
            this.dispatchEvent(newEvent);
            this.incAttr(eventName);
            return newEvent;
        }
        _upgradeProperties(props) {
            props.forEach(prop => {
                if (this.hasOwnProperty(prop)) {
                    let value = this[prop];
                    delete this[prop];
                    this[prop] = value;
                }
            });
        }
    };
}
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
        this.attr(mediaQueryString, val);
    }
    get matchesMediaQuery() {
        return this._matchesMediaQuery;
    }
    set matchesMediaQuery(val) {
        this.attr(matchesMediaQuery, val, '');
    }
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
        this.matchesMediaQuery = val;
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
customElements.define(XtalMatchMedia.is, XtalMatchMedia);
    })();  
        