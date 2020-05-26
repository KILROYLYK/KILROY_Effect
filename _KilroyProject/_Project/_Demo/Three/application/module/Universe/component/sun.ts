import Global from '../../../constant/global';
import Component from '../../../interface/component';

import * as THREE from 'three';

/**
 * 太阳
 */
export default class Sun implements Component {
    private readonly name: string = 'Sun-太阳';
    
    private scene: THREE.Scene = null; // 场景
    private texture: THREE.Texture = null; // 纹理
    
    private light: THREE.PointLight = null; // 点光源
    private sphere: THREE.Mesh = null; // 球体
    
    public instance: THREE.Object3D = null; // 实例
    
    /**
     * 构造函数
     * @constructor Sun
     * @param {object} scene 场景
     * @param {THREE.Texture} texture 纹理
     */
    constructor(scene: object, texture: THREE.Texture) {
        const _this = this;
        
        _this.scene = scene.instance;
        _this.texture = texture;
        
        _this.create();
        _this.init();
    }
    
    /**
     * 创建
     * @return {void}
     */
    private create(): void {
        const _this = this;
        
        _this.instance = new THREE.Object3D();
        _this.instance.name = _this.name;
        _this.instance.position.set(0, 0, 0);
        
        _this.createLight();
        _this.createSphere();
    }
    
    /**
     * 初始化
     * @return {void}
     */
    private init(): void {
        const _this = this;
        
        _this.instance.add(_this.light);
        _this.instance.add(_this.sphere);
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
        const _this = this,
            cycleS = 0.001; // 周期速度
        
        if (!_this.instance) return;
        
        _this.sphere.rotateY(cycleS);
    }
    
    /**
     * 创建光源
     * @return {void}
     */
    private createLight(): void {
        const _this = this;
        
        _this.light = new THREE.PointLight('#ffffff', 10);
        _this.light.position.set(0, 0, 0);
        
        _this.light.castShadow = true;
    }
    
    /**
     * 创建球体
     * @return {void}
     */
    private createSphere(): void {
        const _this = this;
        
        _this.texture.anisotropy = 4;
        _this.texture.encoding = THREE.sRGBEncoding;
        
        const geometry = new THREE.SphereBufferGeometry(
            800, 64, 64
        );
        
        const material = new THREE.MeshStandardMaterial({
            emissive: '#ffffff',
            emissiveMap: _this.texture,
            emissiveIntensity: 5
        });
        
        _this.sphere = new THREE.Mesh(geometry, material);
        _this.sphere.position.set(0, 0, 0);
        _this.sphere.castShadow = true;
        _this.sphere.receiveShadow = false;
    }
}
