import './style'; // 样式

import { W, D, Base } from '../../../../_Base/javascript/window'; // 浏览器对象

import Config from './config'; // 配置
import Stage from './stage'; // 场景
import Function from './function'; // 函数

/**
 * Global
 */
export default class Global {
    public readonly static Window: Window = W; // Window
    public readonly static Document: Document = D; // Document
    
    public readonly static Base: any = Base; // 基础
    
    public readonly static Dom: HTMLElement = Function.getDom();
    public static Width: number = Global.Dom.clientWidth;
    public static Height: number = Global.Dom.clientHeight;
    public static mouseP: object = { // 鼠标位置
        x: 0,
        y: 0
    };
    
    public readonly static Config: any = Config; // 配置
    public readonly static Stage: any = Stage; // 场景
    public readonly static Function: any = Function; // 函数
}
