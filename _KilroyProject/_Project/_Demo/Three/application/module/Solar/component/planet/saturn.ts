import Global from '../../../../constant/global';
import Component from '../../../../interface/component';
import Stage from '../../stage'

import * as THREE from 'three';

interface Texture { // 纹理
    saturn: THREE.Texture // 土星
    ring: THREE.Texture // 星环
}

/**
 * 土星
 */
export default class Saturn implements Component {
    private readonly name: string = 'Saturn-土星';
    
    private scene: THREE.Scene = null; // 场景
    private texture: Texture = null; // 纹理
    
    private readonly radius: number = Stage.radiusM * 247; // 半径
    private readonly trackR: number = Stage.trackIR + Stage.trackM * 24.68; // 轨迹半径
    private cycle: number = 0; // 周期
    private track: THREE.Mesh = null; // 轨道
    private planet: THREE.Mesh = null; // 星球
    private ring: THREE.Mesh = null; // 星环
    
    public group: THREE.Group = null; // 组
    public instance: THREE.Group = null; // 实例
    
    /**
     * 构造函数
     * @constructor Saturn
     * @param {object} scene 场景
     * @param {Texture} texture 纹理
     */
    constructor(scene: object, texture: Texture) {
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
        
        _this.group = new THREE.Group();
        _this.group.position.set(0, 0, _this.trackR);
        
        _this.instance = new THREE.Group();
        _this.instance.name = _this.name;
        _this.instance.position.set(0, 0, 0);
        _this.instance.rotation.set(0, 2 * Math.PI / 8 * 5, 0);
        
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
        
        _this.group.add(_this.planet);
        _this.group.add(_this.ring);
        
        _this.instance.add(_this.track);
        _this.instance.add(_this.group);
        _this.scene.add(_this.instance);
    }
    
    /**
     * 更新
     * @return {void}
     */
    public update(): void {
        const _this = this,
            cycleS = 0.003; // 周期速度
        
        if (!_this.instance) return;
        
        _this.cycle += cycleS / 10;
        
        _this.planet.rotateY(cycleS);
        
        _this.group.position.x = Math.cos(_this.cycle) * _this.trackR;
        _this.group.position.z = Math.sin(_this.cycle) * _this.trackR;
        _this.group.rotateY(-cycleS);
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
        const _this = this,
            texture = _this.texture.saturn;
        
        texture.anisotropy = 4;
        texture.encoding = THREE.sRGBEncoding;
        
        const geometry = new THREE.SphereBufferGeometry(
            _this.radius, 64, 64
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
            texture = _this.texture.ring,
            innerRadius = _this.radius + 50,
            outerRadius = _this.radius + 350,
            thetaSegments = 64,
            angle = Math.PI * 2;
        
        texture.anisotropy = 4;
        texture.encoding = THREE.sRGBEncoding;
        
        const geometry = new THREE.RingGeometry(
            innerRadius, outerRadius, thetaSegments
        );
        geometry.vertices = [];
        geometry.faces = [];
        geometry.faceVertexUvs[0] = [];
        for (let i = 0; i < (thetaSegments + 1); i++) {
            const fRad1 = i / thetaSegments,
                fRad2 = (i + 1) / thetaSegments,
                fX1 = innerRadius * Math.cos(fRad1 * angle),
                fY1 = innerRadius * Math.sin(fRad1 * angle),
                fX2 = outerRadius * Math.cos(fRad1 * angle),
                fY2 = outerRadius * Math.sin(fRad1 * angle),
                fX3 = outerRadius * Math.cos(fRad2 * angle),
                fY3 = outerRadius * Math.sin(fRad2 * angle),
                fX4 = innerRadius * Math.cos(fRad2 * angle),
                fY4 = innerRadius * Math.sin(fRad2 * angle),
                v1 = new THREE.Vector3(fX1, fY1, 0),
                v2 = new THREE.Vector3(fX2, fY2, 0),
                v3 = new THREE.Vector3(fX3, fY3, 0),
                v4 = new THREE.Vector3(fX4, fY4, 0);
            geometry.vertices.push(v1);
            geometry.vertices.push(v2);
            geometry.vertices.push(v3);
            geometry.vertices.push(v4);
        }
        for (let i = 0; i < (thetaSegments + 1); i++) {
            geometry.faces.push(new THREE.Face3(i * 4, i * 4 + 1, i * 4 + 2));
            geometry.faces.push(new THREE.Face3(i * 4, i * 4 + 2, i * 4 + 3));
            geometry.faceVertexUvs[0].push([
                new THREE.Vector2(0, 1),
                new THREE.Vector2(1, 1),
                new THREE.Vector2(1, 0)
            ]);
            geometry.faceVertexUvs[0].push([
                new THREE.Vector2(0, 1),
                new THREE.Vector2(1, 0),
                new THREE.Vector2(0, 0)
            ]);
        }
        
        const material = new THREE.MeshBasicMaterial({
            map: texture,
            opacity: 0,
            roughness: 1,
            side: THREE.DoubleSide
        });
        
        _this.ring = new THREE.Mesh(geometry, material);
        _this.ring.position.set(0, 0, 0);
        _this.ring.rotation.set(-Math.PI / 2 - Math.PI / 5, 0, 0);
        _this.ring.castShadow = true;
        _this.ring.receiveShadow = true;
    }
}
