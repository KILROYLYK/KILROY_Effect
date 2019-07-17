/**
 * Public
 */
import { Base } from '../../../_Base/js/window';

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
     */
    constructor(dom) {
        const _this = this;
        
        _this.dom = dom;
        
        _this.config = {
            fov: 60, //摄像机视锥体垂直视野角度
            aspect: _this.dom.clientWidth / _this.dom.clientHeight, //摄像机视锥体长宽比
            near: 1, //摄像机视锥体近端面
            far: 1000, //摄像机视锥体远端面
            x: 0,
            y: 0,
            z: 0
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
        _this.object.position.set(
            _this.config.x,
            _this.config.y,
            _this.config.z
        );
        _this.resizeUpdate();
        
        return _this.object;
    }
    
    /**
     * Resize自动更新
     * @return {void}
     */
    resizeUpdate() {
        const _this = this;
        
        Base.resizeWindow(() => {
            _this.object.aspect = window.innerWidth / window.innerHeight;
            _this.object.updateProjectionMatrix();
        });
    }
}

export default Camera;
