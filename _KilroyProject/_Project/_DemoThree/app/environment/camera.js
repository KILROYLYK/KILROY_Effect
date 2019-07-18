/**
 * Three
 */
const THREE = require('three');

/**
 * 相机
 */
class Camera {
    /**
     * 原型对象
     * @constructor Camera
     * @param {object} dom 父级Dom
     * @param {object} config 配置
     */
    constructor(dom, config = {}) {
        const _this = this;
        
        _this.dom = dom;
        
        _this.config = {
            fov: config.fov || 60, //摄像机视锥体垂直视野角度
            aspect: config.aspect || _this.dom.clientWidth / _this.dom.clientHeight, //摄像机视锥体长宽比
            near: config.near || 1, //摄像机视锥体近端面
            far: config.far || 1000, //摄像机视锥体远端面
            x: config.x || 0,
            y: config.y || 0,
            z: config.z || 0
        };
        
        _this.object = null;
        
        _this.init();
    }
    
    /**
     * 初始化
     * @return {object} 场景对象
     */
    init() {
        const _this = this;
        
        _this.object = new THREE.PerspectiveCamera(
            _this.config.fov,
            _this.config.aspect,
            _this.config.near,
            _this.config.far
        );
        _this.object.position.set(
            _this.config.x,
            _this.config.y,
            _this.config.z
        );
    }
    
    /**
     * 更新
     * @return {void}
     */
    update() {
        const _this = this;
    }
    
    /**
     * 调整更新
     * @return {void}
     */
    resizeUpdate() {
        const _this = this;
        _this.object.aspect = _this.dom.clientWidth / _this.dom.clientHeight;
        _this.object.updateProjectionMatrix();
    }
}

export default Camera;
