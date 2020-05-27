import Global from '../../../constant/global';
import Component from '../../../interface/component';

import * as THREE from 'three';

import SunVertex from '../static/other/sunVertex.c';
import SunFragment from '../static/other/sunFragment.c';

/**
 * 太阳
 */
export default class Sun implements Component {
    private readonly name: string = 'Sun-太阳';
    
    private scene: THREE.Scene = null; // 场景
    private texture: object = {  // 纹理
        sun: null as THREE.Texture,
        sunGround: null as THREE.Texture,
        sunCloud: null as THREE.Texture
    };
    
    private clock: THREE.Clock = null; // 时钟
    private uniform: object = null; // 匀实
    private light: THREE.PointLight = null; // 点光源
    private sphere: THREE.Mesh = null; // 球体
    private fire: THREE.Mesh = null; // 火焰
    
    public instance: THREE.Object3D = null; // 实例
    
    /**
     * 构造函数
     * @constructor Sun
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
        
        _this.instance = new THREE.Object3D();
        _this.instance.name = _this.name;
        _this.instance.position.set(0, 0, 0);
        
        _this.createLight();
        _this.createSphere();
        _this.createFire();
    }
    
    /**
     * 初始化
     * @return {void}
     */
    private init(): void {
        const _this = this;
        
        // _this.instance.add(_this.light);
        // _this.instance.add(_this.sphere);
        _this.instance.add(_this.fire);
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
        
        _this.uniform.time.value += _this.clock.getDelta();
        
        _this.sphere.rotateY(cycleS);
    }
    
    /**
     * 创建光源
     * @return {void}
     */
    private createLight(): void {
        const _this = this;
        
        _this.light = new THREE.PointLight('#ffffff', 5);
        _this.light.position.set(0, 0, 0);
        _this.light.castShadow = true;
        _this.light.shadow.camera.far = 12000;
    }
    
    /**
     * 创建球体
     * @return {void}
     */
    private createSphere(): void {
        const _this = this,
            texture = _this.texture.sun;
        
        texture.anisotropy = 4;
        texture.encoding = THREE.sRGBEncoding;
        
        const geometry = new THREE.SphereBufferGeometry(
            800, 64, 64
        );
        
        const material = new THREE.MeshStandardMaterial({
            emissive: '#ffffff',
            emissiveMap: texture,
            emissiveIntensity: 2,
            roughness: 1
        });
        
        _this.sphere = new THREE.Mesh(geometry, material);
        _this.sphere.position.set(0, 0, 0);
    }
    
    /**
     * 创建火焰
     * @return {void}
     */
    private createFire(): void {
        const _this = this,
            texture1 = _this.texture.sunCloud,
            texture2 = _this.texture.sunGround;
        
        texture1.wrapS
            = texture1.wrapT
            = THREE.RepeatWrapping;
        texture2.wrapS
            = texture2.wrapT
            = THREE.RepeatWrapping;
        
        const vector2 = new THREE.Vector2(3.0, 1.0);
        
        const vector3 = new THREE.Vector3(0, 0, 0);
        
        _this.uniform = {
            fogDensity: {
                value: 0.45
            },
            fogColor: {
                value: vector3
            },
            time: {
                value: 1.0
            },
            uvScale: {
                value: vector2
            },
            texture1,
            texture2
        }
        
        _this.clock = new THREE.Clock();
        
        const geometry = new THREE.SphereGeometry(
            500, 64, 64
        );
        
        const material = new THREE.ShaderMaterial({
            uniforms: _this.uniform,
            vertexShader: SunVertex,
            fragmentShader: SunFragment
        });
        
        _this.fire = new THREE.Mesh(geometry, material);
    }
}
