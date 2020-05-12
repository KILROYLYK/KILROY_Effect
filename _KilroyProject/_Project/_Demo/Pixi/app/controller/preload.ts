import Global from '../constant/global';
import * as PIXISound from 'pixi-sound';



/**
 * 预加载
 */
export default class Preload {
    /**
     * 原型对象
     * @constructor Preload
     * @param {array} list 资源列表
     */
    constructor(list: object = {}) {
        const _this = this;
        
        _this.config = {
            list:{
            
            },
            total: img.length + gameImg.length + gameAnimation.length * 2 + gameMusic.length,
            finish: 0,
            loadingCallback: config.loadingCallback,
            finishCallback: config.finishCallback
        };
        
        _this.loader = new PIXI.Loader();
        
        _this.init();
    }
    
    /**
     * 初始化
     * @return {void}
     */
    init() {
        const _this = this;
        
        loadPage.call(_this, () => {
            loadGame.call(_this, (resources) => {
                if (_this.config.finishCallback) _this.config.finishCallback(resources);
            });
        });
    }
}

/**
 * 加载页面素材
 * @param {function} callback 完成回调
 * @return {void}
 */
function loadPage(callback = null) {
    const _this = this;
    
    Preload.process(img, {
        loadingCallback() {
            ++_this.config.loaded;
            if (!_this.config.loadingCallback) return;
            _this.config.loadingCallback(parseInt(_this.config.loaded / _this.config.loadTotal * 100));
        },
        finishCallback() {
            callback();
        }
    });
}

/**
 * 加载游戏素材
 * @param {function} callback 完成回调
 * @return {void}
 */
function loadGame(callback = null) {
    const _this = this;
    
    _this.loader
        .add(gameImg)
        .add(gameAnimation)
        .add(gameMusic)
        .on('progress', () => {
            ++_this.config.loaded;
            if (!_this.config.loadingCallback) return;
            _this.config.loadingCallback(parseInt(_this.config.loaded / _this.config.loadTotal * 100));
        })
        .load((load, resources) => {
            callback(resources);
        });
}
