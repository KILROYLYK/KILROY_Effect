/**
 * Three
 */
const THREE = require('three');

/**
 * 相机
 */
class Camera {
    /**
     * Camera原型对象
     * @constructor Camera
     * @param {object} dom 父级Dom
     */
    constructor(dom) {
        const _this = this;
        
        _this.dom = dom;
        
        _this.config = {
            fov: 45, //摄像机视锥体垂直视野角度
            aspect: _this.dom.clientWidth / _this.dom.clientHeight, //摄像机视锥体长宽比
            near: 1, //摄像机视锥体近端面
            far: 5000 // 摄像机视锥体远端面
        };
        
        _this.object = null;
        
        return _this.init();
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
        _this.object.position.set(10000, 500, 0);
        _this.object.lookAt(new THREE.Vector3(0, 0, 0));
        
        return _this.object;
    }
}

export default Camera;
