/**
 * Public
 */
import { Base } from '../../../_Base/js/window';

/**
 * Three
 */
const THREE = require('three');

/**
 * 渲染器
 */
class Renderer {
    /**
     * Renderer原型对象
     * @constructor Renderer
     * @param {object} dom 父级Dom
     */
    constructor(dom) {
        const _this = this;
        
        _this.dom = dom;
        
        _this.config = {
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
        const _this = this;
        
        _this.object = new THREE.WebGLRenderer();
        
        _this.object.setSize(
            _this.config.width,
            _this.config.height
        );
    
        _this.resizeUpdate();
        
        _this.dom.appendChild(_this.object.domElement);
        
        return _this.object;
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
