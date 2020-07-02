import Global from '../../../constant/global';
import Component from '../../../interface/component';

import * as THREE from 'three';

import SunVertex from './_OpenGL/sunVertex.c';
import SunFragment from './_OpenGL/sunFragment.c';

interface Texture { // 纹理
    sun: THREE.Texture // 太阳
    ground: THREE.Texture // 地面
    fire: THREE.Texture // 火焰
}

/**
 * 太阳
 */
export default class Sun implements Component {
    private readonly name: string = 'Sun-太阳';
    
    private scene: THREE.Scene = null; // 场景
    private texture: Texture = null; // 纹理
    
    private readonly radius: number = 500; // 半径
    private uniform: { // 匀实
        [uniform: string]: {
            value: any
        }
    } = null;
    private light: THREE.PointLight = null; // 点光源
    private sphere: THREE.Mesh = null; // 球体
    private halo: THREE.Mesh = null; // 球体
    
    public instance: THREE.Group = null; // 实例
    
    /**
     * 构造函数
     * @constructor Sun
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
        
        _this.instance = new THREE.Group();
        _this.instance.name = _this.name;
        _this.instance.position.set(0, 0, 0);
        
        _this.createLight();
        _this.createSphere();
        _this.createHalo();
    }
    
    /**
     * 初始化
     * @return {void}
     */
    private init(): void {
        const _this = this;
        
        _this.instance.add(_this.light);
        _this.instance.add(_this.sphere);
        _this.instance.add(_this.halo);
        _this.scene.add(_this.instance);
    }
    
    /**
     * 销毁
     * @return {void}
     */
    public destroy(): void {
        const _this = this;
        
        if (!_this.instance) return;
    }
    
    /**
     * 更新
     * @return {void}
     */
    public update(): void {
        const _this = this,
            cycleS = 0.001; // 周期速度
        
        if (!_this.instance) return;
        
        _this.uniform.time.value += cycleS * 10;
        
        _this.sphere.rotateY(cycleS);
    }
    
    /**
     * 创建光源
     * @return {void}
     */
    private createLight(): void {
        const _this = this;
        
        _this.light = new THREE.PointLight('#ffffff', 1.5);
        _this.light.position.set(0, 0, 0);
        _this.light.castShadow = true;
        _this.light.shadow.camera.near = 1;
        _this.light.shadow.camera.far = 17000;
    }
    
    /**
     * 创建球体
     * @return {void}
     */
    private createSphere(): void {
        const _this = this,
            textureGround = _this.texture.ground,
            textureFire = _this.texture.fire;
        
        textureFire.wrapS
            = textureFire.wrapT
            = THREE.RepeatWrapping;
        textureGround.wrapS
            = textureGround.wrapT
            = THREE.RepeatWrapping;
        
        _this.uniform = {
            fogDensity: {
                value: 0.45
            },
            fogColor: {
                value: new THREE.Vector3(0, 0, 0)
            },
            time: {
                value: 1
            },
            uvScale: {
                value: new THREE.Vector2(3, 1)
            },
            texture1: {
                value: textureFire
            },
            texture2: {
                value: textureGround
            }
        };
        
        const geometry = new THREE.SphereGeometry(
            _this.radius, 64, 64
        );
        
        const material = new THREE.ShaderMaterial({
            uniforms: _this.uniform,
            vertexShader: SunVertex,
            fragmentShader: SunFragment
        });
        
        _this.sphere = new THREE.Mesh(geometry, material);
        _this.sphere.position.set(0, 0, 0);
    }
    
    /**
     * 创建光晕
     * @return {void}
     */
    private createHalo(): void {
        const _this = this,
            texture = _this.texture.sun;
        
        const geometry = new THREE.SphereGeometry(
            _this.radius + 50, 64, 64
        );
        
        const material = new THREE.MeshStandardMaterial({
            map: texture,
            lightMap: texture,
            lightMapIntensity: 10,
            roughness: 1,
            opacity: 0.2,
            transparent: true
        });
        
        _this.halo = new THREE.Mesh(geometry, material);
        _this.halo.position.set(0, 0, 0);
    }
}
