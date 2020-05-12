import Global from '../constant/global';
import * as PIXISound from 'pixi-sound';

/**
 * 预加载
 */
class Pre {
    /**
     * 原型对象
     * @constructor Pre
     * @param {object} config 配置
     */
    constructor(config = {}) {
        const _this = this;
        
        _this.config = {
            loadTotal: img.length + gameImg.length + gameAnimation.length * 2 + gameMusic.length,
            loaded: 0,
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

export default Pre;
