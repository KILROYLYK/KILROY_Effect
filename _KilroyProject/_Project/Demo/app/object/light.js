/**
 * Three
 */
import * as THREE from '../../../$Three/build/three.module.js';

/**
 * 灯光
 */
class Light {
    /**
     * Light原型对象
     * @constructor Light
     */
    constructor() {
        const _this = this;
        
        _this.config = {};
        
        _this.init();
    }
    
    /**
     * 初始化
     * @return {object} 场景对象
     */
    init() {
        const _this = this;
        
        _this.createLight0();
    }
    
    /**
     * 创建灯光0
     * @return {void}
     */
    createLight0() {
        const _this = this;
        
        _this[0] = new THREE.AmbientLight('#ffffff', 1);
    }
}

export default new Light();
