/**
 * Pixi
 */
const PIXI = require('pixi.js');

/**
 * 圆圈1
 */
class Circle1 {
    /**
     * 原型对象
     * @constructor Graphics
     * @param {object} config 配置
     */
    constructor(config = {}) {
        const _this = this;
        
        _this.config = {};
        
        _this.object = new PIXI.Container();
    }
    
    /**
     * 初始化
     * @return {void}
     */
    init() {
        const _this = this;
    }
    
    /**
     * 更新
     * @return {void}
     */
    update() {
        const _this = this;
    }
    
    /**
     * 调整更新
     * @return {void}
     */
    resizeUpdate() {
        const _this = this;
    }
    
    /**
     * 运动
     * @return {void}
     */
    move() {
        const _this = this;
    }
}

export default Circle1;
