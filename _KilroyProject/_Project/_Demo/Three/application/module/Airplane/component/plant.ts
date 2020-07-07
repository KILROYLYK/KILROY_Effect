import Global from '../../../constant/global';
import Component from '../../../interface/component';

import * as THREE from 'three';

/**
 * 植物
 */
export default class Plant implements Component {
    private readonly name: string = 'Plant-植物';
    
    private scene: THREE.Scene = null; // 场景
    
    private readonly track: number = 1000; // 轨道
    private readonly range: number = 0.2; // 范围
    private plant: {
        cycle: number,
        y: number,
        z: number,
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
            cycleS = 0.003; // 周期速度
        
        if (Math.random() > 0.8) _this.createTree();
        if (Math.random() > 0.9) _this.createFlower();
        
        _this.plant = _this.plant.filter((v, i, a) => {
            v.cycle += cycleS;
            v.object.position.x = Math.cos(v.cycle) * v.y;
            v.object.position.y = Math.sin(v.cycle) * v.y;
            v.object.rotation.z = -Math.PI / 2 + v.cycle;
            if (v.cycle >= Math.PI * (1 - _this.range)) {
                _this.instance.remove(v.object);
                return false;
            }
            return true;
        });
    }
    
    /**
     * 获取植物位置
     * @return {number} z轴位置
     */
    private getPlantPosition(): number {
        const _this = this,
            position = Global.Base.getRandomInt(-350, 500),
            plant = _this.plant.find((v, i, a) => {
                return v.cycle < 0.7 && Math.abs(position - v.z) <= 50
            });
        if (plant) {
            return 0;
        } else {
            return position;
        }
    }
    
    /**
     * 创建树木
     * @return {void}
     */
    private createTree(): void {
        const _this = this,
            height = 12, // 树干高
            scale = Global.Base.getRandomInt(2, 5) * 0.3,
            y = _this.track + height * scale / 2 - 2,
            z = _this.getPlantPosition();
        
        if (z === 0) return;
        
        const trunkG = new THREE.CylinderGeometry(
            10, 10, height,
            6, 6),
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
        
        const tree = new THREE.Group(),
            treeBox = new THREE.Object3D();
        tree.position.set(0, 0, 0);
        tree.rotation.set(0, Math.random() * Math.PI * 2, 0);
        tree.add(trunk);
        tree.add(leaves1);
        tree.add(leaves2);
        tree.add(leaves3);
        treeBox.position.set(0, y, z);
        treeBox.scale.setScalar(scale);
        treeBox.add(tree);
        _this.plant.push({
            cycle: Math.PI * _this.range,
            y, z,
            object: treeBox
        });
        _this.instance.add(treeBox);
    }
    
    /**
     * 创建花朵
     * @return {void}
     */
    private createFlower(): void {
        const _this = this,
            color = [
                '#f25346',
                '#edeb27',
                '#f5986e',
                '#68c3c0',
                '#551a8b'
            ],
            petalD = 12,
            height = Global.Base.getRandomInt(30, 50) + 2, // 花枝高
            scale = Global.Base.getRandomInt(2, 4) * 0.1,
            y = _this.track + height * scale / 2 - 2,
            z = _this.getPlantPosition();
        
        if (z === 0) return;
        
        const trunkG = new THREE.CylinderGeometry(
            3, 3, height,
            6, 6),
            trunkM = new THREE.MeshBasicMaterial({
                color: '#157218',
                flatShading: true
            }),
            trunk = new THREE.Mesh(trunkG, trunkM);
        trunk.position.set(0, 0, 0);
        trunk.castShadow = true;
        trunk.receiveShadow = true;
        
        const petalM = new THREE.MeshBasicMaterial({
                color: color[Global.Base.getRandomInt(0, 4)],
                flatShading: true
            }),
            petalG = new THREE.BoxGeometry(
                15, 20, 5,
                1, 1, 1
            ),
            petalBox = new THREE.Group();
        petalG.vertices[5].y -= 4;
        petalG.vertices[4].y -= 4;
        petalG.vertices[7].y += 4;
        petalG.vertices[6].y += 4;
        petalBox.position.set(0, height - 15, 3);
        
        for (let i = 0; i < 4; i++) {
            const petal = new THREE.Mesh(petalG, petalM);
            if (i === 0) petal.position.set(petalD, 0, 0);
            if (i === 1) petal.position.set(0, petalD, 0);
            if (i === 2) petal.position.set(-petalD, 0, 0);
            if (i === 3) petal.position.set(0, -petalD, 0);
            petal.rotation.z = i * Math.PI / 2;
            petal.castShadow = true;
            petal.receiveShadow = true;
            petalBox.add(petal);
        }
        
        const flower = new THREE.Object3D();
        flower.position.set(0, y, z);
        flower.scale.setScalar(scale);
        flower.add(trunk);
        flower.add(petalBox);
        _this.plant.push({
            cycle: Math.PI * _this.range,
            y, z,
            object: flower
        });
        _this.instance.add(flower);
    }
}
