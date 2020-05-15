import './style'; // 样式

import { W, D, Base } from '../../../../_Base/javascript/window'; // 浏览器对象

import Config from './config'; // 配置
import Stage from './stage'; // 场景
import Function from './function'; // 函数

/**
 * Global
 */
export default class Global {
    readonly static Window: Window = W; // Window
    readonly static Document: Document = D; // Document
    
    readonly static Base: any = Base;
    
    public static Width: number = W.innerWidth;
    public static Height: number = W.innerHeight;
    readonly static GameDom: HTMLElement = Function.getGame('game');
    
    readonly static Config: any = Config; // 配置
    readonly static Stage: any = Stage; // 场景
    readonly static Function: any = Function; // 函数
}
