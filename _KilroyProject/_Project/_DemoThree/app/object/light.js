/**
 * Three
 */
const THREE = require('three');

/**
 * 灯光
 */
class Light {
    /**
     * 原型对象
     * @constructor Light
     */
    constructor() {
        const _this = this;
        
        _this.config = {
            color: '#ffffff',
            opacity: 0.3,
            x: 1,
            y: 1,
            z: 1
        };
        
        _this.init();
    }
    
    /**
     * 初始化
     * @return {object} 场景对象
     */
    init() {
        const _this = this;
    }
    
    /**
     * 自然光
     * @param {object} config 配置
     * @return {object} 光对象
     */
    ambient(config = {}) {
        const _this = this,
            color = config.color || _this.config.color,
            opacity = config.opacity || _this.config.opacity;
        
        return new THREE.AmbientLight(color, opacity);
    }
    
    /**
     * 角度自然光
     * @param {object} config 配置
     * @return {object} 光对象
     */
    directiona(config = {}) {
        const _this = this,
            color = config.color || _this.config.color,
            opacity = config.opacity || _this.config.opacity,
            x = config.x || _this.config.x,
            y = config.y || _this.config.y,
            z = config.z || _this.config.z,
            light = new THREE.DirectionalLight(color, opacity);
        
        light.position.set(x, y, z);
        
        return light;
    }
}

export default new Light();
