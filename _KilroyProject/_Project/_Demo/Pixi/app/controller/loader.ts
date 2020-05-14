import Global from '../constant/global';
import _Controller from '../interface/controller';
import 'pixi-sound';

export interface LoadConfig {
    list: string[],
    loadingCallback?: Function,
    finishCallback?: Function
}

/**
 * 加载
 */
export default class Loader implements _Controller {
    private readonly config: object = { // 配置
        loader: null, // 加载对象
        list: [] as string[], // 资源列表
        finish: 0 as number, // 完成总数
        loadingCallback: null as Function,
        finishCallback: null as Function
    };
    
    /**
     * 原型对象
     * @constructor Loader
     * @param {object} config 配置
     */
    constructor(config: LoadConfig = { list: [] }) {
        const _this = this;
        
        _this.config.loader = new Global.PIXI.Loader();
        
        _this.config.list = config.list || [];
        _this.config.loadingCallback = config.loadingCallback || null;
        _this.config.finishCallback = config.finishCallback || null;
        
        _this.create();
        _this.init();
    }
    
    /**
     * 创建
     * @return {void}
     */
    private create(): void {
        const _this = this;
    }
    
    /**
     * 初始化
     * @return {void}
     */
    private init(): void {
        const _this = this;
        
        _this.load();
    }
    
    /**
     * 更新
     * @param {boolean} isResize 屏幕是否变化
     * @return {void}
     */
    public update(isResize: boolean = false): void {
        const _this = this;
    }
    
    /**
     * 销毁
     * @return {void}
     */
    public destroy(): void {
        const _this = this;
    }
    
    /**
     * 加载素材
     * @return {void}
     */
    private load(): void {
        const _this = this;
        
        _this.config.loader
            .add(_this.config.list)
            .on('progress', () => {
                _this.config.finish++;
                _this.config.loadingCallback && _this.config.loadingCallback(
                    parseInt(String(_this.config.finish / _this.config.list.length * 100), 10)
                );
            })
            .load((load, res) => {
                _this.config.finishCallback && _this.config.finishCallback(res);
            });
    }
}
