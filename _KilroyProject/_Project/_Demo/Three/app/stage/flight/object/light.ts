import Global from '../../../constant/global';
import _Object from '../../../interface/object';

import * as THREE from 'three';

/**
 * 灯光
 */
export default class Light implements _Object {
    private scene: THREE.Scene = null; // 场景
    
    private color: THREE.Color = null;  // 颜色
    
    public instance: THREE.PointLight = null; // 实例
    
    /**
     * 构造函数
     * @constructor Light
     * @param {object} scene 场景
     */
    constructor(scene: object) {
        const _this = this;
        
        _this.scene = scene.instance;
        
        _this.create();
        _this.init();
    }
    
    /**
     * 创建
     * @return {void}
     */
    private create(): void {
        const _this = this;
        
        _this.color = new THREE.Color();
        
        _this.instance = new THREE.PointLight('#ffffff', 4, 700);
    }
    
    /**
     * 初始化
     * @return {void}
     */
    private init(): void {
        const _this = this;
        
        _this.color.setHSL(0.038, 0.8, 0.5);
        
        _this.instance.color = _this.color;
        _this.instance.castShadow = false;
        _this.instance.position.set(0, 200, -500);
        
        _this.scene.add(_this.instance);
        
        // _this.hue += 0.001;
        // _this.hue >= 1 && (_this.hue = 0);
        // _this.color.setHSL(_this.hue, 0.8, 0.5);
    }
    
    /**
     * 销毁
     * @return {void}
     */
    public destroy(): void {
        const _this = this;
        
        if (!_this.instance) return;
        
        _this.instance = null;
    }
}
