import Environment from '_Environment';

/**
 * 场景
 */
export default class Scene extends Environment {
    private static _instance: this = null; // 实例
    
    /**
     * 单例
     * @return {_instance} 实例
     */
    public static get instance(): any {
        const _this = this;
        !_this._instance && (_this._instance = new Scene());
        return _this._instance;
    }
    
    /**
     * 原型对象
     * @constructor Scene
     * @param {object:object} config 配置
     */
    constructor(config?: object){
        super();
        const _this = this,
            color = config.color || '#000000';
        
        _this.config = {
            background: new THREE.Color(color),
            fog: new THREE.FogExp2(
                color,
                config.opacity || 0
            )
        };
        
        _this.object = null;
        
        _this.init();
    }
    
    /**
     * 初始化
     * @return {object} 场景对象
     */
    init() {
        const _this = this;
        
        _this.object = new THREE.Scene();
        _this.object.background = _this.config.background;
        _this.object.fog = _this.config.fog;
    }
    
}
