/**
 * Pixi
 */
const PIXI = require('pixi.js');

/**
 * Controller
 */

/**
 * 角色
 */
class Character {
    /**
     * 原型对象
     * @constructor Character
     * @param {object} config 配置
     */
    constructor(config = {}) {
        const _this = this;
        
        _this.config = {
            radius: config.radius || 10
        };
        
        _this.chassis = {
            color: 0x000000,
            alpha: 0.3,
            origin: _this.config.radius,
            radius: _this.config.radius,
            object: new PIXI.Graphics()
        };
        
        _this.arrow = {
            color: 0xCCCCCC,
            alpha: 0.3,
            width: _this.chassis.radius / 2,
            height: _this.chassis.radius / 2
        };
        
        _this.object = new PIXI.Container();
        
        _this.init();
    }
    
    /**
     * 初始化
     * @return {void}
     */
    init() {
        const _this = this;
        
        _this.createChassis();
        
        _this.object.x = _this.chassis.origin;
        _this.object.y = _this.chassis.origin;
    }
    
    /**
     * 创建底盘
     * @return {void}
     */
    createChassis() {
        const _this = this;
        
        _this.chassis.object.lineStyle(0);
        _this.chassis.object.beginFill(_this.chassis.color, _this.chassis.alpha);
        _this.chassis.object.drawCircle(0, 0, _this.chassis.radius);
        _this.chassis.object.endFill();
        _this.object.addChild(_this.chassis.object);
    }
}

export default Character;
