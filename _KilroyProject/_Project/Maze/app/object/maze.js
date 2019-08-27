/**
 * Pixi
 */
const PIXI = require('pixi.js');

/**
 * Src
 */
import imgLawn from '../../src/img/lawn.jpg';
import imgGrass from '../../src/img/grass.png';

/**
 * Constant
 */
import { way, matrix } from '../constant/maze';

/**
 * 迷宫
 */
class Maze {
    /**
     * 原型对象
     * @constructor Maze
     * @param {object} config 配置
     */
    constructor(config = {}) {
        const _this = this,
            maze = matrix[config.map || 0];
        
        _this.config = {
            wh: config.wh || 500,
            margin: config.margin || 50,
            row: maze.grid,
            multiple: config.multiple || 5,
            enter: maze.enter,
            out: maze.out
        };
        
        _this.object = new PIXI.Container();
        
        _this.map = {
            color: 0xEAD8A0,
            alpha: 1,
            x: -_this.config.margin,
            y: -_this.config.margin,
            wh: _this.config.wh * _this.config.multiple + _this.config.margin * 2,
            way: way,
            matrix: maze.map,
            object: new PIXI.Graphics()
        };
        
        _this.grid = {
            color: 0x85B211,
            alpha: 1,
            x: 0,
            y: 0,
            wh: _this.config.wh * _this.config.multiple / _this.config.row,
            row: _this.config.row,
            object: new PIXI.Graphics()
        };
        
        _this.wall = {
            wh: _this.grid.wh * 0.25,
            index: 4
        };
        
        _this.img = {
            lawn: new PIXI.Texture.from(imgLawn),
            grass: new PIXI.Texture.from(imgGrass)
        };
        
        _this.init();
    }
    
    /**
     * 初始化
     * @return {void}
     */
    init() {
        const _this = this;
        
        _this.createMap();
        _this.createGrid();
    }
    
    /**
     * 创建地图
     * @return {void}
     */
    createMap() {
        const _this = this;
        
        _this.map.object.beginFill(_this.map.color, _this.map.alpha);
        _this.map.object.drawRect(_this.map.x, _this.map.y, _this.map.wh, _this.map.wh);
        _this.map.object.endFill();
        _this.object.addChild(_this.map.object);
    }
    
    /**
     * 创建格子
     * @return {void}
     */
    createGrid() {
        const _this = this;
        
        for (let i = 0, n = Math.pow(_this.grid.row, 2); i < n; i++) {
            const grid = new PIXI.Container(),
                fill = PIXI.Sprite.from(_this.img.lawn);
            
            if (i !== 0 && i % 30 === 0) {
                _this.grid.x = 0;
                _this.grid.y += _this.grid.wh;
            }
            
            grid.wall = _this.map.way[_this.map.matrix[i]];
            grid.x = _this.grid.x;
            grid.y = _this.grid.y;
            
            fill.width = _this.grid.wh;
            fill.height = _this.grid.wh;
            fill.x = 0;
            fill.y = 0;
            
            grid.addChild(fill);
            _this.createWall(i, grid);
            _this.grid.object.addChild(grid);
            
            _this.grid.x += _this.grid.wh;
        }
        
        _this.map.object.addChild(_this.grid.object);
    }
    
    /**
     * 创建墙壁
     * @param {number} index 格子位置
     * @param {object} grid 格子
     * @return {void}
     */
    createWall(index, grid) {
        const _this = this,
            wallGroup = new PIXI.Container(),
            wh = _this.wall.wh,
            n = _this.wall.index;
        
        if ((/top/i).test(grid.wall)) {
            const wall = new PIXI.Container();
            wall.x = 0;
            wall.y = 0;
            for (let i = 0; i < n; i++) {
                const grass = new PIXI.Sprite.from(_this.img.grass);
                grass.width = wh;
                grass.height = wh;
                grass.x = i * wh;
                grass.y = 0;
                wall.addChild(grass);
            }
            wallGroup.addChild(wall);
        }
        
        if ((/left/i).test(grid.wall)) {
            const wall = new PIXI.Container();
            wall.x = 0;
            wall.y = 0;
            for (let i = 0; i < n; i++) {
                const grass = new PIXI.Sprite.from(_this.img.grass);
                grass.width = wh;
                grass.height = wh;
                grass.x = 0;
                grass.y = i * wh;
                wall.addChild(grass);
            }
            wallGroup.addChild(wall);
        }
        
        if ((/right/i).test(grid.wall)) {
            const wall = new PIXI.Container();
            wall.x = _this.grid.wh - _this.wall.wh;
            wall.y = 0;
            for (let i = 0; i < n; i++) {
                const grass = new PIXI.Sprite.from(_this.img.grass);
                grass.width = wh;
                grass.height = wh;
                grass.x = 0;
                grass.y = i * wh;
                wall.addChild(grass);
            }
            wallGroup.addChild(wall);
        }
        
        if ((/bottom/i).test(grid.wall)) {
            const wall = new PIXI.Container();
            wall.x = 0;
            wall.y = _this.grid.wh - _this.wall.wh;
            for (let i = 0; i < n; i++) {
                const grass = new PIXI.Sprite.from(_this.img.grass);
                grass.width = wh;
                grass.height = wh;
                grass.x = i * wh;
                grass.y = 0;
                wall.addChild(grass);
            }
            wallGroup.addChild(wall);
        }
    
        if (index === _this.config.enter.grid) wallGroup.addChild(_this.createDoor('enter'));
        if (index === _this.config.out.grid) wallGroup.addChild(_this.createDoor('out'));
        
        grid.addChild(wallGroup);
    }
    
    /**
     * 创建门口
     * @param {object} name 出入口
     * @return {object} 门
     */
    createDoor(name) {
        const _this = this,
            door = new PIXI.Container(),
            children = door.children,
            wh = _this.wall.wh;
    
        if (name === 'enter') door.name = '入口';
        if (name === 'out') door.name = '出口';
        
        for (let i = 0; i < 4; i++) {
            const grass = new PIXI.Sprite.from(_this.img.grass);
            grass.width = wh;
            grass.height = wh;
            door.addChild(grass);
        }
        
        children[0].x = 0;
        children[0].y = 0;
        
        if (_this.config[name].door === 'top') {
            door.x = 0;
            door.y = 0;
            children[1].x = 3 * wh;
            children[1].y = 0;
            children[2].x = 0;
            children[2].y = -wh;
            children[3].x = 3 * wh;
            children[3].y = -wh;
        }
        
        if (_this.config[name].door === 'left') {
            door.x = 0;
            door.y = 0;
            children[1].x = 0;
            children[1].y = 3 * wh;
            children[2].x = -wh;
            children[2].y = 0;
            children[3].x = -wh;
            children[3].y = 3 * wh;
        }
        
        if (_this.config[name].door === 'right') {
            door.x = _this.grid.wh - _this.wall.wh;
            door.y = 0;
            children[1].x = 0;
            children[1].y = 3 * wh;
            children[2].x = wh;
            children[2].y = 0;
            children[3].x = wh;
            children[3].y = 3 * wh;
        }
        
        if (_this.config[name].door === 'bottom') {
            door.x = 0;
            door.y = _this.grid.wh - _this.wall.wh;
            children[1].x = 3 * wh;
            children[1].y = 0;
            children[2].x = 0;
            children[2].y = wh;
            children[3].x = 3 * wh;
            children[3].y = wh;
        }
        
        return door;
    }
}

export default Maze;
