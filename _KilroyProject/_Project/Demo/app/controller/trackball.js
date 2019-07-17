/**
 * Public
 */
import { Base } from '../../../_Base/js/window';

/**
 * Three
 */
import { TrackballControls } from '../../../$Three/examples/jsm/controls/TrackballControls';

/**
 * 轨迹球
 */
class trackball {
    /**
     * 原型对象
     * @constructor Trackball
     * @param {object} scene 场景
     * @param {object} camera 相机
     * @param {object} renderer 渲染器
     */
    constructor(scene, camera, renderer) {
        const _this = this;
        
        _this.scene = scene;
        _this.camera = camera;
        _this.renderer = renderer;
        
        _this.config = {
            rotateSpeed: 1.0,
            zoomSpeed: 1.2,
            panSpeed: 0.8,
            noZoom: false,
            noPan: false,
            staticMoving: true,
            dynamicDampingFactor: 0.1,
            keys: [65, 83, 68]
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
        
        _this.object = new TrackballControls(
            _this.camera,
            _this.renderer.domElement
        );
        _this.object.rotateSpeed = _this.config.rotateSpeed;
        _this.object.zoomSpeed = _this.config.zoomSpeed;
        _this.object.panSpeed = _this.config.panSpeed;
        _this.object.noZoom = _this.config.noZoom;
        _this.object.noPan = _this.config.noPan;
        _this.object.staticMoving = _this.config.staticMoving;
        _this.object.dynamicDampingFactor = _this.config.dynamicDampingFactor;
        _this.object.keys = _this.config.keys;
        _this.object.addEventListener('change', () => {
            _this.renderer.render(_this.scene, _this.camera);
        });
        _this.renderer.render(_this.scene, _this.camera);
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
            _this.object.handleResize();
            _this.renderer.render(_this.scene, _this.camera);
        });
    }
}

export default trackball;
