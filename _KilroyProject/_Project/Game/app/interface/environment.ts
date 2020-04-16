import Interface from './_interface'; // 接口

/**
 * 环境接口
 */
export default interface _Environment extends Interface {
    instance: object; // 实例
    
    /**
     * 创建
     * 创建实例
     * @return {void}
     */
    create(): void;
}
