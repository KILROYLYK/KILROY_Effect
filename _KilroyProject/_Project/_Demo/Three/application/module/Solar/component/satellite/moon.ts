import Global from '../../../../constant/global';
import Component from '../../../../interface/component';

import * as THREE from 'three';

/**
 * 月球
 */
export default class Moon implements Component {
    private readonly name: string = 'Moon-月球';
    
    private group: THREE.Object3D = null; // 场景
    private texture: THREE.Texture = null; // 纹理
    
    private readonly radius: number = 7; // 半径
    private readonly trackR: number = 26.1 + 70; // 轨迹半径
    private track: THREE.Mesh = null; // 轨道
    private planet: THREE.Mesh = null; // 星球
    
    public instance: THREE.Object3D = null; // 实例
    
    /**
     * 构造函数
     * @constructor Moon
     * @param {THREE.Object3D} group 场景
     * @param {THREE.Texture} texture 纹理
     */
    constructor(group: THREE.Object3D, texture: THREE.Texture) {
        const _this = this;
        
        _this.group = group;
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
        _this.instance.rotation.set(-Math.PI / 5, 0, 0);
        
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
        _this.group.add(_this.instance);
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
            cycleS = 0.01; // 周期速度
        
        if (!_this.instance) return;
        
        _this.planet.rotateY(cycleS);
        
        _this.instance.rotateY(-cycleS);
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
            texture = _this.texture;
        
        texture.anisotropy = 4;
        texture.encoding = THREE.sRGBEncoding;
        
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
