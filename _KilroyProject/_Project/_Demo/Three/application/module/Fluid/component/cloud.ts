import Global from '../../../constant/global';
import Component from '../../../interface/component';

import * as THREE from 'three';

/**
 * 云
 */
export default class Cloud implements Component {
    private readonly name: string = 'Cloud-云';
    
    private scene: THREE.Scene = null; // 场景
    
    private readonly radio: number = 1000; // 运动半径
    private cloud: THREE.Mesh[] = []; // 云
    private geometry: THREE.DodecahedronGeometry = null; // 几何
    private material: THREE.MeshPhongMaterial = null; // 纹理
    
    public instance: THREE.Group = null; // 实例
    
    /**
     * 构造函数
     * @constructor Cloud
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
        _this.instance.position.set(0, 0, 0);
        
        _this.geometry = new THREE.DodecahedronGeometry(20, 0);
        _this.material = new THREE.MeshPhongMaterial({
            color: '#d8d0d1'
        });
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
        
        if (Math.random() > 0.9) {
            if (_this.cloud.length > 1) return;
            const cloud = _this.createCloud();
            cloud.position.set(0, 0, 0);
            cloud.rotation.y = Math.random() * Math.PI * 2;
            cloud.rotation.z = Math.random() * Math.PI * 2;
            cloud.scale.setScalar(Global.Base.getRandomInt(1, 9) / 10);
            _this.cloud.push(cloud);
            _this.instance.add(cloud);
        }
    }
    
    /**
     * 创建云朵
     * @return {THREE.Mesh} 云朵
     */
    private createCloud(): THREE.Mesh {
        const _this = this,
            cloud = new THREE.Mesh(_this.geometry, _this.material);
        
        return cloud;
    }
}
