import Global from '../../../constant/global';
import Component from '../../../interface/component';

import * as THREE from 'three';

/**
 * 全景
 */
export default class Panoramic implements Component {
    private readonly name: string = 'Panoramic-全景';
    
    private scene: THREE.Scene = null; // 场景
    private texture: THREE.Texture = null; // 纹理
    
    public instance: THREE.Mesh = null; // 实例
    
    /**
     * 原型对象
     * @constructor Panoramic
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
        
        // 球型几何体
        const geometry = new THREE.SphereGeometry(
            15000, 64, 64
        );
        geometry.scale(-1, 1, 1);
        geometry.rotateY(-Math.PI / 2); // 视角平行
        
        // 材料
        const material = new THREE.MeshBasicMaterial({
            map: _this.texture
        });
        
        _this.instance = new THREE.Mesh(geometry, material);
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
        
        _this.instance = null;
    }
}
