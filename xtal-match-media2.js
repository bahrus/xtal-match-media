import { xc } from 'xtal-element/lib/XtalCore.js';
/**
 * Custom Element that watches for media matches
 * @element xtal-match-media
 *
 */
export class XtalMatchMedia extends HTMLElement {
    constructor() {
        super(...arguments);
        this.self = this;
        this.propActions = propActions;
        this.reactor = new xc.Rx(this);
        this.mediaQueryHandler = (e) => {
            this.matchesMediaQuery = e.matches;
        };
    }
    connect() {
        this.disconnect();
        this._mql.addEventListener('change', this.mediaQueryHandler);
    }
    disconnect() {
        if (this._mql)
            this._mql.removeEventListener('change', this.mediaQueryHandler);
    }
    connectedCallback() {
        this.style.display = 'none';
        xc.hydrate(this, slicedPropDefs);
        this.networkInformation = navigator.networkInformation;
        this.deviceMemory = navigator.deviceMemory;
    }
    disconnectedCallback() {
        this.disconnect();
    }
    onPropChange(n, prop, nv) {
        this.reactor.addToQueue(prop, nv);
    }
}
XtalMatchMedia.is = 'xtal-match-media';
export const linkMql = ({ disabled, mediaQueryString, self }) => {
    self._mql = window.matchMedia(mediaQueryString);
    self.matchesMediaQuery = self._mql.matches;
    self.connect();
};
const propActions = [linkMql];
const baseProp = {
    dry: true,
    async: true,
};
const strProp1 = {
    ...baseProp,
    type: String,
    stopReactionsIfFalsy: true,
};
const boolProp1 = {
    ...baseProp,
    type: Boolean
};
const boolProp2 = {
    ...boolProp1,
    notify: true,
};
const objProp1 = {
    ...baseProp,
    type: Object,
    notify: true,
    reflect: true,
};
const numProp1 = {
    ...baseProp,
    type: Number,
    reflect: true,
};
const propDefMap = {
    mediaQueryString: strProp1,
    value: boolProp2,
    matchesMediaQuery: {
        ...boolProp2,
        echoTo: 'value'
    },
    disabled: {
        ...boolProp1,
        stopReactionsIfTruthy: true,
    },
    networkInformation: objProp1,
    deviceMemory: numProp1,
};
const slicedPropDefs = xc.getSlicedPropDefs(propDefMap);
xc.letThereBeProps(XtalMatchMedia, slicedPropDefs, 'onPropChange');
xc.define(XtalMatchMedia);
