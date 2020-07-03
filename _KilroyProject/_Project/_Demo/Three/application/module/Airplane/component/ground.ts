import Global from '../../../constant/global';
import Component from '../../../interface/component';

import * as THREE from 'three';

/**
 * 地面
 */
export default class Ground implements Component {
    private readonly name: string = 'Ground-地面';
    
    private scene: THREE.Scene = null; // 场景
    
    private readonly radius: number = 500; // 半径
    
    public instance: THREE.Mesh = null; // 实例
    
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
        const _this = this,
            matrix = new THREE.Matrix4();
        
        const geometry = new THREE.CylinderGeometry(
            _this.radius, _this.radius, 1400,
            40, 10
        );
        geometry.applyMatrix4(matrix.makeRotationX(-Math.PI / 2));
        
        const material = new THREE.MeshPhongMaterial({
            color: '#629265',
            flatShading: true
        });
        
        _this.instance = new THREE.Mesh(geometry, material);
        _this.instance.name = _this.name;
        _this.instance.position.set(0, 0, 0);
        _this.instance.castShadow = false;
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
    }
    
    /**
     * 更新
     * @return {void}
     */
    public update(): void {
        const _this = this;
        
        if (!_this.instance) return;
        
        _this.instance.rotateZ(0.005);
    }
}
