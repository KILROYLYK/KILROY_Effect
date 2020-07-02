import Global from '../../../constant/global';
import Component from '../../../interface/component';

import * as THREE from 'three';
import { SimplexNoise } from 'three/examples/jsm/math/SimplexNoise';

/**
 * 地面
 */
export default class Ground implements Component {
    private readonly name: string = 'Ground-地面';
    
    private scene: THREE.Scene = null; // 场景
    
    private light: THREE.PointLight = null; // 灯光
    private simplex: SimplexNoise = null; // 单纯形
    private plane: THREE.Mesh = null; // 平原
    private cycle: number = 0; // 周期
    private readonly moveP: object = { // 移动位置
        x: 0,
        y: -350,
        z: -1000
    };
    private readonly lookP: object = { // 视觉位置
        x: Math.PI / 2,
        y: 0,
        z: 0
    };
    
    public instance: THREE.Group = null; // 实例
    
    /**
     * 构造函数
     * @constructor Ground
     * @param {object} scene 场景
     */
    constructor(scene: object) {
        const _this = this;
        
        _this.scene = scene.instance;
        
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
        
        _this.createLight();
        _this.createPlane();
    }
    
    /**
     * 初始化
     * @return {void}
     */
    private init(): void {
        const _this = this;
        
        _this.instance.add(_this.light);
        _this.instance.add(_this.plane);
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
            ease = 15, // 缓冲系数
            factor = 300, // 顶点系数（越大越平缓）
            scale = 40, // 陡峭倍数
            cycleS = 0.08, // 周期速度
            mouseS = 0.5; // 鼠标速度
        
        if (!_this.instance) return;
        
        const geometry = _this.plane.geometry as any;
        
        for (const vertex of geometry.vertices) {
            const x = (vertex.x / factor),
                y = (vertex.y / factor) + _this.cycle;
            vertex.z = _this.simplex.noise(x, y) * scale;
        }
        geometry.verticesNeedUpdate = true;
        _this.cycle -= cycleS;
        
        _this.moveP.x = -((Global.mouseP.x - Global.Function.getDomCenter().x) * mouseS);
        
        Global.Function.setEase(_this.instance.position, _this.moveP, ease);
        Global.Function.setEase(_this.instance.rotation, _this.lookP, ease);
    }
    
    /**
     * 创建光源
     * @return {void}
     */
    private createLight(): void {
        const _this = this;
        
        const color = new THREE.Color();
        color.setHSL(0.038, 0.8, 0.5);
        
        _this.light = new THREE.PointLight('#ffffff', 3, 800);
        _this.light.color = color;
        _this.light.castShadow = false;
        _this.light.position.set(0, 50, 500);
    }
    
    /**
     * 创建平面
     * @return {void}
     */
    private createPlane(): void {
        const _this = this;
        
        _this.simplex = new SimplexNoise();
        
        const geometry = new THREE.PlaneGeometry(
            4000, 2000, 128, 64
        );
        
        const material = new THREE.MeshLambertMaterial({
            color: '#ffffff',
            blending: THREE.NoBlending,
            side: THREE.FrontSide,
            transparent: false,
            depthTest: true,
            wireframe: true
        });
        
        _this.plane = new THREE.Mesh(geometry, material);
        _this.plane.position.set(0, 0, 0);
        _this.plane.rotation.set(0, 0, 0);
    }
}
