/**
 * Window
 */
import { W, D, $, Base, Popup, GaeaAjax } from '../../../_Base/js/window';

/**
 * Plugin
 */
// import Bump from '../../../$Plugin/Pixi/bump';

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
import Collision from '../module/collision';
import Sound from '../module/sound';

/**
 * Index
 */
const config = {
        screen: 1,
        multiple: 4,
        margin: {
            x: 0,
            y: 0
        },
        speed: 4,
        volume: 1,
        color: 0xEAD8A0,
        friend: 7,
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
            $('#loading').fadeOut(500);
            startGame();
            // setTimeout(() => {
            //     createPopup();
            //     createClick();
            //     readyGame();
            // }, 500);
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
    sound = new Sound({
        resources: config.resources,
        volume: config.volume
    });
    $('#progress').removeClass('active');
    $('#loading .text').addClass('active');
    $('#loading').on('click', function () {
        $(this).fadeOut(500);
        setTimeout(() => {
            showDialogue('start');
        }, 500);
    });
}

/**
 * 开始游戏
 * @return {void}
 */
function startGame() {
    if (!config.flag.start) return;
    if (sound) sound.play('loading');
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
    config.margin.x = appMaze.clientWidth / 6;
    config.margin.y = appMaze.clientHeight / 3;
}

/**
 * 玩游戏
 * @return {void}
 */
function playGame() {
    const friend = [
        {
            name: 1,
            position: 391,
            time: 2000,
            object: null,
            objectS: null,
            clash: () => {
                sound.play('character_1_m');
            }
        },
        {
            name: 2,
            position: 858,
            time: 1000,
            object: null,
            objectS: null,
            clash: () => {
                sound.play('character_2_m');
            }
        },
        {
            name: 4,
            position: 519,
            time: 1500,
            object: null,
            clash: () => {
                sound.play('character_4_m');
            }
        },
        {
            name: 5,
            position: 57,
            time: 3000,
            object: null,
            objectS: null,
            clash: () => {
                sound.play('character_5_m');
            }
        },
        {
            name: 6,
            position: 752,
            time: 2500,
            object: null,
            objectS: null,
            clash: () => {
                sound.play('character_6_m');
            }
        },
        {
            name: 7,
            position: 352,
            time: 2000,
            object: null,
            objectS: null,
            clash: () => {
                sound.play('character_7_m');
            }
        },
        {
            name: 8,
            position: 43,
            time: 1800,
            object: null,
            objectS: null,
            clash: () => {
                sound.play('character_8_m');
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
        index: 3,
        type: 1,
        wh: maze.grid.wh * 0.35
    });
    characterS = new Character({
        resources: config.resources,
        index: 3,
        type: 1,
        wh: mazeS.grid.wh * 0.35
    });
    rocker = new Rocker({
        resources: config.resources,
        wh: appRockerWH,
        direction: 8,
        callback: (direction) => {
            if (sound) sound.play('walk');
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
                    if (sound) sound.pause('walk');
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
        if (rocker) rocker.move();
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
            offset = {
                wall: 0.1,
                x: 0,
                y: -appH / 7
            },
            centerX = appW / 2 * 0.99 - character.config.wh / 2,
            centerY = appH / 2 * 0.99 - character.config.wh / 2,
            characterObj = {
                x: character.chassis.object.getGlobalPosition().x,
                y: character.chassis.object.getGlobalPosition().y,
                width: character.chassis.object.width,
                height: character.chassis.object.height
            },
            characterArr = Collision.conversionPointArray(characterObj),
            speed = {
                x: x,
                y: y
            },
            speedNew = Base.unlinkObject(speed);
        
        if (characterObj.x >= centerX + offset.x &&
            characterObj.x <= appW - centerX + offset.x) {
            config.flag.mazeX = true;
        }
        
        if (characterObj.y >= centerY + offset.y &&
            characterObj.y <= appH - centerY + offset.y) {
            config.flag.mazeY = true;
        }
        
        if (maze.object.x - x >= config.margin.x ||
            maze.object.x - x <= -(maze.map.wh + config.margin.x - appW)) {
            config.flag.mazeX = false;
        }
        
        if (maze.object.y - y >= config.margin.y ||
            maze.object.y - y <= -(maze.map.wh + config.margin.y - appH)) {
            config.flag.mazeY = false;
        }
        
        for (let i = 0, n = grid.length; i < n; i++) {
            const fill = grid[i].children[0],
                fillX = fill.getGlobalPosition().x,
                fillY = fill.getGlobalPosition().y;
            
            if (fillX < 0 || fillY < 0 || fillX > appW || fillY > appH) continue;
            
            const fillArr = Collision.conversionPointArray({
                x: fillX,
                y: fillY,
                width: fill.width,
                height: fill.height
            });
            
            if (Collision.isPolygonsOverlap(characterArr, fillArr)) {
                const wall = grid[i].children[1].children;
                for (let ii = 0, nn = wall.length; ii < nn; ii++) {
                    const wallArr = Collision.conversionPointArray({
                            x: wall[ii].getGlobalPosition().x,
                            y: wall[ii].getGlobalPosition().y,
                            width: wall[ii].width,
                            height: wall[ii].height
                        }),
                        characterArrNext = Base.unlinkObject(characterArr),
                        speedNext = Base.unlinkObject(speed);
                    
                    if (config.flag.mazeX) speedNext.x *= 2;
                    if (config.flag.mazeY) speedNext.y *= 2;
                    
                    for (let iii = 0, nnn = characterArrNext.length; iii < nnn; iii++) {
                        characterArrNext[iii].x += speedNext.x;
                        characterArrNext[iii].y += speedNext.y;
                    }
                    
                    if (Collision.isPolygonsOverlap(characterArrNext, wallArr)) {
                        if (speed.y < 0 && characterArr[0].y < wallArr[2].y && characterArr[2].y > wallArr[2].y) {
                            speed.direction = 'top';
                            speedNew.y = wallArr[2].y - characterArr[0].y;
                            console.log('top', wallArr[2].y, characterArr[0].y, speedNew.y);
                            if (config.flag.mazeY && speedNew.y !== 0) speedNew.y /= 2;
                            if (Math.abs(speedNew.y) < 0.001 || speedNew.y > 0) speedNew.y = 0;
                        }
                        if (speed.x < 0 && characterArr[0].x < wallArr[1].x && characterArr[1].x > wallArr[1].x) {
                            speed.direction = 'left';
                            speedNew.x = wallArr[1].x - characterArr[0].x;
                            console.log('left', wallArr[1].x, characterArr[0].x, speedNew.x);
                            if (config.flag.mazeX && speedNew.x !== 0) speedNew.x /= 2;
                            if (Math.abs(speedNew.x) < 0.001 || speedNew.x > 0) speedNew.x = 0;
                        }
                        if (speed.x > 0 && characterArr[1].x > wallArr[0].x && characterArr[0].x < wallArr[0].x) {
                            speed.direction = 'right';
                            speedNew.x = wallArr[0].x - characterArr[1].x;
                            console.log('right', wallArr[0].x, characterArr[1].x, speedNew.x);
                            if (config.flag.mazeX && speedNew.x !== 0) speedNew.x /= 2;
                            if (Math.abs(speedNew.x) < 0.001 || speedNew.x < 0) speedNew.x = 0;
                        }
                        if (speed.y > 0 && characterArr[2].y > wallArr[0].y && characterArr[0].y < wallArr[0].y) {
                            speed.direction = 'bottom';
                            speedNew.y = wallArr[0].y - characterArr[2].y;
                            console.log('bottom', wallArr[0].y, characterArr[2].y, speedNew.y);
                            if (config.flag.mazeY && speedNew.y !== 0) speedNew.y /= 2;
                            if (Math.abs(speedNew.y) < 0.001 || speedNew.y < 0) speedNew.y = 0;
                        }
                    }
                }
            }
        }
        
        // for (let i = 0, n = friend.length; i < n; i++) {
        //     Bump.hit(
        //         character.chassis.object, friend[i].object.chassis.object,
        //         false, false, true,
        //         (collision, platform) => {
        //             if (friend[i].object.config.type === 2) return;
        //             if (rocker) rocker.stop();
        //             character.switchCharacter(friend[i].name);
        //             characterS.switchCharacter(friend[i].name);
        //             friend[i].object.save();
        //             friend[i].objectS.save();
        //             friend[i].clash();
        //             if (popup.recruitment) {
        //                 popup.recruitment.open({
        //                     type: config.help,
        //                     save: true
        //                 });
        //             }
        //             config.help++;
        //         }
        //     );
        // }
        
        maze.object.x -= config.flag.mazeX ? speedNew.x : 0;
        maze.object.y -= config.flag.mazeY ? speedNew.y : 0;
        character.object.x += speedNew.x;
        character.object.y += speedNew.y;
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
                    index: friend[i].name,
                    type: 0,
                    wh: wh
                }),
                fS = new Character({
                    resources: config.resources,
                    index: friend[i].name,
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
 * 销毁游戏
 * @return {void}
 */
function destroyGame() {
    config.flag.start = true;
    config.flag.door = true;
    
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
            successEnd: [
                '来盖娅',
                '玩真的'
            ],
            failure: [
                '有缘再见',
                '我的伙伴'
            ]
        },
        time = 500;
    
    $('#game,#keyboard,#map').removeClass('active');
    
    if (sound) sound.play('dialogue');
    
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
        if (sound) sound.play('success');
        $dialogue.find('.fireworks').show();
        $dialogue.find('.people').show();
        setTimeout(() => {
            destroyGame();
            showDialogue('successEnd');
        }, 3000);
    } else {
        $dialogue.find('.fireworks').hide();
        $dialogue.find('.people').hide();
    }
    
    if (name === 'failure') {
        if (sound) sound.play('failure');
        setTimeout(() => {
            destroyGame();
            if (popup.recruitment) {
                popup.recruitment.open({
                    type: 0,
                    save: false
                });
            }
        }, 3000);
    }
    
    if (name === 'successEnd') {
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
                if (W._hmt) W._hmt.push(['_trackEvent', '确认放弃']);
                _this.close();
                showDialogue('failure');
            });
            $('#btn_quit_disagree').on('click', () => {
                if (W._hmt) W._hmt.push(['_trackEvent', '不放弃']);
                _this.close();
            });
        },
        openCallback() {
            const _this = this,
                n = config.friend - config.help;
            if (W._hmt) W._hmt.push(['_trackEvent', '不救了，退出']);
            if (rocker) rocker.stop();
            if (n > 0) {
                _this.$content.find('.content .box_scale').html('还有<span>' + n + '</span>名同伴未被解救，<br>确认放弃他们吗？');
            } else {
                _this.$content.find('.content .box_scale').html('已解救全员，<br>确认现在放弃吗？');
            }
        },
        closeCallback() {
            if (config.setTime.door) {
                clearTimeout(config.setTime.door);
                config.setTime.door = setTimeout(() => {
                    config.flag.door = true;
                }, 3000);
            }
        }
    });
    
    popup.recruitment = new Popup('recruitment_popup', {
        finishCallback() {
            const _this = this;
            $('#btn_rec_more').on('click', () => {
                if (W._hmt) W._hmt.push(['_trackEvent', '跳转校园招聘职位']);
                location.href = 'https://www.gaea.com/cn/position';
            });
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
            $('#btn_rec_review').on('click', () => {
                if (W._hmt) W._hmt.push(['_trackEvent', '查看招聘信息']);
                _this.open({
                    type: 0,
                    save: false
                });
            });
            $('#btn_rec_restart').on('click', () => {
                if (W._hmt) W._hmt.push(['_trackEvent', '再救一次']);
                _this.close();
                $('#dialogue').fadeOut(500);
                setTimeout(() => {
                    if (sound) sound.pause('success');
                    if (sound) sound.pause('failure');
                    startGame();
                }, 500);
            });
        },
        openCallback(data) {
            const _this = this;
            if (rocker) rocker.stop();
            _this.$content.find('.content,a').removeClass('active');
            _this.$content.find('.content').eq(data.type).addClass('active');
            if (data.save) {
                _this.$content.find('a').eq(1).addClass('active');
            } else {
                if (data.type !== config.friend - 1) {
                    _this.$content.find('a').eq(2).addClass('active');
                } else {
                    _this.$content.find('a').eq(3).addClass('active');
                    _this.$content.find('a').eq(4).addClass('active');
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
        if (sound) sound.play('map');
    });
    $('#btn_map_close').on('click', () => {
        $('#map').removeClass('active');
        if (appMap) appMap.stop();
        if (sound) sound.play('map');
    });
    $('#btn_quit,#btn_map_quit').on('click', () => {
        if (popup.quit) popup.quit.open();
    });
    $('#btn_view').on('click', () => {
        if (W._hmt) W._hmt.push(['_trackEvent', '查看招聘信息']);
        popup.recruitment.open({
            type: 0,
            save: false
        });
    });
    $('#btn_restart').on('click', () => {
        if (W._hmt) W._hmt.push(['_trackEvent', '再救一次']);
        if (sound) sound.pause('success');
        if (sound) sound.pause('failure');
        $('#dialogue').fadeOut(500);
        startGame();
    });
}

/**
 * 显示或隐藏遮罩层
 * @return {void}
 */
function rotateFun() {
    const $W = $(W),
        $rotateScreen = $('#rotate_screen');
    // if (Base.isPSB.platform() === 'PC' || $rotateScreen.length === 0) return;
    if ($W.width() >= $W.height()) $rotateScreen.addClass('active'); else $rotateScreen.removeClass('active');
}

/**
 * 分享
 */
(function () {
    /*global setShareInfo wx*/
    const share = {
        title: '盖娅互娱2020年校招开启',
        description: '解救伙伴，开启校招冒险之旅',
        img: 'https://image.gaeamobile.net/image/20190904/115559/slogan.png',
        url: location.href
    };
    
    $.getScript('https://qzonestyle.gtimg.cn/qzone/qzact/common/share/share.js', () => {
        if (typeof setShareInfo === 'undefined') return;
        
        setShareInfo({
            title: share.title,
            summary: share.description,
            pic: share.img,
            url: location.href
        });
    });
    
    GaeaAjax.encryptAjax(
        'https://activity.gaeamobile.net/api/wechat-share',
        {
            gameId: '520017',
            url: location.href
        },
        (result) => {
            if (result.retCode !== 0) {
                console.log(result.retMsg);
                return;
            }
            $.getScript('https://res.wx.qq.com/open/js/jweixin-1.4.0.js', () => {
                if (typeof wx === 'undefined') return;
                
                wx.config({
                    debug: false,
                    appId: result.appId,
                    timestamp: result.timestamp,
                    nonceStr: result.nonceStr,
                    signature: result.signature,
                    jsApiList: ['checkJsApi', 'onMenuShareAppMessage', 'onMenuShareTimeline']
                });
                
                wx.ready(() => {
                    
                    //分享给好友
                    wx.onMenuShareAppMessage({
                        title: share.title,
                        desc: share.description,
                        link: share.url,
                        imgUrl: share.img,
                        type: 'link', //link、music、video
                        dataUrl: '', //music或video的数据链接
                        success: function () {
                        },
                        cancel: function () {
                        }
                    });
                    
                    //分享至朋友圈
                    wx.onMenuShareTimeline({
                        title: share.title,
                        link: share.url,
                        imgUrl: share.img,
                        trigger: function (res) {
                        },
                        success: function (res) {
                        },
                        cancel: function (res) {
                        },
                        fail: function (res) {
                        }
                    });
                    
                    //分享至QQ
                    wx.onMenuShareQQ({
                        title: share.title,
                        desc: share.description,
                        link: share.url,
                        imgUrl: share.img,
                        success: function () {
                        },
                        cancel: function () {
                        }
                    });
                    
                    //分享至QQ空间
                    wx.onMenuShareQZone({
                        title: share.title,
                        desc: share.description,
                        link: share.url,
                        imgUrl: share.img,
                        success: function () {
                        },
                        cancel: function () {
                        }
                    });
                    
                    //分享至腾讯微博
                    wx.onMenuShareWeibo({
                        title: share.title,
                        desc: share.description,
                        link: share.url,
                        imgUrl: share.img,
                        success: function () {
                        },
                        cancel: function () {
                        }
                    });
                    
                    //报错
                    wx.error((res) => {
                        console.log(res);
                    });
                });
            });
        }
    );
})();

/**
 * 统计
 */
(function () {
    W._hmt = W._hmt || [];
    const $body = $('body'),
        id = 'baidu-jssdk',
        js = D.createElement('script'),
        app = 'aad7546bb649c1f598b65f160c8e426e';
    
    if (D.getElementById(id)) return;
    
    js.type = 'text/javascript';
    js.id = id;
    js.src = 'https://hm.baidu.com/hm.js?' + app;
    
    $body.append(js);
    
    // /**
    //  * 绑定点击事件
    //  * @param {String} name 统计标识
    //  * @return {void}
    //  */
    // function click(name) {
    //     W._hmt.push(['_trackEvent', name]);
    // }
})();
