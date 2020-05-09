import Global from '../../constant/global';
import _Stage from '../../interface/stage';
import Particle from '../../controller/particle';

/**
 * 场景
 */
export default class Stage implements _Stage {
    public readonly config: object = { // 配置
        dom: null as Element, // 元素
    };
    private particle = null as Particle // 粒子对象
    
    /**
     * 构造函数
     * @constructor Stage
     */
    constructor() {
        const _this = this;
        
        _this.config.dom = Global.GameDom;
        
        _this.create();
        _this.init();
    }
    
    /**
     * 创建
     * @return {any} 实例
     */
    private create(): void {
        const _this = this;
        
        _this.particle = new Particle(_this.config.dom);
    }
    
    /**
     * 初始化
     * @return {void}
     */
    private init(): void {
        const _this = this;
        _this.particle.writeText('KILROY');
    }
    
    /**
     * 更新
     * @param {boolean} isResize 是否调整大小
     * @return {void}
     */
    public update(isResize: boolean = false): void {
        const _this = this;
        
        _this.particle && _this.particle.update();
    }
    
    /**
     * 销毁
     * @return {void}
     */
    public destroy(): void {
        const _this = this;
        _this.particle.destroy();
        _this.particle = null;
    }
}
