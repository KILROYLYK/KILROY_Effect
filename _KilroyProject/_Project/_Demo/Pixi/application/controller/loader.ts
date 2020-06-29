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
    private loader: object = null; // 加载器对象
    private path: PathConfig[] = []; // 资源地址
    private data: object = {}; // 资源对象
    private finish: number = 0; // 完成总数
    private loadedCallback: Function = null; // 加载完成（单个资源）
    private finishCallback: Function = null; // 加载完成（全部资源）
    
    /**
     * 原型对象
     * @constructor Loader
     * @param {PathConfig[]} path 资源列表
     * @param {object} config 配置
     */
    constructor(path: PathConfig[] = [], config: LoadConfig = {}) {
        const _this = this;
        
        _this.path = path;
        _this.loadedCallback = config.loadedCallback || null;
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
        _this.path = [];
        _this.data = {};
    }
    
    /**
     * 加载素材
     * @return {void}
     */
    private load(): void {
        const _this = this,
            length = _this.path.length;
        
        if (length === 0) {
            _this.loadedCallback && _this.loadedCallback(0, 0, 100);
            _this.finishCallback && _this.finishCallback(_this.data);
            return;
        }
        
        _this.loader
            .add(_this.path)
            .on('progress', () => {
                _this.finish++;
                _this.loadedCallback && _this.loadedCallback(
                    _this.finish, length,
                    parseInt(String(_this.finish / length * 100), 10)
                );
            })
            .load((load, res) => {
                _this.data = res;
                _this.finishCallback && _this.finishCallback(_this.data);
            });
    }
}
