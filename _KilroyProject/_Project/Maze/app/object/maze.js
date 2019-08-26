/**
 * Pixi
 */
const PIXI = require('pixi.js');

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
            color: 0x1C403B,
            alpha: 1,
            wh: 2
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
                fill = new PIXI.Graphics();
            
            if (i !== 0 && i % 30 === 0) {
                _this.grid.x = 0;
                _this.grid.y += _this.grid.wh;
            }
            
            grid.x = _this.grid.x;
            grid.y = _this.grid.y;
            grid.wall = _this.map.way[_this.map.matrix[i]];
            
            fill.beginFill(_this.grid.color, _this.grid.alpha);
            fill.drawRect(0, 0, _this.grid.wh, _this.grid.wh);
            fill.endFill();
            fill.interactive = true;
            fill.buttonMode = true;
            fill.on('pointertap', () => {
                console.log(i, grid.wall);
            });
            
            grid.addChild(fill);
            _this.createWall(grid);
            _this.grid.object.addChild(grid);
            
            _this.grid.x += _this.grid.wh;
        }
        
        _this.map.object.addChild(_this.grid.object);
    }
    
    /**
     * 创建墙壁
     * @param {object} grid 格子
     * @return {void}
     */
    createWall(grid) {
        const _this = this;
        
        if ((/top/i).test(grid.wall)) {
            const wall = new PIXI.Graphics();
            wall.beginFill(_this.wall.color, _this.wall.alpha);
            wall.drawRect(0, 0, _this.grid.wh, _this.wall.wh);
            wall.endFill();
            grid.addChild(wall);
        }
        
        if ((/left/i).test(grid.wall)) {
            const wall = new PIXI.Graphics();
            wall.beginFill(_this.wall.color, _this.wall.alpha);
            wall.drawRect(0, 0, _this.wall.wh, _this.grid.wh);
            wall.endFill();
            grid.addChild(wall);
        }
        
        if ((/right/i).test(grid.wall)) {
            const wall = new PIXI.Graphics();
            wall.beginFill(_this.wall.color, _this.wall.alpha);
            wall.drawRect(_this.grid.wh - _this.wall.wh, 0, _this.wall.wh, _this.grid.wh);
            wall.endFill();
            grid.addChild(wall);
        }
        
        if ((/bottom/i).test(grid.wall)) {
            const wall = new PIXI.Graphics();
            wall.beginFill(_this.wall.color, _this.wall.alpha);
            wall.drawRect(0, _this.grid.wh - _this.wall.wh, _this.grid.wh, _this.wall.wh);
            wall.endFill();
            grid.addChild(wall);
        }
    }
}

export default Maze;
