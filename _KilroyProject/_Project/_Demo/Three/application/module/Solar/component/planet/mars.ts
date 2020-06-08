import Global from '../../../../constant/global';
import Component from '../../../../interface/component';
import Stage from '../../stage';

import * as THREE from 'three';

/**
 * 火星
 */
export default class Mars implements Component {
    private readonly name: string = 'Mars-火星';
    
    private scene: THREE.Scene = null; // 场景
    private texture: THREE.Texture = null; // 纹理
    
    private readonly radius: number = Stage.radiusM * 13.9; // 半径
    private readonly trackR: number = Stage.trackIR + Stage.trackM * 3.93; // 轨迹半径
    private cycle: number = 0; // 周期
    private track: THREE.Mesh = null; // 轨道
    private planet: THREE.Mesh = null; // 星球
    
    public instance: THREE.Group = null; // 实例
    
    /**
     * 构造函数
     * @constructor Mars
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
        
        _this.instance = new THREE.Group();
        _this.instance.name = _this.name;
        _this.instance.position.set(0, 0, 0);
        _this.instance.rotation.set(0, 2 * Math.PI / 8 * 3, 0);
        
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
            cycleS = 0.005; // 周期速度
        
        if (!_this.instance) return;
    
        _this.cycle += cycleS / 10;
    
        _this.planet.position.x = Math.cos(_this.cycle) * _this.trackR;
        _this.planet.position.z = Math.sin(_this.cycle) * _this.trackR;
        _this.planet.rotateY(cycleS);
    }
    
    /**
     * 创建轨道
     * @return {void}
     */
    private createTrack(): void {
        const _this = this;
        
        const geometry = new THREE.RingGeometry(
            _this.trackR - 1, _this.trackR, 128
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
            _this.radius, 32, 32
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
