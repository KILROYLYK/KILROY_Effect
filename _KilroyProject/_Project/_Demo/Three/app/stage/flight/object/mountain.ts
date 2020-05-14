import Global from '../../../constant/global';
import _Object from '../../../interface/object';

/**
 * 山
 */
export default class Mountain implements _Object {
    private scene: THREE.Scene = null; // 场景
    
    private ground: THREE.Object3D = null; // 3D对象
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
     * @constructor Star
     * @param {object} scene 场景
     */
    constructor(scene: object) {
        const _this = this;
        
        _this.scene = scene.instance as THREE.Scene;
        
        _this.create();
        _this.init();
    }
    
    /**
     * 创建
     * @return {void}
     */
    protected create(): void {
        const _this = this;
        
        _this.ground = new THREE.Object3D();
        _this.ground.position.set(_this.moveP.x, _this.moveP.y, _this.moveP.z);
        _this.ground.rotation.set(_this.lookP.x, _this.lookP.y, _this.lookP.z);
    }
    
    /**
     * 初始化
     * @return {void}
     */
    protected init(): void {
        const _this = this;
    }
    
    /**
     * 更新
     * @return {void}
     */
    public update(): void {
        const _this = this;
    }
    
    /**
     * 销毁
     * @return {void}
     */
    public destroy(): void {
        const _this = this;
    }
}
