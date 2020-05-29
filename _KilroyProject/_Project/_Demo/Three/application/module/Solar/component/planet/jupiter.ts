import Global from '../../../../constant/global';
import Component from '../../../../interface/component';

import * as THREE from 'three';

/**
 * 木星
 */
export default class Jupiter implements Component {
    private readonly name: string = 'Jupiter-木星';
    
    private scene: THREE.Scene = null; // 场景
    private texture: THREE.Texture = null; // 纹理
    
    private readonly trackR: number = 5500; // 轨迹半径
    private track: THREE.Mesh = null; // 轨道
    private planet: THREE.Mesh = null; // 星球
    
    public instance: THREE.Object3D = null; // 实例
    
    /**
     * 构造函数
     * @constructor Jupiter
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
        _this.instance.rotation.set(0, 2 * Math.PI / 8 * 4, 0);
    
        _this.createTrack();
        _this.createPlanet();
    }
    
    /**
     * 初始化
     * @return {void}
     */
    private init(): void {
        const _this = this;
    
        _this.instance.add(_this.track);
        _this.instance.add(_this.planet);
        _this.scene.add(_this.instance);
    }
    
    /**
     * 销毁
     * @return {void}
     */
    public destroy(): void {
        const _this = this;
        
        if (!_this.instance) return;
    
        _this.track = null;
        _this.planet = null;
        
        _this.instance = null;
    }
    
    /**
     * 更新
     * @return {void}
     */
    public update(): void {
        const _this = this,
            cycleS = 0.004; // 周期速度
        
        if (!_this.instance) return;
    
        _this.planet.rotateY(cycleS);
        
        _this.instance.rotateY(-cycleS / 10);
    }
    
    /**
     * 创建轨道
     * @return {void}
     */
    private createTrack(): void {
        const _this = this;
        
        const geometry = new THREE.RingGeometry(
            _this.trackR - 2, _this.trackR, 128
        );
        
        const material = new THREE.MeshBasicMaterial({
            color: '#ffffff',
            side: THREE.DoubleSide
        });
    
        _this.track = new THREE.Mesh(geometry, material);
        _this.track.rotation.set(Math.PI / 2, 0, 0);
    }
    
    /**
     * 创建星球
     * @return {void}
     */
    private createPlanet(): void {
        const _this = this;
        
        _this.texture.anisotropy = 4;
        _this.texture.encoding = THREE.sRGBEncoding;
        
        const geometry = new THREE.SphereBufferGeometry(
            350, 64, 64
        );
        
        const material = new THREE.MeshStandardMaterial({
            map: _this.texture,
            roughness: 1
        });
    
        _this.planet = new THREE.Mesh(geometry, material);
        _this.planet.position.set(0, 0, _this.trackR);
        _this.planet.castShadow = true;
        _this.planet.receiveShadow = true;
    }
}
