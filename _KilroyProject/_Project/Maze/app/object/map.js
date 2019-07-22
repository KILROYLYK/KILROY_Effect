/**
 * Pixi
 */
const PIXI = require('pixi.js');

/**
 * Constant
 */
import { mazeWay, mazeList } from '../constant/maze';

/**
 * Controller
 */
import { WH } from '../controller/window';

/**
 * 地图
 */
const time = 3,
    Map = new PIXI.Container(),
    Border = {
        color: 0x000000,
        alpha: 1,
        wh: 1
    },
    Maze = {
        color: 0xFFFFFF,
        alpha: 1,
        wh: WH * time,
        map: mazeList[0],
        object: new PIXI.Graphics()
    },
    Grid = {
        row: 10 * time,
        color: 0xCCCCCC,
        alpha: 1,
        wh: Maze.wh / (10 * time),
        x: 0,
        y: 0
    };

Maze.object.beginFill(Maze.color, Maze.alpha);
Maze.object.drawRect(0, 0, Maze.wh, Maze.wh);
Maze.object.endFill();

for (let i = 0, n = Math.pow(Grid.row, 2); i < n; i++) {
    const grid = new PIXI.Container(),
        fill = new PIXI.Graphics();
    
    grid.x = Grid.x;
    grid.y = Grid.y;
    grid.wall = mazeWay[Maze.map[i]];
    
    fill.beginFill(Grid.color, Grid.alpha);
    fill.drawRect(0, 0, Grid.wh, Grid.wh);
    fill.endFill();
    fill.interactive = true;
    fill.buttonMode = true;
    fill.on('pointertap', () => {
        console.log(i, grid.wall);
    });
    
    grid.addChild(fill);
    
    if ((/top/i).test(mazeWay[Maze.map[i]])) {
        const border = new PIXI.Graphics();
        border.beginFill(Border.color, Border.alpha);
        border.drawRect(0, 0, Grid.wh, Border.wh);
        border.endFill();
        grid.addChild(border);
    }
    
    if ((/left/i).test(mazeWay[Maze.map[i]])) {
        const border = new PIXI.Graphics();
        border.beginFill(Border.color, Border.alpha);
        border.drawRect(0, 0, Border.wh, Grid.wh);
        border.endFill();
        grid.addChild(border);
    }
    
    if ((/right/i).test(mazeWay[Maze.map[i]])) {
        const border = new PIXI.Graphics();
        border.beginFill(Border.color, Border.alpha);
        border.drawRect(Grid.wh - Border.wh, 0, Border.wh, Grid.wh);
        border.endFill();
        grid.addChild(border);
    }
    
    if ((/bottom/i).test(mazeWay[Maze.map[i]])) {
        const border = new PIXI.Graphics();
        border.beginFill(Border.color, Border.alpha);
        border.drawRect(0, Grid.wh - Border.wh, Grid.wh, Border.wh);
        border.endFill();
        grid.addChild(border);
    }
    
    Maze.object.addChild(grid);
    
    Grid.x += Grid.wh;
   
    if (Grid.x > Maze.wh - 1) {
        Grid.x = 0;
        Grid.y += Grid.wh;
    }
}

Map.addChild(Maze.object);
Map.x = Grid.wh * 4.5;
Map.y = -Maze.wh + Grid.wh * 5.5;

export default Map;
