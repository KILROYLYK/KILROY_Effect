import Environment from '../../interface/Environment';

/**
 * 基类-环境
 */
export default abstract class _Environment implements Environment {
    public config: any = null; // 配置
    public isCreate: boolean = false; // 是否创建
    public instance: object = null; // 实例
    
    /**
     * 创建
     * @return {any} 实例
     */
    public create(): void {
        const _this = this;
        
        _this.isCreate = true;
    }
    
    /**
     * 初始化
     * @return {void}
     */
    public init(): void {
        const _this = this;
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
        
        _this.isCreate = false;
        _this.instance = null;
    }
}
