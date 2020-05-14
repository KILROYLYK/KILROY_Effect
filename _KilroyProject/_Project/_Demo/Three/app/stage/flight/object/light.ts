import Global from '../../../constant/global';
import _Object from '../../../interface/object';

/**
 * 灯光
 */
export default class Light implements _Object {
    private color: THREE.Color = null;  // 颜色
    
    public instance: THREE.PointLight = null; // 实例
    
    /**
     * 构造函数
     * @constructor Light
     */
    constructor() {
        const _this = this;
        
        _this.create();
        _this.init();
    }
    
    /**
     * 创建
     * @return {void}
     */
    protected create(): void {
        const _this = this;
        
        if (_this.instance) return;
        
        _this.color = new Global.THREE.Color();
        
        _this.instance = new Global.THREE.PointLight('#ffffff', 4, 1000);
    }
    
    /**
     * 初始化
     * @return {void}
     */
    protected init(): void {
        const _this = this;
        
        if (_this.instance) return;
        
        _this.color.setHSL(0.038, 0.8, 0.5);
        
        _this.instance.position.set(0, 200, -500);
        _this.instance.castShadow = false;
        _this.instance.color = _this.color;
    }
    
    /**
     * 更新
     * @param {boolean} isResize 是否调整大小
     * @return {void}
     */
    public update(isResize: boolean = false): void {
        const _this = this;
        
        if (!_this.instance) return;
        
        if (isResize) { // 屏幕变化
        }
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
