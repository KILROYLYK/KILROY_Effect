import _Global from '../../../../_Base/Asset/_Global/global';

import './style';
import GlobalConfig from './config'; // 配置
import GlobalFN from './function'; // 函数
import GlobalStage from './stage'; // 场景

interface Position { // 位置
    x: number,
    y: number
}

/**
 * 全局
 */
export default class Global {
    public static readonly Window: Window = _Global.W;
    public static readonly Document: Document = _Global.D;
    
    public static readonly FN: any = _Global.FN;
    public static readonly Adaptation: any = _Global.Adaptation;
    public static readonly Ajax: any = _Global.Ajax;
    public static readonly Popup: any = _Global.Popup;
    
    public static readonly $: any = _Global.$;
    public static readonly CryptoJS: any = _Global.Crypto;
    public static readonly Console: any = _Global.Console;
    // public static readonly GSAP: any = _Global.GSAP;
    public static readonly Tween: any = _Global.Tween;
    
    public static readonly Dom: HTMLElement = GlobalFN.getDom();
    public static Width: number = Global.Dom.clientWidth;
    public static Height: number = Global.Dom.clientHeight;
    public static FocusP: Position = { // 焦点位置
        x: Global.Width / 2,
        y: Global.Height / 2
    };
    
    public static readonly Config: any = GlobalConfig; // 配置
    public static readonly Function: any = GlobalFN; // 函数
    public static readonly Stage: any = GlobalStage; // 场景
}
