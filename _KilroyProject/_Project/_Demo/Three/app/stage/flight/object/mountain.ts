import Global from '../../../constant/global';
import _Object from '../../../interface/object';

/**
 * 山
 */
export default class Mountain implements _Object {
    private scene: THREE.Scene = null; // 场景
    
    private readonly config: object = { // 配置
        moveP: { // 移动坐标
            x: 0,
            y: 0,
            z: -3500
        },
        lookP: { // 视觉坐标
            x: 0,
            y: 0,
            z: 0
        },
    };
    private ground: THREE.Object3D = null; // 3D对象
    
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
    
        _this.config.group = new THREE.Object3D();
        _this.group.position.set(this.move.x, this.move.y, this.move.z);
        _this.group.rotation.set(this.look.x, this.look.y, this.look.z);
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
