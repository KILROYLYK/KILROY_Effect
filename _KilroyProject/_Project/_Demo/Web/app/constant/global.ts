import './style'; // 样式

import { W, D, Base } from '../../../../_Base/javascript/window'; // 浏览器对象

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
    public readonly static Window: Window = W; // Window
    public readonly static Document: Document = D; // Document
    
    public readonly static Base: object = Base; // 基础函数
    
    public readonly static Dom: HTMLElement = GlobalFunction.getDom();
    public static Width: number = Global.Dom.clientWidth;
    public static Height: number = Global.Dom.clientHeight;
    public static mouseP: Position = { // 鼠标位置
        x: Global.Width / 2,
        y: Global.Height / 2
    };
    
    public readonly static Config: object = GlobalConfig; // 配置
    public readonly static Function: object = GlobalFunction; // 函数
    public readonly static Stage: object = GlobalStage; // 场景
}
