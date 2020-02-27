import Global from '../constant/Global';
import _Stage from './_Stage';

/**
 * 场景
 */
export default class StageMain extends _Stage {
    /**
     * 构造函数
     * @constructor StageMain
     */
    protected constructor() {
        super();
        
        const _this = this,
            Object = Global.Object; // 对象
        
        _this.config = {
            Renderer: new Object.RendererMain(),
            Scene: new Object.SceneMain(),
            Camera: new Object.CameraMain()
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
        
        super.create();
        
    }
    
    /**
     * 初始化
     * @return {void}
     */
    private init(): void {
        const _this = this;
        
        super.init();
        
        
    }
    
    /**
     * 更新
     * @param {boolean} isResize 是否调整大小
     * @return {void}
     */
    public update(isResize: boolean = false): void {
        const _this = this;
        
        super.update();
        
        _this.config.Renderer.update(isResize);
    }
}
