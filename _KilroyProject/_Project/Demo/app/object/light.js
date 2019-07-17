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
        
        _this.config = {
            color: [
                '#ffffff',
                '#002288'
            ]
        };
        
        _this.object = {};
        
        _this.init();
    }
    
    /**
     * 初始化
     * @return {object} 场景对象
     */
    init() {
        const _this = this;
        
        _this.createLightAmbient();
        _this.createLight1();
        _this.createLight2();
    }
    
    /**
     * 创建自然光
     * @return {void}
     */
    createLightAmbient() {
        const _this = this;
        
        _this.object.ambient = new THREE.AmbientLight(_this.config.color[0], 0.5);
    }
    
    /**
     * 创建光1
     * @return {void}
     */
    createLight1() {
        const _this = this;
        
        _this.object.light1 = new THREE.DirectionalLight(_this.config.color[0]);
        _this.object.light1.position.set(1, 1, 1);
    }
    
    /**
     * 创建光2
     * @return {void}
     */
    createLight2() {
        const _this = this;
        
        _this.object.light2 = new THREE.DirectionalLight(_this.config.color[1]);
        _this.object.light2.position.set(-1, -1, -1);
    }
}

export default new Light();
