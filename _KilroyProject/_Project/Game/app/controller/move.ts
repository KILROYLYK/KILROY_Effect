import Global from '../constant/global';

/**
 * 移动
 */
export default class Move {
    private readonly config: object = { // 配置
        target: null,
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
            wheel: 0.008,
            walk: 1
        },
        key: {
            top: 87,
            left: 65,
            right: 68,
            bottom: 83
        }
    };
    private readonly flag: object = { // 控制器
        turn: false,
        walk: false
    };
    
    private camera: object = null; // 相机对象
    
    /**
     * 原型对象
     * @constructor Move
     * @param {object} camera 相机
     */
    constructor(camera: object) {
        const _this = this;
        
        _this.config.target = new Global.THREE.Vector3();
        
        _this.camera = camera.instance;
        
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
        _this.config.phi = Global.THREE.Math.degToRad(90 - _this.config.lat);
        _this.config.theta = Global.THREE.Math.degToRad(_this.config.lon);
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
        
        Global.Base.isPSB.platform() === 'PC'
            ? _this.clickMoveCamera()
            : _this.touchMoveCamera();
    }
    
    /**
     * 点击移动相机
     * @return {void}
     */
    clickMoveCamera() {
        const _this = this;
        
        Global.Document.addEventListener('mousedown', onMouseDown, false);
        Global.Document.addEventListener('wheel', onMouseWheel, false);
        
        /**
         * 鼠标按下
         * @param {object} e 焦点对象
         * @return {void}
         */
        function onMouseDown(e) {
            e.preventDefault();
            e.stopPropagation();
            
            Global.Document.addEventListener('mousemove', onMouseMove, false);
            Global.Document.addEventListener('mouseup', onMouseUp, false);
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
            
            Global.Document.removeEventListener('mousemove', onMouseMove);
            Global.Document.removeEventListener('mouseup', onMouseUp);
        }
        
        /**
         * 鼠标中键移动
         * @param {object} e 焦点对象
         * @return {void}
         */
        function onMouseWheel(e) {
            const fov = _this.camera.fov + e.deltaY * _this.config.speed.wheel;
            
            _this.camera.fov = Global.THREE.Math.clamp(fov, 45, 95);
            _this.camera.updateProjectionMatrix();
        }
    }
    
    /**
     * 触摸移动相机
     * @return {void}
     */
    touchMoveCamera() {
        const _this = this;
        
        Global.Document.addEventListener('touchstart', onTouchStart, false);
        
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
            
            Global.Document.addEventListener('touchmove', onTouchMove, false);
            Global.Document.addEventListener('touchend', onTouchEnd, false);
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
        
        /**
         * 触摸抬起
         * @param {object} e 焦点对象
         * @return {void}
         */
        function onTouchEnd(e) {
            e.preventDefault();
            e.stopPropagation();
            
            Global.Document.removeEventListener('touchmove', onTouchMove);
            Global.Document.removeEventListener('touchend', onTouchEnd);
        }
    }
}
