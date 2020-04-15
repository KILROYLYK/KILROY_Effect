import Global from '../../../constant/global';
import _Environment from '../../../interface/environment';
import { CSS3DRenderer } from 'three/examples/jsm/renderers/CSS3DRenderer';

/**
 * 渲染器
 */
export default class Renderer implements _Environment {
    public config: any = {};
    public instance: any = null;
    
    protected isCreate: boolean = false;
    
    /**
     * 构造函数
     * @constructor Renderer
     */
    protected constructor() {
        const _this = this;
        
        _this.config = {
            dom: Global.GameDom,
            type: Global.Config.RendererType,
            width: Global.Width,
            height: Global.Height
        };
        
        _this.create();
        _this.init();
    }
    
    /**
     * 创建
     * @return {any} 实例
     */
    protected create(): void {
        const _this = this,
            Renderer = _this.getRendererType();
    
        if (_this.isCreate) return;
        _this.isCreate = true;
        
        _this.instance = new Renderer({
            antialias: true
        });
    }
    
    /**
     * 初始化
     * @return {void}
     */
    protected init(): void {
        const _this = this;
    
        if (!_this.isCreate) return;
        
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
    
        if (!_this.isCreate) return;
        
        if (isResize) {
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
        
        if (!_this.isCreate) return;
        _this.instance = null;
        _this.isCreate = false;
    }
    
    /**
     * 获取Renderer类型
     * @return {function} Renderer对象
     */
    protected getRendererType(): any {
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
