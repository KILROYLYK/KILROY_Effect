import './style';

import { W, D, Base, $, VConsole, GSAP, Tween } from '../../../../_Base/Asset/typescript/window';

import GlobalConfig from './config'; // 配置
import GlobalFunction from './function'; // 函数
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
    
    public static readonly Base: any = Base;
    
    // public static readonly $: any = $;
    // public static readonly VConsole: any = VConsole;
    public static readonly GSAP: any = GSAP;
    public static readonly Tween: any = Tween;
    
    public static readonly Dom: HTMLElement = GlobalFunction.getDom();
    public static Width: number = Global.Dom.clientWidth;
    public static Height: number = Global.Dom.clientHeight;
    public static FocusP: Position = { // 焦点位置
        x: Global.Width / 2,
        y: Global.Height / 2
    };
    
    public static readonly Config: any = GlobalConfig; // 配置
    public static readonly Function: any = GlobalFunction; // 函数
    public static readonly Stage: any = GlobalStage; // 场景
}
