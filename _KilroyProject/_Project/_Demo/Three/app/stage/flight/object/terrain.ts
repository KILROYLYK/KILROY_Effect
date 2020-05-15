import Global from '../../../constant/global';
import _Object from '../../../interface/object';
import { SimplexNoise } from 'three/examples/jsm/math/SimplexNoise';

/**
 * 地形
 */
export default class Terrain implements _Object {
    private scene: THREE.Scene = null; // 场景
    private texture: THREE.Texture = null; // 纹理
    
    private ground: THREE.Object3D = null; // 3D对象
    private simplex: SimplexNoise = null; // 简单声音
    private geometry: THREE.PlaneGeometry = null; // 几何
    private readonly moveP: object = { // 移动坐标
        x: 0,
        y: 0,
        z: -3500
    };
    private readonly lookP: object = { // 视觉坐标
        x: 0,
        y: 0,
        z: 0
    };
    
    public instance: THREE.PointLight = null; // 实例
    
    /**
     * 构造函数
     * @constructor Terrain
     * @param {object} scene 场景
     * @para {THREE.Texture} texture 纹理
     */
    constructor(scene: object, texture: THREE.Texture) {
        const _this = this;
    
        _this.scene = scene.instance;
        _this.texture = texture;
        
        _this.create();
        _this.init();
    }
    
    /**
     * 创建
     * @return {void}
     */
    protected create(): void {
        const _this = this;
        
        _this.ground = new Global.THREE.Object3D();
        _this.ground.position.set(_this.moveP.x, _this.moveP.y, _this.moveP.z);
        _this.ground.rotation.set(_this.lookP.x, _this.lookP.y, _this.lookP.z);
        
        _this.simplex = new SimplexNoise();
        this.geometry = new Global.THREE.PlaneGeometry(10000, 1000, 128, 32);
        
    }
    
    /**
     * 初始化
     * @return {void}
     */
    protected init(): void {
        const _this = this;
    }
    
    /**
     * 销毁
     * @return {void}
     */
    public destroy(): void {
        const _this = this;
    }
    
    /**
     * 更新
     * @return {void}
     */
    public update(): void {
        const _this = this;
    }
}
