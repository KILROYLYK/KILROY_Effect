import Global from '../../../constant/global';
import _Object from '../../../interface/object';

import * as THREE from 'three';

/**
 * 飞船
 */
export default class Spaceship implements _Object {
    private scene: THREE.Scene = null; // 场景
    private model: THREE.Object3D = null; // 模型
    private texture: THREE.Texture = null; // 纹理
    
    private fire: THREE.Mesh = null; // 火焰
    private light: THREE.PointLight = null; // 灯光
    private bullet = []; // 子弹
    private readonly centerP: object = { // 中心位置
        x: 0,
        y: 0
    };
    private readonly mouseP: object = { // 鼠标位置
        x: 0,
        y: 0
    };
    private readonly moveP: object = { // 移动位置
        x: 0,
        y: 0,
        z: -40
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
        
        _this.texture.wrapT
            = _this.texture.wrapS
            = THREE.RepeatWrapping;
        
        _this.createSpaceship();
        _this.createEngine();
        
        _this.light = new THREE.PointLight('#ffffff', 0.4, 600);
        _this.light.position.set(0, 0, 600);
        
        _this.instance = new THREE.Object3D();
    }
    
    /**
     * 初始化
     * @return {void}
     */
    private init(): void {
        const _this = this;
    
        _this.centerP.x
            = _this.mouseP.x
            = Global.Width / 2;
        _this.centerP.y
            = _this.mouseP.y
            = Global.Height / 2;
        
        _this.instance.position.set(_this.moveP.x, _this.moveP.y, _this.moveP.z);
        _this.instance.rotation.set(_this.lookP.x, _this.lookP.y, _this.lookP.z);
        _this.instance.add(_this.model);
        _this.instance.add(_this.fire);
        _this.instance.add(_this.light);
        _this.scene.add(_this.instance);
        
        Global.Window.addEventListener('mousemove', (e: MouseEvent) => {
            _this.mouseP.x = e.clientX;
            _this.mouseP.y = e.clientY;
        }, false);
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
            ease = 12; // 缓冲系数
        
        if (!_this.instance) return;
        
        _this.texture.offset.y -= 0.06;
        _this.texture.needsUpdate = true;
    
        _this.moveP.x = (_this.mouseP.x - _this.centerP.x) * 0.05;
        _this.moveP.y = -((_this.mouseP.y - _this.centerP.y) * 0.04) - 4;
        _this.lookP.z = (_this.mouseP.x - _this.centerP.x) * 0.0004;
        
        Global.Function.setEasePosition(_this.instance.position, _this.moveP, ease);
        Global.Function.setEasePosition(_this.instance.rotation, _this.lookP, ease);
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
            transparent: false,
            depthTest: true,
            wireframe: false
        });
        
        _this.model.position.set(0, 0, 300);
        _this.model.rotation.set(0, Math.PI, 0);
        _this.model.traverse((child) => {
            child instanceof THREE.Mesh && (child.material = material);
        });
    }
    
    /**
     * 创建引擎
     * @return {void}
     */
    private createEngine(): void {
        const _this = this;
        
        const material = new THREE.MeshBasicMaterial({
            color: '#0099ff',
            opacity: 1,
            alphaMap: _this.texture,
            blending: THREE.AdditiveBlending,
            side: THREE.FrontSide,
            transparent: true,
            depthTest: true
        });
        
        _this.fire = new THREE.Mesh(new THREE.CylinderGeometry(
            0, .4, 8, 32, 32, true), material
        );
        _this.fire.position.set(0, .4, 307);
        _this.fire.rotation.x = Math.PI / 2;
    }
}
