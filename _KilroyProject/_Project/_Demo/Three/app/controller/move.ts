import Global from '../constant/global';
import _Controller from '../interface/controller';

export interface MoveConfig { // 控制器配置
    turn?: boolean // 开关转向
    focus?: boolean // 开关聚焦
    walk?: boolean // 开关步行
    jump?: boolean // 开关弹跳
}

/**
 * 移动
 */
export default class Move implements _Controller {
    public readonly config: object = { // 配置
        target: null, // 视觉目标
        far: 0, // 视觉目标距离
        lon: 0, // 经度x
        lat: 0, // 纬度y
        theta: 0, // 角度
        phi: 0, // 弧度
        maxLat: 85, // 上下最大纬度
        position: {
            touchX: 0,
            touchY: 0
        },
        speed: {
            click: 0.0015,
            touch: 0.1,
            wheel: 0.008,
            walk: 3
        },
        key: {
            before: 87,
            left: 65,
            right: 68,
            after: 83,
            jump: 32
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
    constructor(camera: object, config: MoveConfig = {}) {
        const _this = this;
        
        _this.camera = camera.instance;
        
        _this.config.target = new Global.THREE.Vector3();
        _this.config.far = _this.camera.far * 2;
        
        _this.flag.turn = !!config.turn;
        _this.flag.focus = !!config.focus;
        _this.flag.walk = !!config.walk;
        _this.flag.jump = !!config.jump;
        
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
        
        // 获取视角
        _this.config.lat = Math.max(-_this.config.maxLat, Math.min(_this.config.maxLat, _this.config.lat));
        _this.config.phi = Global.THREE.Math.degToRad(90 - _this.config.lat);
        _this.config.theta = Global.THREE.Math.degToRad(_this.config.lon - 90);
        
        // 将视觉目标移至视角中心
        _this.config.target.x = Math.sin(_this.config.phi) * Math.cos(_this.config.theta) * _this.config.far;
        _this.config.target.y = Math.cos(_this.config.phi) * _this.config.far;
        _this.config.target.z = Math.sin(_this.config.phi) * Math.sin(_this.config.theta) * _this.config.far;
        
        _this.flag.turn && _this.camera.lookAt(_this.config.target);  // 转向
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
    private switchPlatform(): void {
        const _this = this;
        Global.Base.isPSB.platform() === 'PC'
            ? _this.PCMoveCamera()
            : _this.MobileMoveCamera();
    }
    
    /**
     * 点击移动相机
     * @return {void}
     */
    private PCMoveCamera(): void {
        const _this = this,
            D = Global.Document,
            mouse = { // 鼠标
                /**
                 * 按下
                 * @param {Event} e 焦点对象
                 * @return {void}
                 */
                down: (e): void => {
                    e.preventDefault();
                    e.stopPropagation();
                    
                    D.addEventListener('mousemove', mouse.move, false);
                    D.addEventListener('mouseup', mouse.up, false);
                },
                
                /**
                 * 移动
                 * @param {Event} e 焦点对象
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
                 * 抬起
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
                 * 中键滚动
                 * @param {Event} e 焦点对象
                 * @return {void}
                 */
                wheel: (e): void => {
                    const fov = _this.camera.fov + e.deltaY * _this.config.speed.wheel;
                    
                    _this.camera.fov = Global.THREE.Math.clamp(fov, 45, 95);
                    _this.camera.updateProjectionMatrix();
                }
            },
            key = { // 键盘
                /**
                 * 行走
                 * @param {Event} e 焦点对象
                 * @return {void}
                 */
                walk: (e): void => {
                    // _this.camera.position.set(
                    //     _this.camera.position.x,
                    //     _this.camera.position.y,
                    //     _this.camera.position.z
                    // );
                },
                
                /**
                 * 跳跃
                 * @param {Event} e 焦点对象
                 * @return {void}
                 */
                jump: (e): void => {
                
                }
            };
        
        // 鼠标事件
        _this.flag.turn && D.addEventListener('mousedown', mouse.down, false); // 转向
        _this.flag.focus && D.addEventListener('wheel', mouse.wheel, false); // 聚焦
        
        // 键盘事件
        _this.flag.walk && D.addEventListener('keydown', key.walk, false); // 行走
        _this.flag.jump && D.addEventListener('keydown', key.jump, false); // 跳跃
    }
    
    /**
     * 触摸移动相机
     * @return {void}
     */
    private MobileMoveCamera() {
        const _this = this,
            D = Global.Document,
            touch = { // 触摸
                /**
                 * 开始
                 * @param {Event} e 焦点对象
                 * @return {void}
                 */
                start: (e): void => {
                    e.preventDefault();
                    e.stopPropagation();
                    
                    const t = e.touches[0];
                    _this.config.position.touchX = t.screenX;
                    _this.config.position.touchY = t.screenY;
                    
                    D.addEventListener('touchmove', touch.move, false);
                    D.addEventListener('touchend', touch.end, false);
                },
                
                /**
                 * 移动
                 * @param {Event} e 焦点对象
                 * @return {void}
                 */
                move: (e): void => {
                    e.preventDefault();
                    e.stopPropagation();
                    
                    const t = e.touches[0];
                    _this.config.lon -= (t.screenX - _this.config.position.touchX) * _this.config.speed.touch;
                    _this.config.lat += (t.screenY - _this.config.position.touchY) * _this.config.speed.touch;
                    
                    _this.config.position.touchX = t.screenX;
                    _this.config.position.touchY = t.screenY;
                },
                
                /**
                 * 抬起
                 * @param {Event} e 焦点对象
                 * @return {void}
                 */
                end: (e): void => {
                    e.preventDefault();
                    e.stopPropagation();
                    
                    D.removeEventListener('touchmove', touch.move, false);
                    D.removeEventListener('touchend', touch.end, false);
                }
            };
        
        // 触摸事件
        _this.flag.turn && D.addEventListener('touchstart', touch.start, false); // 转向
    }
}
