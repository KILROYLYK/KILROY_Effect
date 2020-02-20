import Environment from './_Environment';

/**
 * 场景
 */
export default class Scene extends Environment {
    /**
     * 原型对象
     * @constructor Scene
     * @param {object:object} config 配置
     */
    constructor(config?: object) {
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

        _this.create();
    }
    
    /**
     * 创建
     * @return {any} 实例
     */
    private create(): any {
        const _this = this;
    
        _this.instance = new THREE.Scene();
        _this.instance.background = _this.config.background;
        _this.instance.fog = _this.config.fog;
    }
}
