import Global from '../../../constant/global';
import Component from '../../../interface/component';

import * as THREE from 'three';

/**
 * 太阳
 */
export default class Sun implements Component {
    private readonly name: string = 'Sun-太阳';
    
    private scene: THREE.Scene = null; // 场景
    
    public instance: THREE.Mesh = null; // 实例
    
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
        
        const geometry = new THREE.SphereGeometry(
            400, 20, 10
        );
        
        const material = new THREE.MeshPhongMaterial({
            color: '#edeb27',
            shading: THREE.FlatShading,
        });
        
        _this.instance = new THREE.Mesh(geometry, material);
        _this.instance.name = _this.name;
        _this.instance.position.set(0, 0, -1000);
        _this.instance.castShadow = false;
        _this.instance.receiveShadow = false;
    }
    
    /**
     * 初始化
     * @return {void}
     */
    private init(): void {
        const _this = this;

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
        const _this = this;
    }
}
