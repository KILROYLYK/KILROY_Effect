import Global from '../../../constant/global';
import Component from '../../../interface/component';

import * as THREE from 'three';

/**
 * 光源
 */
export default class Light implements Component {
    private readonly name: string = 'Light-光源';
    
    private scene: THREE.Scene = null; // 场景
    
    private lightAmbient: THREE.AmbientLight = null; // 环境光源
    private lightDirectional: THREE.DirectionalLight = null; // 定向光源
    
    public instance: THREE.Group = null; // 实例
    
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
        
        _this.instance = new THREE.Group();
        _this.instance.name = _this.name;
        _this.instance.position.set(0, 0, 0);
        
        _this.createLight();
    }
    
    /**
     * 初始化
     * @return {void}
     */
    private init(): void {
        const _this = this;
        
        _this.instance.add(_this.lightAmbient);
        _this.instance.add(_this.lightDirectional);
        _this.scene.add(_this.instance);
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
    
    /**
     * 更新
     * @return {void}
     */
    public update(): void {
        const _this = this;
        
        if (!_this.instance) return;
    }
    
    /**
     * 创建光源
     * @return {void}
     */
    private createLight(): void {
        const _this = this,
            color = '#ffffff',
            distance = 500;
        
        _this.lightAmbient = new THREE.AmbientLight(color, 0.5);
        
        _this.lightDirectional = new THREE.DirectionalLight(color, 1);
        _this.lightDirectional.position.set(0, 2, 1);
        _this.lightDirectional.position.multiplyScalar(30);
        _this.lightDirectional.castShadow = true;
        _this.lightDirectional.shadow.camera.top = distance;
        _this.lightDirectional.shadow.camera.left = -distance;
        _this.lightDirectional.shadow.camera.right = distance;
        _this.lightDirectional.shadow.camera.bottom = -distance;
        _this.lightDirectional.shadow.camera.far = 2000;
        _this.lightDirectional.shadow.bias = -0.0001;
    }
}
