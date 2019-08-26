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
const multiple = 5,
    speed = 2,
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
        multiple: multiple
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
                    move(0, -speed);
                    break;
                case 2:
                    move(speed, -speed);
                    break;
                case 3:
                    move(speed, 0);
                    break;
                case 4:
                    move(speed, speed);
                    break;
                case 5:
                    move(0, speed);
                    break;
                case 6:
                    move(-speed, speed);
                    break;
                case 7:
                    move(-speed, 0);
                    break;
                case 8:
                    move(-speed, -speed);
                    break;
                case 0:
                default:
                    move(0, 0);
                    break;
            }
        }
    }),
    user = {
        flag: {
            move: true
        }
    };

appGame.stage.addChild(maze.object);
appGame.stage.addChild(character.object);
appKeyboard.stage.addChild(arrowKey.object);

appGame.ticker.add(() => {
    arrowKey.move();
});

appGame.start();
appKeyboard.start();

/**
 * 移动
 * @param {number} x X坐标
 * @param {number} y Y坐标
 * @return {void}
 */
function move(x, y) {
    let newX = x,
        newY = y;
    
    if (maze.object.x >= 0 || maze.object.x <= maze.map.wh - appMazeWH) {
        character.object.x += newX;
        newX = 0;
    }
    
    if (maze.object.y >= 0 || maze.object.y <= maze.map.wh - appMazeWH) {
        character.object.y += newY;
        newY = 0;
    }
    
    maze.object.x += newX;
    maze.object.y += newY;
}
