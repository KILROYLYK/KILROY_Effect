import Global from '../../constant/global';
import _Stage from '../../interface/stage';

/**
 * Environment
 */
import Renderer from './environment/renderer';
import Scene from './environment/scene';
import Camera from './environment/camera';

/**
 * Object
 */
import Light from './object/light';
import Ground from './object/ground';

/**
 * Controller
 */
import Move from '../../controller/move';

/**
 * 场景
 */
export default class Stage implements _Stage {
    public readonly config: object = { // 配置
        dom: null as Element, // 元素
        
        // 环境
        renderer: null as Renderer,
        scene: null as Scene,
        camera: null as Camera,
        
        // 物体
        light: null as Light,
        ground: null as Ground,
        
        controller: {} // 控制器
    };
    
    /**
     * 构造函数
     * @constructor Stage
     */
    constructor() {
        const _this = this;
        
        _this.config.dom = Global.GameDom;
        
        // 环境
        _this.config.renderer = new Renderer();
        _this.config.scene = new Scene();
        _this.config.camera = new Camera();
        
        // 物体
        _this.config.light = new Light();
        _this.config.ground = new Ground();
        
        _this.create();
        _this.init();
    }
    
    /**
     * 创建
     * @return {any} 实例
     */
    private create(): void {
        const _this = this;
        
        // 添加渲染器
        _this.config.dom.appendChild(_this.config.renderer.instance.domElement);
        
        // 添加主光源
        _this.config.light.add('ambient', 'ambient');
        _this.config.scene.instance.add(_this.config.light.instance.ambient);
        
        // 添加角度光源
        _this.config.light.add('direction', 'direction');
        _this.config.scene.instance.add(_this.config.light.instance.direction);
        
        // 添加地面
        _this.config.scene.instance.add(_this.config.ground.instance.mesh);
    }
    
    /**
     * 初始化
     * @return {void}
     */
    private init(): void {
        const _this = this;
        
        _this.config.controller.move = new Move(
            _this.config.camera, {
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
        
        _this.config.controller.move.update(isResize);
        
        _this.config.camera.update(isResize);
        _this.config.scene.update(isResize);
        _this.config.renderer.update(isResize);
        
        _this.config.renderer.instance.render(
            _this.config.scene.instance,
            _this.config.camera.instance
        );
    }
    
    /**
     * 销毁
     * @return {void}
     */
    public destroy(): void {
        const _this = this;
    }
}
