import Global from '../../../constant/global';
import _Environment from '../../../interface/environment';

/**
 * 渲染器
 */
export default class Renderer implements _Environment {
    public readonly config: object = { // 配置
    };
    public instance: THREE.WebGLRenderer = null; // 实例
    
    /**
     * 构造函数
     * @constructor Renderer
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
    private create(): void {
        const _this = this;
        
        if (_this.instance) return;
        
        _this.instance = new Global.THREE.WebGLRenderer({
            antialias: true
        });
    }
    
    /**
     * 初始化
     * @return {void}
     */
    private init(): void {
        const _this = this;
        
        if (_this.instance) return;
        
        _this.instance.setSize(Global.Width, Global.Height);
        _this.instance.outputEncoding = Global.THREE.sRGBEncoding;
        _this.instance.shadowMap.enabled = true;
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
            _this.instance.setSize(Global.Width, Global.Height);
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
