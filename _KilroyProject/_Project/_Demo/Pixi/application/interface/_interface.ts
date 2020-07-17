/**
 * 接口
 */
export default interface Interface {
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
    update?(): void;
}
