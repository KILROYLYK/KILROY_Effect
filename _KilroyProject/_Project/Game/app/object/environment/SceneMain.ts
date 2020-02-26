import Global from '../../constant/Global';
import _Environment from './_Environment';

/**
 * 场景
 */
export default class SceneMain extends _Environment {
    /**
     * 构造函数
     * @constructor Scene
     * @param {object} config 配置
     */
    constructor(config?: object) {
        super();
        
        const _this = this,
            color = '#000000';
        
        _this.config = {
            color: color,
            background: new Global.THREE.Color(color),
            fog: new Global.THREE.FogExp2(color, 0)
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
        
        _this.instance = new Global.THREE.Scene();
    }
    
    /**
     * 初始化
     * @return {void}
     */
    public init(): void {
        const _this = this;
    
        super.init();
        
        _this.instance.background = _this.config.background;
        _this.instance.fog = _this.config.fog;
    }
    
    /**
     * 更新
     * @param {boolean} isResize 是否调整大小
     * @return {void}
     */
    public update(isResize: boolean = false): void {
        const _this = this;
        
        super.update();
    }
}
