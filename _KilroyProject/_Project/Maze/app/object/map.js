import MapList from "./map0";

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
const time = 1,
    Map = new PIXI.Container(),
    Border = {
        color: 0x000000,
        wh: 1
    },
    Maze = {
        color: 0xFFFFFF,
        zIndex: 1,
        wh: WH * time,
        map: mazeList[0],
        object: new PIXI.Graphics()
    },
    Grid = {
        row: 10 * time,
        color: 0xCCCCCC,
        zIndex: 1,
        wh: Maze.wh / 10 * time,
        x: 0,
        y: 0
    };

Maze.object.beginFill(Maze.color, Maze.zIndex);
Maze.object.drawRect(
    // Grid.wh * 5,
    // -Maze.wh + Grid.wh * 5,
    0, 0,
    Maze.wh,
    Maze.wh
);
Maze.object.endFill();

for (let i = 0, n = Math.pow(Grid.row, 2); i < n; i++) {
    const grid = new PIXI.Graphics();
    grid.beginFill(Grid.color, Grid.zIndex);
    grid.drawRect(Grid.x, Grid.y, Grid.wh, Grid.wh);
    grid.endFill();
    
    Maze.object.addChild(grid);
    Grid.x += Grid.wh;
    if (Grid.x > Maze.wh - 1) {
        Grid.x = 0;
        Grid.y += Grid.wh;
    }
}

console.log(Maze.object);

Map.addChild(Maze.object);

export default Map;
