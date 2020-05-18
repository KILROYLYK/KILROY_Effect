import Global from '../../../constant/global';
import _Object from '../../../interface/object';

import * as THREE from 'three';
import { SimplexNoise } from 'three/examples/jsm/math/SimplexNoise';

/**
 * 山脉
 */
export default class Mountain implements _Object {
    private readonly name: string = 'Mountain-山脉';
    
    private scene: THREE.Scene = null; // 场景
    private texture: THREE.Texture = null; // 纹理
    
    private light: THREE.PointLight = null; // 灯光
    private simplex: SimplexNoise = null; // 单纯形
    private geometry: THREE.PlaneGeometry = null; // 几何体
    private terrain: THREE.Mesh = null; // 地形
    private cycle: number = 0; // 周期
    private readonly moveP: object = { // 移动位置
        x: 0,
        y: -500,
        z: -6000
    };
    private readonly lookP: object = { // 视觉位置
        x: 0,
        y: 0,
        z: 0
    };
    
    public instance: THREE.Object3D = null; // 3D对象
    
    /**
     * 构造函数
     * @constructor Mountain
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
        
        const color = new THREE.Color();
        color.setHSL(0.038, 0.8, 0.5);
        
        const material = new THREE.MeshPhongMaterial({ // 材料
            color: '#ffffff',
            opacity: 1,
            map: _this.texture,
            blending: THREE.NoBlending,
            side: THREE.BackSide,
            transparent: true,
            depthTest: false
        });
        
        _this.texture.wrapT
            = _this.texture.wrapS
            = THREE.RepeatWrapping;
        
        _this.light = new THREE.PointLight('#ffffff', 2.2, 2000);
        _this.light.color = color;
        _this.light.castShadow = false;
        _this.light.position.set(0, 500, 0);
        
        _this.simplex = new SimplexNoise();
        
        _this.geometry = new THREE.PlaneGeometry(
            12000, 1400, 128, 32
        );
        
        _this.terrain = new THREE.Mesh(_this.geometry, material);
        _this.terrain.position.set(0, 0, 0);
        _this.terrain.rotation.set((Math.PI / 2) + 0.8, 0, 0);
        
        _this.instance = new THREE.Object3D();
    }
    
    /**
     * 初始化
     * @return {void}
     */
    private init(): void {
        const _this = this;
        
        _this.instance.name = _this.name;
        _this.instance.position.set(_this.moveP.x, _this.moveP.y, _this.moveP.z);
        _this.instance.rotation.set(_this.lookP.x, _this.lookP.y, _this.lookP.z);
        _this.instance.add(_this.light);
        _this.instance.add(_this.terrain);
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
            ease = 15, // 缓冲系数
            moveS = 0.1, // 移动速度
            cycleS = 0.0008, // 周期速度
            factor = 1000, // 顶点系数（越大越平缓）
            scale = 300; // 陡峭倍数
        
        
        if (!_this.instance) return;
        
        for (const vertex of _this.geometry.vertices) {
            const x = (vertex.x / factor),
                y = (vertex.y / factor) + _this.cycle;
            vertex.z = _this.simplex.noise(x, y) * scale;
        }
        _this.geometry.verticesNeedUpdate = true;
        _this.cycle -= cycleS;
        
        _this.moveP.x = -((Global.mouseP.x - Global.Function.getDomCenter().x) * moveS);
        
        Global.Function.setEase(_this.instance.position, _this.moveP, ease);
        Global.Function.setEase(_this.instance.rotation, _this.lookP, ease);
    }
}
