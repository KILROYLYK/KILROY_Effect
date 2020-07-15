import Global from '../../../constant/global';
import Component from '../../../interface/component';

import * as THREE from 'three';

/**
 * 光源
 */
export default class Light implements Component {
    private readonly name: string = 'Light-光源';

    private scene: THREE.Scene = null; // 场景

    private lightAmbient: THREE.AmbientLight = null; // 环境光源
    private lightDirectional: THREE.DirectionalLight = null; // 定向光源

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
    }

    /**
     * 初始化
     * @return {void}
     */
    private init(): void {
        const _this = this;

        _this.instance.add(_this.lightAmbient);
        _this.instance.add(_this.lightDirectional);
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
    }

    /**
     * 创建光源
     * @return {void}
     */
    private createLight(): void {
        const _this = this,
            distance = 1000,
            size = 2048;

        _this.lightAmbient = new THREE.AmbientLight('#ffffff', 0.1);
        _this.lightAmbient.position.set(0, 0, 0);

        _this.lightDirectional = new THREE.DirectionalLight('#ffffff', 1.5);
        _this.lightDirectional.position.set(0, 1500, 400);
        _this.lightDirectional.castShadow = true;
        _this.lightDirectional.shadow.camera.top = distance;
        _this.lightDirectional.shadow.camera.left = -distance;
        _this.lightDirectional.shadow.camera.right = distance;
        _this.lightDirectional.shadow.camera.bottom = -distance;
        _this.lightDirectional.shadow.camera.far = 2000;
        _this.lightDirectional.shadow.mapSize.width = size;
        _this.lightDirectional.shadow.mapSize.height = size;
    }
}
