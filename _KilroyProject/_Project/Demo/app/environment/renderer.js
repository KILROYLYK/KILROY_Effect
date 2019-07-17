/**
 * Public
 */
import { Base } from '../../../_Base/js/window';

/**
 * Three
 */
const THREE = require('three');
import { CSS3DRenderer } from '../../../$Three/examples/jsm/renderers/CSS3DRenderer';

/**
 * 渲染器
 */
class Renderer {
    /**
     * 原型对象
     * @constructor Renderer
     * @param {object} dom 父级Dom
     * @param {object} config 配置
     */
    constructor(dom, config = {}) {
        const _this = this;
        
        _this.dom = dom;
        
        _this.config = {
            type: config.type || 'WebGL',
            width: _this.dom.clientWidth,
            height: _this.dom.clientHeight
        };
        
        _this.object = null;
        
        return _this.init();
    }
    
    /**
     * 初始化
     * @return {object} 场景对象
     */
    init() {
        const _this = this,
            renderer = _this.getRendererType();
        
        _this.object = new renderer({
            antialias: true
        });
        _this.object.setSize(
            _this.config.width,
            _this.config.height
        );
        _this.dom.appendChild(_this.object.domElement);
        _this.resizeUpdate();
        
        return _this.object;
    }
    
    /**
     * 获取Renderer类型
     * @return {object} Renderer对象
     */
    getRendererType() {
        const _this = this;
        
        if (_this.config.type === 'WebGL') {
            return THREE.WebGLRenderer;
        } else if (_this.config.type === 'CSS3D') {
            return CSS3DRenderer;
        } else {
            return THREE.WebGLRenderer;
        }
    }
    
    /**
     * Resize自动更新
     * @return {void}
     */
    resizeUpdate() {
        const _this = this;
        
        Base.resizeWindow(() => {
            _this.object.setSize(
                _this.dom.clientWidth,
                _this.dom.clientHeight
            );
        });
    }
}

export default Renderer;
