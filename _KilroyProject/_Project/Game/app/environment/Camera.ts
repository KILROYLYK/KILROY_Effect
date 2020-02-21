import * as THREE from 'three';
import _Environment from './_Environment';

/**
 * 相机
 */
export default class Camera extends _Environment {
    /**
     * 构造函数
     * @constructor Camera
     * @param {object} dom 动画Dom
     * @param {object} config 配置
     */
    constructor(dom, config: object = {}) {
        super();
        
        const _this = this;
        
        _this.config = {
            dom: dom, // 动画Dom
            fov: (config && config.fov) || 60, //摄像机视锥体垂直视野角度
            aspect: (config && config.aspect) || dom.clientWidth / dom.clientHeight, //摄像机视锥体长宽比
            near: (config && config.near) || 1, //摄像机视锥体近端面
            far: config.far || 1000, //摄像机视锥体远端面
            x: config.x || 0,
            y: config.y || 0,
            z: config.z || 0
        };
    
        _this.create();
        _this.init();
    }
    
    /**
     * 创建
     * @return {any} 实例
     */
    private create(): void {
        const _this = this;
    
        _this.instance = new THREE.PerspectiveCamera(
            _this.config.fov,
            _this.config.aspect,
            _this.config.near,
            _this.config.far
        );
    }
    
    /**
     * 初始化
     * @return {void}
     */
    public init(): void {
        const _this = this;
    
        _this.instance.position.set(
            _this.config.x,
            _this.config.y,
            _this.config.z
        );
    }
}
