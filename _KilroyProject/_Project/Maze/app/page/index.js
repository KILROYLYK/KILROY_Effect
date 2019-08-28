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
import Rocker from '../tool/rocker';

/**
 * Main
 */
const config = {
        multiple: 6,
        speed: 3,
        margin: 10 * 6,
        center: 0.99,
        flag: {
            mazeX: false,
            mazeY: false
        }
    },
    appMaze = new App('appMaze'),
    appRocker = new App('appRocker'),
    appMazeWH = appMaze.clientWidth,
    appRockerWH = appRocker.clientWidth,
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
    appKeyboard = Application.create('canvasRocker', {
        app: appRocker,
        width: appRockerWH,
        height: appRockerWH,
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
        multiple: config.multiple
    }),
    character = new Character({
        radius: maze.grid.wh * 0.4 / 2
    }),
    rocker = new Rocker({
        wh: appRockerWH,
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
appKeyboard.stage.addChild(rocker.object);

initialPosition();

appGame.ticker.add(() => {
    rocker.move();
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
    
    if (appMaze.clientHeight > maze.map.wh) {
        maze.object.y = (appMaze.clientHeight - appMaze.clientWidth) / 2 * 0.8;
    }
    
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
        centerX = appW / 2 * config.center - character.config.radius,
        centerY = appH / 2 * config.center - character.config.radius,
        characterNowX = character.object.x,
        characterNowY = character.object.y;
    
    let mazeAddX = 0,
        mazeAddY = 0;
    
    if (character.object.getGlobalPosition().x >= centerX &&
        character.object.getGlobalPosition().x <= appW - centerX) {
        config.flag.mazeX = true;
    }
    
    if (character.object.getGlobalPosition().y >= centerY &&
        character.object.getGlobalPosition().y <= appH - centerY) {
        config.flag.mazeY = true;
    }
    
    if (config.flag.mazeX) mazeAddX = x;
    if (config.flag.mazeY) mazeAddY = y;
    
    if (maze.object.x - mazeAddX >= config.margin ||
        maze.object.x - mazeAddX <= -(maze.map.wh + config.margin - appW)) {
        config.flag.mazeX = false;
        mazeAddX = 0;
    }
    
    if (maze.object.y - mazeAddY >= config.margin ||
        maze.object.y - mazeAddY <= -(maze.map.wh + config.margin - appH)) {
        config.flag.mazeY = false;
        mazeAddY = 0;
    }
    
    for (let i = 0, n = grid.length; i < n; i++) {
        if (Bump.hitTestRectangle(character.object, grid[i], true)) {
            Bump.hit(
                character.object, grid[i].children[1].children,
                true, false, true,
                (collision, platform) => {
                    if (Math.abs(characterNowX - character.object.x) > 0) mazeAddX = 0;
                    if (Math.abs(characterNowY - character.object.y) > 0) mazeAddY = 0;
                    if (platform.name === '入口' || platform.name === '出口') {
                        // console.log(platform.name);
                    }
                }
            );
        }
    }
    
    maze.object.x -= mazeAddX;
    maze.object.y -= mazeAddY;
    character.object.x += x;
    character.object.y += y;
}
