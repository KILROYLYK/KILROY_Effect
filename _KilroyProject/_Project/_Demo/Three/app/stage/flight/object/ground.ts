import Global from '../../../constant/global';
import _Object from '../../../interface/object';

import * as THREE from 'three';
import { SimplexNoise } from 'three/examples/jsm/math/SimplexNoise';

/**
 * 地面
 */
export default class Ground implements _Object {
    private scene: THREE.Scene = null; // 场景
    
    private simplex: SimplexNoise = null; // 简单声音
    private geometry: THREE.PlaneGeometry = null; // 几何体
    private material: THREE.MeshLambertMaterial = null; // 材料
    private plane: THREE.Mesh = null; // 平原
    private cycle: number = 0; // 周期
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
        y: -300,
        z: -1000
    };
    private readonly lookP: object = { // 视觉位置
        x: 29.8,
        y: 0,
        z: 0
    };
    
    public instance: THREE.Object3D = null; // 实例
    
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
        
        _this.instance = new THREE.Object3D();
        _this.instance.position.set(_this.moveP.x, _this.moveP.y, _this.moveP.z);
        _this.instance.rotation.set(_this.lookP.x, _this.lookP.y, _this.lookP.z);
        
        this.simplex = new SimplexNoise();
        
        this.geometry = new THREE.PlaneGeometry(4000, 2000, 128, 64);
        
        this.material = new THREE.MeshLambertMaterial({
            color: '#ffffff',
            opacity: 1,
            blending: THREE.NoBlending,
            side: THREE.FrontSide,
            transparent: false,
            depthTest: false,
            wireframe: true
        });
        
        this.plane = new THREE.Mesh(this.geometry, this.material);
        this.plane.position.set(0, 0, 0);
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
        
        _this.instance.add(_this.plane);
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
            factor = 300, // 顶点系数（越大越平缓）
            scale = 30, // 陡峭倍数
            speed = 0.002,
            ease = 15; // 缓冲系数
        
        for (const vertex of _this.geometry.vertices) {
            const x = (vertex.x / factor),
                y = (vertex.y / factor) + _this.cycle;
            vertex.z = _this.simplex.noise(x, y) * scale;
        }
        _this.geometry.verticesNeedUpdate = true;
        _this.cycle += speed;
        
        _this.moveP.x = -((_this.mouseP.x - _this.centerP.x) * 0.4);
        
        Global.Function.setEasePosition(_this.instance.position, _this.moveP, ease);
        Global.Function.setEasePosition(_this.instance.rotation, _this.lookP, ease);
    }
}
