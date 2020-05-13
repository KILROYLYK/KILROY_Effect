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

/**
 * 场景
 */
export default class Stage implements _Stage {
    public readonly config: object = { // 配置
    };
    private renderer: Renderer = null; // 渲染器
    private scene: Scene = null; // 场景
    private camera: Camera = null; // 相机
    private object: object = { // 对象
        light: null as Light // 灯光
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
        
        _this.object.light = new Light();
    
        Global.GameDom.appendChild(_this.renderer.instance.domElement);
    }
    
    /**
     * 初始化
     * @return {void}
     */
    private init(): void {
        const _this = this;
    }
    
    /**
     * 更新
     * @param {boolean} isResize 是否调整大小
     * @return {void}
     */
    public update(isResize: boolean = false): void {
        const _this = this;
        
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
    }
}
