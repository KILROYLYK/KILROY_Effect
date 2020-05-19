import Global from '../constant/global';
import _Controller from '../interface/controller';

import * as THREE from 'three';
import { FirstPersonControls } from 'three/examples/jsm/controls/FirstPersonControls';
import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls';

/**
 * 相机控制器
 */
export default class Camera implements _Controller {
    private camera: THREE.PerspectiveCamera = null; // 相机
    private type: string = ''; // 类型
    
    private instance: FirstPersonControls | TrackballControls = null; // 实例
    
    /**
     * 原型对象
     * @constructor Camera
     * @param {object} camera 相机
     * @param {string} type 类型
     */
    constructor(camera: object, type: string = 'FirstPerson') {
        const _this = this;
        
        _this.type = type;
        _this.camera = camera.instance;
        
        _this.create();
        _this.init();
    }
    
    /**
     * 创建
     * @return {void}
     */
    private create(): void {
        const _this = this;
        
        _this[`create${ _this.type }`]();
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
        
        _this.instance.dispose();
        _this.instance = null;
    }
    
    /**
     * 更新
     * @return {void}
     */
    public update(): void {
        const _this = this;
        
        if (!_this.instance) return;
        
        _this.instance.update(1);
    }
    
    
    /**
     * 创建第一人称控制器
     * @return {void}
     */
    private createFirstPerson(): void {
        const _this = this;
        
      
    }
    
    /**
     * 创建轨迹球
     * @return {void}
     */
    private createTrackball(): void {
        const _this = this;
        
        _this.instance = new TrackballControls(_this.camera);
        _this.instance.enabled = true; // 是否启用控件
        _this.instance.domElement = Global.Dom; // 监听节点
        _this.instance.staticMoving = false; // 是否禁用阻尼
        _this.instance.dynamicDampingFactor = 0.2; // 阻尼强度
        _this.instance.keys = []; // 用于控制交互的键码
        _this.instance.noPan = false; // 是否禁用平移
        _this.instance.noRotate = false; // 是否禁用旋转
        _this.instance.noZoom = false; // 是否禁用缩放
    }
}
