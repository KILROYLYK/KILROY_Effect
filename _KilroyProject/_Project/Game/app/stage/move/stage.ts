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
import MoveController from '../../controller/move';

/**
 * 场景
 */
export default class Stage implements _Stage {
    public config: any = {
        Dom: null as Element, // 元素
        
        // 环境
        Renderer: null as Renderer,
        Scene: null as Scene,
        Camera: null as Camera,
        
        // 物体
        Light: null as Light,
        Ground: null as Ground,
        
        // 控制器
        Controller: {}
    };
    public instance: any = null;
    
    /**
     * 构造函数
     * @constructor Stage
     */
    protected constructor() {
        const _this = this;
        
        _this.config.Dom = Global.GameDom;
        
        // 环境
        _this.config.Renderer = new Renderer();
        _this.config.Scene = new Scene();
        _this.config.Camera = new Camera();
        
        // 物体
        _this.config.Light = new Light();
        _this.config.Ground = new Ground();
        
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
        _this.config.Dom.appendChild(_this.config.Renderer.instance.domElement);
        
        // 添加主光源
        _this.config.Light.add('ambient', 'ambientMain');
        _this.config.Scene.instance.add(_this.config.Light.instance['ambientMain']);
        
        // 添加角度光源
        _this.config.Light.add('direction', 'directionMain');
        _this.config.Scene.instance.add(_this.config.Light.instance['directionMain']);
        
        // 添加地面
        _this.config.Scene.instance.add(_this.config.Ground.instance.mesh);
    }
    
    /**
     * 初始化
     * @return {void}
     */
    private init(): void {
        const _this = this;
        
        _this.config.Renderer.instance.render( // 添加渲染器
            _this.config.Scene.instance,
            _this.config.Camera.instance,
        );
        
        _this.config.Controller['move'] = new MoveController(_this.config.Camera);
    }
    
    /**
     * 更新
     * @param {boolean} isResize 是否调整大小
     * @return {void}
     */
    public update(isResize: boolean = false): void {
        const _this = this;
        
        _this.config.Scene.update(isResize);
        _this.config.Camera.update(isResize);
        _this.config.Renderer.update(isResize);
    }
    
    /**
     * 销毁
     * @return {void}
     */
    public destroy(): void {
        const _this = this;
        
        _this.instance = null;
    }
}
