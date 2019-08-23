/**
 * Controller
 */
import App from '../controller/app';
import Application from '../controller/application';

/**
 * Object
 */
import Maze from '../object/maze';
// import Character from '../object/character';
import ArrowKey from '../object/arrowKey';

/**
 * Main
 */
const appMaze = new App('appMaze'),
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
        wh: appMazeWH,
        time: 10,
        row: 30
    }),
    arrowKey = new ArrowKey({
        wh: appArrowKeyWH,
        direction: 8,
        callback: (direction) => {
            console.log(direction);
        }
    }),
    user = {
        flag: {
            move: true
        }
    };

appGame.stage.addChild(maze.object);
// appGame.stage.addChild(Character.object);
appKeyboard.stage.addChild(arrowKey.object);

appGame.start();
appKeyboard.start();
