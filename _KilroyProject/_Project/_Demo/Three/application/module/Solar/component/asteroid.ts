import Global from '../../../constant/global';
import Component from '../../../interface/component';

import * as THREE from 'three';

/**
 * 小行星
 */
export default class Asteroid implements Component {
    private readonly name: string = 'Asteroid-小行星';
    
    private scene: THREE.Scene = null; // 场景
    
    private readonly radius: number = 1200; // 半径
    private readonly trackR: number = 500 + 200 * 5; // 轨迹半径
    private pointB: THREE.Points = null; // 宽星带
    private pointS: THREE.Points = null; // 窄星带
    
    public instance: THREE.Group = null; // 实例
    
    /**
     * 构造函数
     * @constructor Asteroid
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
        
        _this.createPointB();
        _this.createPointS();
    }
    
    /**
     * 初始化
     * @return {void}
     */
    private init(): void {
        const _this = this;
        
        _this.instance.add(_this.pointB);
        _this.instance.add(_this.pointS);
        _this.scene.add(_this.instance);
    }
    
    /**
     * 销毁
     * @return {void}
     */
    public destroy(): void {
        const _this = this;
        
        if (!_this.instance) return;
        
        _this.pointB = null;
        _this.pointS = null;
        _this.instance = null;
    }
    
    /**
     * 更新
     * @return {void}
     */
    public update(): void {
        const _this = this,
            cycleS = 0.001; // 周期速度
        
        if (!_this.instance) return;
        
        _this.pointB.rotateY(cycleS);
        _this.pointS.rotateY(cycleS * 2);
    }
    
    /**
     * 创建宽星星带
     * @return {void}
     */
    private createPointB(): void {
        const _this = this,
            total = 10000,
            min = _this.trackR,
            max = _this.trackR + _this.radius,
            point = [],
            color = [];
        
        for (let i = 0; i < total; i++) {
            const position = _this.getPosition(min, max);
            point.push(position.x, 0, position.z);
            color.push(255, 255, 255);
        }
        
        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute('position', new THREE.Float32BufferAttribute(point, 3));
        geometry.setAttribute('color', new THREE.Float32BufferAttribute(color, 3));
        
        const material = new THREE.PointsMaterial({
            size: 1
        });
        
        _this.pointB = new THREE.Points(geometry, material);
    }
    
    /**
     * 创建宽星星带
     * @return {void}
     */
    private createPointS(): void {
        const _this = this,
            total = 10000,
            min = _this.trackR + 200,
            max = _this.trackR + _this.radius - 200,
            point = [],
            color = [];
        
        for (let i = 0; i < total; i++) {
            const position = _this.getPosition(min, max);
            point.push(position.x, 0, position.z);
            color.push(255, 255, 255);
        }
        
        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute('position', new THREE.Float32BufferAttribute(point, 3));
        geometry.setAttribute('color', new THREE.Float32BufferAttribute(color, 3));
        
        const material = new THREE.PointsMaterial({
            size: 1,
            sizeAttenuation: true
        });
        
        _this.pointS = new THREE.Points(geometry, material);
    }
    
    /**
     * 获取环形坐标
     * @param {number} min 最小半径
     * @param {number} max 最大半径
     * @return {object} 坐标
     */
    private getPosition(min: number, max: number): object {
        const _this = this,
            position = {
                x: Global.Base.getRandomInt(-max, max),
                z: Global.Base.getRandomInt(-max, max)
            },
            x = Math.pow(position.x, 2),
            z = Math.pow(position.z, 2),
            d = Math.sqrt(x + z);
        
        
        if (d > max || d < min) return _this.getPosition(min, max);
        
        return position;
    }
}
