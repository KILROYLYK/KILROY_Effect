import Global from '../../../constant/global';
import Component from '../../../interface/component';

import * as THREE from 'three';

/**
 * 植物
 */
export default class Plant implements Component {
    private readonly name: string = 'Plant-植物';
    
    private scene: THREE.Scene = null; // 场景
    
    private plant: {
        cycle: number,
        track: number,
        object: THREE.Object3D
    }[] = []; // 植物
    
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
        
        if (Math.random() > 0.98) _this.createTree();
        
        _this.plant = _this.plant.filter((v, i, a) => {
            v.cycle += cycleS;
            v.object.position.x = Math.cos(v.cycle) * v.track;
            v.object.position.y = Math.sin(v.cycle) * v.track;
            v.object.rotation.z = -Math.PI / 2 + v.cycle;
            if (v.cycle > Math.PI) {
                _this.instance.remove(v.object);
                return false;
            }
            return true;
        });
    }
    
    /**
     * 创建树木
     * @return {void}
     */
    private createTree(): void {
        const _this = this,
            track = 500, // 轨道
            height = 20,
            scale = Global.Base.getRandomInt(2, 4) / 3,
            y = track + height * scale / 2;
        
        const trunkG = new THREE.BoxGeometry(10, height, 10),
            trunkM = new THREE.MeshBasicMaterial({
                color: '#59332e',
                flatShading: true
            }),
            trunk = new THREE.Mesh(trunkG, trunkM);
        trunk.position.set(0, 0, 0);
        trunk.castShadow = true;
        trunk.receiveShadow = true;
        
        const leavesG1 = new THREE.CylinderGeometry(
            1, 36,
            36, 4
            ),
            leavesG2 = new THREE.CylinderGeometry(
                1, 27,
                27, 4
            ),
            leavesG3 = new THREE.CylinderGeometry(
                1, 18,
                18, 4
            ),
            leavesM = new THREE.MeshPhongMaterial({
                color: '#157218',
                flatShading: true
            }),
            leaves1 = new THREE.Mesh(leavesG1, leavesM),
            leaves2 = new THREE.Mesh(leavesG2, leavesM),
            leaves3 = new THREE.Mesh(leavesG3, leavesM);
        leaves1.position.set(0, height / 2 + 36 / 2, 0);
        leaves1.castShadow = true;
        leaves1.receiveShadow = true;
        leaves2.position.set(0, height / 2 + 36 * 0.6 + 27 / 2, 0);
        leaves2.castShadow = true;
        leaves2.receiveShadow = true;
        leaves3.position.set(0, height / 2 + 36 * 0.6 + 27 * 0.7 + 18 / 2, 0);
        leaves3.castShadow = true;
        leaves3.receiveShadow = true;
        
        
        const tree = new THREE.Object3D();
        tree.position.set(0, y, Global.Base.getRandomInt(-350, 500));
        tree.scale.setScalar(scale);
        tree.add(trunk);
        tree.add(leaves1);
        tree.add(leaves2);
        tree.add(leaves3);
        _this.plant.push({
            cycle: 0,
            track: y,
            object: tree
        });
        _this.instance.add(tree);
    }
    
    /**
     * 创建花朵
     * @return {void}
     */
    private createFlower(): void {
        const _this = this;
        
    }
}
