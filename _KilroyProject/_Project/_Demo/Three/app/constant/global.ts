import './style'; // 样式

import { W, D, Base } from '../../../../_Base/javascript/window'; // 浏览器对象

import * as THREE from 'three'; // 游戏引擎

import Config from './config'; // 配置
import Stage from './stage'; // 场景
import Function from './function'; // 函数

/**
 * Global
 */
export default class Global {
    readonly static Window: Window = W; // Window
    readonly static Document: Document = D; // Document
    
    readonly static Base: object = Base;
    
    readonly static THREE: any = THREE; // ThreeJS
    
    public static Width: number = W.innerWidth;
    public static Height: number = W.innerHeight;
    readonly static GameDom: Element = Function.getGameDom('game');
    
    readonly static Config: object = Config; // 配置
    readonly static Stage: object = Stage; // 场景
    readonly static Function: object = Function; // 函数
    
    public static Instance: any = {}; // 实例
}
