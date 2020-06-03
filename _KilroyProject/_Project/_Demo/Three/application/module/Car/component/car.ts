import Global from '../../../constant/global';
import Component from '../../../interface/component';

import * as THREE from 'three';

interface Texture { // 纹理
    bg: THREE.CubeTexture // 背景
    car: THREE.Group // 车
    wheel_l1: THREE.Group // 车轮
    wheel_l2: THREE.Group // 车轮
    wheel_r1: THREE.Group // 车轮
    wheel_r2: THREE.Group // 车轮
}

/**
 * 车
 */
export default class Car implements Component {
    private readonly name: string = 'Spaceship-飞船';
    
    private scene: THREE.Scene = null; // 场景
    private texture: Texture = null; // 纹理
    
    private car: THREE.Group = null; // 车
    private wheel: THREE.Group = null; // 车轮
    private readonly moveP: object = { // 移动位置
        x: 0,
        y: 0,
        z: 0
    };
    private readonly lookP: object = { // 视觉位置
        x: 0,
        y: 0,
        z: 0
    };
    
    public instance: THREE.Group = null; // 实例
    
    /**
     * 构造函数
     * @constructor Car
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
        _this.instance.position.set(_this.moveP.x, _this.moveP.y, _this.moveP.z);
        _this.instance.rotation.set(_this.lookP.x, _this.lookP.y, _this.lookP.z);
        
        _this.createCar();
        _this.createWheel();
    }
    
    /**
     * 初始化
     * @return {void}
     */
    private init(): void {
        const _this = this;
        
        _this.instance.add(_this.car);
        _this.instance.add(_this.wheel);
        _this.scene.add(_this.instance);
    }
    
    /**
     * 销毁
     * @return {void}
     */
    public destroy(): void {
        const _this = this;
        
        if (!_this.instance) return;
        
        _this.texture = null;
        _this.car = null;
        _this.wheel = null;
        _this.instance = null;
    }
    
    /**
     * 更新
     * @return {void}
     */
    public update(): void {
        const _this = this;
        
        if (!_this.instance) return;
    }
    
    /**
     * 创建车
     * @return {void}
     */
    private createCar(): void {
        const _this = this;
        
        _this.car = _this.texture.car;
        _this.car.position.set(0, 0, 0);
        _this.car.rotation.set(0, -Math.PI / 2, 0);
        _this.car.scale.setScalar(0.01);
        _this.car.castShadow = true;
        _this.car.receiveShadow = true;
        
        // 上色
        const mash = _this.car.children as THREE.Mesh;
        
        // 引擎盖 | 框架
        mash[0].material = new THREE.MeshPhysicalMaterial({
            color: '#000000',
            envMap: _this.texture.bg,
            metalness: 0.5, // 金属性
            roughness: 0.2, // 粗糙度
            reflectivity: 1 // 反射率
        });
        
        // 车头 | 车尾 | 车门
        mash[1].material = new THREE.MeshPhysicalMaterial({
            color: '#8d8d8d',
            envMap: _this.texture.bg,
            metalness: 0,
            roughness: 0,
            reflectivity: 1
        });
        
        // 车尾底灯
        mash[2].material = new THREE.MeshPhysicalMaterial({
            color: '#ff0000',
            metalness: 0.3,
            roughness: 0,
            reflectivity: 1
        });
        
        // 车尾细灯
        mash[3].material = new THREE.MeshPhysicalMaterial({
            color: '#ff0000',
            metalness: 0.3,
            roughness: 0,
            reflectivity: 1
        });
        
        // ????
        mash[4].material = new THREE.MeshPhysicalMaterial({
            color: '#ff0000',
            metalness: 0,
            roughness: 0,
            reflectivity: 1
        });
        
        // 车顶 | 车窗
        mash[5].material = new THREE.MeshPhysicalMaterial({
            color: '#000000',
            envMap: _this.texture.bg,
            metalness: 0,
            roughness: 0,
            reflectivity: 1
        });
        
        // 车头灯 | 车尾灯
        mash[6].material = new THREE.MeshPhysicalMaterial({
            color: '#ff0000',
            metalness: 0.9,
            roughness: 1,
            reflectivity: 1
        });
        
        // 车标 | 车头底灯
        mash[7].material = new THREE.MeshPhysicalMaterial({
            color: '#ff0000',
            metalness: 0.3,
            roughness: 0,
            reflectivity: 1
        });
        
        // 车底
        mash[8].material = new THREE.MeshPhysicalMaterial({
            color: '#303030',
            metalness: 0,
            roughness: 0,
            reflectivity: 1
        });
        
        // 车尾侧灯
        mash[9].material = new THREE.MeshPhysicalMaterial({
            color: '#ff0000',
            metalness: 0.9,
            roughness: 1,
            reflectivity: 1
        });
    }
    
    /**
     * 创建车轮
     * @return {void}
     */
    private createWheel(): void {
        const _this = this,
            wheel = [];
        
        _this.wheel = new THREE.Group();
        
        console.log(_this.texture.wheel_l1.children[0]);
        
        for (const w in _this.texture) {
            if (w.indexOf('wheel_') > -1) {
                const group = new THREE.Group();
                group.add(
                    _this.texture[w].children[0],
                    _this.texture[w].children[1]
                );
                group.position.set(0, 50, 0);
                group.rotation.set(-Math.PI / 2, 0, 0);
                group.scale.setScalar(0.01);
                group.castShadow = true;
                group.receiveShadow = true;
                wheel.push(group);
                _this.wheel.add(group);
            }
        }
    
        // wheel[0]
    }
}
