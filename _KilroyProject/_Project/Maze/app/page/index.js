/**
 * Window
 */
import { W, $, Base, Popup } from '../../../_Base/js/window';

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

/**
 * Module
 */
import Preload from '../module/preload';
import Rocker from '../module/rocker';
import Sound from '../module/sound';

/**
 * Index
 */
const config = {
        screen: 1,
        multiple: 4,
        margin: {
            x: 60,
            y: 300
        },
        speed: 4,
        volume: 0.2,
        color: 0xEAD8A0,
        center: 0.99,
        help: 0,
        resources: null,
        flag: {
            start: true,
            door: true,
            mazeX: false,
            mazeY: false
        },
        setTime: {
            door: true
        }
    },
    appMaze = new App('appMaze'),
    appMazeS = new App('appMazeS'),
    appRocker = new App('appRocker'),
    preload = new Preload({
        loadingCallback(progress) {
            $('#progress .strip i').width(progress + '%');
        },
        finishCallback(resources) {
            config.resources = resources;
            setTimeout(() => {
                createPopup();
                createClick();
                readyGame();
            }, 500);
        }
    }),
    popup = {};

let appMazeWH = 0,
    appMazeSWH = 0,
    appRockerWH = 0,
    appGame = null,
    appMap = null,
    appKeyboard = null,
    sound = null;

let maze = null,
    mazeS = null,
    character = null,
    characterS = null,
    rocker = null;

Base.resizeWindow(() => {
    rotateFun();
}, 300);

/**
 * 准备游戏
 * @return {void}
 */
function readyGame() {
    animationText($('#loading .text .box_scale'), '点击开启盖娅校招之旅');
    $('#progress').removeClass('active');
    setTimeout(() => {
        $('#loading .text').addClass('active');
        $('#loading').on('click', function () {
            $(this).fadeOut(500);
            setTimeout(() => {
                showDialogue('start');
            }, 500);
        });
    }, 50);
}

/**
 * 开始游戏
 * @return {void}
 */
function startGame() {
    if (!config.flag.start) return;
    config.flag.start = false;
    config.help = 0;
    $('#game,#keyboard').addClass('active');
    createGame();
    playGame();
}

/**
 * 创建游戏
 * @return {void}
 */
function createGame() {
    appMazeWH = appMaze.clientWidth;
    appMazeSWH = appMazeS.clientWidth;
    appRockerWH = appRocker.clientWidth;
    appGame = Application.create('canvasMaze', {
        app: appMaze,
        width: appMazeWH,
        height: appMazeWH,
        autoDensity: true,
        antialias: true,
        preserveDrawingBuffer: true,
        backgroundColor: config.color,
        clearBeforeRender: true,
        resizeTo: appMaze
    });
    appMap = Application.create('canvasMap', {
        app: appMazeS,
        width: appMazeSWH,
        height: appMazeSWH,
        autoDensity: true,
        antialias: true,
        preserveDrawingBuffer: true,
        backgroundColor: config.color,
        clearBeforeRender: true,
        resizeTo: appMazeS
    });
    appKeyboard = Application.create('canvasRocker', {
        app: appRocker,
        width: appRockerWH,
        height: appRockerWH,
        transparent: true,
        autoDensity: true,
        antialias: true,
        preserveDrawingBuffer: true,
        backgroundColor: 0x000000,
        clearBeforeRender: true,
        resizeTo: appRocker
    });
    sound = new Sound({
        resources: config.resources,
        volume: config.volume
    });
}

/**
 * 玩游戏
 * @return {void}
 */
function playGame() {
    const friend = [
        {
            name: 2,
            position: 43,
            time: 1000,
            object: null,
            objectS: null,
            clash: () => {
                sound.play('character_2_m');
                if (popup.recruitment) {
                    popup.recruitment.open({
                        type: 1,
                        save: true
                    });
                }
            }
        },
        {
            name: 3,
            position: 352,
            time: 2000,
            object: null,
            objectS: null,
            clash: () => {
                sound.play('character_3_m');
                if (popup.recruitment) {
                    popup.recruitment.open({
                        type: 2,
                        save: true
                    });
                }
            }
        },
        {
            name: 4,
            position: 724,
            time: 1500,
            object: null,
            clash: () => {
                sound.play('character_4_m');
                if (popup.recruitment) {
                    popup.recruitment.open({
                        type: 3,
                        save: true
                    });
                }
            }
        },
        {
            name: 5,
            position: 519,
            time: 3000,
            object: null,
            objectS: null,
            clash: () => {
                sound.play('character_5_m');
                if (popup.recruitment) {
                    popup.recruitment.open({
                        type: 4,
                        save: true
                    });
                }
            }
        },
        {
            name: 6,
            position: 745,
            time: 2500,
            object: null,
            objectS: null,
            clash: () => {
                sound.play('character_6_m');
                if (popup.recruitment) {
                    popup.recruitment.open({
                        type: 5,
                        save: true
                    });
                }
            }
        },
        {
            name: 7,
            position: 854,
            time: 2000,
            object: null,
            objectS: null,
            clash: () => {
                sound.play('character_7_m');
                if (popup.recruitment) {
                    popup.recruitment.open({
                        type: 6,
                        save: true
                    });
                }
            }
        }
    ];
    
    maze = new Maze({
        resources: config.resources,
        map: 0,
        wh: appMazeWH,
        multiple: config.multiple
    });
    mazeS = new Maze({
        resources: config.resources,
        map: 0,
        wh: appMazeSWH,
        multiple: 1
    });
    character = new Character({
        resources: config.resources,
        index: 1,
        type: 1,
        wh: maze.grid.wh * 0.35
    });
    characterS = new Character({
        resources: config.resources,
        index: 1,
        type: 1,
        wh: mazeS.grid.wh * 0.35
    });
    rocker = new Rocker({
        resources: config.resources,
        wh: appRockerWH,
        direction: 8,
        callback: (direction) => {
            sound.play('walk');
            switch (direction) {
                case 1:
                    character.start();
                    move(0, -config.speed);
                    break;
                case 2:
                    character.animationRight();
                    character.start();
                    move(config.speed, -config.speed);
                    break;
                case 3:
                    character.animationRight();
                    character.start();
                    move(config.speed, 0);
                    break;
                case 4:
                    character.animationRight();
                    character.start();
                    move(config.speed, config.speed);
                    break;
                case 5:
                    character.start();
                    move(0, config.speed);
                    break;
                case 6:
                    character.animationLeft();
                    character.start();
                    move(-config.speed, config.speed);
                    break;
                case 7:
                    character.animationLeft();
                    character.start();
                    move(-config.speed, 0);
                    break;
                case 8:
                    character.animationLeft();
                    character.start();
                    move(-config.speed, -config.speed);
                    break;
                case 0:
                default:
                    sound.pause('walk');
                    character.stop();
                    move(0, 0);
                    break;
            }
        }
    });
    
    const initGrid = maze.grid.object.children[maze.config.enter.grid];
    
    addFriend();
    maze.object.addChild(character.object);
    mazeS.object.addChild(characterS.object);
    appGame.stage.addChild(maze.object);
    appMap.stage.addChild(mazeS.object);
    appKeyboard.stage.addChild(rocker.object);
    
    initMap(initGrid);
    initCharacter(maze.grid.wh, initGrid, character);
    appGame.start();
    appKeyboard.start();
    appGame.ticker.add(() => {
        rocker.move();
    });
    
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
            characterOldX = character.chassis.object.x,
            characterOldY = character.chassis.object.y;
        
        let characterAddX = x,
            characterAddY = y,
            mazeAddX = 0,
            mazeAddY = 0;
        
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
        
        if (maze.object.x - mazeAddX >= config.margin.x ||
            maze.object.x - mazeAddX <= -(maze.map.wh + config.margin.x - appW)) {
            config.flag.mazeX = false;
            mazeAddX = 0;
        }
        
        if (maze.object.y - mazeAddY >= config.margin.y ||
            maze.object.y - mazeAddY <= -(maze.map.wh + config.margin.y - appH)) {
            config.flag.mazeY = false;
            mazeAddY = 0;
        }
        
        for (let i = 0, n = grid.length; i < n; i++) {
            if (Bump.hitTestRectangle(character.chassis.object, grid[i], true)) {
                const wall = grid[i].children[1].children,
                    difference = 0.001;
                Bump.hit(
                    character.chassis.object, wall,
                    true, false, true,
                    (collision, platform) => {
                        if (characterOldX !== character.chassis.object.x) {
                            mazeAddX = 0;
                            character.chassis.object.x = characterOldX;
                            if (collision === 'left' && characterAddX <= 0) {
                                characterAddX = 0;
                                character.object.x += platform.getGlobalPosition().x + platform.width - character.object.getGlobalPosition().x - difference;
                            }
                            if (collision === 'right' && characterAddX >= 0) {
                                characterAddX = 0;
                                character.object.x -= character.object.getGlobalPosition().x + character.chassis.object.width - platform.getGlobalPosition().x - difference;
                            }
                        }
                        if (characterOldY !== character.chassis.object.y) {
                            mazeAddY = 0;
                            character.chassis.object.y = characterOldY;
                            if (collision === 'top' && characterAddY <= 0) {
                                characterAddY = 0;
                                character.object.y += platform.getGlobalPosition().y + platform.height - character.object.getGlobalPosition().y - difference;
                            }
                            if (collision === 'bottom' && characterAddY >= 0) {
                                characterAddY = 0;
                                character.object.y -= character.object.getGlobalPosition().y + character.chassis.object.height - platform.getGlobalPosition().y - difference;
                            }
                        }
                        if (platform.name === '入口' || platform.name === '出口') {
                            if (config.flag.door) {
                                rocker.config.flag = false;
                                if (platform.name === '入口') {
                                    character.object.y -= config.speed;
                                }
                                if (platform.name === '出口') {
                                    character.object.y += config.speed;
                                }
                                config.flag.door = false;
                                if (config.help < 6) {
                                    if (popup.quit) popup.quit.open();
                                } else if (config.help === 6) {
                                    showDialogue('success');
                                }
                            }
                        }
                    }
                );
            }
        }
        
        for (let i = 0, n = friend.length; i < n; i++) {
            Bump.hit(
                character.chassis.object, friend[i].object.chassis.object,
                false, false, true,
                (collision, platform) => {
                    rocker.config.flag = false;
                    character.switchCharacter(friend[i].name);
                    characterS.switchCharacter(friend[i].name);
                    friend[i].object.object.destroy();
                    friend[i].objectS.object.destroy();
                    friend[i].clash();
                    config.help++;
                }
            );
        }
        
        maze.object.x -= mazeAddX;
        maze.object.y -= mazeAddY;
        character.object.x += characterAddX;
        character.object.y += characterAddY;
    }
    
    /**
     * 添加朋友
     * @return {void}
     */
    function addFriend() {
        for (let i = 0, n = friend.length; i < n; i++) {
            const wh = character.config.wh,
                whS = characterS.config.wh,
                f = new Character({
                    resources: config.resources,
                    index: i + 2,
                    type: 0,
                    wh: wh
                }),
                fS = new Character({
                    resources: config.resources,
                    index: i + 2,
                    type: 0,
                    wh: whS
                }),
                grid = maze.grid.object.children[friend[i].position],
                gridS = mazeS.grid.object.children[friend[i].position];
            
            initCharacter(maze.grid.wh, grid, f);
            initCharacter(mazeS.grid.wh, gridS, fS);
            f.autoMove(friend[i].time);
            friend[i].object = f;
            friend[i].objectS = fS;
            maze.object.addChild(f.object);
            mazeS.object.addChild(fS.object);
        }
    }
    
    /**
     * 初始化地图位置
     * @param {object} grid 格子
     * @return {void}
     */
    function initMap(grid) {
        const gridWH = maze.grid.wh;
        
        maze.object.x = -grid.x + config.margin.x;
        maze.object.y = -grid.y + appMaze.clientHeight - gridWH - config.margin.y;
        mazeS.object.x = 0;
        mazeS.object.y = 0;
    }
    
    /**
     * 初始化角色位置
     * @param {object} gridWH 格子宽高
     * @param {object} grid 格子
     * @param {object} char 角色
     * @return {void}
     */
    function initCharacter(gridWH, grid, char) {
        const charWH = char.config.wh;
        
        char.object.x = grid.x + gridWH / 2 - charWH / 2;
        char.object.y = grid.y + gridWH / 2 - charWH / 2;
    }
}

/**
 * 设置地图内角色位置
 * @return {void}
 */
function setCharacterS() {
    const multiple = appMazeWH * maze.config.multiple / (appMazeSWH * mazeS.config.multiple),
        x = character.object.x / multiple,
        y = character.object.y / multiple;
    
    characterS.object.x = x;
    characterS.object.y = y;
}

/**
 * 动画文字
 * @param {object} $dom $节点
 * @param {string} text 文案
 * @return {void}
 */
function animationText($dom, text) {
    $dom.html('');
    for (let i = 0, n = text.length; i < n; i++) {
        $dom.append('<i>' + text[i] + '</i>');
    }
}

/**
 * 显示对话
 * @param {string} name 文案标识
 * @return {void}
 */
function showDialogue(name) {
    const $dialogue = $('#dialogue'),
        textContent = {
            start: [
                '解救全员',
                '逃出迷宫',
                'GO!'
            ],
            success: [
                '全员解救成功',
                '在盖娅等你'
            ],
            failure: [
                '有缘再见',
                '我的伙伴'
            ],
            end: [
                '来盖娅',
                '玩真的'
            ]
        },
        time = 500;
    
    $('#game,#keyboard,#map').removeClass('active');
    
    for (let i = 0, n = textContent[name].length; i < n; i++) {
        const content = $dialogue.find('.t').eq(i);
        content.removeClass('active');
        animationText(content.find('.box_scale'), textContent[name][i]);
        setTimeout(() => {
            content.addClass('active');
        }, time * i);
    }
    
    if (textContent[name].length > 2) {
        $dialogue.find('.t').eq(2).show();
    } else {
        $dialogue.find('.t')
            .eq(2).hide()
            .find('.box_scale').html('');
    }
    
    if (name === 'start') {
        setTimeout(() => {
            startGame();
            $dialogue.fadeOut(500);
        }, 2500);
    }
    
    if (name === 'success') {
        $dialogue.find('.fireworks').show();
        $dialogue.find('.people').show();
        setTimeout(() => {
            showDialogue('end');
        }, 3000);
    } else {
        $dialogue.find('.fireworks').hide();
        $dialogue.find('.people').hide();
    }
    
    if (name === 'failure') {
        setTimeout(() => {
            showDialogue('end');
        }, 3000);
    }
    
    if (name === 'end') {
        config.flag.start = true;
        destroyGame();
        $dialogue.find('.btn').addClass('active');
    } else {
        $dialogue.find('.btn').removeClass('active');
    }
    
    $dialogue.fadeIn(500);
}

/**
 * 创建弹窗
 * @return {void}
 */
function createPopup() {
    popup.quit = new Popup('quit_popup', {
        finishCallback() {
            const _this = this;
            $('#btn_quit_agree').on('click', () => {
                _this.close();
                showDialogue('failure');
            });
            $('#btn_quit_disagree').on('click', () => {
                _this.close();
            });
        },
        openCallback() {
            const _this = this;
            _this.$content.find('.num .box_scale').html(6 - config.help);
        },
        closeCallback() {
            setTimeout(() => {
                config.flag.door = true;
            }, 3000);
        }
    });
    
    popup.recruitment = new Popup('recruitment_popup', {
        finishCallback() {
            const _this = this;
            $('#btn_rec_save').on('click', () => {
                _this.close();
            });
            $('#btn_rec_next').on('click', () => {
                const index = _this.$content.find('.content.active').index();
                _this.open({
                    type: index + 1,
                    save: false
                });
            });
            $('#btn_review').on('click', () => {
                _this.open({
                    type: 0,
                    save: false
                });
            });
        },
        openCallback(data) {
            const _this = this;
            _this.$content.find('.content,a').removeClass('active');
            _this.$content.find('.content').eq(data.type).addClass('active');
            if (data.save) {
                _this.$content.find('a').eq(0).addClass('active');
            } else {
                if (data.type !== 5) {
                    _this.$content.find('a').eq(1).addClass('active');
                } else {
                    _this.$content.find('a').eq(2).addClass('active');
                }
            }
        }
    });
}

/**
 * 创建点击
 * @return {void}
 */
function createClick() {
    $('#btn_sound').on('click', function () {
        if ($(this).hasClass('active')) {
            $(this).removeClass('active');
            if (sound) sound.close();
        } else {
            $(this).addClass('active');
            if (sound) sound.open();
        }
    });
    $('#btn_map_open').on('click', () => {
        $('#map').addClass('active');
        if (appMap) {
            appMap.start();
            setCharacterS();
        }
    });
    $('#btn_map_close').on('click', () => {
        $('#map').removeClass('active');
        if (appMap) appMap.stop();
    });
    $('#btn_quit,#btn_map_out').on('click', () => {
        if (popup.quit) popup.quit.open();
    });
    $('#btn_view').on('click', () => {
        popup.recruitment.open({
            type: 0,
            save: false
        });
    });
    $('#btn_restart').on('click', () => {
        startGame();
        $('#dialogue').fadeOut(500);
    });
}

/**
 * 销毁游戏
 * @return {void}
 */
function destroyGame() {
    $('#appMaze').html('');
    $('#appMazeS').html('');
    $('#appRocker').html('');
    
    if (appGame) {
        appGame.destroy();
        appGame = null;
    }
    if (appMap) {
        appMap.destroy();
        appMap = null;
    }
    if (appKeyboard) {
        appKeyboard.destroy();
        appKeyboard = null;
    }
    if (maze) {
        maze.object.destroy();
        maze = null;
    }
    if (character) {
        character.object.destroy();
        character = null;
    }
    if (rocker) {
        rocker.object.destroy();
        rocker = null;
    }
}

/**
 * 显示或隐藏遮罩层
 * @return {void}
 */
function rotateFun() {
    const $W = $(W),
        $rotateScreen = $('#rotate_screen');
    if (Base.isPSB.platform() === 'PC' || $rotateScreen.length === 0) return;
    if ($W.width() >= $W.height()) $rotateScreen.addClass('active'); else $rotateScreen.removeClass('active');
}
