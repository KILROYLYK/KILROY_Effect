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
            wh: config.wh || 200,
            direction: config.direction || 8,
            flag: false,
            move: 0,
            callback: config.callback || {}
        };
        
        _this.object = new PIXI.Container();
        
        _this.panel = {
            color: 0xFFFFFF,
            alpha: 0.2,
            origin: _this.config.wh / 2,
            radius: _this.config.wh / 2 * 0.6,
            zIndex: 0,
            object: new PIXI.Graphics()
        };
        
        _this.button = {
            color: 0xFFFFFF,
            alpha: 0.2,
            origin: _this.panel.origin,
            radius: _this.panel.radius * 0.65,
            zIndex: 1,
            radian: 0,
            maxRadian: 1.6,
            angle: 0,
            sensitivity: _this.panel.radius * 0.3,
            position: {
                x: 0,
                y: 0
            },
            object: new PIXI.Graphics()
        };
        
        _this.init();
    }
    
    /**
     * 初始化
     * @return {void}
     */
    init() {
        const _this = this;
        
        _this.createPanel();
        _this.createButton();
        _this.object.anchor = 0.5;
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
     * 创建面板
     * @return {void}
     */
    createPanel() {
        const _this = this;
        
        _this.panel.object.lineStyle(0);
        _this.panel.object.beginFill(_this.panel.color, 1);
        _this.panel.object.drawCircle(_this.panel.origin, _this.panel.origin, _this.panel.radius);
        _this.panel.object.endFill();
        _this.panel.object.zIndex = _this.panel.zIndex;
        _this.panel.object.alpha = _this.panel.alpha;
        _this.object.addChild(_this.panel.object);
    }
    
    /**
     * 创建摇杆
     * @return {void}
     */
    createButton() {
        const _this = this;
        
        _this.button.object.lineStyle(0);
        _this.button.object.beginFill(_this.button.color, 1);
        _this.button.object.drawCircle(_this.panel.origin, _this.panel.origin, _this.button.radius);
        _this.button.object.endFill();
        _this.button.object.zIndex = _this.button.zIndex;
        _this.button.object.alpha = _this.button.alpha;
        _this.button.object.interactive = true;
        _this.button.object.buttonMode = true;
        _this.button.object
            .on('pointerdown', _this.buttonDragStart.bind(_this))
            .on('pointermove', _this.buttonDragMove.bind(_this))
            .on('pointerup', _this.buttonDragEnd.bind(_this))
            .on('pointerupoutside', _this.buttonDragEnd.bind(_this));
        _this.object.addChild(_this.button.object);
    }
    
    /**
     * 按钮拖动开始
     * @param {object} e 焦点对象
     * @return {void}
     */
    buttonDragStart(e) {
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
    buttonDragMove(e) {
        const _this = this,
            position = e.data.getLocalPosition(_this.object),
            x = position.x - _this.button.position.x,
            y = position.y - _this.button.position.y;
        
        if (!_this.config.flag) return;
        
        _this.button.radian = Math.atan(x / y);
        _this.button.angle = _this.getAngle(x, y);
        
        _this.buttonMove(x, y);
        _this.directionMove(x, y);
    }
    
    /**
     * 摇杆拖动结束
     * @param {object} e 焦点对象
     * @return {void}
     */
    buttonDragEnd(e) {
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
    buttonMove(x, y) {
        const _this = this,
            range = _this.panel.radius,
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
    directionMove(x, y) {
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
    getAngle(x, y) {
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
}

export default Rocker;
