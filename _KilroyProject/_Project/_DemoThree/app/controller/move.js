/**
 * Public
 */
import { D, Base } from '../../../_Base/js/window';

/**
 * Three
 */
const THREE = require('three');

/**
 * 移动
 */
class Move {
    /**
     * 原型对象
     * @constructor Move
     * @param {object} camera 相机
     * @param {object} config 配置
     */
    constructor(camera, config = {}) {
        const _this = this;
        
        _this.camera = camera;
        
        _this.config = {
            flag: {
                turn: true,
                walk: true
            },
            target: new THREE.Vector3(),
            lon: config.lon || 90, //经度
            lat: config.lat || 0, //维度
            phi: 0, //弧度
            theta: 0, //弧度
            position: {
                touchX: 0,
                touchY: 0
            },
            speed: {
                click: config.speedClick || 0.0015,
                touch: config.speedTouch || 0.1,
                wheel: config.speedWheel || 0.008,
                walk: config.speedWalk || 1
            },
            key: {
                top: config.keyTop || 87,
                left: config.keyLeft || 65,
                right: config.keyRight || 68,
                bottom: config.keyBottom || 83
            }
        };
        
        if (config.turn === false) _this.config.flag.turn = false;
        if (config.walk === false) _this.config.flag.walk = false;
        
        _this.init();
    }
    
    /**
     * 初始化
     * @return {object} 场景对象
     */
    init() {
        const _this = this;
        
        _this.switchPlatform();
    }
    
    /**
     * 更新
     * @return {void}
     */
    update() {
        const _this = this;
        
        _this.config.lat = Math.max(-85, Math.min(85, _this.config.lat));
        _this.config.phi = THREE.Math.degToRad(90 - _this.config.lat);
        _this.config.theta = THREE.Math.degToRad(_this.config.lon);
        _this.config.target.x = Math.sin(_this.config.phi) * Math.cos(_this.config.theta);
        _this.config.target.y = Math.cos(_this.config.phi);
        _this.config.target.z = Math.sin(_this.config.phi) * Math.sin(_this.config.theta);
        _this.camera.lookAt(_this.config.target);
    }
    
    /**
     * 调整更新
     * @return {void}
     */
    resizeUpdate() {
        const _this = this;
    }
    
    /**
     * 根据设备绑定方法
     * @return {void}
     */
    switchPlatform() {
        const _this = this;
        
        if (Base.isPSB.platform() === 'PC') {
            _this.clickMoveCamera();
        } else {
            _this.touchMoveCamera();
        }
    }
    
    /**
     * 点击移动相机
     * @return {void}
     */
    clickMoveCamera() {
        const _this = this;
        
        D.addEventListener('mousedown', onMouseDown, false);
        D.addEventListener('wheel', onMouseWheel, false);
        
        /**
         * 鼠标按下
         * @param {object} e 焦点对象
         * @return {void}
         */
        function onMouseDown(e) {
            e.preventDefault();
            e.stopPropagation();
            
            if (!_this.config.flag.turn) return;
            
            D.addEventListener('mousemove', onMouseMove, false);
            D.addEventListener('mouseup', onMouseUp, false);
        }
        
        /**
         * 鼠标移动
         * @param {object} e 焦点对象
         * @return {void}
         */
        function onMouseMove(e) {
            e.preventDefault();
            e.stopPropagation();
            
            if (!_this.config.flag.turn) return;
            
            const movementX = e.movementX || e.mozMovementX || e.webkitMovementX || 0,
                movementY = e.movementY || e.mozMovementY || e.webkitMovementY || 0,
                speed = _this.camera.fov * _this.config.speed.click;
            
            _this.config.lon -= movementX * speed;
            _this.config.lat += movementY * speed;
        }
        
        /**
         * 鼠标抬起
         * @param {object} e 焦点对象
         * @return {void}
         */
        function onMouseUp(e) {
            e.preventDefault();
            e.stopPropagation();
            
            D.removeEventListener('mousemove', onMouseMove);
            D.removeEventListener('mouseup', onMouseUp);
        }
        
        /**
         * 鼠标中键移动
         * @param {object} e 焦点对象
         * @return {void}
         */
        function onMouseWheel(e) {
            const fov = _this.camera.fov + e.deltaY * _this.config.speed.wheel;
            
            _this.camera.fov = THREE.Math.clamp(fov, 45, 95);
            _this.camera.updateProjectionMatrix();
        }
    }
    
    /**
     * 触摸移动相机
     * @return {void}
     */
    touchMoveCamera() {
        const _this = this;
        
        D.addEventListener('touchstart', onTouchStart, false);
        
        /**
         * 触摸开始
         * @param {object} e 焦点对象
         * @return {void}
         */
        function onTouchStart(e) {
            e.preventDefault();
            e.stopPropagation();
            
            if (!_this.config.flag.turn) return;
            
            const touch = e.touches[0];
            _this.config.position.touchX = touch.screenX;
            _this.config.position.touchY = touch.screenY;
            
            D.addEventListener('touchmove', onTouchMove, false);
            D.addEventListener('touchend', onTouchEnd, false);
        }
        
        /**
         * 触摸移动
         * @param {object} e 焦点对象
         * @return {void}
         */
        function onTouchMove(e) {
            e.preventDefault();
            e.stopPropagation();
            
            if (!_this.config.flag.turn) return;
            
            const touch = e.touches[0];
            _this.config.lon -= (touch.screenX - _this.config.position.touchX) * _this.config.speed.touch;
            _this.config.lat += (touch.screenY - _this.config.position.touchY) * _this.config.speed.touch;
            
            _this.config.position.touchX = touch.screenX;
            _this.config.position.touchY = touch.screenY;
        }
        
        /**
         * 触摸抬起
         * @param {object} e 焦点对象
         * @return {void}
         */
        function onTouchEnd(e) {
            e.preventDefault();
            e.stopPropagation();
            
            D.removeEventListener('touchmove', onTouchMove);
            D.removeEventListener('touchend', onTouchEnd);
        }
    }
}

export default Move;
