import * as THREE from 'three';
import { CSS3DRenderer } from 'three/examples/jsm/renderers/CSS3DRenderer';
import _Environment from './_Environment';

/**
 * 渲染器
 */
export default class Renderer extends _Environment {
    /**
     * 构造函数
     * @constructor Renderer
     * @param {object} dom 动画Dom
     * @param {object} config 配置
     */
    constructor(dom, config?: object) {
        super();
        
        const _this = this;
        
        _this.config = {
            dom: dom, // 动画Dom
            type: config.type || 'WebGL',
            width: dom.clientWidth,
            height: dom.clientHeight
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
        
        _this.instance = new Renderer({
            antialias: true
        });
        _this.config.dom.appendChild(_this.instance.domElement);
        
    }
    
    /**
     * 初始化
     * @return {void}
     */
    public init(): void {
        const _this = this;
        
        _this.instance.setSize(
            _this.config.width,
            _this.config.height
        );
    }
    
    /**
     * 更新
     * @return {void}
     */
    public update(): void {
        const _this = this;
        _this.instance.update();
    }
    
    /**
     * 调整更新
     * @return {void}
     */
    public resizeUpdate(): void {
        const _this = this;
        _this.instance.setSize(
            _this.config.dom.clientWidth,
            _this.config.dom.clientHeight
        );
    }
    
    /**
     * 获取Renderer类型
     * @return {function} Renderer对象
     */
    private getRendererType(): Function {
        const _this = this;
        
        if (_this.config.type === 'WebGL') {
            return THREE.WebGLRenderer;
        } else if (_this.config.type === 'CSS3D') {
            return CSS3DRenderer;
        } else {
            return THREE.WebGLRenderer;
        }
    }
}
