import Global from '../../../constant/global';
import _Object from '../../../interface/object';

/**
 * 灯光-自然光
 */
export default class Light implements _Object {
    public instance: THREE.AmbientLight = null; // 实例
    
    /**
     * 构造函数
     * @constructor Light
     */
    protected constructor() {
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
        
        _this.instance = new Global.THREE.AmbientLight('#ffffff', 1);
    }
    
    /**
     * 初始化
     * @return {void}
     */
    protected init(): void {
        const _this = this;
        
        if (_this.instance) return;
        
        _this.instance.castShadow = true;
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
