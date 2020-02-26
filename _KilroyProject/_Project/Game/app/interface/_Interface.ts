/**
 * 接口
 */
export default interface _Interface {
    config: any; // 配置
    isCreate: boolean; // 是否创建
    instance: object; // 实例
    
    /**
     * 构造函数
     * 配置基础信息
     * @return {void}
     */
    constructor();
    
    /**
     * 创建
     * 创建实例
     * @return {any} 实例
     */
    create(): void;
    
    /**
     * 初始化
     * 执行创建类逻辑
     * @return {void}
     */
    init(): void;
    
    /**
     * 更新
     * 更新对象
     * @return {void}
     */
    update(): void;
    
    /**
     * 销毁
     * 销毁对象
     * @return {void}
     */
    destroy(): void;
}
