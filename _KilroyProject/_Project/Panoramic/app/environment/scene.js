/**
 * Three
 */
const THREE = require('three');

/**
 * 场景
 */
class Scene {
    /**
     * Scene原型对象
     * @constructor Scene
     */
    constructor() {
        const _this = this;
        
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
        
        return _this.object;
    }
}

export default Scene;
