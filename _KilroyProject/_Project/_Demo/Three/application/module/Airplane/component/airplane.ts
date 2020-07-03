import Global from '../../../constant/global';
import Component from '../../../interface/component';

import * as THREE from 'three';

/**
 * 飞机
 */
export default class Airplane implements Component {
    private readonly name: string = 'Airplane-飞机';
    
    private scene: THREE.Scene = null; // 场景
    
    private airplane: THREE.Object3D = null; // 飞机
    private body: THREE.Group = null; // 机身
    private head: THREE.Group = null; // 机头
    private tail: THREE.Group = null; // 机尾
    private wing: THREE.Group = null; // 机翼
    private propeller: THREE.Object3D = null; // 螺旋桨
    private readonly moveP: object = { // 移动位置
        x: 0,
        y: 0,
        z: 0
    };
    
    public instance: THREE.Group = null; // 实例
    
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
        
        _this.airplane = new THREE.Object3D();
        _this.airplane.position.set(0, 0, 0);
        _this.airplane.scale.setScalar(0.6);
        
        _this.instance = new THREE.Group();
        _this.instance.name = _this.name;
        _this.instance.position.set(0, 650, 200);
        
        _this.createBody();
        _this.createHead();
        _this.createTail();
        _this.createWing();
        _this.createPropeller();
    }
    
    /**
     * 初始化
     * @return {void}
     */
    private init(): void {
        const _this = this;
        
        _this.airplane.add(_this.body);
        _this.airplane.add(_this.head);
        _this.airplane.add(_this.wing);
        _this.airplane.add(_this.tail);
        _this.airplane.add(_this.propeller);
        _this.instance.add(_this.airplane);
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
            ease = 12, // 缓冲系数
            moveS = 0.5,
            centerP = Global.Function.getDomCenter(); // 中心位置
        
        if (!_this.instance) return;
        
        _this.propeller.rotateX(0.3);
        
        _this.moveP.x = (Global.mouseP.x - centerP.x) * moveS;
        _this.moveP.y = -(Global.mouseP.y - centerP.y) * moveS;
        
        if (_this.moveP.x > 250) _this.moveP.x = 250;
        if (_this.moveP.x < -250) _this.moveP.x = -250;
        if (_this.moveP.y > 120) _this.moveP.y = 120;
        if (_this.moveP.y < -120) _this.moveP.y = -120;
        
        Global.Function.setEase(_this.airplane.position, _this.moveP, ease);
        Global.Function.setEase(_this.airplane.rotation, {
            x: -_this.moveP.y * 0.005,
            y: 0,
            z: -_this.moveP.x * 0.002
        }, ease);
    }
    
    /**
     * 创建机身
     * @return {void}
     */
    private createBody(): void {
        const _this = this;
        
        const bodyG = new THREE.BoxGeometry(
            80, 50, 50,
            1, 1, 1
            ),
            bodyM = new THREE.MeshPhongMaterial({
                color: '#f25346',
                flatShading: true
            }),
            body = new THREE.Mesh(bodyG, bodyM);
        bodyG.vertices[4].y -= 10;
        bodyG.vertices[4].z += 20;
        bodyG.vertices[5].y -= 10;
        bodyG.vertices[5].z -= 20;
        bodyG.vertices[6].y += 30;
        bodyG.vertices[6].z += 20;
        bodyG.vertices[7].y += 30;
        bodyG.vertices[7].z -= 20;
        body.position.set(0, 0, 0);
        body.castShadow = true;
        body.receiveShadow = true;
        
        const seatG = new THREE.BoxGeometry(
            20, 5, 20,
            1, 1, 1
            ),
            seatM = new THREE.MeshPhongMaterial({
                color: '#911610',
                flatShading: true
            }),
            seat = new THREE.Mesh(seatG, seatM);
        seat.position.set(20, 23, 0);
        seat.castShadow = true;
        seat.receiveShadow = true;
        
        const windshieldG = new THREE.BoxGeometry(
            3, 10, 30,
            1, 1, 1
            ),
            windshieldM = new THREE.MeshPhongMaterial({
                color: '#d8d0d1',
                flatShading: true,
                opacity: .3,
                transparent: true
            }),
            windshield = new THREE.Mesh(windshieldG, windshieldM);
        windshield.position.set(30, 30, 0);
        
        const bracketG = new THREE.BoxGeometry(
            34, 15, 10,
            1, 1, 1
            ),
            bracketM = new THREE.MeshPhongMaterial({
                color: '#911610',
                flatShading: true
            }),
            leftBracket = new THREE.Mesh(bracketG, bracketM),
            rightBracket = new THREE.Mesh(bracketG, bracketM);
        leftBracket.position.set(23, -12, -25);
        leftBracket.castShadow = true;
        leftBracket.receiveShadow = true;
        rightBracket.position.set(23, -12, 25);
        rightBracket.castShadow = true;
        rightBracket.receiveShadow = true;
        
        const wheelG = new THREE.CylinderGeometry(
            5, 5, 5,
            8, 8),
            wheelM = new THREE.MeshBasicMaterial({
                color: '#070707',
                flatShading: true
            }),
            leftWheel = new THREE.Mesh(wheelG, wheelM),
            rightWheel = new THREE.Mesh(wheelG, wheelM);
        leftWheel.position.set(18, -20, -25);
        leftWheel.rotation.set(Math.PI / 2, 0, 0);
        leftWheel.castShadow = true;
        leftWheel.receiveShadow = true;
        rightWheel.position.set(18, -20, 25);
        rightWheel.rotation.set(Math.PI / 2, 0, 0);
        rightWheel.castShadow = true;
        rightWheel.receiveShadow = true;
        
        _this.body = new THREE.Group();
        _this.body.position.set(0, 0, 0);
        _this.body.add(body);
        _this.body.add(seat);
        _this.body.add(windshield);
        _this.body.add(leftBracket);
        _this.body.add(rightBracket);
        _this.body.add(leftWheel);
        _this.body.add(rightWheel);
    }
    
    /**
     * 创建机头
     * @return {void}
     */
    private createHead(): void {
        const _this = this;
        
        const headG = new THREE.BoxGeometry(
            20, 50, 50,
            1, 1, 1
            ),
            headM = new THREE.MeshPhongMaterial({
                color: '#d8d0d1',
                flatShading: true
            }),
            head = new THREE.Mesh(headG, headM);
        head.position.set(40, 0, 0);
        head.castShadow = true;
        head.receiveShadow = true;
        
        const drillG = new THREE.BoxGeometry(
            20, 10, 10,
            1, 1, 1
            ),
            drillM = new THREE.MeshPhongMaterial({
                color: '#59332e',
                flatShading: true
            }),
            drill = new THREE.Mesh(drillG, drillM);
        drillG.vertices[4].y -= 5;
        drillG.vertices[4].z += 5;
        drillG.vertices[5].y -= 5;
        drillG.vertices[5].z -= 5;
        drillG.vertices[6].y += 5;
        drillG.vertices[6].z += 5;
        drillG.vertices[7].y += 5;
        drillG.vertices[7].z -= 5;
        drill.position.set(47, 0, 0);
        drill.castShadow = true;
        drill.receiveShadow = true;
        
        _this.head = new THREE.Group();
        _this.head.position.set(0, 0, 0);
        _this.head.add(head);
        _this.head.add(drill);
    }
    
    /**
     * 创建机尾
     * @return {void}
     */
    private createTail(): void {
        const _this = this;
        
        const topTG = new THREE.BoxGeometry(
            15, 25, 5,
            1, 1, 1
            ),
            topTM = new THREE.MeshPhongMaterial({
                color: '#911610',
                flatShading: true
            }),
            topTail = new THREE.Mesh(topTG, topTM);
        topTail.position.set(-35, 20, 0);
        topTail.castShadow = true;
        topTail.receiveShadow = true;
        
        const bottomTG = new THREE.BoxGeometry(
            15, 5, 5,
            1, 1, 1
            ),
            bottomTM = new THREE.MeshPhongMaterial({
                color: '#911610',
                flatShading: true
            }),
            bottomTail = new THREE.Mesh(bottomTG, bottomTM);
        bottomTail.position.set(-35, 2, 0);
        bottomTail.castShadow = true;
        bottomTail.receiveShadow = true;
        
        const bracketG = new THREE.BoxGeometry(
            10, 5, 22,
            1, 1, 1
            ),
            bracketTM = new THREE.MeshPhongMaterial({
                color: '#911610',
                flatShading: true
            }),
            bracket = new THREE.Mesh(bracketG, bracketTM);
        bracket.position.set(-18, -2, 0);
        bracket.castShadow = true;
        bracket.receiveShadow = true;
        
        const wheelG = new THREE.CylinderGeometry(
            5, 5, 5,
            8, 8),
            wheelM = new THREE.MeshBasicMaterial({
                color: '#070707',
                flatShading: true
            }),
            wheel = new THREE.Mesh(wheelG, wheelM);
        wheel.position.set(-22, -5, 0);
        wheel.rotation.set(Math.PI / 2, 0, 0);
        wheel.castShadow = true;
        wheel.receiveShadow = true;
        
        _this.tail = new THREE.Group();
        _this.tail.position.set(0, 0, 0);
        _this.tail.add(topTail);
        _this.tail.add(bottomTail);
        _this.tail.add(bracket);
        _this.tail.add(wheel);
    }
    
    /**
     * 创建机翼
     * @return {void}
     */
    private createWing(): void {
        const _this = this;
        
        const wingG = new THREE.BoxGeometry(
            40, 4, 120,
            1, 1, 1
            ),
            wingM = new THREE.MeshPhongMaterial({
                color: '#911610',
                flatShading: true
            }),
            topWing = new THREE.Mesh(wingG, wingM),
            bottomWing = new THREE.Mesh(wingG, wingM);
        topWing.position.set(20, 10, 0);
        topWing.castShadow = true;
        topWing.receiveShadow = true;
        bottomWing.position.set(20, -5, 0);
        bottomWing.castShadow = true;
        bottomWing.receiveShadow = true;
        
        const bracketG = new THREE.CylinderGeometry(
            2, 2, 15,
            6, 6
            ),
            bracketM = new THREE.MeshPhongMaterial({
                color: '#911610',
                flatShading: true
            }),
            leftBracket = new THREE.Mesh(bracketG, bracketM),
            rightBracket = new THREE.Mesh(bracketG, bracketM);
        leftBracket.position.set(20, 2, -55);
        leftBracket.castShadow = true;
        leftBracket.receiveShadow = true;
        rightBracket.position.set(20, 2, 55);
        rightBracket.castShadow = true;
        rightBracket.receiveShadow = true;
        
        _this.wing = new THREE.Group();
        _this.wing.position.set(0, 0, 0);
        _this.wing.add(topWing);
        _this.wing.add(bottomWing);
        _this.wing.add(leftBracket);
        _this.wing.add(rightBracket);
    }
    
    /**
     * 创建螺旋桨
     * @return {void}
     */
    private createPropeller(): void {
        const _this = this;
        
        const bladeG = new THREE.BoxGeometry(
            1, 60, 10,
            1, 1, 1
            ),
            bladeM = new THREE.MeshPhongMaterial({
                color: '#23190f',
                flatShading: true
            }),
            blade1 = new THREE.Mesh(bladeG, bladeM),
            blade2 = new THREE.Mesh(bladeG, bladeM);
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
