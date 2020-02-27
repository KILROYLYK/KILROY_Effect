import Global from '../../constant/Global';
import _Environment from './_Environment';
import { CSS3DRenderer } from 'three/examples/jsm/renderers/CSS3DRenderer';

/**
 * 渲染器
 */
export default class RendererMain extends _Environment {
    /**
     * 构造函数
     * @constructor RendererMain
     */
    protected constructor() {
        super();
        
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
    private create(): void {
        const _this = this,
            Renderer = _this.getRendererType();
        
        super.create();
        
        _this.instance = new Renderer({
            antialias: true
        });
        
        console.log(_this.instance);
        
        _this.config.dom.appendChild(_this.instance.domElement); // 添加渲染器
    }
    
    /**
     * 初始化
     * @return {void}
     */
    public init(): void {
        const _this = this;
        
        super.init();
        
        _this.instance.setSize(
            _this.config.width,
            _this.config.height
        );
    }
    
    /**
     * 更新
     * @param {boolean} isResize 是否调整大小
     * @return {void}
     */
    public update(isResize: boolean = false): void {
        const _this = this;
        
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
