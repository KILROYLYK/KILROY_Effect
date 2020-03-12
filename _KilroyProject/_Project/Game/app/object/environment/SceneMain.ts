import Global from '../../constant/Global';
import _Environment from '../../interface/Environment';

/**
 * 场景
 */
export default class SceneMain implements _Environment {
    public config: any = {};
    public instance: any = null;
    
    protected isCreate: boolean = false;
    
    /**
     * 构造函数
     * @constructor SceneMain
     */
    protected constructor() {
        const _this = this,
            color = 0x5AFFFD;
        
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
    protected create(): void {
        const _this = this;
        
        if (_this.isCreate) return;
        _this.isCreate = true;
        
        _this.instance = new Global.THREE.Scene();
    }
    
    /**
     * 初始化
     * @return {void}
     */
    protected init(): void {
        const _this = this;
        
        if (!_this.isCreate) return;
        
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
        
        if (isResize) {
        
        }
    }
    
    /**
     * 销毁
     * @return {void}
     */
    public destroy(): void {
        const _this = this;
        
        if (!_this.isCreate) return;
        _this.instance = null;
        _this.isCreate = false;
    }
}
