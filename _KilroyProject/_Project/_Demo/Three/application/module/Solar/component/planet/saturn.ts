import Global from '../../../../constant/global';
import Component from '../../../../interface/component';

import * as THREE from 'three';

/**
 * 土星
 */
export default class Saturn implements Component {
    private readonly name: string = 'Saturn-土星';
    
    private scene: THREE.Scene = null; // 场景
    private texture: object = {  // 纹理
        saturn: null as THREE.Texture,
        ring: null as THREE.Texture
    };
    
    private readonly trackR: number = 7000; // 轨迹半径
    private track: THREE.Mesh = null; // 轨道
    private planet: THREE.Mesh = null; // 星球
    private ring: THREE.Mesh = null; // 星环
    
    public group: THREE.Object3D = null; // 组
    public instance: THREE.Object3D = null; // 实例
    
    /**
     * 构造函数
     * @constructor Saturn
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
        // _this.instance.rotation.set(0, 2 * Math.PI / 8 * 5, 0);
        
        _this.createTrack();
        _this.createPlanet();
        _this.createRing();
    }
    
    /**
     * 初始化
     * @return {void}
     */
    private init(): void {
        const _this = this;
        
        // _this.group.add(_this.planet);
        _this.group.add(_this.ring);
        
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
        _this.ring = null;
        
        _this.group = null;
        _this.instance = null;
    }
    
    /**
     * 更新
     * @return {void}
     */
    public update(): void {
        const _this = this,
            cycleS = 0.003; // 周期速度
        
        if (!_this.instance) return;
        
        // _this.planet.rotateY(cycleS);
        // _this.ring.rotateZ(-cycleS);
        //
        // _this.instance.rotateY(-cycleS / 10);
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
        const _this = this,
            texture = _this.texture.saturn;
        
        texture.anisotropy = 4;
        texture.encoding = THREE.sRGBEncoding;
        
        const geometry = new THREE.SphereBufferGeometry(
            300, 64, 64
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
     * 创建星环
     * @return {void}
     */
    private createRing(): void {
        const _this = this,
            texture = _this.texture.ring;
        
        texture.anisotropy = 4;
        texture.encoding = THREE.sRGBEncoding;
        
        // const geometry = new THREE.RingGeometry(
        //     400, 550, 64
        // );
        //
        // const material = new THREE.MeshBasicMaterial({
        //     map: texture,
        //     opacity: 0,
        //     roughness: 1,
        //     side: THREE.DoubleSide
        // });
    
        _this.ring = new THREE.Mesh(
            new THREE.RingGeometry(
                0, 800, 50,
                5, 0, Math.PI * 2
            ),
            new THREE.MeshBasicMaterial({
                map: texture
            })
        );
        
        // _this.ring = new THREE.Mesh(geometry, material);
        _this.ring.position.set(0, 0, 0);
        _this.ring.rotation.set(-Math.PI / 2, 0, 0);
        _this.ring.castShadow = true;
        _this.ring.receiveShadow = true;
    }
}
