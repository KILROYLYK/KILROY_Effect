import Global from '../../../constant/global';
import _Object from '../../../interface/object';

import * as THREE from 'three';

/**
 * 太阳
 */
export default class Sun implements _Object {
    private readonly name: string = 'Sun-太阳';
    
    private scene: THREE.Scene = null; // 场景
    
    private sphere: THREE.Mesh = null; // 球体
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
     * @constructor Sun
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
        
        _this.createContainer();
        _this.createSphere();
    }
    
    /**
     * 初始化
     * @return {void}
     */
    private init(): void {
        const _this = this;
        
        _this.instance.add(_this.sphere);
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
        const _this = this;
        
        if (!_this.instance) return;
    }
    
    /**
     * 创建容器
     * @return {void}
     */
    private createContainer(): void {
        const _this = this;
        
        _this.instance = new THREE.Object3D();
        _this.instance.name = _this.name;
        _this.instance.position.set(_this.moveP.x, _this.moveP.y, _this.moveP.z);
        _this.instance.rotation.set(_this.lookP.x, _this.lookP.y, _this.lookP.z);
    }
    
    /**
     * 创建球体
     * @return {void}
     */
    private createSphere(): void {
        const _this = this;
        
        const geometry = new THREE.SphereGeometry(
            5, 32, 32
        );
        
        const material = new THREE.MeshBasicMaterial({
            color: '#ffff00'
        });
        
        _this.sphere = new THREE.Mesh(geometry, material);
        _this.sphere.position.set(0, 0, 0);
        _this.sphere.rotation.set(0, 0, 0);
    }
}
