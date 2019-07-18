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
    }
    
    /**
     * 初始化
     * @return {object} 场景对象
     */
    init() {
        const _this = this;
    }
    
    /**
     * 创建自然光
     * @param {object} config 配置
     * @return {object} 光对象
     */
    createLightAmbient(config = {}) {
        const _this = this,
            color = config.color || '#ffffff',
            opacity = config.opacity || 0.3;
        
        return new THREE.AmbientLight(color, opacity);
    }
    
    /**
     * 创建角度自然光
     * @param {object} config 配置
     * @return {object} 光对象
     */
    createLightDirectiona(config = {}) {
        const _this = this,
            color = config.color || '#ffffff',
            opacity = config.opacity || 0.3,
            x = config.x || 1,
            y = config.y || 1,
            z = config.z || 1,
            lightObj = new THREE.DirectionalLight(color, opacity);
        
        lightObj.position.set(x, y, z);
        
        return lightObj;
    }
}

export default new Light();
