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
        
        _this.shadow = {
            color: 0x000000,
            alpha: 0,
            wh: _this.config.wh,
            multiple: 0,
            object: new PIXI.Graphics()
        };
        
        _this.people = {
            index: _this.config.index,
            sprite: _this.config.resources['character_' + _this.config.index].spritesheet,
            object: new PIXI.Graphics()
        };
        
        _this.object = null;
        
        _this.init();
    }
    
    /**
     * 初始化
     * @return {void}
     */
    init() {
        const _this = this;
        
        _this.createShadow();
        _this.createPeople();
    }
    
    /**
     * 创建阴影
     * @return {void}
     */
    createShadow() {
        const _this = this,
            sprite = _this.config.resources.shadow.texture,
            width = sprite.width,
            height = sprite.height;
        
        _this.shadow.multiple = width / _this.shadow.wh;
        _this.object = new PIXI.Sprite(sprite);
        _this.object.width = _this.shadow.wh;
        _this.object.height = _this.shadow.wh / (width / height);
    }
    
    /**
     * 创建人物
     * @return {void}
     */
    createPeople() {
        const _this = this,
            width = _this.object.width * _this.shadow.multiple,
            spriteW = _this.people.sprite.data.meta.size.w,
            spriteH = _this.people.sprite.data.meta.size.h,
            animation = _this.people.sprite.animations['character_' + _this.people.index];
        
        _this.people.object = new PIXI.AnimatedSprite(animation);
        _this.people.object.width = width;
        _this.people.object.height = width / (spriteW / (spriteH / 2));
        _this.people.object.x = 0;
        _this.people.object.y = -_this.people.object.height + _this.object.height * 0.8 * _this.shadow.multiple;
        
        // _this.people.object.rotation = 10;
        console.log(_this.people.object.rotation);
        
        _this.object.addChild(_this.people.object);
    }
}

export default Character;
