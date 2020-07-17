import Global from '../constant/global';
import Controller from '../interface/controller';

import * as PIXI from 'pixi.js';
import 'pixi-sound';

interface LoadConfig { // 加载配置
    loadedCallback?: Function // 加载完成（单个资源）
    finishCallback?: Function // 加载完成（全部资源）
}

interface PathConfig { // 地址配置
    name: string
    url: string
    onComplete?: Function
    crossOrigin?: boolean
}

/**
 * 加载
 */
export default class Loader implements Controller {
    public static instance: Loader = null; // 单例
    
    /**
     * 获取实例
     * @return {Loader} 实例
     */
    public static get Instance(): Loader {
        const _this = this;
        !_this.instance && (_this.instance = new Loader());
        return _this.instance;
    };
    
    private readonly name: string = 'Loader-加载';
    private loader: PIXI.Loader = null; // 加载器对象
    private data: object = {}; // 资源对象
    private finish: number = 0; // 完成总数
    private loadedCallback: Function = null; // 加载完成（单个资源）
    private finishCallback: Function = null; // 加载完成（全部资源）
    
    /**
     * 原型对象
     * @constructor Loader
     */
    constructor() {
        const _this = this;
        
        _this.create();
        _this.init();
    }
    
    /**
     * 创建
     * @return {void}
     */
    private create(): void {
        const _this = this;
        
        _this.loader = new PIXI.Loader();
    }
    
    /**
     * 初始化
     * @return {void}
     */
    private init(): void {
        const _this = this;
    }
    
    /**
     * 加载素材
     * @param {PathConfig[]} path 资源列表
     * @param {object} config 配置
     * @return {void}
     */
    public load(path: PathConfig[] = [], config: LoadConfig = {}): void {
        const _this = this,
            length = path.length;
        
        _this.loadedCallback = config.loadedCallback || null;
        _this.finishCallback = config.finishCallback || null;
        
        if (length === 0) {
            _this.loadedCallback && _this.loadedCallback(0, 0, 100);
            _this.finishCallback && _this.finishCallback(_this.data);
            return;
        }
        
        _this.loader
            .add(path)
            .use((resource, next) => {
                _this.finish++;
                _this.loadedCallback && _this.loadedCallback(
                    _this.finish, length,
                    parseInt(String(_this.finish / length * 100), 10)
                );
                next();
            })
            .load((loader, resources) => {
                _this.data = resources;
                _this.finishCallback && _this.finishCallback(_this.data);
            });
    }
}
