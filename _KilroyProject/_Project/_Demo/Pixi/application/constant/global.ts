import './style';

import { W, D, Base, GSAP, Tween } from '../../../../_Base/typescript/window';

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
    public static readonly W: Window = W;
    public static readonly Document: Document = D;
    
    public static readonly Base: any = Base;
    
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
    public static readonly Stage: Function = GlobalStage; // 场景
}
