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
            scalar: 1.3,
            x: 1,
            y: 1,
            z: 1,
            shadow: {
                show: true,
                map: 1024,
                far: 1000,
                position: 300
            }
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
            light = new Global.THREE.AmbientLight(
                _this.config.color,
                _this.config.opacity
            );
        
        light.castShadow = _this.config.shadow.show;
        
        return light;
    }
    
    /**
     * 角度自然光
     * @return {object} 光对象
     */
    protected direction() {
        const _this = this,
            light = new Global.THREE.DirectionalLight(
                _this.config.color,
                _this.config.opacity
            );
        
        light.position.set( // 设置光源位置
            _this.config.x,
            _this.config.y,
            _this.config.z
        );
        light.position.multiplyScalar(_this.config.scalar); // 标量相乘
        
        light.castShadow = _this.config.shadow.show;
        light.shadow.mapSize.width = _this.config.shadow.map;
        light.shadow.mapSize.height = _this.config.shadow.map;
        light.shadow.camera.far = 1000;
        light.shadow.camera.top = _this.config.shadow.position;
        light.shadow.camera.left = -_this.config.shadow.position;
        light.shadow.camera.right = _this.config.shadow.position;
        light.shadow.camera.bottom = -_this.config.shadow.position;
        
        return light;
    }
}
