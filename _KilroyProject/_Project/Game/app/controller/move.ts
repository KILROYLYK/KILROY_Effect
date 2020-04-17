import Global from '../constant/global';
import _Controller from '../interface/controller';

export interface MoveConfig { // 控制器配置
    turn: boolean // 开关转向
    focus: boolean // 开关聚焦
    walk: boolean // 开关步行
    jump: boolean // 开关弹跳
}

/**
 * 移动
 */
export default class Move implements _Controller {
    public readonly config: object = { // 配置
        target: null, // 目标对象
        far: 0, // 目标对象距离
        lon: 90, // 经度
        lat: 0, // 纬度
        theta: 0, // 角度
        phi: 0, // 弧度
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
    
    public camera: object = null; // 相机
    
    private readonly flag: MoveConfig = { // 控制器
        turn: false,
        focus: false,
        walk: false,
        jump: false
    };
    
    /**
     * 原型对象
     * @constructor Move
     * @param {object} camera 相机
     * @param {object} config 配置
     */
    constructor(camera: object, config: MoveConfig = {
        turn: false,
        focus: false,
        walk: false,
        jump: false
    }) {
        const _this = this;
        
        _this.camera = camera.instance;
        _this.config.target = new Global.THREE.Vector3();
        _this.config.far = _this.camera.far * 2;
        
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
        
        if (!_this.camera) return;
        
        _this.config.lat = Math.max(-85, Math.min(85, _this.config.lat));
        _this.config.phi = Global.THREE.Math.degToRad(90 - _this.config.lat);
        _this.config.theta = Global.THREE.Math.degToRad(_this.config.lon);
        _this.config.target.x = Math.sin(_this.config.phi) * Math.cos(_this.config.theta) * _this.config.far;
        _this.config.target.y = Math.cos(_this.config.phi) * _this.config.far;
        _this.config.target.z = Math.sin(_this.config.phi) * Math.sin(_this.config.theta) * _this.config.far;
        _this.camera.lookAt(_this.config.target);
    }
    
    /**
     * 销毁
     * @return {void}
     */
    public destroy(): void {
        const _this = this;
        
        if (!_this.camera) return;
        _this.camera = null;
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
        const _this = this,
            D = Global.Document,
            mouse = {
                /**
                 * 鼠标按下
                 * @param {object} e 焦点对象
                 * @return {void}
                 */
                down: (e): void => {
                    e.preventDefault();
                    e.stopPropagation();
                    
                    D.addEventListener('mousemove', mouse.move, false);
                    D.addEventListener('mouseup', mouse.up, false);
                },
                
                /**
                 * 鼠标移动
                 * @param {object} e 焦点对象
                 * @return {void}
                 */
                move: (e): void => {
                    e.preventDefault();
                    e.stopPropagation();
                    
                    const movementX = e.movementX || e.mozMovementX || e.webkitMovementX || 0,
                        movementY = e.movementY || e.mozMovementY || e.webkitMovementY || 0,
                        speed = _this.camera.fov * _this.config.speed.click;
                    
                    _this.config.lon -= movementX * speed;
                    _this.config.lat += movementY * speed;
                },
                
                /**
                 * 鼠标抬起
                 * @param {Event} e 事件对象
                 * @return {void}
                 */
                up: (e): void => {
                    e.preventDefault();
                    e.stopPropagation();
                    
                    D.removeEventListener('mousemove', mouse.move, false);
                    D.removeEventListener('mouseup', mouse.up, false);
                },
                
                /**
                 * 鼠标中键移动
                 * @param {object} e 焦点对象
                 * @return {void}
                 */
                wheel: (e): void => {
                    const fov = _this.camera.fov + e.deltaY * _this.config.speed.wheel;
                    
                    _this.camera.fov = Global.THREE.Math.clamp(fov, 45, 95);
                    _this.camera.updateProjectionMatrix();
                }
            };
        
        D.addEventListener('mousedown', mouse.down, false);
        D.addEventListener('wheel', mouse.wheel, false);
    }
    
    /**
     * 触摸移动相机
     * @return {void}
     */
    touchMoveCamera() {
        const _this = this,
            D = Global.Document,
            touch = {
                /**
                 * 触摸开始
                 * @param {object} e 焦点对象
                 * @return {void}
                 */
                start: (e): void => {
                    e.preventDefault();
                    e.stopPropagation();
                    
                    const touch = e.touches[0];
                    _this.config.position.touchX = touch.screenX;
                    _this.config.position.touchY = touch.screenY;
                    
                    D.addEventListener('touchmove', touch.move, false);
                    D.addEventListener('touchend', touch.end, false);
                },
                
                /**
                 * 触摸移动
                 * @param {object} e 焦点对象
                 * @return {void}
                 */
                move: (e): void => {
                    e.preventDefault();
                    e.stopPropagation();
                    
                    const touch = e.touches[0];
                    _this.config.lon -= (touch.screenX - _this.config.position.touchX) * _this.config.speed.touch;
                    _this.config.lat += (touch.screenY - _this.config.position.touchY) * _this.config.speed.touch;
                    
                    _this.config.position.touchX = touch.screenX;
                    _this.config.position.touchY = touch.screenY;
                },
                
                /**
                 * 触摸抬起
                 * @param {object} e 焦点对象
                 * @return {void}
                 */
                end: (e): void => {
                    e.preventDefault();
                    e.stopPropagation();
                    
                    D.removeEventListener('touchmove', touch.move, false);
                    D.removeEventListener('touchend', touch.end, false);
                }
            };
        
        D.addEventListener('touchstart', touch.start, false);
    }
}
