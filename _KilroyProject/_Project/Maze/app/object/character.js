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
        
        _this.object = new PIXI.Container();
        
        _this.chassis = {
            color: 0x000000,
            alpha: 0,
            origin: _this.config.wh / 2,
            radius: _this.config.wh / 2,
            object: new PIXI.Graphics()
        };
        
        _this.shadow = {
            color: 0x000000,
            alpha: 0.5,
            width: _this.config.wh * 0.6,
            height: _this.config.wh * 0.2,
            object: new PIXI.Graphics()
        };
        
        _this.people = {
            index: _this.config.index,
            width: _this.config.wh * 1.6,
            sprite: _this.config.resources['character_' + _this.config.index].spritesheet
        };
        
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
    }
    
    /**
     * 创建底盘
     * @return {void}
     */
    createChassis() {
        const _this = this;
        
        _this.chassis.object.circular = true;
        _this.chassis.object.lineStyle(0);
        _this.chassis.object.beginFill(_this.chassis.color, _this.chassis.alpha);
        _this.chassis.object.drawCircle(_this.chassis.origin, _this.chassis.origin, _this.chassis.radius);
        _this.chassis.object.endFill();
        _this.chassis.object.x = 0;
        _this.chassis.object.y = 0;
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
        _this.shadow.object.drawEllipse(
            _this.config.wh / 2,
            _this.config.wh - _this.shadow.height,
            _this.shadow.width,
            _this.shadow.height
        );
        _this.shadow.object.endFill();
        _this.object.addChild(_this.shadow.object);
    }
    
    /**
     * 创建人物
     * @return {void}
     */
    createPeople() {
        const _this = this,
            animation = _this.people.sprite.animations['character_' + _this.people.index + '_r'],
            spriteW = _this.people.sprite.textures['character_' + _this.people.index + '_r_00.png'].width,
            spriteH = _this.people.sprite.textures['character_' + _this.people.index + '_r_00.png'].height,
            width = _this.people.width,
            height = width / (spriteW / spriteH),
            x = -(width - _this.config.wh) / 2,
            y = -(height - _this.config.wh) - _this.shadow.height / 2;
        
        _this.people.object = new PIXI.AnimatedSprite(animation);
        _this.people.object.width = width;
        _this.people.object.height = height;
        _this.people.object.x = x;
        _this.people.object.y = y;
        
        _this.object.addChild(_this.people.object);
    }
}

export default Character;
