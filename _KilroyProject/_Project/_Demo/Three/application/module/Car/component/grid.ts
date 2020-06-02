import Global from '../../../constant/global';
import Component from '../../../interface/component';

import * as THREE from 'three';

/**
 * 网格
 */
export default class Grid implements Component {
    private readonly name: string = 'Grid-网格';
    
    private scene: THREE.Scene = null; // 场景
    
    private size: number = 10000; // 尺寸
    private division: number = 400; // 格子尺寸
    
    public instance: THREE.Object3D = null; // 实例
    
    /**
     * 构造函数
     * @constructor Grid
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
        
        _this.instance = new THREE.Object3D();
        _this.instance.name = _this.name;
        _this.instance.position.set(0, 0, 0);
        _this.instance.rotation.set(Math.PI / 2, 0, 0);
        
        _this.createGrid();
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
    
    /**
     * 创建网格
     * @return {void}
     */
    private createGrid(): void {
        const _this = this,
            radius = _this.size / 2;
        
        const geometry = new THREE.Geometry();
        geometry.vertices.push(new THREE.Vector3(-radius, 0, 0));
        geometry.vertices.push(new THREE.Vector3(radius, 0, 0));
        
        const material = new THREE.LineBasicMaterial({
            color: '#cccccc',
            linewidth: 200
        })
        
        for (let i = 0, len = _this.size / _this.division; i <= len; i++) {
            const lineX = new THREE.Line(geometry, material);
            lineX.position.y = i * _this.division - radius;
            
            const lineY = new THREE.Line(geometry, material);
            lineY.position.x = i * _this.division - radius;
            lineY.rotation.z = Math.PI / 2;
            
            _this.instance.add(lineX);
            _this.instance.add(lineY);
        }
    }
}
