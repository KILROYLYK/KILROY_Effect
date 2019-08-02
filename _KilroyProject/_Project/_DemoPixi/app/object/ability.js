/**
 * Pixi
 */
const PIXI = require('pixi.js');

/**
 * 能力图
 */
class Ability {
    /**
     * 原型对象
     * @constructor Ability
     * @param {object} config 配置
     */
    constructor(config = {}) {
        const _this = this;
        
        _this.config = {
            wh: config.wh || 530,
            floor: config.floor || 5,
            speed: config.speed || 20,
            position: config.position || [0, 0, 0, 0, 0, 0]
        };
    
        _this.object = new PIXI.Container();
        
        _this.point = {
            color: 0xA49956,
            alpha: 1,
            wh: 6,
            zIndex: 2,
            position: [],
            speed: [],
            time: _this.config.speed,
            border: {
                color: 0xA49956,
                alpha: 1,
                wh: 1,
                padding: 2
            },
            object: new PIXI.Container()
        };
        
        _this.capability = {
            color: 0xA49956,
            alpha: 0.5,
            wh: 2,
            zIndex: 1,
            object: new PIXI.Graphics()
        };
        
        _this.panel = {
            color: 0x1B334C,
            alpha: 0.3,
            origin: _this.config.wh / 2,
            zIndex: 0,
            floor: _this.config.floor,
            padding: _this.point.wh / 2 + _this.point.border.padding + _this.point.border.wh + 5,
            border: {
                color: 0xA49956,
                alpha: 0.7,
                width: 1,
                surface: 6
            },
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
        
        _this.createPanel();
        _this.createPoint();
        _this.createCapability();
    }
    
    /**
     * 更新
     * @return {void}
     */
    update() {
        const _this = this;
        
        if (_this.point.time <= 0) {
            _this.point.time = 0;
            return;
        }
        
        _this.point.time--;
        
        for (let i = 0, n = _this.panel.border.surface; i < n; i++) {
            if (_this.point.position[i] !== _this.config.position[i]) {
                const position = _this.point.position[i] + _this.point.speed[i];
                _this.movePoint(i, position);
            } else {
                _this.point.speed[i] = 0;
            }
        }
        
        _this.drawCapability();
    }
    
    /**
     * 调整更新
     * @return {void}
     */
    resizeUpdate() {
        const _this = this;
        
    }
    
    /**
     * 创建面板
     * @return {void}
     */
    createPanel() {
        const _this = this;
        
        for (let i = 0, n = _this.panel.floor; i < n; i++) {
            const floor = new PIXI.Graphics(),
                polygon = [],
                ability = 1 - (i + 1) / _this.panel.floor || 1;
            
            floor.lineStyle(_this.panel.border.width, _this.panel.border.color, _this.panel.border.alpha);
            floor.beginFill(_this.panel.color, _this.panel.alpha);
            
            for (let ii = 0, nn = _this.panel.border.surface; ii < nn; ii++) {
                const coordinate = _this.getCoordinate(ii, ability);
                polygon.push(coordinate.x);
                polygon.push(coordinate.y);
            }
            
            floor.drawPolygon(polygon);
            floor.endFill();
            
            _this.panel.object.addChild(floor);
        }
        
        for (let i = 0, n = _this.panel.border.surface; i < n; i++) {
            const border = new PIXI.Graphics(),
                coordinate = _this.getCoordinate(i, 1);
            
            border.lineStyle(_this.panel.border.width, _this.panel.border.color, _this.panel.border.alpha);
            border.beginFill(_this.panel.border.color, _this.panel.border.alpha);
            border.moveTo(0, 0);
            border.lineTo(coordinate.x, coordinate.y);
            border.endFill();
            
            _this.panel.object.zIndex = _this.panel.zIndex;
            _this.panel.object.addChild(border);
        }
        
        _this.panel.object.x = _this.panel.origin;
        _this.panel.object.y = _this.panel.origin;
        
        _this.object.addChild(_this.panel.object);
    }
    
    /**
     * 创建能力点
     * @return {void}
     */
    createPoint() {
        const _this = this;
        
        _this.point.object.zIndex = _this.point.zIndex;
        
        for (let i = 0, n = _this.panel.border.surface; i < n; i++) {
            const point = new PIXI.Graphics();
            
            _this.point.position[i] = _this.config.position[i];
            _this.point.speed[i] = _this.config.position[i];
            
            const coordinate = _this.getCoordinate(i, _this.point.position[i]);
            
            point.lineStyle(0);
            point.beginFill(_this.point.color, _this.point.alpha);
            point.drawCircle(0, 0, _this.point.wh);
            point.endFill();
            
            point.lineStyle(_this.point.border.wh, _this.point.border.color, _this.point.border.alpha);
            point.beginFill(_this.point.color, 0);
            point.drawCircle(0, 0, _this.point.wh + _this.point.border.padding);
            point.endFill();
            point.x = coordinate.x;
            point.y = coordinate.y;
            
            _this.point.object.addChild(point);
        }
        
        _this.point.object.x = _this.panel.origin;
        _this.point.object.y = _this.panel.origin;
        
        _this.object.addChild(_this.point.object);
    }
    
    /**
     * 创建能力图
     * @return {void}
     */
    createCapability() {
        const _this = this;
        
        _this.capability.object.x = _this.panel.origin;
        _this.capability.object.y = _this.panel.origin;
        _this.capability.object.zIndex = _this.capability.zIndex;
        
        _this.drawCapability();
        
        _this.object.addChild(_this.capability.object);
    }
    
    /**
     * 绘制能力图
     * @return {void}
     */
    drawCapability() {
        const _this = this,
            polygon = [];
        
        _this.capability.object.clear();
        _this.capability.object.lineStyle(_this.capability.wh, _this.capability.color, 1);
        _this.capability.object.beginFill(_this.capability.color, _this.capability.alpha);
        
        for (let i = 0, n = _this.panel.border.surface; i < n; i++) {
            const coordinate = _this.getCoordinate(i, _this.point.position[i]);
            polygon.push(coordinate.x);
            polygon.push(coordinate.y);
        }
        
        _this.capability.object.drawPolygon(polygon);
        _this.capability.object.endFill();
    }
    
    /**
     * 获取坐标
     * @param {number} n 点
     * @param {number} ability 能力百分比
     * @return {object} 坐标
     */
    getCoordinate(n, ability) {
        const _this = this,
            coordinate = {
                x: 0,
                y: 0
            },
            angle = Math.atan(0.6),
            spacing = _this.panel.origin - _this.panel.padding,
            position = spacing * ability,
            x = Math.cos(angle),
            y = Math.sin(angle);
        
        // 点-上
        if (n === 0) {
            coordinate.y -= position;
        }
        
        // 点-右上
        if (n === 1) {
            coordinate.x += position * x;
            coordinate.y -= position * y;
        }
        
        // 点-右下
        if (n === 2) {
            coordinate.x += position * x;
            coordinate.y += position * y;
        }
        
        // 点-下
        if (n === 3) {
            coordinate.y += position;
        }
        
        // 点-左下
        if (n === 4) {
            coordinate.x -= position * x;
            coordinate.y += position * y;
        }
        
        // 点-左上
        if (n === 5) {
            coordinate.x -= position * x;
            coordinate.y -= position * y;
        }
        
        return coordinate;
    }
    
    /**
     * 移动点
     * @param {number} n 点
     * @param {number} ability 能力百分比
     * @return {void}
     */
    movePoint(n, ability) {
        const _this = this,
            coordinate = _this.getCoordinate(n, ability);
        
        _this.point.position[n] = ability;
        _this.point.object.children[n].x = coordinate.x;
        _this.point.object.children[n].y = coordinate.y;
    }
    
    /**
     * 显示能力图
     * @param {array} capability 能力值
     * @return {void}
     */
    showCapability(capability) {
        const _this = this,
            length = capability.length;
        
        if (capability.length !== 6) return;
        
        _this.point.time = _this.config.speed;
        
        for (let i = 0; i < length; i++) {
            let value = parseInt(capability[i]);
            if (value <= 0) value = 0;
            if (value >= 10) value = 10;
            _this.config.position[i] = value / 10;
            _this.point.speed[i] = (_this.config.position[i] - _this.point.position[i]) / _this.config.speed;
        }
    }
}

export default Ability;
