import Global from '../../../constant/global';
import Component from '../../../interface/component';

import * as THREE from 'three';

/**
 * 云
 */
export default class Cloud implements Component {
    private readonly name: string = 'Cloud-云';
    
    private scene: THREE.Scene = null; // 场景
    
    private readonly radius: number = 20; // 半径
    private geometry: THREE.DodecahedronGeometry = null; // 几何
    private material: THREE.MeshPhongMaterial = null; // 纹理
    private cloud: {
        cycle: number,
        trackR: number,
        mesh: THREE.Mesh
    }[] = []; // 云
    
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
        
        _this.geometry = new THREE.DodecahedronGeometry(_this.radius, 0);
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
        const _this = this,
            cycleS = 0.002; // 周期速度
        
        if (Math.random() > 0.99) _this.createCloud();
        
        _this.cloud = _this.cloud.filter((v, i, a) => {
            v.cycle += cycleS;
            v.mesh.position.x = Math.cos(v.cycle) * v.trackR;
            v.mesh.position.y = Math.sin(v.cycle) * v.trackR;
            v.mesh.rotateX(cycleS);
            v.mesh.rotateY(cycleS);
            v.mesh.rotateZ(cycleS);
            if (v.cycle > Math.PI) {
                _this.instance.remove(v.mesh);
                return false;
            }
            return true;
        });
    }
    
    /**
     * 创建云朵
     * @return {void}
     */
    private createCloud(): void {
        const _this = this,
            n = Global.Base.getRandomInt(1, 4),
            y = Global.Base.getRandomInt(600, 700),
            z = Global.Base.getRandomInt(-350, 350);
        
        let cycle = 0; // 周期
        
        for (let i = 0; i < n; i++) {
            const scale = Global.Base.getRandomInt(1, 9) / 10,
                radius = scale * _this.radius * 0.8 / y;
            
            if (i !== 0) cycle += radius;
            
            const cloud = new THREE.Mesh(_this.geometry, _this.material);
            cloud.position.set(0, y, z);
            cloud.rotation.x = Math.random() * Math.PI * 2;
            cloud.rotation.y = Math.random() * Math.PI * 2;
            cloud.rotation.z = Math.random() * Math.PI * 2;
            cloud.scale.setScalar(scale);
            cloud.castShadow = true;
            _this.cloud.push({
                cycle,
                trackR: y,
                mesh: cloud
            });
            _this.instance.add(cloud);
            
            cycle += radius;
        }
    }
}
