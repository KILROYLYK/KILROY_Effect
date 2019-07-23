/**
 * Pixi
 */
const PIXI = require('pixi.js');

/**
 * Controller
 */
import { mazeWH, row } from '../controller/window';

/**
 * 角色
 */
class Character {
    /**
     * 原型对象
     * @constructor Character
     */
    constructor() {
        const _this = this;
        
        _this.config = {
            radius: mazeWH / row / 2
        };
        
        _this.chassis = {
            color: 0x000000,
            alpha: 0.3,
            origin: _this.config.radius,
            radius: _this.config.radius * 0.7,
            object: new PIXI.Graphics()
        };
        
        _this.arrow = {
            color: 0xCCCCCC,
            alpha: 0.3,
            width: _this.chassis.radius / 2,
            height: _this.chassis.radius / 2,
            object: {
                top: new PIXI.Graphics(),
                left: new PIXI.Graphics(),
                right: new PIXI.Graphics(),
                bottom: new PIXI.Graphics()
            }
        };
        
        _this.object = new PIXI.Container();
        
        _this.init();
    }
    
    /**
     * 初始化
     * @return {void}
     */
    init() {
        const _this = this,
            xy = mazeWH / 2 - _this.config.radius;
        
        _this.createChassis();
        
        _this.object.x = xy;
        _this.object.y = xy;
    }
    
    /**
     * 创建底盘
     * @return {void}
     */
    createChassis() {
        const _this = this;
        
        _this.chassis.object.lineStyle(0);
        _this.chassis.object.beginFill(_this.chassis.color, _this.chassis.alpha);
        _this.chassis.object.drawCircle(_this.chassis.origin, _this.chassis.origin, _this.chassis.radius);
        _this.chassis.object.endFill();
        _this.object.addChild(_this.chassis.object);
    }
}

export default new Character();
