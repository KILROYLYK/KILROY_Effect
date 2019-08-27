/**
 * Plugin
 */
import Bump from '../../../$Plugin/Pixi/bump';

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
        multiple: 6,
        speed: 3,
        margin: 10 * 6,
        flag: {
            mazeX: false,
            mazeY: false
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
        backgroundColor: 0xEAD8A0,
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
        radius: maze.grid.wh * 0.4 / 2
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

maze.object.addChild(character.object);
appGame.stage.addChild(maze.object);
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
    
    character.object.x = grid.x + gridWH / 2 - character.config.radius;
    character.object.y = grid.y + gridWH / 2 - character.config.radius;
}

/**
 * 移动
 * @param {number} x X坐标
 * @param {number} y Y坐标
 * @return {void}
 */
function move(x, y) {
    const grid = maze.grid.object.children,
        appW = appMaze.clientWidth,
        appH = appMaze.clientHeight,
        centerX = appW / 2 * 0.99 - character.config.radius,
        centerY = appH / 2 * 0.99 - character.config.radius,
        cX = character.object.x,
        cY = character.object.y;
    
    let mazeX = 0,
        mazeY = 0;
    
    if (character.object.getGlobalPosition().x >= centerX &&
        character.object.getGlobalPosition().x <= appW - centerX) {
        config.flag.mazeX = true;
    }
    
    if (character.object.getGlobalPosition().y >= centerY &&
        character.object.getGlobalPosition().y <= appH - centerY) {
        config.flag.mazeY = true;
    }
    
    if (config.flag.mazeX) mazeX = x;
    if (config.flag.mazeY) mazeY = y;
    
    if (maze.object.x - mazeX >= config.margin ||
        maze.object.x - mazeX <= -(maze.map.wh - config.margin - appW)) {
        config.flag.mazeX = false;
        mazeX = 0;
    }
    
    if (maze.object.y - mazeY >= config.margin ||
        maze.object.y - mazeY <= -(maze.map.wh - config.margin - appH)) {
        config.flag.mazeY = false;
        mazeY = 0;
    }
    
    for (let i = 0, n = grid.length; i < n; i++) {
        if (Bump.hitTestRectangle(character.object, grid[i], true)) {
            Bump.hit(
                character.object, grid[i].children[1].children,
                true, false, true,
                (collision, platform) => {
                    // console.log(collision, platform);
                    if (Math.abs(cX - character.object.x) > 0) mazeX = 0;
                    if (Math.abs(cY - character.object.y) > 0) mazeY = 0;
                    if (platform.name === '入口' || platform.name === '出口') {
                        console.log(platform.name);
                    }
                }
            );
        }
    }
    
    maze.object.x -= mazeX;
    maze.object.y -= mazeY;
    character.object.x += x;
    character.object.y += y;
}
