import './style';

import { W, D, Base, Tween } from '../../../../_Base/typescript/window';

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
    public readonly static W: Window = W;
    public readonly static Document: Document = D;
    
    public readonly static Base: any = Base;
    
    public readonly static Tween: any = Tween;
    
    public readonly static Dom: HTMLElement = GlobalFunction.getDom();
    public static Width: number = Global.Dom.clientWidth;
    public static Height: number = Global.Dom.clientHeight;
    public static mouseP: Position = { // 鼠标位置
        x: Global.Width / 2,
        y: Global.Height / 2
    };
    
    public readonly static Config: any = GlobalConfig; // 配置
    public readonly static Function: any = GlobalFunction; // 函数
    public readonly static Stage: Function = GlobalStage; // 场景
}
