import Global from '../../../constant/global';
import Component from '../../../interface/component';

import * as THREE from 'three';

/**
 * 月球
 */
export default class Moon implements Component {
    private readonly name: string = 'Moon-月球';
    
    private scene: THREE.Scene = null; // 场景
    private texture: THREE.Texture = null; // 纹理
    
    private ring: object = null; // 圆环
    private sphere: THREE.Mesh = null; // 球体
    
    public instance: THREE.Object3D = null; // 实例
    
    /**
     * 构造函数
     * @constructor Moon
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
        
        _this.texture.anisotropy = 4;
        _this.texture.encoding = THREE.sRGBEncoding;
        
        _this.instance = new THREE.Object3D();
        _this.instance.name = _this.name;
        _this.instance.position.set(0, 0, 0);
        
        _this.createSphere();
    }
    
    /**
     * 初始化
     * @return {void}
     */
    private init(): void {
        const _this = this;
        
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
            cycleS = 0.0008; // 周期速度
        
        if (!_this.instance) return;
        
        _this.sphere.rotateY(cycleS);
        _this.instance.rotateY(-cycleS);
    }
    
    /**
     * 创建圆环
     * @return {void}
     */
    private createRing(): void {
        const _this = this;
    }
    
    /**
     * 创建球体
     * @return {void}
     */
    private createSphere(): void {
        const _this = this;
        
        const ballMat = new THREE.MeshStandardMaterial({
            color: 0xffffff,
            roughness: 0.5,
            map: _this.texture,
            needsUpdate: true
        });
        
        const ballGeometry = new THREE.SphereBufferGeometry(
            100, 32, 32
        );
        
        _this.sphere = new THREE.Mesh(ballGeometry, ballMat);
        _this.sphere.position.set(0, 0, 1000);
    }
}
