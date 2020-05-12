import Global from '../constant/global';
import 'pixi-sound';

export interface PreloadConfig {
    list?: string[],
    loadingCallback?: Function,
    finishCallback?: Function
}

/**
 * 预加载
 */
export default class Preload {
    private readonly config: object = { // 配置
        loader: null, // 加载对象
        list: [] as string[], // 资源列表
        finish: 0 as number, // 完成总数
        loadingCallback: null as Function,
        finishCallback: null as Function
    };
    
    /**
     * 原型对象
     * @constructor Preload
     * @param {object} config 配置
     */
    constructor(config: PreloadConfig = {}) {
        const _this = this;
        
        _this.config.loader = new Global.PIXI.Loader();
        
        _this.config.list = config.list || [];
        _this.config.loadingCallback = config.loadingCallback || null;
        _this.config.finishCallback = config.finishCallback || null;
        
        _this.init();
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
     * 加载游戏素材
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
            .load((load, resources) => {
                _this.config.finishCallback && _this.config.finishCallback(resources);
            });
    }
}
