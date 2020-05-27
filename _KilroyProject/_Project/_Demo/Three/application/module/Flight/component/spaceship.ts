import Global from '../../../constant/global';
import Component from '../../../interface/component';

import * as THREE from 'three';

/**
 * 飞船
 */
export default class Spaceship implements Component {
    private readonly name: string = 'Spaceship-飞船';
    
    private scene: THREE.Scene = null; // 场景
    private model: THREE.Object3D = null; // 模型
    private texture: THREE.Texture = null; // 纹理
    
    private light: THREE.PointLight = null; // 灯光
    private fire: THREE.Mesh = null; // 火焰
    private bullet: THREE.Mesh[] = []; // 子弹列表
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
    
    public instance: THREE.Object3D = null; // 实例
    
    /**
     * 构造函数
     * @constructor Spaceship
     * @param {object} scene 场景
     * @param {THREE.Object3D} model 模型
     * @param {THREE.Texture} texture 纹理
     */
    constructor(scene: object, model: THREE.Object3D, texture: THREE.Texture) {
        const _this = this;
        
        _this.scene = scene.instance;
        _this.model = model;
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
        _this.instance.position.set(_this.moveP.x, _this.moveP.y, _this.moveP.z);
        _this.instance.rotation.set(_this.lookP.x, _this.lookP.y, _this.lookP.z);
        
        _this.createLight();
        _this.createSpaceship();
        _this.createEngine();
    }
    
    /**
     * 初始化
     * @return {void}
     */
    private init(): void {
        const _this = this;
        
        _this.instance.add(_this.light);
        _this.instance.add(_this.model);
        _this.instance.add(_this.fire);
        _this.scene.add(_this.instance);
        
        
        Global.W.addEventListener('wheel', (e: WheelEvent) => {
            const z = _this.moveP.z;
            let d = z + (e.deltaY | 0);
            d = (d < -20) ? -20 : d;
            d = (d > 20) ? 20 : d;
            _this.moveP.z = d;
        });
        Global.W.addEventListener('click', (e: MouseEvent) => {
            _this.createBullet();
        });
    }
    
    /**
     * 销毁
     * @return {void}
     */
    public destroy(): void {
        const _this = this;
        
        if (!_this.instance) return;
        
        _this.light = null;
        _this.model = null;
        _this.bullet = [];
        _this.instance = null;
    }
    
    /**
     * 更新
     * @return {void}
     */
    public update(): void {
        const _this = this,
            ease = 12, // 缓冲系数
            moveS = { // 移动速度
                x: 0.07,
                y: 0.06
            },
            lookS = 0.0004, // 视觉速度
            centerP = Global.Function.getDomCenter(); // 中心位置
        
        if (!_this.instance) return;
        
        _this.texture.offset.y -= 0.06;
        
        _this.moveP.x = (Global.mouseP.x - centerP.x) * moveS.x;
        _this.moveP.y = -((Global.mouseP.y - centerP.y) * moveS.y) - 4;
        _this.lookP.z = (Global.mouseP.x - centerP.x) * lookS;
        
        Global.Function.setEase(_this.instance.position, _this.moveP, ease);
        Global.Function.setEase(_this.instance.rotation, _this.lookP, ease);
        
        // 更新子弹
        _this.bullet.forEach((v: THREE.Mesh, i: number, a: THREE.Mesh[]) => {
            const cylinder = _this.bullet[i];
            if (cylinder.position.z < -300) {
                _this.bullet.splice(i, 1);
                _this.scene.remove(cylinder);
            }
            cylinder.position.z -= 6;
        });
    }
    
    /**
     * 创建飞船
     * @return {void}
     */
    private createSpaceship(): void {
        const _this = this;
        
        const material = new THREE.MeshPhongMaterial({
            color: '#ffffff',
            blending: THREE.NoBlending,
            side: THREE.FrontSide,
            transparent: true,
            depthTest: true
        });
        
        _this.model.position.set(0, 0, 250);
        _this.model.rotation.set(0, Math.PI, 0);
        _this.model.traverse((child) => {
            child instanceof THREE.Mesh && (child.material = material);
        });
    }
    
    /**
     * 创建光源
     * @return {void}
     */
    private createLight(): void {
        const _this = this;
        
        _this.light = new THREE.PointLight('#ffffff', 15, 300);
        _this.light.position.set(0, 100, 0);
    }
    
    /**
     * 创建引擎
     * @return {void}
     */
    private createEngine(): void {
        const _this = this;
    
        _this.texture.wrapT
            = _this.texture.wrapS
            = THREE.RepeatWrapping;
        
        const material = new THREE.MeshBasicMaterial({
            color: '#0099ff',
            opacity: 1,
            alphaMap: _this.texture,
            blending: THREE.AdditiveBlending,
            side: THREE.FrontSide,
            transparent: true,
            depthTest: true
        });
        
        _this.fire = new THREE.Mesh(
            new THREE.CylinderGeometry(
                0, 0.4, 10,
                32, 32, true
            ), material
        );
        _this.fire.position.set(0, 0.4, 257);
        _this.fire.rotation.set(Math.PI / 2, 0, 0);
    }
    
    /**
     * 创建子弹
     * @return {void}
     */
    private createBullet(): void {
        const _this = this,
            position = _this.instance.position;
        
        const color = new THREE.Color();
        color.setHSL(Math.random(), 1, .5);
        
        const geometry = new THREE.CylinderGeometry(
            .3, 0, 20, 10
        );
        
        const material = new THREE.MeshBasicMaterial({
            color,
            opacity: .8,
            blending: THREE.AdditiveBlending,
            side: THREE.FrontSide,
            transparent: true,
            depthTest: true
        });
        
        const cylinder = new THREE.Mesh(geometry, material);
        cylinder.position.set(position.x, position.y, position.z + 250);
        cylinder.rotation.set(11, 0, 0);
        
        _this.bullet.push(cylinder);
        _this.scene.add(cylinder);
    }
}
