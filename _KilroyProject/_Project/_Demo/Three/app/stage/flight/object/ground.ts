import Global from '../../../constant/global';
import _Object from '../../../interface/object';

import * as THREE from 'three';
import { SimplexNoise } from 'three/examples/jsm/math/SimplexNoise';

/**
 * 地面
 */
export default class Ground implements _Object {
    private scene: THREE.Scene = null; // 场景
    
    private simplex: SimplexNoise = null; // 单纯形
    private geometry: THREE.PlaneGeometry = null; // 几何体
    private plane: THREE.Mesh = null; // 平原
    private cycle: number = 0; // 周期
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
        
        const material = new THREE.MeshLambertMaterial({
            color: '#ffffff',
            opacity: 1,
            blending: THREE.NoBlending,
            side: THREE.FrontSide,
            transparent: false,
            depthTest: false,
            wireframe: true
        });
        
        _this.simplex = new SimplexNoise();
        
        _this.geometry = new THREE.PlaneGeometry(
            4000, 2000, 128, 64
        );
        
        _this.plane = new THREE.Mesh(_this.geometry, material);
        _this.plane.position.set(0, 0, 0);
        
        _this.instance = new THREE.Object3D();
    }
    
    /**
     * 初始化
     * @return {void}
     */
    private init(): void {
        const _this = this;
        
        _this.instance.position.set(_this.moveP.x, _this.moveP.y, _this.moveP.z);
        _this.instance.rotation.set(_this.lookP.x, _this.lookP.y, _this.lookP.z);
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
        
        _this.instance = null;
    }
    
    /**
     * 更新
     * @return {void}
     */
    public update(): void {
        const _this = this,
            ease = 15, // 缓冲系数
            factor = 300, // 顶点系数（越大越平缓）
            scale = 30, // 陡峭倍数
            cycleS = 0.08, // 周期速度
            mouseS = 0.5; // 鼠标速度
        
        if (!_this.instance) return;
        
        for (const vertex of _this.geometry.vertices) {
            const x = (vertex.x / factor),
                y = (vertex.y / factor) + _this.cycle;
            vertex.z = _this.simplex.noise(x, y) * scale;
        }
        _this.geometry.verticesNeedUpdate = true;
        _this.cycle += cycleS;
        
        _this.moveP.x = -((Global.mouseP.x - Global.Function.getDomCenter().x) * mouseS);
        
        Global.Function.setEase(_this.instance.position, _this.moveP, ease);
        Global.Function.setEase(_this.instance.rotation, _this.lookP, ease);
    }
}
