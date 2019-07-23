/**
 * Controller
 */
import { app } from '../controller/window';
import Application from '../controller/application';

/**
 * Object
 */
import Maze from '../object/maze';
import ArrowKey from '../object/arrowKey';

/**
 * Main
 */
const appWidth = app.clientWidth,
    appHeight = app.clientHeight,
    mazeMargin = 10,
    mazeWH = (appWidth >= appHeight ? appHeight : appWidth) - mazeMargin * 2,
    keyboardWH = 200,
    appGame = Application.create('appGame', {
        width: mazeWH,
        height: mazeWH,
        autoDensity: true,
        antialias: true,
        preserveDrawingBuffer: true,
        backgroundColor: 0xFFFFFF,
        clearBeforeRender: true
    }),
    appKeyboard = Application.create('appKeyboard', {
        width: keyboardWH,
        height: keyboardWH,
        transparent: true,
        autoDensity: true,
        antialias: true,
        preserveDrawingBuffer: true,
        backgroundColor: 0x000000,
        clearBeforeRender: true
    });

let flag = true;

appGame.stage.addChild(Maze.object);
appKeyboard.stage.addChild(ArrowKey.object);

appGame.start();
appKeyboard.start();

ArrowKey.config.callback.top = () => {
    move('top');
};

ArrowKey.config.callback.left = () => {
    move('left');
};

ArrowKey.config.callback.right = () => {
    move('right');
};

ArrowKey.config.callback.bottom = () => {
    move('bottom');
};

/**
 * 移动
 * @param {string} direction 方向
 * @return {void}
 */
function move(direction) {
    const time = 30,
        speed = Maze.grid.wh / time;
    
    let position = 0,
        callback = null;
    
    if (!flag || direction === '') return;
    
    flag = false;
    
    if (direction === 'top') {
        position = Maze.object.y + Maze.grid.wh;
        callback = () => {
            Maze.object.y += speed;
            if (Maze.object.y >= position) {
                flag = true;
                appGame.ticker.remove(callback);
                move(ArrowKey.config.position);
            }
        };
    }
    
    if (direction === 'left') {
        position = Maze.object.x + Maze.grid.wh;
        callback = () => {
            Maze.object.x += speed;
            if (Maze.object.x >= position) {
                flag = true;
                appGame.ticker.remove(callback);
                move(ArrowKey.config.position);
            }
        };
    }
    
    if (direction === 'right') {
        position = Maze.object.x - Maze.grid.wh;
        callback = () => {
            Maze.object.x -= speed;
            if (Maze.object.x <= position) {
                flag = true;
                appGame.ticker.remove(callback);
                move(ArrowKey.config.position);
            }
        };
    }
    
    if (direction === 'bottom') {
        position = Maze.object.y - Maze.grid.wh;
        callback = () => {
            Maze.object.y -= speed;
            if (Maze.object.y <= position) {
                flag = true;
                appGame.ticker.remove(callback);
                move(ArrowKey.config.position);
            }
        };
    }
    
    appGame.ticker.add(callback);
}
