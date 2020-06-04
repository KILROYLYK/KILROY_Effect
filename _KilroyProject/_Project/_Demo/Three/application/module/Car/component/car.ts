import Global from '../../../constant/global';
import Component from '../../../interface/component';

import * as THREE from 'three';
import { speed } from "animejs";

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
    private speed: number = 10; // 速度
    private turn: number = 0; // 转弯
    
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
        const _this = this,
            ease = 12, // 缓冲系数
            turn = Math.PI * _this.turn, // 转向角度
            lookP = {
                x: _this.instance.rotation.x,
                y: _this.instance.rotation.y + turn,
                z: _this.instance.rotation.z
            };
        
        if (!_this.instance) return;
        
        _this.wheel.children.forEach((v, i, a) => {
            v.children[1].rotateY(-_this.speed);
            (i === 0 || i === 1) && (v.rotation.set(-Math.PI / 2, 0, Math.PI / 2 + turn));
        });
        
        Global.Function.setEase(_this.instance.rotation, lookP, ease);
    }
    
    /**
     * 创建车
     * @return {void}
     */
    private createCar(): void {
        const _this = this;
        
        _this.car = _this.texture.car;
        _this.car.position.set(0, 0, 0);
        _this.car.rotation.set(0, Math.PI / 2, 0);
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
        
        for (const w in _this.texture) {
            if (w.indexOf('wheel_') > -1) {
                const group = new THREE.Group(),
                    g1 = _this.texture[w].children[0], // 组1
                    g2 = _this.texture[w].children[1]; // 组2
                
                // 内轮
                const m1 = g1.children[0];
                m1.geometry.center();
                m1.material = new THREE.MeshPhysicalMaterial({
                    color: '#4f4f4f',
                    metalness: 0.8,
                    roughness: 1,
                    reflectivity: 0
                });
                m1.castShadow = true;
                m1.receiveShadow = true;
                
                // 刹车
                const m2 = g1.children[1];
                m2.geometry.center();
                m2.position.set(200, 0, 100);
                m2.rotation.set(0, -Math.PI / 7, 0);
                m2.material = new THREE.MeshPhysicalMaterial({
                    color: '#ff0000',
                    metalness: 0.9,
                    roughness: 1,
                    reflectivity: 0
                });
                m2.castShadow = true;
                m2.receiveShadow = true;
                
                // 轮骨
                const m3 = g2.children[0];
                m3.geometry.center();
                m3.material = new THREE.MeshPhysicalMaterial({
                    color: '#000000',
                    metalness: 0,
                    roughness: 1,
                    reflectivity: 1
                });
                m3.castShadow = true;
                m3.receiveShadow = true;
                
                // 外轮
                const m4 = g2.children[1];
                m4.geometry.center();
                m4.material = new THREE.MeshPhysicalMaterial({
                    color: '#cccccc',
                    metalness: 0,
                    roughness: 1,
                    reflectivity: 1
                });
                m4.castShadow = true;
                m4.receiveShadow = true;
                
                // 轮胎
                const m5 = g2.children[2];
                m5.geometry.center();
                m5.material = new THREE.MeshPhysicalMaterial({
                    color: '#1f1f1f',
                    metalness: 0.8,
                    roughness: 1,
                    reflectivity: 0
                });
                m5.castShadow = true;
                m5.receiveShadow = true;
                
                group.add(g1, g2);
                group.rotation.set(0, 0, Math.PI / 2);
                wheel.push(group);
                _this.wheel.add(group);
            }
        }
        
        const wheelS = 0.017, // 缩放
            wheelX = 17,
            wheelY = 8.5,
            wheelZ = {
                p: -33, // 前轮
                n: 31 // 后轮
            };
        
        // 右前轮
        wheel[0].scale.setScalar(wheelS);
        wheel[0].position.set(-wheelX, wheelY, wheelZ.p);
        
        // 左前轮
        wheel[1].scale.set(wheelS, -wheelS, wheelS);
        wheel[1].position.set(wheelX, wheelY, wheelZ.p);
        
        // 右后轮
        wheel[2].scale.setScalar(wheelS);
        wheel[2].position.set(-wheelX, wheelY, wheelZ.n);
        
        // 左后轮
        wheel[3].scale.set(wheelS, -wheelS, wheelS);
        wheel[3].position.set(wheelX, wheelY, wheelZ.n);
    }
    
    /**
     * 改变速度
     * @param {boolean} add 增加
     * @return {void}
     */
    public changeSpeed(add: boolean = true): void {
        const _this = this;
        
        add ? _this.speed++ : _this.speed--;
        
        _this.speed >= 100 && (_this.speed = 100);
        _this.speed <= 0 && (_this.speed = 0);
    }
}
