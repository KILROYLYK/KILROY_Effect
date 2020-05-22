import Global from '../../../constant/global';
import Layout from '../../../interface/layout';

import * as THREE from 'three';

/**
 * 相机
 */
export default class Camera implements Layout {
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
            60, Global.Function.getDomAspect(), 1, 1000
        );
    }
    
    /**
     * 初始化
     * @return {void}
     */
    private init(): void {
        const _this = this;
        
        _this.instance.position.set(0, 0, 0);
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
     * @param {boolean} isResize 屏幕是否变化
     * @return {void}
     */
    public update(isResize: boolean = false): void {
        const _this = this;
        
        if (!_this.instance) return;
        
        if (isResize) { // 屏幕变化
            _this.instance.aspect = Global.Function.getDomAspect();
            _this.instance.updateProjectionMatrix();
        }
    }
}

// _this.instance = new TrackballControls(_this.camera);
// _this.instance.enabled = true; // 是否启用控件
// _this.instance.domElement = Global.Dom; // 监听节点
// _this.instance.staticMoving = false; // 是否禁用阻尼
// _this.instance.dynamicDampingFactor = 0.2; // 阻尼强度
// _this.instance.keys = []; // 用于控制交互的键码
// _this.instance.noPan = false; // 是否禁用平移
// _this.instance.noRotate = false; // 是否禁用旋转
// _this.instance.noZoom = false; // 是否禁用缩放
