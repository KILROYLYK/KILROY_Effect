import Object from '../interface/Object';

/**
 * 基类-对象
 */
export default abstract class _Object implements Object {
    public config: any = null; // 配置
    public instance: object = {}; // 实例
    
    /**
     * 初始化
     * @return {void}
     */
    public init(): void {
        const _this = this;
    }
    
    /**
     * 创建
     * @param {string} type 类型
     * @param {string} name 名称
     * @param {object} config 名称
     * @return {any} 实例
     */
    public create(type: string, name: string, config?: any): void {
        const _this = this;
        
        _this.instance[name] = _this[type](config);
        return _this.instance[name];
    }
    
    /**
     * 更新
     * @return {void}
     */
    public update(): void {
        const _this = this;
        
        _this.init();
    }
    
    /**
     * 销毁
     * @return {void}
     */
    public destroy(): void {
        const _this = this;
        
        _this.instance = [];
    }
}
