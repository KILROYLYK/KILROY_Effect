/**
 * Three
 */
const THREE = require('three');

/**
 * 场景
 */
class Scene {
    /**
     * 原型对象
     * @constructor Scene
     */
    constructor() {
        const _this = this,
            color = '#cccccc';
        
        _this.config = {
            background: new THREE.Color(color),
            fog: new THREE.FogExp2(color, 0.003)
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
        
        _this.object = new THREE.Scene();
        _this.object.background = _this.config.background;
        _this.object.fog = _this.config.fog;
        
        return _this.object;
    }
}

export default Scene;
