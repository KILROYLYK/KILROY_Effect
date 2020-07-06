import Global from '../../../constant/global';
import Layout from '../../../interface/layout';

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

/**
 * 相机
 */
export default class Camera implements Layout {
    private controller: OrbitControls = null; // 控制器
    
    public instance: THREE.PerspectiveCamera = null; // 实例
    
    /**
     * 构造函数
     * @constructor Camera
     */
    constructor() {
        const _this = this;
        
        _this.create();
        _this.init();
    }
    
    /**
     * 创建
     * @return {void}
     */
    private create(): void {
        const _this = this;
        
        _this.instance = new THREE.PerspectiveCamera(
            60, Global.Function.getDomAspect(), 1, 2000
        );
        _this.instance.position.set(0, 1150, 550);
        _this.instance.rotation.set(Math.PI * -0.05, 0, 0);
        
        // _this.createController();
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
        
        if (!_this.instance) return;
    }
    
    /**
     * 更新
     * @param {boolean} isResize 屏幕是否变化
     * @return {void}
     */
    public update(isResize: boolean = false): void {
        const _this = this;
        
        if (!_this.instance) return;
        
        // _this.controller.update();
        
        if (isResize) { // 屏幕变化
            _this.instance.aspect = Global.Function.getDomAspect();
            _this.instance.updateProjectionMatrix();
        }
    }
    
    /**
     * 创建控制器
     * @return {void}
     */
    private createController(): void {
        const _this = this;
        
        const vector = new THREE.Vector3(0, 1100, 200);
        
        _this.controller = new OrbitControls(_this.instance, Global.Dom);
        _this.controller.target = vector;
        _this.controller.enabled = true;
        _this.controller.enableDamping = true;
        _this.controller.enablePan = false;
        _this.controller.enableKeys = false;
        _this.controller.minPolarAngle = Math.PI * 0.3;
        _this.controller.maxPolarAngle = Math.PI * 0.7;
        // _this.controller.minDistance = 0;
        // _this.controller.maxDistance = 0;
    }
}
