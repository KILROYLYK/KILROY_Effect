import { W, D } from '../../../_Base/javascript/window'; // 浏览器对象
import * as THREE from 'three';
import Config from './Config'; // 配置

/**
 * Global
 */
export default class Global {
    readonly static Window: object = W; // Window
    readonly static Document: object = D; // Document
    
    readonly static THREE = THREE; // ThreeJS
    
    readonly static GameDom: any = D.getElementById('game');
    public static Width: number = W.clientWidth;
    public static Height: number = W.clientHeight;
    
    readonly static Config: object = Config; // 配置
    public static Object: object = {}; // 对象
}
