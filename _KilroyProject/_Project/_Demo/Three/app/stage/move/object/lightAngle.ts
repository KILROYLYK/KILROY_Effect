import Global from '../../../constant/global';
import _Object from '../../../interface/object';

/**
 * 灯光-角度光
 */
export default class Light implements _Object {
    private scene: THREE.Scene = null; // 场景
    
    public instance: THREE.DirectionalLight = null; // 实例
    
    /**
     * 构造函数
     * @constructor Light
     * @param {object} scene 场景
     */
    protected constructor(scene: object) {
        const _this = this;
        
        _this.scene = scene.instance;
        
        _this.create();
        _this.init();
    }
    
    /**
     * 创建
     * @return {void}
     */
    protected create(): void {
        const _this = this;
        
        _this.instance = new Global.THREE.DirectionalLight('#ffffff', 1);
    }
    
    /**
     * 初始化
     * @return {void}
     */
    protected init(): void {
        const _this = this;
        
        _this.instance.position.set(1, 1, 1);
        _this.instance.position.multiplyScalar(1.3); // 标量相乘
        
        // 阴影
        _this.instance.castShadow = true;
        _this.instance.shadow.mapSize.width = 1024;
        _this.instance.shadow.mapSize.height = 1024;
        _this.instance.shadow.camera.far = 1000;
        _this.instance.shadow.camera.top = _this.instance.shadow.camera.right = 300;
        _this.instance.shadow.camera.bottom = _this.instance.shadow.camera.left = -300;
    
        _this.scene.add(_this.instance);
    }
    
    /**
     * 销毁
     * @return {void}
     */
    public destroy(): void {
        const _this = this;
        
        if (!_this.instance) return;
        
        _this.instance = null;
    }
}
