/**
 * 动画
 */
class animate {
    /**
     * 原型对象
     * @constructor Animate
     * @param {object} callback 回调
     */
    constructor(callback) {
        const _this = this;
        
        _this.callback = callback;
        
        _this.init();
    }
    
    /**
     * 初始化
     * @return {object} 场景对象
     */
    init() {
        const _this = this;
        
        if (!_this.callback) return;
        
        _this.callback();
        requestAnimationFrame(() => {
            _this.init();
        });
    }
}

export default animate;
