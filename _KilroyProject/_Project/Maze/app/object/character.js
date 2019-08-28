/**
 * Pixi
 */
const PIXI = require('pixi.js');

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
            resources: config.resources,
            index: config.index || 1,
            wh: config.wh || 20
        };
        
        _this.chassis = {
            color: 0x000000,
            alpha: 0.1,
            origin: _this.config.wh / 2,
            radius: _this.config.wh / 2,
            object: new PIXI.Graphics()
        };
        
        _this.shadow = {
            color: 0x000000,
            alpha: 0.3,
            width: _this.config.wh / 2 * 0.8,
            height: _this.config.wh * 0.15,
            object: new PIXI.Graphics()
        };
        
        _this.people = {
            width: _this.config.wh * 0.6,
            sprite: _this.config.resources['character_' + _this.config.index].spritesheet,
            object: null
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
        _this.createShadow();
        _this.createPeople();
        _this.object.circular = true;
        _this.object.width = _this.config.wh;
        _this.object.height = _this.config.wh;
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
    
    /**
     * 创建阴影
     * @return {void}
     */
    createShadow() {
        const _this = this;
        
        _this.shadow.object.lineStyle(0);
        _this.shadow.object.beginFill(_this.shadow.color, _this.shadow.alpha);
        _this.shadow.object.drawEllipse(_this.config.wh / 2, _this.config.wh - _this.shadow.height, _this.shadow.width, _this.shadow.height);
        _this.shadow.object.endFill();
        _this.object.addChild(_this.shadow.object);
    }
    
    /**
     * 创建人物
     * @return {void}
     */
    createPeople() {
        const _this = this;
        
        console.log(_this.config.resources['character_' + _this.config.index]);
        console.log(_this.people.sprite);
        // _this.people.object = new PIXI.AnimatedSprite(_this.people.sprite.textures['0.png']);
        // _this.object.addChild(_this.people.object);
    }
}

export default Character;
