/**
 * Controller
 */
import App from '../controller/app';
import Application from '../controller/application';

/**
 * Object
 */
import Maze from '../object/maze';
import Character from '../object/character';
import ArrowKey from '../object/arrowKey';

/**
 * Main
 */
const config = {
        multiple: 4,
        speed: 2,
        margin: 50,
        flag: {
            userMove: true,
            mazeMove: false
        }
    },
    appMaze = new App('appMaze'),
    appArrowKey = new App('appArrowKey'),
    appMazeWH = appMaze.clientWidth,
    appArrowKeyWH = appArrowKey.clientWidth,
    appGame = Application.create('canvasMaze', {
        app: appMaze,
        width: appMazeWH,
        height: appMazeWH,
        autoDensity: true,
        antialias: true,
        preserveDrawingBuffer: true,
        backgroundColor: 0x000000,
        clearBeforeRender: true
    }),
    appKeyboard = Application.create('canvasArrowKey', {
        app: appArrowKey,
        width: appArrowKeyWH,
        height: appArrowKeyWH,
        transparent: true,
        autoDensity: true,
        antialias: true,
        preserveDrawingBuffer: true,
        backgroundColor: 0x000000,
        clearBeforeRender: true
    }),
    maze = new Maze({
        map: 0,
        wh: appMazeWH,
        margin: config.margin,
        multiple: config.multiple
    }),
    character = new Character({
        radius: maze.grid.wh * 0.7 / 2
    }),
    arrowKey = new ArrowKey({
        wh: appArrowKeyWH,
        direction: 8,
        callback: (direction) => {
            switch (direction) {
                case 1:
                    move(0, -config.speed);
                    break;
                case 2:
                    move(config.speed, -config.speed);
                    break;
                case 3:
                    move(config.speed, 0);
                    break;
                case 4:
                    move(config.speed, config.speed);
                    break;
                case 5:
                    move(0, config.speed);
                    break;
                case 6:
                    move(-config.speed, config.speed);
                    break;
                case 7:
                    move(-config.speed, 0);
                    break;
                case 8:
                    move(-config.speed, -config.speed);
                    break;
                case 0:
                default:
                    move(0, 0);
                    break;
            }
        }
    });

appGame.stage.addChild(maze.object);
appGame.stage.addChild(character.object);
appKeyboard.stage.addChild(arrowKey.object);

initialPosition();

appGame.ticker.add(() => {
    arrowKey.move();
});

appGame.start();
appKeyboard.start();

/**
 * 初始化位置
 * @return {void}
 */
function initialPosition() {
    const gridWH = maze.grid.wh,
        grid = maze.grid.object.children[maze.config.enter.grid];
    
    maze.object.x = -grid.x + config.margin;
    maze.object.y = -grid.y + appMaze.clientHeight - gridWH - config.margin;
    
    character.object.x = config.margin + gridWH / 2;
    character.object.y = appMaze.clientHeight - config.margin - gridWH / 2;
}

/**
 * 移动
 * @param {number} x X坐标
 * @param {number} y Y坐标
 * @return {void}
 */
function move(x, y) {
    const appW = appMaze.clientWidth,
        appH = appMaze.clientHeight,
        centerX = appW / 2 * 0.95,
        centerY = appH / 2 * 0.95;
    
    let mazeX = 0,
        mazeY = 0,
        characterX = 0,
        characterY = 0;
    
    if (config.flag.userMove) {
        characterX = x;
        characterY = y;
    }
    
    if (character.object.x >= centerX &&
        character.object.x <= appW - centerX) {
        characterX = 0;
        mazeX = x;
    }
    
    if (character.object.y >= centerY &&
        character.object.y <= appH - centerY) {
        characterY = 0;
        mazeY = y;
    }
    
    if (maze.object.x - mazeX >= config.margin ||
        maze.object.x - mazeX <= -(maze.map.wh - config.margin - appW)) {
        mazeX = 0;
        characterX = x;
    }
    
    if (maze.object.y - mazeY >= config.margin ||
        maze.object.y - mazeY <= -(maze.map.wh - config.margin - appH)) {
        mazeY = 0;
        characterY = y;
    }
    
    maze.object.x -= mazeX;
    maze.object.y -= mazeY;
    character.object.x += characterX;
    character.object.y += characterY;
}
