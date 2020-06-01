import Global from '../../../../constant/global';
import Component from '../../../../interface/component';

import * as THREE from 'three';

/**
 * 地球
 */
export default class Earth implements Component {
    private readonly name: string = 'Earth-地球';
    
    private scene: THREE.Scene = null; // 场景
    private texture: object = {  // 纹理
        earth: null as THREE.Texture,
        sky: null as THREE.Texture
    };
    
    private readonly radius: number = 26.1; // 半径
    private readonly trackR: number = 500 + 200 * 2.58; // 轨迹半径
    private track: THREE.Mesh = null; // 轨道
    private planet: THREE.Mesh = null; // 星球
    private sky: THREE.Mesh = null; // 天空
    
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
        _this.instance.rotation.set(0, 2 * Math.PI / 8 * 2, 0);
        
        _this.createTrack();
        _this.createPlanet();
        _this.createSky();
    }
    
    /**
     * 初始化
     * @return {void}
     */
    private init(): void {
        const _this = this;
        
        _this.group.add(_this.planet);
        _this.group.add(_this.sky);
        
        _this.instance.add(_this.track);
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
        
        _this.track = null;
        _this.planet = null;
        _this.sky = null;
        
        _this.group = null;
        _this.instance = null;
    }
    
    /**
     * 更新
     * @return {void}
     */
    public update(): void {
        const _this = this,
            cycleS = 0.006; // 周期速度
        
        if (!_this.instance) return;
        
        _this.planet.rotateY(cycleS);
        _this.sky.rotateX(cycleS);
        _this.sky.rotateY(cycleS);
        
        _this.instance.rotateY(-cycleS / 10);
    }
    
    /**
     * 创建轨道
     * @return {void}
     */
    private createTrack(): void {
        const _this = this;
        
        const geometry = new THREE.RingGeometry(
            _this.trackR - 2, _this.trackR, 64
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
        const _this = this,
            texture = _this.texture.earth;
        
        texture.anisotropy = 4;
        texture.encoding = THREE.sRGBEncoding;
        
        const geometry = new THREE.SphereBufferGeometry(
            _this.radius, 32, 32
        );
        
        const material = new THREE.MeshStandardMaterial({
            map: texture,
            roughness: 1
        });
        
        _this.planet = new THREE.Mesh(geometry, material);
        _this.planet.position.set(0, 0, 0);
        _this.planet.castShadow = true;
        _this.planet.receiveShadow = true;
    }
    
    /**
     * 创建天空
     * @return {void}
     */
    private createSky(): void {
        const _this = this,
            texture = _this.texture.sky;
        
        texture.anisotropy = 4;
        texture.encoding = THREE.sRGBEncoding;
        
        const geometry = new THREE.SphereBufferGeometry(
            _this.radius + 5, 32, 32
        );
        
        const material = new THREE.MeshStandardMaterial({
            alphaMap: texture,
            transparent: true
        });
        
        _this.sky = new THREE.Mesh(geometry, material);
        _this.sky.position.set(0, 0, 0);
    }
}
