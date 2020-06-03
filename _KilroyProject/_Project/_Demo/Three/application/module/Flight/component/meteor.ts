import Global from '../../../constant/global';
import Component from '../../../interface/component';

import * as THREE from 'three';

/**
 * 流星
 */
export default class Meteor implements Component {
    private readonly name: string = 'Meteor-流星';
    
    private scene: THREE.Scene = null; // 场景
    
    public star: THREE.Mesh[] = []; // 流星列表
    private readonly moveP: object = { // 移动位置
        x: 0,
        y: 300,
        z: 200
    };
    private readonly lookP: object = { // 视觉位置
        x: 0,
        y: 0,
        z: 0
    };
    
    public instance: THREE.Group = null; // 实例
    
    
    /**
     * 构造函数
     * @constructor Meteor
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
        _this.instance.position.set(_this.moveP.x, _this.moveP.y, _this.moveP.z);
        _this.instance.rotation.set(_this.lookP.x, _this.lookP.y, _this.lookP.z);
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
        
        _this.star = [];
        _this.instance = null;
    }
    
    /**
     * 更新
     * @return {void}
     */
    public update(): void {
        const _this = this,
            ease = 15, // 缓冲系数
            mouseS = 0.1; // 鼠标速度
        
        if (!_this.instance) return;
        
        Math.random() > 0.95 && _this.createStar();
        
        _this.star.forEach((v: THREE.Mesh, i: number, a: THREE.Mesh[]) => {
            if (v.position.z < -3000) {
                _this.star.splice(i, 1);
                _this.instance.remove(v);
            }
            v.position.z -= 20;
        });
        
        _this.moveP.x = -((Global.mouseP.x - Global.Function.getDomCenter().x) * mouseS);
        
        Global.Function.setEase(_this.instance.position, _this.moveP, ease);
        Global.Function.setEase(_this.instance.rotation, _this.lookP, ease);
    }
    
    /**
     * 创建星星
     * @return {void}
     */
    private createStar(): void {
        const _this = this,
            spread = 1000; // 扩散范围
        
        const random = THREE.MathUtils.randInt(-spread, spread); // 随机整数
        
        const geometry = new THREE.CylinderGeometry( // 几何体
            0, 2, 120, 10
        );
        
        const material = new THREE.MeshBasicMaterial({ // 材质
            color: '#ffffff',
            opacity: 1,
            blending: THREE.AdditiveBlending,
            side: THREE.FrontSide,
            transparent: true,
            depthTest: true
        });
        
        const cylinder = new THREE.Mesh(geometry, material); // 圆柱
        cylinder.position.set(random, 0, 0);
        cylinder.rotation.set(Math.PI / 2, 0, 0);
        
        _this.star.push(cylinder);
        _this.instance.add(cylinder);
    }
}
