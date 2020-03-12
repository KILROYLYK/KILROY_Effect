import Global from '../constant/Global';
import Stage from '../interface/Stage';

/**
 * 场景
 */
export default class StageMain implements Stage {
    public config: any = {};
    public instance: any = null;
    
    /**
     * 构造函数
     * @constructor StageMain
     */
    protected constructor() {
        const _this = this,
            Object = Global.Object; // 对象
        
        _this.config = {
            dom: Global.GameDom,
            Renderer: new Object.RendererMain(),
            Scene: new Object.SceneMain(),
            Camera: new Object.CameraMain(),
            Light: Object.Light
        };
        
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
        _this.config.dom.appendChild(
            _this.config.Renderer.instance.domElement
        );
        
        // 添加主光源
        _this.config.Light.add('ambient', 'ambientMain');
        _this.config.Scene.instance.add(
            _this.config.Light.instance['ambientMain']
        );
        
        // 添加角度光源
        _this.config.Light.add('direction', 'directionMain');
        _this.config.Scene.instance.add(
            _this.config.Light.instance['directionMain']
        );
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
        
        _this.config.Renderer.instance.render(
            _this.config.Scene.instance,
            _this.config.Camera.instance,
        );
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
