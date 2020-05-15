import Global from '../../../constant/global';
import _Object from '../../../interface/object';

/**
 * 灯光
 */
export default class Light implements _Object {
    private scene: THREE.Scene = null; // 场景
    
    private color: THREE.Color = null;  // 颜色
    private hue: number = 0.038;
    
    public instance: THREE.PointLight = null; // 实例
    
    /**
     * 构造函数
     * @constructor Light
     * @param {object} scene 场景
     */
    constructor(scene: object) {
        const _this = this;
        
        _this.scene = scene.instance;
        
        _this.create();
        _this.init();
    }
    
    /**
     * 创建
     * @return {void}
     */
    private create(): void {
        const _this = this;
        
        _this.color = new Global.THREE.Color();
        
        _this.instance = new Global.THREE.PointLight('#ffffff', 4, 1000);
    }
    
    /**
     * 初始化
     * @return {void}
     */
    private init(): void {
        const _this = this;
        
        _this.color.setHSL(_this.hue, 0.8, 0.5);
        
        _this.instance.position.set(0, 200, -500);
        _this.instance.color = _this.color;
        _this.instance.castShadow = false;
        
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
    
    /**
     * 更新
     * @return {void}
     */
    public update(): void {
        const _this = this;
        
        if (!_this.instance) return;
        
        _this.hue += 0.001;
        _this.hue >= 1 && (_this.hue = 0);
        _this.color.setHSL(_this.hue, 0.8, 0.5);
    }
}
