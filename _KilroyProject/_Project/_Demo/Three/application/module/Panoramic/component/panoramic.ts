import Global from '../../../constant/global';
import Component from '../../../interface/component';

import * as THREE from 'three';

interface Texture { // 纹理
    image: THREE.Texture // 图片
    cube: THREE.CubeTexture // 图组
}

/**
 * 全景
 */
export default class Panoramic implements Component {
    private readonly name: string = 'Panoramic-全景';
    
    private scene: THREE.Scene = null; // 场景
    private texture: Texture = null; // 纹理
    
    public instance: THREE.Mesh = null; // 实例
    
    /**
     * 原型对象
     * @constructor Panoramic
     * @param {object} scene 场景
     * @param {Texture} texture 纹理
     */
    constructor(scene: object, texture: Texture) {
        const _this = this;
        
        _this.scene = scene.instance;
        _this.texture = texture;
    
        // _this.scene.background = _this.texture.cube;
        
        _this.create();
        _this.init();
    }
    
    /**
     * 创建
     * @return {void}
     */
    private create(): void {
        const _this = this,
            image = _this.texture.image,
            cube = _this.texture.cube;
        
        // 球型几何体
        const geometry = new THREE.SphereGeometry(
            1500, 64, 64
        );
        geometry.scale(-1, 1, 1);
        geometry.rotateY(-Math.PI / 2); // 视角平行
        
        // 材料
        const material = new THREE.MeshBasicMaterial({
            map: image
        });
        
        _this.instance = new THREE.Mesh(geometry, material);
        _this.instance.name = _this.name;
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
}
