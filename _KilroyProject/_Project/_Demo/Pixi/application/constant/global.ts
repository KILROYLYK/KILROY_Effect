import './style';

import { W, D, FN, Adaptation, Popup, $, VConsole, GSAP, Tween } from '../../../../_Base/Asset/_Global/global';

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
    public static readonly Window: Window = W;
    public static readonly Document: Document = D;
    
    public static readonly FN: any = FN;
    public static readonly Adaptation: any = Adaptation;
    public static readonly Popup: any = Popup;
    
    public static readonly $: any = $;
    // public static readonly VConsole: any = VConsole;
    public static readonly GSAP: any = GSAP;
    public static readonly Tween: any = Tween;
    
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
