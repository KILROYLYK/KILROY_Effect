import Global from '../../../constant/global';
import Component from '../../../interface/component';

import * as THREE from 'three';
import Stage from "../../Solar/stage";

/**
 * 太阳
 */
export default class Sun implements Component {
    private readonly name: string = 'Sun-太阳';
    
    private scene: THREE.Scene = null; // 场景
    
    private readonly trackR: number = 800; // 轨迹半径
    private readonly shadowS: number = 2048; // 阴影大小
    private sun: THREE.Mesh = null; // 太阳
    private moon: THREE.Mesh = null; // 月亮
    
    public instance: THREE.Group = null; // 实例
    
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
        
        _this.instance = new THREE.Group();
        _this.instance.name = _this.name;
        _this.instance.position.set(0, 0, -1000);
        
        _this.createSun();
        _this.createMoon();
    }
    
    /**
     * 初始化
     * @return {void}
     */
    private init(): void {
        const _this = this;
        
        _this.instance.add(_this.sun);
        _this.instance.add(_this.moon);
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
    }
    
    /**
     * 创建太阳
     * @return {void}
     */
    private createSun(): void {
        const _this = this;
        
        const geometry = new THREE.SphereGeometry(
            500, 20, 10
        );
        
        const material = new THREE.MeshPhongMaterial({
            color: '#edeb27',
            shading: THREE.FlatShading
        });
        
        _this.sun = new THREE.Mesh(geometry, material);
        _this.sun.name = _this.name;
        _this.sun.position.set(0, -100, 0);
    }
    
    /**
     * 创建月亮
     * @return {void}
     */
    private createMoon(): void {
        const _this = this;
        
        const geometry = new THREE.SphereGeometry(
            400, 20, 10
        );
        
        const material = new THREE.MeshPhongMaterial({
            color: '#ffffff',
            shading: THREE.FlatShading
        });
        
        _this.moon = new THREE.Mesh(geometry, material);
        _this.moon.name = _this.name;
        _this.moon.position.set(0, -100, 0);
    }
}
