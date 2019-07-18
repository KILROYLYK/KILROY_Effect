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
     * @param {object} config 配置
     */
    constructor(config = {}) {
        const _this = this,
            color = config.color || '#000000';
        
        _this.config = {
            background: new THREE.Color(color),
            fog: new THREE.FogExp2(
                color,
                config.opacity || 0
            )
        };
        
        _this.object = null;
        
        _this.init();
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
    }
    
    /**
     * 更新
     * @return {void}
     */
    update() {
        const _this = this;
    }
    
    /**
     * 调整更新
     * @return {void}
     */
    resizeUpdate() {
        const _this = this;
    }
}

export default Scene;
