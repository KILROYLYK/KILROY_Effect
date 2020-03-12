import _Object from './_Object';

/**
 * 灯光
 */
export default class LightMain extends _Object {
    /**
     * 构造函数
     * @constructor LightMain
     */
    protected constructor() {
        super();
        
        const _this = this;
        
        _this.config = {
            color: '#ffffff',
            opacity: 0.3,
            x: 1,
            y: 1,
            z: 1
        };
    }
    
    /**
     * 自然光
     * @param {object} config 配置
     * @return {object} 光对象
     */
    private ambient(config: {
        color?: string,
        opacity?: number
    } = {}) {
        const _this = this,
            color = config.color || _this.config.color,
            opacity = config.opacity || _this.config.opacity;
        
        return new THREE.AmbientLight(color, opacity);
    }
    
    /**
     * 角度自然光
     * @param {object} config 配置
     * @return {object} 光对象
     */
    private directiona(config: {
        color?: string,
        opacity?: number,
        x?: number,
        y?: number,
        z?: number
    } = {}) {
        const _this = this,
            color = config.color || _this.config.color,
            opacity = config.opacity || _this.config.opacity,
            x = config.x || _this.config.x,
            y = config.y || _this.config.y,
            z = config.z || _this.config.z,
            light = new THREE.DirectionalLight(color, opacity);
        
        light.position.set(x, y, z);
        
        return light;
    }
}
