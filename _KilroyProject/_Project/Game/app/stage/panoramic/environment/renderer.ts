import Global from '../../../constant/global';
import _Environment from '../../../interface/environment';
import { CSS3DRenderer } from 'three/examples/jsm/renderers/CSS3DRenderer';

/**
 * 渲染器
 */
export default class Renderer implements _Environment {
    public readonly config: object = { // 配置
        type: Global.Config.RendererType,
        dom: Global.GameDom,
        width: Global.Width,
        height: Global.Height
    };
    public instance: object = null; // 实例
    
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
     * @return {any} 实例
     */
    private create(): void {
        const _this = this,
            Renderer = _this.getRendererType();
        
        if (_this.instance) return;
        
        _this.instance = new Renderer({
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
        
        _this.instance.setSize(
            _this.config.width,
            _this.config.height
        );
        
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
            _this.config.width = Global.Width;
            _this.config.height = Global.Height;
            
            _this.instance.setSize(
                _this.config.width,
                _this.config.height
            );
        }
    }
    
    /**
     * 销毁
     * @return {void}
     */
    public destroy(): void {
        const _this = this;
        
        if (!_this.instance) return;
        _this.instance.destroy(true);
        _this.instance = null;
    }
    
    /**
     * 获取Renderer类型
     * @return {function} Renderer对象
     */
    private getRendererType(): any {
        const _this = this;
        
        if (_this.config.type === 'WebGL') {
            return Global.THREE.WebGLRenderer;
        } else if (_this.config.type === 'CSS3D') {
            return CSS3DRenderer;
        } else {
            return Global.THREE.WebGLRenderer;
        }
    }
}
