import Global from '../../../constant/global';
import Component from '../../../interface/component';

import * as THREE from 'three';

/**
 * 水滴
 */
export default class Drip implements Component {
    private readonly name: string = 'Drip-水滴';
    
    private scene: THREE.Scene = null; // 场景
    
    private list: THREE.Mesh[] = []; // 水滴列表
    
    public instance: THREE.Object3D = null; // 实例
    
    /**
     * 原型对象
     * @constructor Drip
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
        
        _this.createDrip();
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
        
        _this.instance = null;
    }
    
    /**
     * 更新
     * @return {void}
     */
    public update(): void {
        const _this = this,
            timer = 0.0001 * Date.now();
        
        if (!_this.instance) return;
        
        for (let i = 0, il = _this.list.length; i < il; i++) {
            const mesh = _this.list[i];
            mesh.position.x = 500 * Math.cos(timer + i);
            mesh.position.y = 500 * Math.sin(timer + i * 1.1);
        }
    }
    
    /**
     * 创建水滴
     * @return {void}
     */
    private createDrip(): void {
        const _this = this;
        
        const texture = new THREE.CubeTextureLoader()
            .setPath('https://threejs.org/examples/textures/cube/Park3Med/')
            .load([
                'px.jpg', 'nx.jpg',
                'py.jpg', 'ny.jpg',
                'pz.jpg', 'nz.jpg'
            ]);
        texture.mapping = THREE.CubeRefractionMapping;
        
        const geometry = new THREE.SphereBufferGeometry(
            20, 32, 32
        );
        
        const material = new THREE.MeshBasicMaterial({
            color: 0xffffff,
            envMap: texture,
            refractionRatio: 0.95
        });
        
        for (let i = 0; i < 100; i++) {
            const mesh = new THREE.Mesh(geometry, material);
            mesh.position.x = Global.Base.getRandomInt(-1200, 1200);
            mesh.position.y = Global.Base.getRandomInt(-1200, 1200);
            mesh.position.z = Global.Base.getRandomInt(-1200, 1200);
            mesh.scale.x
                = mesh.scale.y
                = mesh.scale.z
                = Global.Base.getRandomInt(1, 5);
            
            _this.list.push(mesh);
            _this.instance.add(mesh);
        }
    }
}
