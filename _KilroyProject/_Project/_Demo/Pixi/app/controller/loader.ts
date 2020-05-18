import Global from '../constant/global';
import _Controller from '../interface/controller';

import * as PIXI from 'pixi.js';
import 'pixi-sound';

interface LoadConfig {
    list: string[],
    loadingCallback?: Function,
    finishCallback?: Function
}

/**
 * 加载
 */
export default class Loader implements _Controller {
    private loader: object = null; // 加载器对象
    private list: string[] = []; // 资源列表
    private data: object = {}; // 资源对象
    private finish: number = 0; // 完成总数
    private loadedCallback: Function = null; // 加载完成（单个资源）
    private finishCallback: Function = null; // 加载完成（全部资源）
    
    /**
     * 原型对象
     * @constructor Loader
     * @param {object} config 配置
     */
    constructor(config: LoadConfig = { list: [] }) {
        const _this = this;
        
        _this.list = config.list || [];
        _this.loadingCallback = config.loadingCallback || null;
        _this.finishCallback = config.finishCallback || null;
        
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
        
        _this.load();
    }
    
    /**
     * 销毁
     * @return {void}
     */
    public destroy(): void {
        const _this = this;
        
        _this.loader = null;
        _this.list = [];
        _this.data = {};
    }
    
    /**
     * 加载素材
     * @return {void}
     */
    private load(): void {
        const _this = this;
        
        _this.loader
            .add(_this.list)
            .on('progress', () => {
                _this.finish++;
                _this.loadedCallback && _this.loadedCallback(
                    _this.finish,
                    _this.list.length,
                    parseInt(String(_this.finish / _this.list.length * 100), 10)
                );
            })
            .load((load, res) => {
                _this.data = res;
                _this.finishCallback && _this.finishCallback(_this.data);
            });
    }
}
