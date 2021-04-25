import {xc, IReactor, PropAction, PropDef, PropDefMap, ReactiveSurface} from 'xtal-element/lib/XtalCore.js';

/**
 * Custom Element that watches for media matches
 * @element xtal-match-media
 *
 */
export class XtalMatchMedia extends HTMLElement implements ReactiveSurface{
    static is = 'xtal-match-media';
    self = this;
    propActions = propActions;
    reactor: IReactor = new xc.Rx(this);

    /**
    * Media Query String to monitor
    */
    mediaQueryString: string | undefined; 

    value: boolean | undefined;
    matchesMediaQuery: boolean | undefined;
    disabled: boolean | undefined;
    networkInformation: any;
    deviceMemory: number | undefined;

    mediaQueryHandler = (e: MediaQueryListEvent) => {
        this.matchesMediaQuery = e.matches;
    }
    connect(){
        this.disconnect();
        this._mql!.addEventListener('change', this.mediaQueryHandler);
    }
    disconnect(){
        if(this._mql) this._mql.removeEventListener('change', this.mediaQueryHandler);
    }
    _mql: MediaQueryList | undefined;

    connectedCallback(){
        this.style.display = 'none';
        xc.hydrate(this, slicedPropDefs);
        this.networkInformation = (<any>navigator).networkInformation;
        this.deviceMemory = (<any>navigator).deviceMemory;
    }
    disconnectedCallback(){
        this.disconnect();
    }
    onPropChange(n: string, prop: PropDef, nv: any){
        this.reactor.addToQueue(prop, nv);
    }
}

type X =XtalMatchMedia;

export const linkMql = ({disabled, mediaQueryString, self}: X) => {
    self._mql = window.matchMedia(mediaQueryString!);
    self.matchesMediaQuery = self._mql.matches;
    self.connect();
}

const propActions = [linkMql] as PropAction[];

const baseProp: PropDef = {
    dry: true,
    async: true,
};
const strProp1: PropDef = {
    ...baseProp,
    type: String,
    stopReactionsIfFalsy: true,
}
const boolProp1: PropDef = {
    ...baseProp,
    type: Boolean
}
const boolProp2: PropDef = {
    ...boolProp1,
    notify: true,
}
const objProp1: PropDef = {
    ...baseProp,
    type: Object,
    notify: true,
    reflect: true,
}
const numProp1: PropDef = {
    ...baseProp,
    type: Number,
    reflect: true,
}
const propDefMap: PropDefMap<X> = {
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

declare global {
    interface HTMLElementTagNameMap {
        "xtal-match-media": XtalMatchMedia,
    }
}