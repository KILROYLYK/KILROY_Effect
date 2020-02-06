/**
 * Public
 */
import { Base } from '../../../_Base/javascript/window';

/**
 * 更新
 */
class Update {
    /**
     * 原型对象
     * @constructor Update
     */
    constructor() {
        const _this = this;
        
        _this.init();
    }
    
    /**
     * 初始化
     * @return {object} 场景对象
     */
    init() {
        const _this = this;
    }
    
    /**
     * 自动更新
     * @param {function} callback 回调
     * @return {void}
     */
    autoUpdate(callback) {
        const _this = this;
        
        if (!callback) return;
        
        callback();
        requestAnimationFrame(() => {
            _this.autoUpdate(callback);
        });
    }
    
    /**
     * 调整更新
     * @param {function} callback 回调
     * @return {void}
     */
    resizeUpdate(callback) {
        const _this = this;
        
        if (!callback) return;
        
        Base.resizeWindow(() => {
            callback();
        });
    }
}

export default Update;
