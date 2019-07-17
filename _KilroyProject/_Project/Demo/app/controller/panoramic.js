/**
 * Public
 */
import { d, Base } from '../../../_Base/js/window';

/**
 * Three
 */
const THREE = require('three');
import { CSS3DObject } from '../../../$Three/examples/jsm/renderers/CSS3DRenderer';

/**
 * 移动
 */
class panoramic {
    /**
     * 原型对象
     * @constructor Panoramic
     * @param {object} scene 场景
     * @param {object} camera 相机
     * @param {object} renderer 渲染器
     */
    constructor(scene, camera, renderer) {
        const _this = this;
        
        _this.scene = scene;
        _this.camera = camera;
        _this.renderer = renderer;
        
        _this.img = {
            width: 1024,
            height: 1024,
            src: 'https://image.gaeamobile.net/image/20190717/181948/'
        };
        
        _this.side = [
            {
                url: 'img_before.jpg',
                position: [0, 0, -_this.img.width / 2],
                rotation: [0, 0, 0]
            },
            {
                url: 'img_after.jpg',
                position: [0, 0, _this.img.width / 2],
                rotation: [0, Math.PI, 0]
            },
            {
                url: 'img_top.jpg',
                position: [0, _this.img.width / 2, 0],
                rotation: [Math.PI / 2, 0, Math.PI]
            },
            {
                url: 'img_bottom.jpg',
                position: [0, -_this.img.width / 2, 0],
                rotation: [-Math.PI / 2, 0, Math.PI]
            },
            {
                url: 'img_left.jpg',
                position: [-_this.img.width / 2, 0, 0],
                rotation: [0, Math.PI / 2, 0]
            },
            {
                url: 'img_right.jpg',
                position: [_this.img.width / 2, 0, 0],
                rotation: [0, -Math.PI / 2, 0]
            }
        ];
        
        _this.config = {
            target: new THREE.Vector3(),
            lon: 90, //经度
            lat: 0, //维度
            phi: 0, //弧度
            theta: 0, //弧度
            position: {
                touchX: 0,
                touchY: 0
            },
            speed: {
                click: 0.0015,
                touch: 0.1,
                wheel: 0.008
            }
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
        
        _this.createSide();
        
        if (Base.isPSB.platform() === 'PC') {
            _this.clickMoveCamera();
        } else {
            _this.touchMoveCamera();
        }
        
        _this.resizeUpdate();
        _this.update();
    }
    
    /**
     * 创建3D面
     * @return {void}
     */
    createSide() {
        const _this = this;
        
        for (let i = 0; i < _this.side.length; i++) {
            const side = _this.side[i];
            const img = d.createElement('img');
            
            img.width = _this.img.width + 6;
            img.src = _this.img.src + side.url;
            
            const css3Loader = new CSS3DObject(img);
            css3Loader.position.fromArray(side.position);
            css3Loader.rotation.fromArray(side.rotation);
            
            _this.scene.add(css3Loader);
        }
    }
    
    /**
     * 点击移动相机
     * @return {void}
     */
    clickMoveCamera() {
        const _this = this;
        
        d.addEventListener('mousedown', onMouseDown, false);
        d.addEventListener('wheel', onMouseWheel, false);
        
        /**
         * 鼠标按下
         * @param {object} e 焦点对象
         * @return {void}
         */
        function onMouseDown(e) {
            e.preventDefault();
            e.stopPropagation();
            
            d.addEventListener('mousemove', onMouseMove, false);
            d.addEventListener('mouseup', onMouseUp, false);
            
        }
        
        /**
         * 鼠标移动
         * @param {object} e 焦点对象
         * @return {void}
         */
        function onMouseMove(e) {
            e.preventDefault();
            e.stopPropagation();
            
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
            
            d.removeEventListener('mousemove', onMouseMove);
            d.removeEventListener('mouseup', onMouseUp);
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
        
        d.addEventListener('touchstart', onTouchStart, false);
        d.addEventListener('touchmove', onTouchMove, false);
        
        /**
         * 触摸开始
         * @param {object} e 焦点对象
         * @return {void}
         */
        function onTouchStart(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const touch = e.touches[0];
            _this.config.position.touchX = touch.screenX;
            _this.config.position.touchY = touch.screenY;
            
        }
        
        /**
         * 触摸移动
         * @param {object} e 焦点对象
         * @return {void}
         */
        function onTouchMove(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const touch = e.touches[0];
            _this.config.lon -= (touch.screenX - _this.config.position.touchX) * _this.config.speed.touch;
            _this.config.lat += (touch.screenY - _this.config.position.touchY) * _this.config.speed.touch;
            
            _this.config.position.touchX = touch.screenX;
            _this.config.position.touchY = touch.screenY;
            
        }
    }
    
    /**
     * 自动更新
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
     * Resize自动更新
     * @return {void}
     */
    resizeUpdate() {
        const _this = this;
    }
}

export default panoramic;
