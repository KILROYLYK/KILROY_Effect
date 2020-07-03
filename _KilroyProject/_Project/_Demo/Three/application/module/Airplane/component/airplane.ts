import Global from '../../../constant/global';
import Component from '../../../interface/component';

import * as THREE from 'three';

/**
 * 飞机
 */
export default class Airplane implements Component {
    private readonly name: string = 'Airplane-飞机';
    
    private scene: THREE.Scene = null; // 场景
    
    private cockpit: THREE.Group = null; // 船舱
    private engine: THREE.Group = null; // 引擎
    private wing: THREE.Group = null; // 机翼
    private tail: THREE.Group = null; // 尾翼
    private propeller: THREE.Object3D = null; // 螺旋桨
    
    public instance: THREE.Object3D = null; // 实例
    
    /**
     * 构造函数
     * @constructor Airplane
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
        _this.instance.position.set(0, 650, 0);
        
        _this.createCockpit();
        _this.createEngine();
        _this.createPropeller();
        _this.createWing();
        _this.createTail();
    }
    
    /**
     * 初始化
     * @return {void}
     */
    private init(): void {
        const _this = this;
        
        _this.instance.add(_this.cockpit);
        _this.instance.add(_this.engine);
        _this.instance.add(_this.wing);
        _this.instance.add(_this.tail);
        _this.instance.add(_this.propeller);
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
        
        _this.propeller.rotateX(0.3);
    }
    
    /**
     * 创建船舱
     * @return {void}
     */
    private createCockpit(): void {
        const _this = this;
        
        const geometryB = new THREE.BoxGeometry(
            80, 50, 50,
            1, 1, 1
            ),
            materialB = new THREE.MeshPhongMaterial({
                color: '#f25346',
                shading: THREE.FlatShading
            }),
            body = new THREE.Mesh(geometryB, materialB);
        geometryB.vertices[4].y -= 10;
        geometryB.vertices[4].z += 20;
        geometryB.vertices[5].y -= 10;
        geometryB.vertices[5].z -= 20;
        geometryB.vertices[6].y += 30;
        geometryB.vertices[6].z += 20;
        geometryB.vertices[7].y += 30;
        geometryB.vertices[7].z -= 20;
        body.position.set(0, 0, 0);
        body.castShadow = true;
        body.receiveShadow = true;
        
        const geometryC = new THREE.BoxGeometry(
            20, 5, 20,
            1, 1, 1
            ),
            materialC = new THREE.MeshPhongMaterial({
                color: '#911610',
                shading: THREE.FlatShading
            }),
            cockpit = new THREE.Mesh(geometryC, materialC);
        cockpit.position.set(20, 23, 0);
        cockpit.castShadow = true;
        cockpit.receiveShadow = true;
        
        const geometryW = new THREE.BoxGeometry(
            3, 15, 30,
            1, 1, 1
            ),
            materialW = new THREE.MeshPhongMaterial({
                color: '#d8d0d1',
                shading: THREE.FlatShading,
                opacity: .3,
                transparent: true
            }),
            windshield = new THREE.Mesh(geometryW, materialW);
        windshield.position.set(30, 30, 0);
        
        _this.cockpit = new THREE.Group();
        _this.cockpit.position.set(0, 0, 0);
        _this.cockpit.add(body);
        _this.cockpit.add(cockpit);
        _this.cockpit.add(windshield);
    }
    
    /**
     * 创建引擎
     * @return {void}
     */
    private createEngine(): void {
        const _this = this;
        
        const geometryE = new THREE.BoxGeometry(
            20, 50, 50,
            1, 1, 1
            ),
            materialE = new THREE.MeshPhongMaterial({
                color: '#d8d0d1',
                shading: THREE.FlatShading
            }),
            engine = new THREE.Mesh(geometryE, materialE);
        engine.castShadow = true;
        engine.receiveShadow = true;
        
        const geometryD = new THREE.BoxGeometry(
            20, 10, 10,
            1, 1, 1
            ),
            materialD = new THREE.MeshPhongMaterial({
                color: '#59332e',
                shading: THREE.FlatShading
            }),
            drill = new THREE.Mesh(geometryD, materialD);
        geometryD.vertices[4].y -= 5;
        geometryD.vertices[4].z += 5;
        geometryD.vertices[5].y -= 5;
        geometryD.vertices[5].z -= 5;
        geometryD.vertices[6].y += 5;
        geometryD.vertices[6].z += 5;
        geometryD.vertices[7].y += 5;
        geometryD.vertices[7].z -= 5;
        drill.position.set(7, 0, 0);
        drill.castShadow = true;
        drill.receiveShadow = true;
        
        
        _this.engine = new THREE.Group();
        _this.engine.position.set(40, 0, 0);
        _this.engine.add(engine);
        _this.engine.add(drill);
    }
    
    /**
     * 创建机翼
     * @return {void}
     */
    private createWing(): void {
        const _this = this;
        
        const geometry = new THREE.BoxGeometry(
            40, 4, 120,
            1, 1, 1
            ),
            material = new THREE.MeshPhongMaterial({
                color: '#911610',
                shading: THREE.FlatShading
            }),
            topMesh = new THREE.Mesh(geometry, material),
            bottomMesh = new THREE.Mesh(geometry, material);
        topMesh.position.set(20, 10, 0);
        topMesh.castShadow = true;
        topMesh.receiveShadow = true;
        bottomMesh.position.set(20, -5, 0);
        bottomMesh.castShadow = true;
        bottomMesh.receiveShadow = true;
        
        _this.wing = new THREE.Group();
        _this.wing.position.set(0, 0, 0);
        _this.wing.add(topMesh);
        _this.wing.add(bottomMesh);
    }
    
    /**
     * 创建尾翼
     * @return {void}
     */
    private createTail(): void {
        const _this = this;
        
        const geometry = new THREE.BoxGeometry(
            15, 25, 5,
            1, 1, 1
            ),
            material = new THREE.MeshPhongMaterial({
                color: '#911610',
                shading: THREE.FlatShading
            }),
            topMesh = new THREE.Mesh(geometry, material);
        topMesh.castShadow = true;
        topMesh.receiveShadow = true;
        
        _this.tail = new THREE.Group();
        _this.tail.position.set(-35, 20, 0);
        _this.tail.add(topMesh);
    }
    
    /**
     * 创建螺旋桨
     * @return {void}
     */
    private createPropeller(): void {
        const _this = this;
        
        const geometry = new THREE.BoxGeometry(
            1, 80, 10,
            1, 1, 1
            ),
            material = new THREE.MeshPhongMaterial({
                color: '#23190f',
                shading: THREE.FlatShading
            }),
            blade1 = new THREE.Mesh(geometry, material),
            blade2 = new THREE.Mesh(geometry, material);
        blade1.castShadow = true;
        blade1.receiveShadow = true;
        blade2.rotation.set(Math.PI / 2, 0, 0);
        blade2.castShadow = true;
        blade2.receiveShadow = true;
        
        _this.propeller = new THREE.Object3D();
        _this.propeller.position.set(55, 0, 0);
        _this.propeller.add(blade1);
        _this.propeller.add(blade2);
    }
}
