/**
 * Public
 */
import { D } from '../../../_Base/javascript/window';

/**
 * App
 */
class App {
    /**
     * 原型对象
     * @constructor App
     * @param {string} id 框架ID
     */
    constructor(id = '') {
        const _this = this;
        
        _this.config = {
            id: id || 'app'
        };
        
        _this.init();
        
        return getDom.call(_this);
    }
    
    /**
     * 初始化
     * @return {void}
     */
    init() {
        const _this = this;
    }
}

/**
 * 获取Dom
 * @return {object} Dom
 */
function getDom() {
    const _this = this,
        dom = D.getElementById(_this.config.id);
    
    if (!dom) {
        const div = D.createElement('div');
        
        div.setAttribute('id', _this.config.id);
        div.setAttribute('class', _this.config.id);
        D.getElementsByTagName('body')[0].appendChild(div);
        
        return div;
    }
    
    return dom;
}

export default App;
