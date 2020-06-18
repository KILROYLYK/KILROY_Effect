import Global from '../../../constant/global';
import Component from '../../../interface/component';

import * as THREE from 'three';
import { RectAreaLightUniformsLib } from 'three/examples/jsm/lights/RectAreaLightUniformsLib';

/**
 * 光源
 */
export default class Light implements Component {
    private readonly name: string = 'Light-光源';
    
    private scene: THREE.Scene = null; // 场景
    
    private lightAmbient: THREE.AmbientLight = null; // 环境光源
    private lightDirectional: THREE.DirectionalLight = null; // 定向光源
    private lightArea1: THREE.Group = null; // 区域光源1
    private lightArea2: THREE.Group = null; // 区域光源2
    private lightArea3: THREE.Group = null; // 区域光源3
    private lightArea4: THREE.Group = null; // 区域光源4
    
    public instance: THREE.Group = null; // 实例
    
    /**
     * 构造函数
     * @constructor Light
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
        
        _this.createLight();
        _this.createArea();
    }
    
    /**
     * 初始化
     * @return {void}
     */
    private init(): void {
        const _this = this;
        
        RectAreaLightUniformsLib.init();
        
        _this.instance.add(_this.lightAmbient);
        _this.instance.add(_this.lightDirectional);
        _this.instance.add(_this.lightArea1);
        _this.instance.add(_this.lightArea2);
        _this.instance.add(_this.lightArea3);
        _this.instance.add(_this.lightArea4);
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
     * 更新
     * @return {void}
     */
    public update(): void {
        const _this = this;
        
        if (!_this.instance) return;
        
        _this.instance.rotateY(0.002);
    }
    
    /**
     * 创建光源
     * @return {void}
     */
    private createLight(): void {
        const _this = this,
            color = '#ffffff',
            distance = 500,
            lightH = 40,
            lightD = 120;
        
        _this.lightAmbient = new THREE.AmbientLight(color, 0.1);
        
        _this.lightDirectional = new THREE.DirectionalLight(color, 0.5);
        _this.lightDirectional.position.set(0, 1, 0);
        _this.lightDirectional.position.multiplyScalar(30);
        _this.lightDirectional.castShadow = true;
        _this.lightDirectional.shadow.camera.top = distance;
        _this.lightDirectional.shadow.camera.left = -distance;
        _this.lightDirectional.shadow.camera.right = distance;
        _this.lightDirectional.shadow.camera.bottom = -distance;
        _this.lightDirectional.shadow.camera.far = 2000;
        _this.lightDirectional.shadow.bias = -0.0001;
        
        _this.lightArea1 = new THREE.Group();
        _this.lightArea1.position.set(lightD, lightH, 0);
        _this.lightArea1.rotation.set(0, Math.PI / 2, 0);
        
        _this.lightArea2 = new THREE.Group();
        _this.lightArea2.position.set(-lightD, lightH, 0);
        _this.lightArea2.rotation.set(0, -Math.PI / 2, 0);
        
        _this.lightArea3 = new THREE.Group();
        _this.lightArea3.position.set(0, lightH, lightD);
        _this.lightArea3.rotation.set(0, 0, 0);
        
        _this.lightArea4 = new THREE.Group();
        _this.lightArea4.position.set(0, lightH, -lightD);
        _this.lightArea4.rotation.set(0, Math.PI, 0);
    }
    
    /**
     * 创建区域
     * @return {void}
     */
    private createArea(): void {
        const _this = this;
        
        const light1 = new THREE.RectAreaLight(
            0xffffff, 10, 50, 50
        );
        
        const mesh1 = new THREE.Mesh(
            new THREE.PlaneBufferGeometry(),
            new THREE.MeshBasicMaterial({
                side: THREE.BackSide
            })
        );
        mesh1.scale.x = light1.width;
        mesh1.scale.y = light1.height;
        
        light1.add(mesh1);
        _this.lightArea1.add(light1);
        
        const light2 = new THREE.RectAreaLight(
            0xffffff, 10, 50, 50
        );
        
        const mesh2 = new THREE.Mesh(
            new THREE.PlaneBufferGeometry(),
            new THREE.MeshBasicMaterial({
                side: THREE.BackSide
            })
        );
        mesh2.scale.x = light2.width;
        mesh2.scale.y = light2.height;
        
        light2.add(mesh2);
        _this.lightArea2.add(light2);
        
        const light3 = new THREE.RectAreaLight(
            0xffffff, 10, 50, 50
        );
        
        const mesh3 = new THREE.Mesh(
            new THREE.PlaneBufferGeometry(),
            new THREE.MeshBasicMaterial({
                side: THREE.BackSide
            })
        );
        mesh3.scale.x = light3.width;
        mesh3.scale.y = light3.height;
        
        light3.add(mesh3);
        _this.lightArea3.add(light3);
        
        const light4 = new THREE.RectAreaLight(
            0xffffff, 10, 50, 50
        );
        
        const mesh4 = new THREE.Mesh(
            new THREE.PlaneBufferGeometry(),
            new THREE.MeshBasicMaterial({
                side: THREE.BackSide
            })
        );
        mesh4.scale.x = light4.width;
        mesh4.scale.y = light4.height;
        
        light4.add(mesh4);
        _this.lightArea4.add(light4);
    }
}
