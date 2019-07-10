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
            width: dom.clientWidth,
            height: dom.clientHeight
        };
        
        return _this.init();
    }
    
    /**
     * 初始化
     * @return {object} 场景对象
     */
    init() {
        const _this = this,
            renderer = new THREE.WebGLRenderer();
        
        renderer.setSize(
            _this.config.width,
            _this.config.height
        );
        
        _this.dom.appendChild(renderer.domElement);
        
        return renderer;
    }
}

export default Renderer;
