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
            type: config.type || 0,
            wh: config.wh || 20,
            volume: config.volume || 0.1
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
            alpha: 0.4,
            width: _this.config.wh * 0.6,
            height: _this.config.wh * 0.2,
            object: new PIXI.Graphics()
        };
        
        _this.people = {
            index: _this.config.index,
            width: _this.config.wh * 1.6,
            speed: 1.2,
            sprite: _this.config.resources['character_' + _this.config.index].spritesheet,
            sound: _this.config.resources['character_' + _this.config.index + '_m'].sound,
            object: null
        };
        
        _this.dust = {
            width: _this.config.wh * 1.2,
            x: 0.8,
            speed: 0.2,
            sprite: _this.config.resources.dust.spritesheet,
            object: null
        };
        
        _this.exclamation = {
            width: _this.config.wh * 1.2,
            sprite: _this.config.resources.exclamation.texture,
            object: null
        };
        
        _this.init();
    }
    
    /**
     * 初始化
     * @return {void}
     */
    init() {
        const _this = this;
        
        createChassis.call(_this);
        createShadow.call(_this);
        createPeople.call(_this);
    }
    
    /**
     * 开始运动
     * @return {void}
     */
    start() {
        const _this = this;
        
        _this.people.object.play();
        _this.dust.object.play();
    }
    
    /**
     * 停止运动
     * @return {void}
     */
    stop() {
        const _this = this;
        
        _this.people.object.gotoAndStop(0);
        _this.dust.object.gotoAndStop(0);
    }
    
    /**
     * 左运动
     * @return {void}
     */
    animationLeft() {
        const _this = this,
            characterA = _this.people.sprite.animations['character_' + _this.people.index + '_l'],
            dustA = _this.dust.sprite.animations.dust_l;
        
        if (_this.people.object.textures === characterA) return;
        _this.people.object.texture = characterA[0];
        _this.people.object.textures = characterA;
        if (_this.config.type === 1) {
            _this.dust.object.texture = dustA[0];
            _this.dust.object.textures = dustA;
            _this.dust.object.x = _this.config.wh - _this.dust.object.width * (1 - _this.dust.x);
        }
    }
    
    /**
     * 右运动
     * @return {void}
     */
    animationRight() {
        const _this = this,
            animation = _this.people.sprite.animations['character_' + _this.people.index + '_r'],
            dustA = _this.dust.sprite.animations.dust_r;
        
        if (_this.people.object.textures === animation) return;
        _this.people.object.texture = animation[0];
        _this.people.object.textures = animation;
        if (_this.config.type === 1) {
            _this.dust.object.texture = dustA[0];
            _this.dust.object.textures = dustA;
            _this.dust.object.x = -_this.dust.object.width * _this.dust.x;
        }
    }
    
    /**
     * 自动移动
     * @param {number} time 间隔时间
     * @return {void}
     */
    autoMove(time) {
        const _this = this;
        
        let type = 'right';
        
        if (_this.config.type !== 0) return;
        
        setInterval(() => {
            if (type === 'left') {
                type = 'right';
                _this.animationRight();
            } else if (type === 'right') {
                type = 'left';
                _this.animationLeft();
            }
        }, time);
    }
    
    /**
     * 切换角色
     * @param {number} index 切换角色index
     * @return {void}
     */
    switchCharacter(index) {
        const _this = this;
        
        _this.config.index = index;
        _this.people.index = index;
        _this.people.sprite = _this.config.resources['character_' + _this.people.index].spritesheet;
        _this.people.sound = _this.config.resources['character_' + _this.people.index + '_m'].sound;
        _this.animationRight();
    }
}

/**
 * 创建底盘
 * @return {void}
 */
function createChassis() {
    const _this = this;
    
    _this.chassis.object.circular = false;
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
function createShadow() {
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
function createPeople() {
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
    _this.people.object.animationSpeed = _this.people.speed;
    
    if (_this.config.type === 0) {
        createExclamation.call(_this);
    } else if (_this.config.type === 1) {
        createDust.call(_this);
    }
    
    _this.object.addChild(_this.people.object);
}

/**
 * 创建尘土
 * @return {void}
 */
function createDust() {
    const _this = this,
        animation = _this.dust.sprite.animations.dust_r,
        spriteW = _this.dust.sprite.textures['dust_l_00000.png'].width,
        spriteH = _this.dust.sprite.textures['dust_l_00000.png'].height,
        width = _this.dust.width,
        height = width / (spriteW / spriteH),
        x = -width * _this.dust.x,
        y = _this.config.wh - height - _this.shadow.height / 2;
    
    _this.dust.object = new PIXI.AnimatedSprite(animation);
    _this.dust.object.width = width;
    _this.dust.object.height = height;
    _this.dust.object.x = x;
    _this.dust.object.y = y;
    _this.dust.object.animationSpeed = _this.dust.speed;
    
    _this.object.addChild(_this.dust.object);
    
}

/**
 * 创建感叹号
 * @return {void}
 */
function createExclamation() {
    const _this = this,
        spriteW = _this.exclamation.sprite.width,
        spriteH = _this.exclamation.sprite.height,
        width = _this.dust.width,
        height = width / (spriteW / spriteH),
        x = (_this.config.wh - width) / 2,
        y = -_this.people.object.height - _this.shadow.height / 2 - _this.config.wh * 0.6;
    
    _this.exclamation.object = new PIXI.Sprite.from(_this.exclamation.sprite);
    _this.exclamation.object.width = width;
    _this.exclamation.object.height = height;
    _this.exclamation.object.x = x;
    _this.exclamation.object.y = y;
    
    _this.object.addChild(_this.exclamation.object);
}

export default Character;
