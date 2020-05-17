import Global from '../../../constant/global';
import _Object from '../../../interface/object';

import * as THREE from 'three';

/**
 * 流星
 */
export default class Meteor implements _Object {
    private scene: THREE.Scene = null; // 场景
    
    private instance: THREE.Mesh[] = []; // 流星列表
    
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
    }
    
    /**
     * 初始化
     * @return {void}
     */
    private init(): void {
        const _this = this;
    }
    
    /**
     * 销毁
     * @return {void}
     */
    public destroy(): void {
        const _this = this;
        
        _this.instance = [];
    }
    
    /**
     * 更新
     * @return {void}
     */
    public update(): void {
        const _this = this;
        
        Math.random() > 0.95 && _this.createStar();
        
        _this.instance.forEach((v: THREE.Mesh, i: number, a: THREE.Mesh[]) => {
            if (v.position.z < -3000) {
                _this.instance.splice(i, 1);
                this.scene.remove(v);
            }
            v.position.z -= 20;
        });
    }
    
    /**
     * 创建星星
     * @return {THREE.Mesh} 星星对象
     */
    private createStar(): void {
        const _this = this,
            spread = 1000; // 扩散范围
    
        const random = THREE.MathUtils.randInt(-spread, spread); // 随机整数
        
        const geometry = new THREE.CylinderGeometry(0, 2, 120, 10); // 几何体
       
        const material = new THREE.MeshBasicMaterial({ // 材质
                color: '#ffffff',
                opacity: 1,
                blending: THREE.AdditiveBlending,
                side: THREE.FrontSide,
                transparent: false,
                depthTest: true
            });
        
        const cylinder = new THREE.Mesh(geometry, material); // 圆柱
        cylinder.position.set(random, 300, 200);
        cylinder.rotation.set(Math.PI / 2, 0, 0);
        
        _this.instance.push(cylinder);
        _this.scene.add(cylinder);
    }
}
