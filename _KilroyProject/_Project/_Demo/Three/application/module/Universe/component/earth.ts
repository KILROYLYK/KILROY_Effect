import Global from '../../../constant/global';
import Component from '../../../interface/component';

import * as THREE from 'three';

import Moon from './satellite/moon';

/**
 * 地球
 */
export default class Earth implements Component {
    private readonly name: string = 'Earth-地球';
    
    private scene: THREE.Scene = null; // 场景
    private texture: object = null; // 纹理
    
    private readonly trackR: number = 2000; // 轨迹半径
    private readonly satellite: object = { // 卫星
        moon: null as Moon
    };
    private ring: THREE.Mesh = null; // 圆环
    private sphere: THREE.Mesh = null; // 球体
    
    public group: THREE.Object3D = null; // 组
    public instance: THREE.Object3D = null; // 实例
    
    /**
     * 构造函数
     * @constructor Earth
     * @param {object} scene 场景
     * @param {object} texture 纹理
     */
    constructor(scene: object, texture: object) {
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
        
        _this.group = new THREE.Object3D();
        _this.group.position.set(0, 0, _this.trackR);
        
        _this.instance = new THREE.Object3D();
        _this.instance.name = _this.name;
        _this.instance.position.set(0, 0, 0);
        
        _this.createRing();
        _this.createSphere();
        
        _this.satellite.moon = new Moon(_this.group, _this.texture.moon);
    }
    
    /**
     * 初始化
     * @return {void}
     */
    private init(): void {
        const _this = this;
        
        _this.group.add(_this.sphere);
        
        _this.instance.add(_this.ring);
        _this.instance.add(_this.group);
        _this.scene.add(_this.instance);
    }
    
    /**
     * 销毁
     * @return {void}
     */
    public destroy(): void {
        const _this = this;
        
        if (!_this.instance) return;
        
        _this.satellite.moon.destroy();
        _this.instance = null;
    }
    
    /**
     * 更新
     * @return {void}
     */
    public update(): void {
        const _this = this,
            cycleS = 0.01; // 周期速度
        
        if (!_this.instance) return;
        
        _this.satellite.moon.update();
        
        _this.sphere.rotateY(cycleS);
        _this.instance.rotateY(-cycleS / 10);
    }
    
    /**
     * 创建圆环
     * @return {void}
     */
    private createRing(): void {
        const _this = this;
        
        const geometry = new THREE.RingGeometry(
            _this.trackR - 1, _this.trackR, 128
        );
        
        const material = new THREE.MeshBasicMaterial({
            color: '#ffffff',
            side: THREE.DoubleSide
        });
        
        _this.ring = new THREE.Mesh(geometry, material);
        _this.ring.rotation.set(Math.PI / 2, 0, 0);
    }
    
    /**
     * 创建球体
     * @return {void}
     */
    private createSphere(): void {
        const _this = this,
            texture = _this.texture.earth;
        
        texture.anisotropy = 4;
        texture.encoding = THREE.sRGBEncoding;
        
        const mat = new THREE.MeshStandardMaterial({
            color: 0xffffff,
            roughness: 0.5,
            map: texture,
            needsUpdate: true
        });
        
        const geometry = new THREE.SphereBufferGeometry(
            50, 64, 64
        );
        
        _this.sphere = new THREE.Mesh(geometry, mat);
        _this.sphere.position.set(0, 0, 0);
    }
}
