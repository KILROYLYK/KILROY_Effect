/**
 * Public
 */
import { d } from '../../../_Base/js/window';

/**
 * App
 */
class App {
    /**
     * 原型对象
     * @constructor App
     * @param {object} config 配置
     */
    constructor(config = {}) {
        const _this = this;
        
        _this.config = {
            id: config.id || 'app',
            object: null
        };
        
        _this.init();
        
        return _this.config.object;
    }
    
    /**
     * 初始化
     * @return {void}
     */
    init() {
        const _this = this;
        
        _this.config.object = _this.getDom();
    }
    
    /**
     * 获取Dom
     * @return {object} Dom
     */
    getDom() {
        const _this = this,
            dom = d.getElementById(_this.config.id);
        
        if (!dom) {
            const div = d.createElement('div');
            
            div.setAttribute('id', _this.config.id);
            div.setAttribute('class', _this.config.id);
            d.getElementsByTagName('body')[0].appendChild(div);
      
            return div;
        }
        
        return dom;
    }
}

export default App;
