import Global from '../../../constant/global';
import _Environment from '../../../interface/environment';

import * as THREE from 'three';
import { FirstPersonControls } from 'three/examples/jsm/controls/FirstPersonControls';

/**
 * 相机
 */
export default class Camera implements _Environment {
    private controller: FirstPersonControls = null; // 控制器
    
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
            45, Global.Function.getDomAspect(), 1, 1000
        );
        
        _this.controller = new FirstPersonControls(_this.instance);
        _this.controller.enabled = true; // 是否启用控件
        _this.controller.domElement = Global.Dom; // 监听节点
        _this.controller.autoForward = false; // 是否自动向前移动
        _this.controller.movementSpeed = 1; // 移动速度
        _this.controller.activeLook = true; // 是否可以环顾四周
        _this.controller.lookVertical = true; // 是否可以垂直环顾四周
        _this.controller.lookSpeed = 0.0005; // 环顾四周的速度
        _this.controller.constrainVertical = true; // 是否受到垂直约束
        _this.controller.verticalMin = 0; // 垂直约束Min
        _this.controller.verticalMax = Math.PI; //  垂直约束Max
    }
    
    /**
     * 初始化
     * @return {void}
     */
    private init(): void {
        const _this = this;
        
        _this.instance.position.set(0, 200, 0);
    }
    
    /**
     * 销毁
     * @return {void}
     */
    public destroy(): void {
        const _this = this;
        
        if (!_this.instance) return;
        
        _this.controller.destroy();
        _this.controller = null;
        
        _this.instance.destroy();
        _this.instance = null;
    }
    
    /**
     * 更新
     * @param {boolean} isResize 屏幕是否变化
     * @return {void}
     */
    public update(isResize: boolean = false): void {
        const _this = this;
        
        if (!_this.instance) return;
        
        _this.controller.update(1);
        
        if (isResize) { // 屏幕变化
            _this.instance.aspect = Global.Function.getDomAspect();
            _this.instance.updateProjectionMatrix();
            
            _this.controller.handleResize();
        }
    }
}
