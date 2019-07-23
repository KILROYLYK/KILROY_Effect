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
const user = {
        flag: {
            move: true
        },
        position: Maze.config.enter.grid
    },
    appWidth = app.clientWidth,
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
    
    if (!user.flag.move || direction === '') return;
    
    if (!hitWall(direction)) return;
    
    user.flag.move = false;
    
    if (direction === 'top') {
        user.position -= Maze.config.row * Maze.config.time;
        position = Maze.object.y + Maze.grid.wh;
        callback = () => {
            Maze.object.y += speed;
            if (Maze.object.y >= position) {
                user.flag.move = true;
                appGame.ticker.remove(callback);
                move(ArrowKey.config.position);
            }
        };
    }
    
    if (direction === 'left') {
        user.position -= 1;
        position = Maze.object.x + Maze.grid.wh;
        callback = () => {
            Maze.object.x += speed;
            if (Maze.object.x >= position) {
                user.flag.move = true;
                appGame.ticker.remove(callback);
                move(ArrowKey.config.position);
            }
        };
    }
    
    if (direction === 'right') {
        user.position += 1;
        position = Maze.object.x - Maze.grid.wh;
        callback = () => {
            Maze.object.x -= speed;
            if (Maze.object.x <= position) {
                user.flag.move = true;
                appGame.ticker.remove(callback);
                move(ArrowKey.config.position);
            }
        };
    }
    
    if (direction === 'bottom') {
        user.position += Maze.config.row * Maze.config.time;
        position = Maze.object.y - Maze.grid.wh;
        callback = () => {
            Maze.object.y -= speed;
            if (Maze.object.y <= position) {
                user.flag.move = true;
                appGame.ticker.remove(callback);
                move(ArrowKey.config.position);
            }
        };
    }
    
    appGame.ticker.add(callback);
}

/**
 * 判断是否撞墙
 * @param {string} direction 方向
 * @return {boolean} 是否撞墙
 */
function hitWall(direction) {
    const reg = new RegExp(direction, 'ig'),
        wall = Maze.grid.object.children[user.position].wall;
    
    if (user.position === Maze.config.enter.grid && direction === Maze.config.enter.door) {
        console.log('只可到此，不可越过！');
        return false;
    }
    if (user.position === Maze.config.out.grid && direction === Maze.config.out.door) {
        console.log('恭喜您，走出来了！');
        return false;
    }
    
    if (reg.test(wall)) {
        return false;
    } else {
        return true;
    }
}


