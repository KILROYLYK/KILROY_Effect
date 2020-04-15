import Global from '../../../constant/global';
import _Environment from '../../../interface/environment';

/**
 * 场景
 */
export default class Scene implements _Environment {
    public readonly config: object = {
        color: 0x69ABFF,
        background: null,
        fog: null
    };
    public instance: object = null;
    
    /**
     * 构造函数
     * @constructor Scene
     */
    constructor() {
        const _this = this;
        
        _this.config.background = new Global.THREE.Color(_this.config.color);
        _this.config.fog = new Global.THREE.FogExp2(_this.config.color, 0.0007)
        
        _this.create();
        _this.init();
    }
    
    /**
     * 创建
     * @return {any} 实例
     */
    private create(): void {
        const _this = this;
    
        if (_this.instance) return;
        _this.instance = new Global.THREE.Scene();
    }
    
    /**
     * 初始化
     * @return {void}
     */
    private init(): void {
        const _this = this;
        
        if (!_this.instance) return;
        
        _this.instance.background = _this.config.background;
        _this.instance.fog = _this.config.fog;
    }
    
    /**
     * 更新
     * @param {boolean} isResize 是否调整大小
     * @return {void}
     */
    public update(isResize: boolean = false): void {
        const _this = this;
        
        if (isResize) {
        
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
