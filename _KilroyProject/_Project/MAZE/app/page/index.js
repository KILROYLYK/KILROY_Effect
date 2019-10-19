/**
 * Window
 */
import { W, $, Base, Popup, GaeaAjax } from '../../../_Base/js/window';

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
            x: 0,
            y: 0
        },
        speed: 3,
        volume: 1,
        loop: [
            'walk',
            'success'
        ],
        color: 0xEAD8A0,
        friend: 7,
        help: 0,
        resources: null,
        flag: {
            start: true,
            door: true,
            mazeX: false,
            mazeY: false,
            submit: true
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
                createReservation();
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
    if (W._hmt) W._hmt.push(['_trackEvent', '开始游戏', '游戏']);
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
        backgroundColor: 0x85B312,
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
        multiple: 0.94
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
        wh: mazeS.grid.wh * 0.8
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
                x: 0,
                y: -appH / 7
            },
            centerX = appW / 2 * 0.99 - character.config.wh / 2,
            centerY = appH / 2 * 0.99 - character.config.wh / 2,
            characterOldX = character.chassis.object.x,
            characterOldY = character.chassis.object.y,
            obj1 = {
                x: character.chassis.object.getGlobalPosition().x,
                y: character.chassis.object.getGlobalPosition().y,
                w: character.chassis.object.width,
                h: character.chassis.object.height
            };
        
        let characterAddX = x,
            characterAddY = y,
            mazeAddX = 0,
            mazeAddY = 0;
        
        if (obj1.x >= centerX + offset.x &&
            obj1.x <= appW - centerX + offset.x) {
            config.flag.mazeX = true;
        }
        
        if (obj1.y >= centerY + offset.y &&
            obj1.y <= appH - centerY + offset.y) {
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
            const fill = grid[i].children[0],
                fillX = fill.getGlobalPosition().x,
                fillY = fill.getGlobalPosition().y;
            
            if (fillX < 0 || fillY < 0 || fillX > appW || fillY > appH) continue;
            
            if (Bump.hitTestRectangle(character.chassis.object, fill, true)) {
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
                            if (!config.flag.door) return;
                            config.flag.door = false;
                            if (rocker) rocker.stop();
                            if (platform.name === '入口') {
                                character.object.y -= config.speed;
                                if (popup.quit) popup.quit.open();
                            }
                            if (platform.name === '出口') {
                                character.object.y += config.speed;
                                if (config.help < config.friend) {
                                    if (popup.quit) popup.quit.open();
                                } else if (config.help === config.friend) {
                                    showDialogue('success');
                                }
                            }
                        }
                    }
                );
            }
        }
        
        for (let i = 0, n = friend.length; i < n; i++) {
            const fd = friend[i].object.chassis.object,
                fdX = fd.getGlobalPosition().x,
                fdY = fd.getGlobalPosition().y;
    
            if (fdX < 0 || fdY < 0 || fdX > appW || fdY > appH) continue;
            
            Bump.hit(
                character.chassis.object, fd,
                false, false, true,
                (collision, platform) => {
                    if (friend[i].object.config.type === 2) return;
                    if (rocker) rocker.stop();
                    character.switchCharacter(friend[i].name);
                    characterS.switchCharacter(friend[i].name);
                    friend[i].object.save();
                    friend[i].objectS.save();
                    friend[i].clash();
                    if (popup.recruitment) {
                        popup.recruitment.open({
                            type: config.help,
                            save: true
                        });
                    }
                    config.help++;
                    if (W._hmt) W._hmt.push(['_trackEvent', '解救' + config.help + '人', '游戏']);
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
        mazeS.object.x = appMazeSWH * 0.03;
        mazeS.object.y = appMazeSWH * 0.03;
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
                if (W._hmt) W._hmt.push(['_trackEvent', '确认放弃', '点击']);
                _this.close();
                showDialogue('failure');
            });
            $('#btn_quit_disagree').on('click', () => {
                if (W._hmt) W._hmt.push(['_trackEvent', '不放弃', '点击']);
                _this.close();
            });
        },
        openCallback() {
            const _this = this,
                n = config.friend - config.help;
            if (W._hmt) W._hmt.push(['_trackEvent', '不救了，退出', '点击']);
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
                if (W._hmt) W._hmt.push(['_trackEvent', '跳转校园招聘职位', '跳转外链']);
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
                if (W._hmt) W._hmt.push(['_trackEvent', '查看招聘信息', '点击']);
                _this.open({
                    type: 0,
                    save: false
                });
            });
            $('#btn_rec_restart').on('click', () => {
                if (W._hmt) W._hmt.push(['_trackEvent', '再救一次', '点击']);
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
            _this.$content.children('.content,a').removeClass('active');
            _this.$content.children('.content').eq(data.type).addClass('active');
            if (data.save) {
                _this.$content.children('a').eq(0).addClass('active');
            } else {
                if (data.type !== config.friend - 1) {
                    _this.$content.children('a').eq(1).addClass('active');
                } else {
                    _this.$content.children('a').eq(2).addClass('active');
                    _this.$content.children('a').eq(3).addClass('active');
                }
            }
        }
    });
    
    // popup.recruitment.open({
    //     type: 6,
    //     save: false
    // });
}

/**
 * 创建预约
 * @return {void}
 */
function createReservation() {
    const id = 25016,
        network = {
            domain: {
                formal: 'https://acts.gaeamobile.net'
            },
            pass_check: '/api/pre-login',
            submit: '/api/user'
        },
        verify = {
            email: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        };
    
    let preid = '';
    
    (() => {
        const a = {
            url: network.domain.formal + network.pass_check,
            data: {
                activity_id: id,
                timestamp: parseInt(new Date().valueOf())
            },
            successFn: function (result) {
                preid = result.data.preid;
            },
            errorFn: function (e) {
                console.log(e);
            }
        };
        GaeaAjax.encryptAjax(a.url, a.data, a.successFn, a.errorFn);
    })();
    
    $('#reservation_form .btn_submit').on('click', () => {
        const value = $('#email').val();
        
        if (!config.flag.submit) return;
        
        if (!verify.email.test(value)) {
            $('#reservation_form .error').html('格式错误，请重新输入');
            return;
        }
        
        config.flag.submit = false;
        
        const a = {
            url: network.domain.formal + network.submit,
            data: {
                account: value,
                plat: 'an',
                account_type: 2,
                activity_id: id,
                channel: 'gaea',
                preid: preid
            },
            successFn: function (result) {
                config.flag.submit = true;
                if (result.retCode === 0) {
                    $('#reservation_form').hide();
                    $('#reservation_success').show();
                } else if (result.retCode === 3) {
                    $('#reservation_form .error').html('该邮箱已存在');
                }
            },
            errorFn: function (e) {
                console.log(e);
                config.flag.submit = true;
            }
        };
        
        GaeaAjax.encryptAjax(a.url, a.data, a.successFn, a.errorFn);
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
        if (W._hmt) W._hmt.push(['_trackEvent', '查看招聘信息', '点击']);
        popup.recruitment.open({
            type: 0,
            save: false
        });
    });
    $('#btn_restart').on('click', () => {
        if (W._hmt) W._hmt.push(['_trackEvent', '再救一次', '点击']);
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
                        type: 'link',
                        dataUrl: '',
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