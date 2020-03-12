import _Object from '../interface/Object';
import Global from '../constant/Global';

/**
 * 灯光
 */
export default class LightMain implements _Object {
    public config: any = {};
    public instance: any = {};
    
    /**
     * 构造函数
     * @constructor LightMain
     */
    protected constructor() {
        const _this = this;
        
        _this.config = {
            color: 0xFFFFFF,
            opacity: 0.3,
            x: 1,
            y: 1,
            z: 1
        };
    }
    
    /**
     * 初始化
     * @return {void}
     */
    protected init(): void {
        const _this = this;
    }
    
    /**
     * 创建
     * @return {any} 实例
     */
    protected create(): void {
        const _this = this;
    }
    
    /**
     * 更新
     * @param {boolean} isResize 是否调整大小
     * @return {void}
     */
    public update(isResize: boolean = false): void {
        const _this = this;
    }
    
    /**
     * 销毁
     * @return {void}
     */
    public destroy(): void {
        const _this = this;
    }
    
    /**
     * 新增
     * @param {string} type 类型
     * @param {string} name 名称
     * @return {void}
     */
    public add(type: string, name: string): void {
        const _this = this;
        
        _this.instance[name] = _this[type]();
    }
    
    /**
     * 自然光
     * @return {object} 光对象
     */
    protected ambient() {
        const _this = this,
            color = _this.config.color,
            opacity = _this.config.opacity;
        
        return new Global.THREE.AmbientLight(color, opacity);
    }
    
    /**
     * 角度自然光
     * @return {object} 光对象
     */
    protected direction() {
        const _this = this,
            color = _this.config.color,
            opacity = _this.config.opacity,
            x = _this.config.x,
            y = _this.config.y,
            z = _this.config.z,
            light = new Global.THREE.DirectionalLight(color, opacity);
        
        light.position.set(x, y, z);
        
        return light;
    }
}
