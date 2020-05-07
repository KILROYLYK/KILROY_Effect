import Interface from './_interface'; // 接口

/**
 * 对象接口
 */
export default interface Object extends Interface {
    instance: object; // 实例
    
    /**
     * 创建
     * 创建实例
     * @return {void}
     */
    create(): void;
}
