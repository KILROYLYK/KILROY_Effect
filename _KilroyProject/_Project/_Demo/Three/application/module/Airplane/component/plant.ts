import Global from '../../../constant/global';
import Component from '../../../interface/component';

import * as THREE from 'three';

/**
 * 植物
 */
export default class Plant implements Component {
    private readonly name: string = 'Plant-植物';
    
    private scene: THREE.Scene = null; // 场景
    
    private plant: {}[] = []; // 植物
    
    public instance: THREE.Group = null; // 实例
    
    /**
     * 构造函数
     * @constructor Plant
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
        
        _this.createTree();
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
        
        if (Math.random() > 0.98) ;
    }
    
    /**
     * 创建树木
     * @return {void}
     */
    private createTree(): void {
        const _this = this,
            trackR = 500, // 轨道半径
            range = 350, // 范围
            height = 20,
            scale = Global.Base.getRandomInt(1, 3) / 10;
        
        const trunkG = new THREE.BoxGeometry(10, height, 10),
            trunkM = new THREE.MeshBasicMaterial({
                color: '#59332e'
            }),
            trunk = new THREE.Mesh(trunkG, trunkM);
        trunk.position.set(0, trackR + scale * height / 2, Global.Base.getRandomInt(-range, range));
        
        const leavesG1 = new THREE.CylinderGeometry(
            1, 12 * 3,
            12 * 3, 4
            ),
            leavesG2 = new THREE.CylinderGeometry(
                1, 9 * 3,
                9 * 3, 4
            ),
            leavesG3 = new THREE.CylinderGeometry(
                1, 6 * 3,
                6 * 3, 4
            );
        
        
        const tree = new THREE.Object3D();
        tree.add(trunk);
    }
    
    /**
     * 创建花朵
     * @return {void}
     */
    private createFlower(): void {
        const _this = this;
        
    }
}
