/**
 * 接口
 */
export default interface _interface {
    readonly config?: object; // 配置
    
    /**
     * 构造函数
     * 配置基础信息
     * @return {void}
     */
    constructor();
    
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
