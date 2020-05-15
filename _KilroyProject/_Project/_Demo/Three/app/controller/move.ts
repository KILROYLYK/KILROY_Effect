import Global from '../constant/global';
import _Controller from '../interface/controller';

interface MoveConfig { // 控制器配置
    turn?: boolean // 开关转向
    focus?: boolean // 开关聚焦
    walk?: boolean // 开关步行
    jump?: boolean // 开关弹跳
}

/**
 * 移动
 */
export default class Move implements _Controller {
    private camera: THREE.PerspectiveCamera = null; // 相机
    
    private targetP: THREE.Vector3 = null; // 视觉目标
    private readonly focusP: object = { // 焦点位置
        mouseX: 0,
        mouseY: 0,
        touchX: 0,
        touchY: 0
    };
    private readonly focusLL: object = { // 焦点经纬度
        far: 0, // 视觉目标距离
        lon: 0, // 经度 X
        lat: 0, // 纬度 Y
        maxLat: 85, // 上下最大纬度
        theta: 0, // 角度
        phi: 0 // 弧度
    };
    private readonly speed: object = { // 速度
        click: 0.0015,
        touch: 0.1,
        wheel: 0.008,
        walk: 3
    };
    private readonly key: object = { // 按键
        before: 87, // 前 W
        left: 65, // 左 A
        right: 68, // 右 D
        after: 83, // 后 S
        jump: 32 // 跳 Space
    };
    private readonly flag: MoveConfig = { // 开关
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
        
        _this.targetP = new Global.THREE.Vector3();
        _this.focusLL.far = _this.camera.far * 2;
        _this.flag.turn = !!config.turn;
        _this.flag.focus = !!config.focus;
        _this.flag.walk = !!config.walk;
        _this.flag.jump = !!config.jump;
        
        _this.create();
        _this.init();
    }
    
    /**
     * 创建
     * @return {void}
     */
    private create(): void {
        const _this = this;
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
        _this.focusLL.lat = Math.max(-_this.focusLL.maxLat, Math.min(_this.focusLL.maxLat, _this.focusLL.lat));
        _this.focusLL.phi = Global.THREE.Math.degToRad(90 - _this.focusLL.lat);
        _this.focusLL.theta = Global.THREE.Math.degToRad(_this.focusLL.lon - 90);
        
        // 将视觉目标移至视角中心
        Global.Function.setEasePosition(_this.targetP, {
            x: Math.sin(_this.focusLL.phi) * Math.cos(_this.focusLL.theta) * _this.focusLL.far,
            y: Math.cos(_this.focusLL.phi) * _this.focusLL.far,
            z: Math.sin(_this.focusLL.phi) * Math.sin(_this.focusLL.theta) * _this.focusLL.far
        }, 10);
        _this.flag.turn && _this.camera.lookAt(_this.targetP);  // 转向
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
            W = Global.Window,
            mouse = { // 鼠标
                /**
                 * 按下
                 * @param {MouseEvent} e 焦点对象
                 * @return {void}
                 */
                down: (e: MouseEvent): void => {
                    e.preventDefault();
                    e.stopPropagation();
                    
                    W.addEventListener('mousemove', mouse.move, false);
                    W.addEventListener('mouseup', mouse.up, false);
                },
                
                /**
                 * 移动
                 * @param {MouseEvent} e 焦点对象
                 * @return {void}
                 */
                move: (e: MouseEvent): void => {
                    e.preventDefault();
                    e.stopPropagation();
                    
                    const movementX = e.movementX || 0,
                        movementY = e.movementY || 0,
                        speed = _this.camera.fov * _this.speed.click;
                    
                    _this.focusLL.lon -= movementX * speed;
                    _this.focusLL.lat += movementY * speed;
                },
                
                /**
                 * 抬起
                 * @param {MouseEvent} e 事件对象
                 * @return {void}
                 */
                up: (e: MouseEvent): void => {
                    e.preventDefault();
                    e.stopPropagation();
                    
                    W.removeEventListener('mousemove', mouse.move, false);
                    W.removeEventListener('mouseup', mouse.up, false);
                },
                
                /**
                 * 中键滚动
                 * @param {WheelEvent} e 焦点对象
                 * @return {void}
                 */
                wheel: (e: WheelEvent): void => {
                    const fov = _this.camera.fov + e.deltaY * _this.speed.wheel;
                    
                    _this.camera.fov = Global.THREE.Math.clamp(fov, 45, 95);
                    _this.camera.updateProjectionMatrix();
                }
            },
            key = { // 键盘
                /**
                 * 行走
                 * @param {KeyboardEvent} e 焦点对象
                 * @return {void}
                 */
                walk: (e: KeyboardEvent): void => {
                    // _this.camera.position.set(
                    //     _this.camera.position.x,
                    //     _this.camera.position.y,
                    //     _this.camera.position.z
                    // );
                },
                
                /**
                 * 跳跃
                 * @param {KeyboardEvent} e 焦点对象
                 * @return {void}
                 */
                jump: (e: KeyboardEvent): void => {
                
                }
            };
        
        // 鼠标事件
        _this.flag.turn && W.addEventListener('mousedown', mouse.down, false); // 转向
        _this.flag.focus && W.addEventListener('wheel', mouse.wheel, false); // 聚焦
        
        // 键盘事件
        _this.flag.walk && W.addEventListener('keydown', key.walk, false); // 行走
        _this.flag.jump && W.addEventListener('keydown', key.jump, false); // 跳跃
    }
    
    /**
     * 触摸移动相机
     * @return {void}
     */
    private MobileMoveCamera() {
        const _this = this,
            W = Global.Window,
            touch = { // 触摸
                /**
                 * 开始
                 * @param {TouchEvent} e 焦点对象
                 * @return {void}
                 */
                start: (e: TouchEvent): void => {
                    e.preventDefault();
                    e.stopPropagation();
                    
                    const t = e.touches[0];
                    _this.focusP.touchX = t.screenX;
                    _this.focusP.touchY = t.screenY;
                    
                    W.addEventListener('touchmove', touch.move, false);
                    W.addEventListener('touchend', touch.end, false);
                },
                
                /**
                 * 移动
                 * @param {TouchEvent} e 焦点对象
                 * @return {void}
                 */
                move: (e: TouchEvent): void => {
                    e.preventDefault();
                    e.stopPropagation();
                    
                    const t = e.touches[0];
                    _this.focusLL.lon -= (t.screenX - _this.focusP.touchX) * _this.speed.touch;
                    _this.focusLL.lat += (t.screenY - _this.focusP.touchY) * _this.speed.touch;
                    
                    _this.focusP.touchX = t.screenX;
                    _this.focusP.touchY = t.screenY;
                },
                
                /**
                 * 抬起
                 * @param {TouchEvent} e 焦点对象
                 * @return {void}
                 */
                end: (e: TouchEvent): void => {
                    e.preventDefault();
                    e.stopPropagation();
                    
                    W.removeEventListener('touchmove', touch.move, false);
                    W.removeEventListener('touchend', touch.end, false);
                }
            };
        
        // 触摸事件
        _this.flag.turn && W.addEventListener('touchstart', touch.start, false); // 转向
    }
}
