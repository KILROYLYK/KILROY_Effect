import Global from '../../../constant/global';
import _Environment from '../../../interface/environment';

/**
 * 场景
 */
export default class Scene implements _Environment {
    public instance: THREE.Scene = null; // 实例
    
    /**
     * 构造函数
     * @constructor Scene
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
        
        _this.instance = new Global.THREE.Scene();
    }
    
    /**
     * 初始化
     * @return {void}
     */
    private init(): void {
        const _this = this,
            color = '#a0c5ff';
        
        _this.instance.background = new Global.THREE.Color(color);
        _this.instance.fog = new Global.THREE.FogExp2(color, 0.0007);
    }
    
    /**
     * 销毁
     * @return {void}
     */
    public destroy(): void {
        const _this = this;
        
        if (!_this.instance) return;
        
        _this.instance = null;
    }
}
