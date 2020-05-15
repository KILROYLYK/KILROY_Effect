import Global from '../../../constant/global';
import _Object from '../../../interface/object';

import * as THREE from 'three';

/**
 * 星星
 */
export default class Star implements _Object {
    private scene: THREE.Scene = null; // 场景
    private texture: THREE.Texture = null; // 纹理
    
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
        y: 1200,
        z: -1000
    };
    private readonly lookP: object = { // 视觉位置
        x: 0,
        y: 0,
        z: 0
    };
    
    public instance: THREE.Object3D = null; // 3D对象
    
    /**
     * 构造函数
     * @constructor Star
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
        const _this = this,
            spread = 8000, // 扩散范围
            geometry = new THREE.Geometry(), // 几何体
            material = new THREE.PointsMaterial({ // 点材质
                size: 64,
                color: '#ffffff',
                opacity: 1,
                map: _this.texture,
                blending: THREE.AdditiveBlending,
                vertexColors: false,
                transparent: true,
                depthTest: false
            }),
            point = new THREE.Points(geometry, material);
        
        for (let i = 0; i < 400; i++) {
            const angle = (Math.random() * Math.PI * 2),
                radius = THREE.Math.randInt(0, spread);
            
            geometry.vertices.push(new THREE.Vector3(
                Math.cos(angle) * radius,
                Math.sin(angle) * radius / 10,
                THREE.Math.randInt(-spread, 0)
            ));
        }
        
        _this.instance = new THREE.Object3D();
        _this.instance.add(point);
    }
    
    /**
     * 初始化
     * @return {void}
     */
    private init(): void {
        const _this = this;
        
        _this.instance.position.set(_this.moveP.x, _this.moveP.y, _this.moveP.z);
        _this.instance.rotation.set(_this.lookP.x, _this.lookP.y, _this.lookP.z);
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
            ease = 15;
        
        if (!_this.instance) return;
        
        _this.moveP.x = -((_this.mouseP.x - _this.centerP.x) * 0.1);
        
        Global.Function.setEasePosition(_this.instance.position, _this.moveP, ease);
        Global.Function.setEasePosition(_this.instance.rotation, _this.lookP, ease);
    }
}
