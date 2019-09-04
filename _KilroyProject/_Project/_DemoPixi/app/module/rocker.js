/**
 * Pixi
 */
const PIXI = require('pixi.js');

/**
 * 摇杆
 */
class Rocker {
    /**
     * 原型对象
     * @constructor Rocker
     * @param {object} config 配置
     */
    constructor(config = {}) {
        const _this = this;
        
        _this.config = {
            resources: config.resources,
            wh: config.wh || 200,
            direction: config.direction || 8,
            flag: false,
            move: 0,
            callback: config.callback || {}
        };
        
        _this.object = new PIXI.Container();
        
        _this.panel = {
            color: 0xFFFFFF,
            alpha: 1,
            origin: _this.config.wh / 2,
            wh: _this.config.wh * 0.6,
            zIndex: 0,
            sprite: _this.config.resources.rocker.texture,
            object: new PIXI.Container()
        };
        
        _this.button = {
            color: 0xFFFFFF,
            alpha: 1,
            origin: _this.panel.origin,
            wh: _this.panel.wh * 0.45,
            zIndex: 1,
            radian: 0,
            maxRadian: 1.6,
            angle: 0,
            sensitivity: _this.panel.wh / 2 * 0.3,
            position: {
                x: 0,
                y: 0
            },
            sprite: _this.config.resources.rocker_button.texture,
            object: new PIXI.Container()
        };
        
        _this.init();
    }
    
    /**
     * 初始化
     * @return {void}
     */
    init() {
        const _this = this;
        
        createPanel.call(_this);
        createButton.call(_this);
    }
    
    /**
     * 运动
     * @return {void}
     */
    move() {
        const _this = this;
        
        _this.config.callback(_this.config.move);
    }
    
    /**
     * 停止运动
     * @return {void}
     */
    stop() {
        const _this = this;
        
        _this.config.flag = false;
        buttonDragEnd.call(_this);
    }
}

/**
 * 创建面板
 * @return {void}
 */
function createPanel() {
    const _this = this,
        sprite = new PIXI.Sprite.from(_this.panel.sprite);
    
    sprite.width = _this.panel.wh;
    sprite.height = _this.panel.wh;
    sprite.x = _this.panel.origin - sprite.width / 2;
    sprite.y = _this.panel.origin - sprite.width / 2;
    sprite.alpha = _this.panel.alpha;
    _this.panel.object.addChild(sprite);
    _this.object.addChild(_this.panel.object);
}

/**
 * 创建摇杆
 * @return {void}
 */
function createButton() {
    const _this = this,
        sprite = new PIXI.Sprite.from(_this.button.sprite);
    
    sprite.width = _this.button.wh;
    sprite.height = _this.button.wh;
    sprite.x = _this.button.origin - sprite.width / 2;
    sprite.y = _this.button.origin - sprite.width / 2;
    sprite.alpha = _this.button.alpha;
    _this.button.object.addChild(sprite);
    _this.button.object.interactive = true;
    _this.button.object.buttonMode = true;
    _this.button.object
        .on('pointerdown', buttonDragStart.bind(_this))
        .on('pointermove', buttonDragMove.bind(_this))
        .on('pointerup', buttonDragEnd.bind(_this))
        .on('pointerupoutside', buttonDragEnd.bind(_this));
    _this.object.addChild(_this.button.object);
}

/**
 * 按钮拖动开始
 * @param {object} e 焦点对象
 * @return {void}
 */
function buttonDragStart(e) {
    const _this = this,
        position = e.data.getLocalPosition(_this.object);
    
    _this.config.flag = true;
    _this.button.position = position;
    _this.button.object.alpha = 0.5;
}

/**
 * 按钮拖动移动
 * @param {object} e 焦点对象
 * @return {void}
 */
function buttonDragMove(e) {
    const _this = this,
        position = e.data.getLocalPosition(_this.object),
        x = position.x - _this.button.position.x,
        y = position.y - _this.button.position.y;
    
    if (!_this.config.flag) return;
    
    _this.button.radian = Math.atan(x / y);
    _this.button.angle = getAngle.call(_this, x, y);
    
    buttonMove.call(_this, x, y);
    directionMove.call(_this, x, y);
}

/**
 * 摇杆拖动结束
 * @param {object} e 焦点对象
 * @return {void}
 */
function buttonDragEnd() {
    const _this = this;
    
    _this.config.flag = false;
    _this.config.move = 0;
    _this.button.position = {
        x: 0,
        y: 0
    };
    _this.button.object.x = 0;
    _this.button.object.y = 0;
    _this.button.object.alpha = _this.button.alpha;
}

/**
 * 摇杆移动
 * @param {number} x X
 * @param {number} y Y
 * @return {object} 范围内坐标
 */
function buttonMove(x, y) {
    const _this = this,
        range = _this.panel.wh / 2,
        radian = _this.button.radian,
        maxRadian = _this.button.maxRadian,
        X = Math.cos(radian),
        Y = Math.sin(radian),
        position = {
            x: x,
            y: y
        };
    
    if (Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2)) >= range) {
        if (x >= 0 && radian < 0 && radian > -maxRadian ||
            x < 0 && radian > 0 && radian < maxRadian) {
            position.x = -range * Y;
            position.y = -range * X;
        } else if (x >= 0 && radian > 0 && radian < maxRadian ||
            x < 0 && radian < 0 && radian > -maxRadian) {
            position.x = range * Y;
            position.y = range * X;
        } else {
            // position.x = 0;
            // position.y = 0;
        }
    }
    
    _this.button.object.x = position.x;
    _this.button.object.y = position.y;
}

/**
 * 方向移动
 * @param {number} x X
 * @param {number} y Y
 * @return {void}
 */
function directionMove(x, y) {
    const _this = this,
        piece = 360 / _this.config.direction,
        angle = _this.button.angle;
    
    let direction = 0;
    
    if (!_this.config.callback) return;
    
    if (Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2)) <
        _this.button.sensitivity) {
        _this.config.move = direction;
        return;
    }
    
    for (let i = 0, n = _this.config.direction; i < n; i++) {
        if (angle >= piece * i - piece / 2 && angle < piece * (i + 1) - piece / 2) {
            direction = i + 1;
        }
        if (direction === 0) direction = 1;
    }
    
    _this.config.move = direction;
}

/**
 * 获取角度
 * @param {number} x X
 * @param {number} y Y
 * @return {number} 角度
 */
function getAngle(x, y) {
    const _this = this,
        radian = _this.button.radian;
    
    let angle = 180 / (Math.PI / radian);
    
    if (x === 0 && y === 0) {
        angle = 0;
    }
    
    if (x === 0 && y < 0) {
        angle = 0;
    }
    
    if (x === 0 && y > 0) {
        angle = 180;
    }
    
    if (x > 0 && y === 0) {
        angle = 90;
    }
    
    if (x < 0 && y === 0) {
        angle = 270;
    }
    
    if (x > 0 && y < 0) {
        angle = -angle;
    }
    
    if (x > 0 && y > 0) {
        angle = 180 - angle;
    }
    
    if (x < 0 && y > 0) {
        angle = 180 - angle;
    }
    
    if (x < 0 && y < 0) {
        angle = 360 - angle;
    }
    
    return angle;
}

export default Rocker;