/**
 * Window
 */
import { src } from '../controller/window';

/**
 * Pixi
 */
const PIXI = require('pixi.js');

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

const config = {
        multiple: 5,
        speed: 4,
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
        transparent: true,
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
    loader = new PIXI.Loader(),
    loadImg = [
        {
            name: 'border',
            url: src.img + 'border.png',
            onComplete: () => {
            }
        },
        {
            name: 'lawn',
            url: src.img + 'lawn.jpg',
            onComplete: () => {
            }
        },
        {
            name: 'grass',
            url: src.img + 'grass.png',
            onComplete: () => {
            }
        },
        {
            name: 'character_1',
            url: src.json + 'character_1.json',
            onComplete: () => {
            }
        },
        {
            name: 'character_2',
            url: src.json + 'character_2.json',
            onComplete: () => {
            }
        },
        {
            name: 'character_3',
            url: src.json + 'character_3.json',
            onComplete: () => {
            }
        },
        {
            name: 'character_4',
            url: src.json + 'character_4.json',
            onComplete: () => {
            }
        },
        {
            name: 'character_5',
            url: src.json + 'character_5.json',
            onComplete: () => {
            }
        },
        {
            name: 'character_6',
            url: src.json + 'character_6.json',
            onComplete: () => {
            }
        },
        {
            name: 'character_7',
            url: src.json + 'character_7.json',
            onComplete: () => {
            }
        },
        {
            name: 'dust',
            url: src.json + 'dust.json',
            onComplete: () => {
            }
        }
    ];

loader
    .add(loadImg)
    .on('progress', () => {
    
    })
    .load(main);

/**
 * Main
 * @param {object} load 资源
 * @param {object} resources 资源
 * @return {void}
 */
function main(load, resources) {
    const maze = new Maze({
            resources: resources,
            map: 0,
            wh: appMazeWH,
            multiple: config.multiple
        }),
        character = new Character({
            resources: resources,
            index: 1,
            type: 1,
            wh: maze.grid.wh * 0.35
        }),
        rocker = new Rocker({
            wh: appRockerWH,
            direction: 8,
            callback: (direction) => {
                switch (direction) {
                    case 1:
                        character.start();
                        move(0, -config.speed);
                        break;
                    case 2:
                        character.animateRight();
                        character.start();
                        move(config.speed, -config.speed);
                        break;
                    case 3:
                        character.animateRight();
                        character.start();
                        move(config.speed, 0);
                        break;
                    case 4:
                        character.animateRight();
                        character.start();
                        move(config.speed, config.speed);
                        break;
                    case 5:
                        character.start();
                        move(0, config.speed);
                        break;
                    case 6:
                        character.animateLeft();
                        character.start();
                        move(-config.speed, config.speed);
                        break;
                    case 7:
                        character.animateLeft();
                        character.start();
                        move(-config.speed, 0);
                        break;
                    case 8:
                        character.animateLeft();
                        character.start();
                        move(-config.speed, -config.speed);
                        break;
                    case 0:
                    default:
                        character.stop();
                        move(0, 0);
                        break;
                }
            }
        });
    
    maze.object.addChild(character.object);
    appGame.stage.addChild(maze.object);
    appKeyboard.stage.addChild(rocker.object);
    
    init();
    start();
    animation();
    
    /**
     * 初始化
     * @return {void}
     */
    function init() {
        const gridWH = maze.grid.wh,
            grid = maze.grid.object.children[maze.config.enter.grid];
        
        maze.object.x = -grid.x + config.margin;
        maze.object.y = -grid.y + appMaze.clientHeight - gridWH - config.margin;
        
        if (appMaze.clientHeight > maze.map.wh) {
            maze.object.y = (appMaze.clientHeight - appMaze.clientWidth) / 2 * 0.8;
        }
        
        character.object.x = grid.x + gridWH / 2 - character.config.wh / 2;
        character.object.y = grid.y + gridWH / 2 - character.config.wh / 2;
    }
    
    /**
     * 开始动画
     * @return {void}
     */
    function start() {
        appGame.start();
        appKeyboard.start();
    }
    
    /**
     * 动画
     * @return {void}
     */
    function animation() {
        appGame.ticker.add(() => {
            rocker.move();
        });
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
            centerX = appW / 2 * config.center - character.config.wh / 2,
            centerY = appH / 2 * config.center - character.config.wh / 2,
            characterNowX = character.chassis.object.x,
            characterNowY = character.chassis.object.y;
        
        let mazeAddX = 0,
            mazeAddY = 0,
            characterAddX = x,
            characterAddY = y;
        
        if (character.chassis.object.getGlobalPosition().x >= centerX &&
            character.chassis.object.getGlobalPosition().x <= appW - centerX) {
            config.flag.mazeX = true;
        }
        
        if (character.chassis.object.getGlobalPosition().y >= centerY &&
            character.chassis.object.getGlobalPosition().y <= appH - centerY) {
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
            if (Bump.hitTestRectangle(character.chassis.object, grid[i], true)) {
                const wall = grid[i].children[1].children,
                    bomb = 1;
                Bump.hit(
                    character.chassis.object, wall,
                    true, false, true,
                    (collision, platform) => {
                        if (Math.abs(characterNowX - character.chassis.object.x) > 0) {
                            character.chassis.object.x = characterNowX;
                            if (collision === 'left' && characterAddX < 0) {
                                characterAddX = bomb;
                                if (config.flag.mazeX) mazeAddX = bomb;
                            } else if (collision === 'right' && characterAddX > 0) {
                                characterAddX = -bomb;
                                if (config.flag.mazeX) mazeAddX = -bomb;
                            }
                        }
                        if (Math.abs(characterNowY - character.chassis.object.y) > 0) {
                            character.chassis.object.y = characterNowY;
                            if (collision === 'top' && characterAddY < 0) {
                                characterAddY = bomb;
                                if (config.flag.mazeY) mazeAddY = bomb;
                            } else if (collision === 'bottom' && characterAddY > 0) {
                                characterAddY = -bomb;
                                if (config.flag.mazeY) mazeAddY = -bomb;
                            }
                        }
                        if (platform.name === '入口' || platform.name === '出口') {
                            // console.log(platform.name);
                        }
                    }
                );
            }
        }
        
        maze.object.x -= mazeAddX;
        maze.object.y -= mazeAddY;
        character.object.x += characterAddX;
        character.object.y += characterAddY;
    }
}
