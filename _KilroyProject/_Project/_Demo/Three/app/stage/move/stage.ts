import Global from '../../constant/global';
import _Stage from '../../interface/stage';

import Renderer from './environment/renderer';
import Scene from './environment/scene';
import Camera from './environment/camera';
import Ground from './object/ground';
import LightNatural from './object/lightNatural';
import LightAngle from './object/lightAngle';
import Move from '../../controller/move';

/**
 * 场景
 */
export default class Stage implements _Stage {
    private renderer: Renderer = null; // 渲染器
    private scene: Scene = null; // 场景
    private camera: Camera = null; // 相机
    private object: object = { // 对象
        lightNatural: null as LightNatural, // 灯光-自然光
        lightAngle: null as LightAngle, // 灯光-角度光
        ground: null as Ground // 地面
    };
    private controller: object = { // 控制器
    };
    
    /**
     * 构造函数
     * @constructor Stage
     */
    constructor() {
        const _this = this;
        
        _this.create();
        _this.init();
    }
    
    /**
     * 创建
     * @return {void}
     */
    private create(): void {
        const _this = this;
        
        _this.renderer = new Renderer();
        _this.scene = new Scene();
        _this.camera = new Camera();
        
        _this.object.ground = new Ground();
        _this.object.lightNatural = new LightNatural();
        _this.object.lightAngle = new LightAngle();
    }
    
    /**
     * 初始化
     * @return {void}
     */
    private init(): void {
        const _this = this;
        
        Global.GameDom.appendChild(_this.renderer.instance.domElement);
        
        // 地面
        _this.scene.instance.add(_this.object.ground.instance.mesh);
    
        // 光
        _this.scene.instance.add(_this.object.lightNatural.instance);
        _this.scene.instance.add(_this.object.lightAngle.instance);
        
        // 移动控制器
        _this.controller.move = new Move(
            _this.camera, {
                turn: true,
                focus: true,
                walk: true,
                jump: true
            }
        );
    }
    
    /**
     * 更新
     * @param {boolean} isResize 是否调整大小
     * @return {void}
     */
    public update(isResize: boolean = false): void {
        const _this = this;
        
        _this.controller.move.update();
        
        _this.camera.update(isResize);
        _this.scene.update(isResize);
        _this.renderer.update(isResize);
        
        _this.renderer.instance.render(
            _this.scene.instance,
            _this.camera.instance
        );
    }
    
    /**
     * 销毁
     * @return {void}
     */
    public destroy(): void {
        const _this = this;
        
        _this.camera.destroy();
        _this.scene.destroy();
        _this.renderer.destroy();
        
        _this.object.light.destroy();
        _this.object.ground.destroy();
        
        _this.controller.move.destroy();
    }
}
