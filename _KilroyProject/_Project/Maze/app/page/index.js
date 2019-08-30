/**
 * Window
 */
import { w, $, Base, Popup } from '../../../_Base/js/window';
import { src } from '../controller/window';
import '../../src/css/popup.less';

/**
 * Pixi
 */
const PIXI = require('pixi.js');
require('pixi-sound');

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
 * Tool
 */
import Rocker from '../tool/rocker';
import Text from '../tool/text';

const config = {
        multiple: 4,
        speed: 4,
        margin: 10 * 6,
        center: 0.99,
        sound: true,
        flag: {
            door: true,
            mazeX: false,
            mazeY: false
        },
        seTime: {
            door: true
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
        clearBeforeRender: true,
        resizeTo: appMaze
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
        clearBeforeRender: true,
        resizeTo: appRocker
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
            name: 'exclamation',
            url: src.img + 'exclamation.png',
            onComplete: () => {
            }
        }
    ],
    loadAnimation = [
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
    ],
    loadMusic = [
        {
            name: 'loading',
            url: src.media + 'loading.mp3',
            onComplete: () => {
            }
        },
        {
            name: 'start',
            url: src.media + 'start.mp3',
            onComplete: () => {
            }
        },
        {
            name: 'popup',
            url: src.media + 'popup.mp3',
            onComplete: () => {
            }
        },
        {
            name: 'success',
            url: src.media + 'success.mp3',
            onComplete: () => {
            }
        },
        {
            name: 'failure',
            url: src.media + 'failure.mp3',
            onComplete: () => {
            }
        },
        {
            name: 'walk',
            url: src.media + 'walk.mp3',
            onComplete: () => {
            }
        },
        {
            name: 'character_1_m',
            url: src.media + 'character_1.mp3',
            onComplete: () => {
            }
        },
        {
            name: 'character_2_m',
            url: src.media + 'character_2.mp3',
            onComplete: () => {
            }
        },
        {
            name: 'character_3_m',
            url: src.media + 'character_3.mp3',
            onComplete: () => {
            }
        },
        {
            name: 'character_4_m',
            url: src.media + 'character_4.mp3',
            onComplete: () => {
            }
        },
        {
            name: 'character_5_m',
            url: src.media + 'character_5.mp3',
            onComplete: () => {
            }
        },
        {
            name: 'character_6_m',
            url: src.media + 'character_6.mp3',
            onComplete: () => {
            }
        },
        {
            name: 'character_7_m',
            url: src.media + 'character_7.mp3',
            onComplete: () => {
            }
        }
    ],
    loadTotal = loadImg.length + loadAnimation.length * 2 + loadMusic.length;

let res = null,
    loaded = 0,
    help = 0,
    savePopup = null,
    gaea1Popup = null,
    gaea2Popup = null,
    preachPopup = null,
    position1Popup = null,
    position2Popup = null,
    buffPopup = null;

Base.resizeWindow(() => {
    rotateFun();
}, 300);

loader
    .add(loadImg)
    .add(loadAnimation)
    .add(loadMusic)
    .on('progress', () => {
        ++loaded;
        $('#progress .strip i').width(parseInt(loaded / loadTotal * 100) + '%');
    })
    .load((load, resources) => {
        res = resources;
        setTimeout(() => {
            popup();
            click();
            $('#loading').fadeOut(500);
            playSound('loading');
            showText('loadText');
        }, 500);
    });

/**
 * 开始游戏
 * @return {void}
 */
function startGame() {
    playSound('start');
    $('#loading,#text').hide();
    $('#game,#keyboard').addClass('active');
    help = 0;
    main(res);
}

/**
 * Main
 * @param {object} resources 资源
 * @return {void}
 */
function main(resources) {
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
            wh: maze.grid.wh * 0.35,
            volume: config.volume
        }),
        rocker = new Rocker({
            wh: appRockerWH,
            direction: 8,
            callback: (direction) => {
                playSound('walk');
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
                        closeSound('walk');
                        character.stop();
                        move(0, 0);
                        break;
                }
            }
        }),
        friend = [
            {
                name: 2,
                position: 43,
                // position: 871,
                time: 1000,
                object: null,
                clash: () => {
                    playSound('character_2_m');
                    if (gaea1Popup) gaea1Popup.open(0);
                }
            },
            {
                name: 3,
                position: 352,
                // position: 872,
                time: 2000,
                object: null,
                clash: () => {
                    playSound('character_3_m');
                    if (gaea2Popup) gaea2Popup.open(0);
                }
            },
            {
                name: 4,
                position: 724,
                // position: 873,
                time: 1500,
                object: null,
                clash: () => {
                    playSound('character_4_m');
                    if (preachPopup) preachPopup.open(0);
                }
            },
            {
                name: 5,
                position: 519,
                // position: 874,
                time: 3000,
                object: null,
                clash: () => {
                    playSound('character_5_m');
                    if (position1Popup) position1Popup.open(0);
                }
            },
            {
                name: 6,
                position: 745,
                // position: 875,
                time: 2500,
                object: null,
                clash: () => {
                    playSound('character_6_m');
                    if (position2Popup) position2Popup.open(0);
                }
            },
            {
                name: 7,
                position: 854,
                // position: 876,
                time: 2000,
                object: null,
                clash: () => {
                    playSound('character_7_m');
                    if (buffPopup) buffPopup.open(0);
                }
            }
        ];
    
    addFriend();
    maze.object.addChild(character.object);
    appGame.stage.addChild(maze.object);
    appKeyboard.stage.addChild(rocker.object);
    
    init();
    start();
    
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
        
        // console.log(maze.grid.object.children[871], maze.grid.object.children[871].children[1].children[0].getGlobalPosition().y);
        // console.log(maze.grid.object.children[872], maze.grid.object.children[872].children[1].children[1].getGlobalPosition().y);
    }
    
    /**
     * 开始动画
     * @return {void}
     */
    function start() {
        appGame.start();
        appKeyboard.start();
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
        
        console.log(1);
        
        for (let i = 0, n = grid.length; i < n; i++) {
            if (Bump.hitTestRectangle(character.chassis.object, grid[i], true)) {
                const wall = grid[i].children[1].children,
                    clash = 0;
                Bump.hit(
                    character.chassis.object, wall,
                    true, false, true,
                    (collision, platform) => {
                        console.log(0, collision, characterAddX, characterOldX - character.chassis.object.x);
                        if (characterOldX !== character.chassis.object.x) {
                            mazeAddX = 0;
                            character.chassis.object.x = characterOldX;
                            if (collision === 'left' && characterAddX <= 0) {
                                characterAddX = 0;
                                character.object.x += platform.getGlobalPosition().x + platform.width - character.object.getGlobalPosition().x;
                            }
                            if (collision === 'right' && characterAddX >= 0) {
                                characterAddX = 0;
                                character.object.x -= character.object.getGlobalPosition().x + character.chassis.object.width - platform.getGlobalPosition().x;
                            }
                        }
                        if (characterOldY !== character.chassis.object.y) {
                            mazeAddY = 0;
                            character.chassis.object.y = characterOldY;
                            if (collision === 'top' && characterAddY <= 0) {
                                characterAddY = 0;
                                character.object.y += platform.getGlobalPosition().y + platform.height - character.object.getGlobalPosition().y;
                            }
                            if (collision === 'bottom' && characterAddY >= 0) {
                                characterAddY = 0;
                                character.object.y -= character.object.getGlobalPosition().y + character.chassis.object.height - platform.getGlobalPosition().y;
                            }
                        }
                        // if (platform.name === '入口' || platform.name === '出口') {
                        //     if (config.flag.door) {
                        //         rocker.config.flag = false;
                        //         if (platform.name === '入口') {
                        //             character.object.y -= config.speed;
                        //         }
                        //         if (platform.name === '出口') {
                        //             character.object.y += config.speed;
                        //         }
                        //         config.flag.door = false;
                        //         if (help < 6) {
                        //             if (savePopup) savePopup.open();
                        //         } else if (help === 6) {
                        //             success();
                        //         }
                        //     }
                        // }
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
                    friend[i].object.object.destroy();
                    friend[i].clash();
                    ++help;
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
                f = new Character({
                    resources: resources,
                    index: i + 2,
                    type: 0,
                    wh: wh
                }),
                gridWH = maze.grid.wh,
                grid = maze.grid.object.children[friend[i].position];
            
            f.object.x = grid.x + gridWH / 2 - wh / 2;
            f.object.y = grid.y + gridWH / 2 - wh / 2;
            f.autoMove(friend[i].time);
            friend[i].object = f;
            maze.object.addChild(f.object);
        }
    }
}

/**
 * 显示或隐藏遮罩层
 * @return {void}
 */
function rotateFun() {
    const $w = $(w),
        $rotateScreen = $('#rotate_screen');
    if (Base.isPSB.platform() === 'PC' || $rotateScreen.length === 0) return;
    if ($w.width() >= $w.height()) $rotateScreen.addClass('active'); else $rotateScreen.removeClass('active');
}

/**
 * 弹窗
 * @return {void}
 */
function popup() {
    savePopup = new Popup('save_popup', {
        finish_callback() {
            const _this = this;
            _this.$content.find('.pop_btn_save').on('click', () => {
                _this.close();
                showText('failureText');
            });
            _this.$content.find('.pop_btn_not_save').on('click', () => {
                _this.close();
            });
        },
        open_callback() {
            const _this = this;
            _this.$content.find('i').html(6 - help);
        },
        close_callback() {
            const _this = this;
            config.seTime.door = setTimeout(() => {
                config.seTime.door = null;
                config.flag.door = true;
            }, 3000);
        }
    });
    
    gaea1Popup = new Popup('gaea1_popup', {
        finish_callback() {
            const _this = this;
            _this.$content.find('.pop_btn_next').eq(0)
                .on('click', () => {
                    _this.close();
                });
            _this.$content.find('.pop_btn_next').eq(1)
                .on('click', () => {
                    _this.close();
                    if (gaea2Popup) gaea2Popup.open(1);
                });
        },
        open_callback(data) {
            const _this = this;
            if (data === 0) {
                _this.$content.find('.pop_btn_next').eq(0).show();
                _this.$content.find('.pop_btn_next').eq(1).hide();
            } else if (data === 1) {
                _this.$content.find('.pop_btn_next').eq(0).hide();
                _this.$content.find('.pop_btn_next').eq(1).show();
            }
        },
        close_callback() {
            const _this = this;
        }
    });
    
    gaea2Popup = new Popup('gaea2_popup', {
        finish_callback() {
            const _this = this;
            _this.$content.find('.pop_btn_next').eq(0)
                .on('click', () => {
                    _this.close();
                });
            _this.$content.find('.pop_btn_next').eq(1)
                .on('click', () => {
                    _this.close();
                    if (preachPopup) preachPopup.open(1);
                });
        },
        open_callback(data) {
            const _this = this;
            if (data === 0) {
                _this.$content.find('.pop_btn_next').eq(0).show();
                _this.$content.find('.pop_btn_next').eq(1).hide();
            } else if (data === 1) {
                _this.$content.find('.pop_btn_next').eq(0).hide();
                _this.$content.find('.pop_btn_next').eq(1).show();
            }
        },
        close_callback() {
            const _this = this;
        }
    });
    
    preachPopup = new Popup('preach_popup', {
        finish_callback() {
            const _this = this;
            _this.$content.find('.pop_btn_next').eq(0)
                .on('click', () => {
                    _this.close();
                });
            _this.$content.find('.pop_btn_next').eq(1)
                .on('click', () => {
                    _this.close();
                    if (position1Popup) position1Popup.open(1);
                });
        },
        open_callback(data) {
            const _this = this;
            if (data === 0) {
                _this.$content.find('.pop_btn_next').eq(0).show();
                _this.$content.find('.pop_btn_next').eq(1).hide();
            } else if (data === 1) {
                _this.$content.find('.pop_btn_next').eq(0).hide();
                _this.$content.find('.pop_btn_next').eq(1).show();
            }
        },
        close_callback() {
            const _this = this;
        }
    });
    
    position1Popup = new Popup('position1_popup', {
        finish_callback() {
            const _this = this;
            _this.$content.find('.pop_btn_next').eq(0)
                .on('click', () => {
                    _this.close();
                });
            _this.$content.find('.pop_btn_next').eq(1)
                .on('click', () => {
                    _this.close();
                    if (position2Popup) position2Popup.open(1);
                });
        },
        open_callback(data) {
            const _this = this;
            if (data === 0) {
                _this.$content.find('.pop_btn_next').eq(0).show();
                _this.$content.find('.pop_btn_next').eq(1).hide();
            } else if (data === 1) {
                _this.$content.find('.pop_btn_next').eq(0).hide();
                _this.$content.find('.pop_btn_next').eq(1).show();
            }
        },
        close_callback() {
            const _this = this;
        }
    });
    
    position2Popup = new Popup('position2_popup', {
        finish_callback() {
            const _this = this;
            _this.$content.find('.pop_btn_next').eq(0)
                .on('click', () => {
                    _this.close();
                });
            _this.$content.find('.pop_btn_next').eq(1)
                .on('click', () => {
                    _this.close();
                    if (buffPopup) buffPopup.open(1);
                });
        },
        open_callback(data) {
            const _this = this;
            if (data === 0) {
                _this.$content.find('.pop_btn_next').eq(0).show();
                _this.$content.find('.pop_btn_next').eq(1).hide();
            } else if (data === 1) {
                _this.$content.find('.pop_btn_next').eq(0).hide();
                _this.$content.find('.pop_btn_next').eq(1).show();
            }
        },
        close_callback() {
            const _this = this;
        }
    });
    
    buffPopup = new Popup('buff_popup', {
        finish_callback() {
            const _this = this;
            _this.$content.find('.pop_btn_next').eq(0)
                .on('click', () => {
                    _this.close();
                });
            _this.$content.find('.pop_btn_next').eq(1)
                .on('click', () => {
                    _this.close();
                    if (gaea1Popup) gaea1Popup.open(1);
                });
        },
        open_callback(data) {
            const _this = this;
            if (data === 0) {
                _this.$content.find('.pop_btn_next').eq(0).show();
                _this.$content.find('.pop_btn_next').eq(1).hide();
            } else if (data === 1) {
                _this.$content.find('.pop_btn_next').eq(0).hide();
                _this.$content.find('.pop_btn_next').eq(1).show();
            }
        },
        close_callback() {
            const _this = this;
        }
    });
}

/**
 * 点击事件
 * @return {void}
 */
function click() {
    $('#btn_sound').on('click', function () {
        if ($(this).hasClass('active')) {
            config.sound = false;
            $(this).removeClass('active');
            for (let i = 0, n = loadMusic.length; i < n; i++) {
                closeSound(loadMusic[i].name);
            }
        } else {
            config.sound = true;
            $(this).addClass('active');
        }
    });
    $('#btn_out').on('click', () => {
        if (savePopup) savePopup.open();
    });
    $('#btn_view').on('click', () => {
        if (gaea1Popup) gaea1Popup.open(1);
    });
}

/**
 * 播放声音
 * @param {string} s 声音标识
 * @return {void}
 */
function playSound(s) {
    const volume = 0.1,
        sound = res[s].sound;
    
    if (!res || !config.sound) return;
    
    if (s === 'walk') sound.loop = true;
    
    sound.volume = volume;
    if (!sound.isPlaying) sound.play(0);
}

/**
 * 关闭声音
 * @param {string} s 声音标识
 * @return {void}
 */
function closeSound(s) {
    const sound = res[s].sound;
    
    if (!res) return;
    
    if (sound.isPlaying) sound.pause();
}

/**
 * 显示文案
 * @param {string} name 文案标识
 * @return {void}
 */
function showText(name) {
    const $text = $('#text'),
        $content = $text.children('.content'),
        textContnt = {
            loadText: [
                '解救全员',
                '逃出迷宫',
                'GO!'
            ],
            successText: [
                '全员解救成功',
                '在盖娅等你'
            ],
            failureText: [
                '有缘再见',
                '我的伙伴'
            ],
            endText: [
                '来盖娅',
                '玩真的'
            ]
        },
        time = 500;
    
    $content.html('');
    
    for (let i = 0, n = textContnt[name].length; i < n; i++) {
        $content.append('<div class="t"></div>');
        const t = new Text({
            dom: '#text .content .t:nth-child(' + (i + 1) + ')',
            text: textContnt[name][i]
        });
        setTimeout(() => {
            t.play();
        }, time * i * 2);
    }
    
    if (name === 'loadText') {
        $content.children('.t:nth-child(3)')
            .on('click', () => {
                startGame();
            });
    }
    
    if (name === 'failureText') {
        playSound('failure');
        $content.append('<div id="btn_failure_view" class="pop_outer_btn">' +
            '<i class="pop_btn_dec"></i>查看招聘信息</div>');
        
        // $content.append('<div id="btn_restart" class="pop_outer_btn">' +
        //     '<i class="pop_btn_dec"></i>再玩一次</div>');
        
        $content.children('#btn_failure_view')
            .on('click', () => {
                if (gaea1Popup) gaea1Popup.open(1);
            });
        // $content.children('#btn_restart')
        //     .on('click', () => {
        //         $text.fadeOut(500);
        //         startGame();
        //     });
    }
    
    $text.fadeIn(time);
}

/**
 * 游戏成功
 * @return {void}
 */
function success() {
    const $success = $('#success'),
        t1 = new Text({
            dom: "#success .t1",
            text: "全员解救成功"
        }),
        t2 = new Text({
            dom: "#success .t2",
            text: "在盖娅等你"
        });
    
    $success.fadeIn(500);
    playSound('success');
    
    t1.play().then(() => {
        setTimeout(() => {
            t2.play();
        }, 500);
    });
}
