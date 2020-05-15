import Global from '../../../constant/global';
import _Object from '../../../interface/object';

import * as THREE from 'three';

/**
 * 地面
 */
export default class Ground implements _Object {
    private scene: THREE.Scene = null; // 场景
    private texture: THREE.Texture = null; // 纹理
    
    public instance: THREE.Mesh = null; // 实例
    
    
    /**
     * 构造函数
     * @constructor Ground
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
    
        _this.texture.wrapS
            = _this.texture.wrapT
            = THREE.RepeatWrapping;
        _this.texture.repeat.set(25, 25);
        _this.texture.anisotropy = 16;
        _this.texture.encoding = THREE.sRGBEncoding;
        
        // 材料
        const material = new THREE.MeshLambertMaterial({
            map: _this.texture
        });
        
        // 几何体
        const geometry = new THREE.PlaneBufferGeometry(20000, 20000);
        
        // 啮合
        _this.instance = new THREE.Mesh(geometry, material);
        _this.instance.position.x = 0;
        _this.instance.position.y = 0;
        _this.instance.rotation.x = -Math.PI / 2;
        _this.instance.rotation.y = 0;
        _this.instance.receiveShadow = true;
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
