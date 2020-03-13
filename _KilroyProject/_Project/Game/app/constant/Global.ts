import './Style'; // 样式

import { W, D } from '../../../_Base/javascript/window'; // 浏览器对象

import * as THREE from 'three'; // 游戏引擎

import Config from './Config'; // 配置
import Object from './Object'; // 对象
import Stage from './Stage'; // 场景
import Controller from './Controller'; // 控制器
import Function from './Function'; // 函数

/**
 * Global
 */
export default class Global {
    readonly static Window: object = W; // Window
    readonly static Document: object = D; // Document
    
    readonly static THREE: any = THREE; // ThreeJS
    
    readonly static GameDom: D = Function.getGameDom('game');
    public static Width: number = W.innerWidth;
    public static Height: number = W.innerHeight;
    
    readonly static Config = Config; // 配置
    readonly static Object = Object; // 对象
    readonly static Stage = Stage; // 场景
    readonly static Function = Function; // 函数
    readonly static Controller = Controller; // 控制器
    public static Instance: object = {}; // 实例
}
