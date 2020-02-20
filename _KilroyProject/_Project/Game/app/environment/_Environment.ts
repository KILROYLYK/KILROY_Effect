import Environment from '../interface/environment'; // 接口

/**
 * 基类-环境
 */
export default abstract class _Environment implements Environment {
    public config: object = null; // 配置
    private isInit: boolean = false; // 是否初始化
    
    /**
     * 创建
     * @return {any} 实例
     */
    create(): any {
        const _this = this;
    }
    
    /**
     * 初始化
     * @return {void}
     */
    init(): void {
        const _this = this;
    }
    
    /**
     * 更新
     * @return {void}
     */
    update(isResize: boolean = false): void {
        const _this = this;
    }
    
    /**
     * 销毁
     * @return {void}
     */
    destroy(): void {
        const _this = this;
        let _instance = (<typeof _Environment> this.constructor)._instance;
        
        _instance && (_instance = null);
    }
}
