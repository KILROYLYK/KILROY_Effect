/**
 * Window
 */
import { Popup } from '../../../_Base/js/window';

/**
 * 弹窗
 */
class Pop {
    /**
     * 原型对象
     * @constructor Pop
     * @param {object} config 配置
     */
    constructor(config = {}) {
        const _this = this;
        
        _this.config = {
            object: {}
        };
        
        _this.init();
    }
    
    /**
     * 初始化
     * @return {void}
     */
    init() {
        const _this = this;
        
        createPopup.call(_this);
    }
}

/**
 * 创建弹窗
 * @return {void}
 */
function createPopup() {
    const _this = this;
    
    
}

export default Pop;
