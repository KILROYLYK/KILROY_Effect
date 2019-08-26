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
        speed: 2,
        margin: 10 * 6
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
    
    character.object.x = config.margin + gridWH / 2 - character.config.radius;
    character.object.y = appMaze.clientHeight - config.margin - gridWH / 2 - character.config.radius;
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
        centerY = appH / 2 * 0.99 - character.config.radius;
    
    let newX = x,
        newY = y;
    
    for (let i = 0, n = grid.length; i < n; i++) {
        if (Bump.hitTestRectangle(character.chassis.object, grid[i], true)) {
            const wall = grid[i].children;
            for (let ii = 1, nn = wall.length; ii < nn; ii++) {
                const collision = Bump.hitTestCircleRectangle(character.chassis.object, wall[ii], true);
                // console.log(i, wall[ii].name, collision);
                if (collision) {
                    // if (collision === 'topMiddle' && newY < 0) newY = 0;
                    // if (collision === 'leftMiddle' && newX < 0) newX = 0;
                    // if (collision === 'rightMiddle' && newX > 0) newX = 0;
                    // if (collision === 'bottomMiddle' && newX < 0) newY = 0;
                    if (wall[ii].name === 'top' && newY < 0) newY = 0;
                    if (wall[ii].name === 'left' && newX < 0) newX = 0;
                    if (wall[ii].name === 'right' && newX > 0) newX = 0;
                    if (wall[ii].name === 'bottom' && newY > 0) newY = 0;
                }
            }
        }
    }
    
    let mazeX = 0,
        mazeY = 0,
        characterX = newX,
        characterY = newY;
    
    if (character.object.x >= centerX &&
        character.object.x <= appW - centerX) {
        characterX = 0;
        mazeX = newX;
    }
    
    if (character.object.y >= centerY &&
        character.object.y <= appH - centerY) {
        characterY = 0;
        mazeY = newY;
    }
    
    if (maze.object.x - mazeX >= config.margin ||
        maze.object.x - mazeX <= -(maze.map.wh - config.margin - appW)) {
        characterX = newX;
        mazeX = 0;
    }
    
    if (maze.object.y - mazeY >= config.margin ||
        maze.object.y - mazeY <= -(maze.map.wh - config.margin - appH)) {
        characterY = newY;
        mazeY = 0;
    }
    
    maze.object.x -= mazeX;
    maze.object.y -= mazeY;
    character.object.x += characterX;
    character.object.y += characterY;
}
