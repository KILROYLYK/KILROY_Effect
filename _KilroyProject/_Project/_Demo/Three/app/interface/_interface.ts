/**
 * 接口
 */
export default interface Interface {
    readonly config?: object; // 配置
    instance?: any; // 实例
    
    /**
     * 创建
     * @return {void}
     */
    create(): void;
    
    /**
     * 初始化
     * @return {void}
     */
    init(): void;
    
    /**
     * 更新
     * @return {void}
     */
    update(): void;
    
    /**
     * 销毁
     * @return {void}
     */
    destroy(): void;
}
