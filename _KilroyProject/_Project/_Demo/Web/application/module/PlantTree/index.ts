import Global from '../../constant/global';
import _Stage from '../../interface/stage';
import Platform from './platform';

import '../../../resource/css/PlantTree/public.less';
import '../../../resource/css/PlantTree/index.less';
import Plant from "../../../../Three/application/module/Airplane/component/plant";

/**
 * 首页
 */
export default class Index implements _Stage {
    private isInit: boolean = false; // 是否初始化
    private readonly template: any = { // 模板对象
        main: `<div id="box_tree" class="box_tree"></div>
            <div id="box_progress" class="box_progress">
                <div class="progress_bar">
                    <i></i><div class="text t_1"><span>0 / 0</span></div>
                </div>
            </div>
            <div id="box_info" class="box_info">
                <div class="text t_1">已浇水：<span> 0 次</span></div>
                <div class="text t_1">当前排名：<span>未上榜</span></div>
                <div class="text t_1"><span>可浇水 0 次</span></div>
            </div>
            <div id="button_water" class="button button_water"></div>
            <div id="button_explain" class="button button_explain"></div>
            <div id="button_share" class="button button_share"></div>
            <div id="box_water" class="box_water">
                <i></i><i></i><i></i><i></i><i></i>
                <i></i><i></i><i></i><i></i><i></i>
            </div>`,
        login: `<a id="login" class="login" href="wanxiu://innerlink?type=weblogin"></a>`,
        add: `<div class="progress_add t_1 i_1"><span>+1</span></div>`,
        popup: `<div class="popup_content"><div class="image"></div></div>`
    };
    private readonly fractionList: number[] = [ 5000, 10000, 30000, 50000 ]; // 分数界限
    private readonly levelList: number[] = [ 10, 30, 50, 80, 100 ]; // 等级人数
    private readonly popupList: any = { // 弹窗对象
        explain: null // 说明弹窗
    };
    private readonly switchList: any = { // 开关列表
        info: true, // 获取信息
        water: true, // 浇水
        share: true, // 分享
    };
    private readonly setTimeList: any = { // 定时器列表
        info: null, // 获取信息
        water: null, // 浇水
        waterAnim: null // 浇水动画
    };
    private treeList: string[] = []; // 树列表
    private rankList: any[] = []; // 排名列表
    private fraction: number = 0; // 世界已浇水次数
    private level: number = 0; // 世界等级
    private server: any = { // 服务器
        domain: 'http://yd-active.gaeamobile-inc.net',
        id: 'arbor_day_2021',
        key: '8ed81f4eed31633b1ab1dd67a0234188'
    };
    private user: any = { // 用户信息
        // token: Global.FN.url.getParam('login_token') || '',
        token: '235a5c694d8b4a11b832f483d45c5548',
        id: 0,
        fraction: 0, // 已浇水总次数
        water: 0, // 可以浇水次数
        share: '' // 分享链接
    };
    private platform: any = {
        version: Global.FN.url.getParam('app_version') || '',
        system: Global.FN.url.getParam('platform') || '',
        browser: Global.FN.isPSB.browser()
    };
    
    /**
     * 构造函数
     * @constructor Stage
     */
    constructor() {
        const _this = this;
        
        Global.Adaptation.openRem();
        
        Platform.updateDataCB = () => { // 平台登录对接
            const token = _this.user.token;
            
            _this.user.token = Platform.data.token;
            _this.platform.version = Platform.data.version;
            _this.platform.system = Platform.data.platform;
            
            if (_this.user.token !== token) _this.create(); // 重新登录
        };
        
        _this.create();
    }
    
    /**
     * 创建
     * @return {void}
     */
    public create(): void {
        const _this = this;
        
        if (_this.user.token === '') { // 未登录
            _this.clear();
            Global.Dom.innerHTML = _this.template.login;
        } else { // 已登录
            Global.Dom.innerHTML = _this.template.main;
            
            if (_this.popupList.explain === null) {
                _this.popupList.explain = new Global.Popup('popup_explain', {
                    content: _this.template.popup
                });
            }
            
            _this.init();
        }
    }
    
    /**
     * 初始化
     * @return {void}
     */
    public init(): void {
        const _this = this,
            $ = Global.$;
        
        _this.isInit = true;
        
        $('#button_water').click(() => {
            _this.addWater();
        });
        $('#button_explain').click(() => {
            _this.popupList.explain.open();
        });
        $('#button_share').click(() => {
        
        });
        
        $('#popup_explain').click(() => {
            _this.popupList.explain.close();
        });
        $('#popup_explain .box_popup').click((e: Event) => {
            e.stopPropagation();
        });
        
        _this.getInfo(true);
        _this.getShare();
        
        _this.setTimeList.info = setInterval(() => {
            _this.getInfo();
        }, 60 * 1000);
    }
    
    /**
     * 更新
     * @return {void}
     */
    public update(): void {
        const _this = this;
    }
    
    /**
     * 清理
     * @return {void}
     */
    private clear(): void {
        const _this = this;
        
        _this.isInit = false;
        
        Global.Dom.innerHTML = '';
        
        _this.user.id = 0;
        _this.user.fraction = 0;
        _this.user.water = 0;
        _this.user.share = '';
        
        _this.switchList.info = true;
        _this.switchList.water = true;
        clearTimeout(_this.setTimeList.info);
        clearTimeout(_this.setTimeList.water);
        clearInterval(_this.setTimeList.waterAnim);
    
        Platform.data.share = '';
    }
    
    /**
     * 更新世界等级
     * @return {void}
     */
    private updateLevel(): void {
        const _this = this,
            $tree = Global.$('#box_tree'),
            $progress = Global.$('#box_progress'),
            levelClass = 'l_1 l_2 l_3 l_4 l_5';
        
        let level = 0,
            progress = 0,
            fraction = '';
        
        if (_this.fraction >= 0 && _this.fraction < _this.fractionList[0]) {
            level = 1;
            progress = _this.fraction / _this.fractionList[0];
            fraction = _this.fraction + ' / ' + _this.fractionList[0];
        }
        if (_this.fraction >= _this.fractionList[0] && _this.fraction < _this.fractionList[1]) {
            level = 2;
            progress = _this.fraction / _this.fractionList[1];
            fraction = _this.fraction + ' / ' + _this.fractionList[1];
        }
        if (_this.fraction >= _this.fractionList[1] && _this.fraction < _this.fractionList[2]) {
            level = 3;
            progress = _this.fraction / _this.fractionList[2];
            fraction = _this.fraction + ' / ' + _this.fractionList[2];
        }
        if (_this.fraction >= _this.fractionList[2] && _this.fraction < _this.fractionList[3]) {
            level = 4;
            progress = _this.fraction / _this.fractionList[3];
            fraction = _this.fraction + ' / ' + _this.fractionList[3];
        }
        if (_this.fraction >= _this.fractionList[3]) {
            level = 5;
            progress = 1;
            fraction = _this.fraction.toString();
        }
        
        _this.level = level;
        $tree.removeClass(levelClass).addClass('l_' + level);
        $progress.removeClass(levelClass).addClass('l_' + level);
        
        $progress.find('.progress_bar i').width(progress * 100 + '%');
        $progress.find('.progress_bar .text span').text(fraction);
    }
    
    /**
     * 更新树列表
     * @return {void}
     */
    private updateTree(): void {
        const _this = this,
            tree = [ 't' ],
            count = _this.levelList[_this.level - 1] - 5;
        
        let prev = 0;
        
        if (_this.level > 1) {
            for (let i = 5; i < count; i += 5) {
                prev = _this.getRandomTree(prev);
                tree.push(prev.toString());
            }
        }
        
        tree.push('b');
        _this.treeList = tree;
    }
    
    /**
     * 更新树节点
     * @return {void}
     */
    private updateTreeDom(): void {
        const _this = this,
            $tree = Global.$('#box_tree');
        
        $tree.empty();
        
        for (let i = 0, ii = 0, n = _this.treeList.length; i < n; i++, ii += 5) {
            const tree = Global.$(`<div class="tree tree_${ _this.treeList[i] }"></div`),
                userList = _this.rankList.slice(ii, ii + 4);
            
            userList.forEach((v, iii) => {
                const u = (ii === 0 && iii < 3) ? 'u_' + (iii + 1) : 'u',
                    user = `<div class="box_user ${ u }" data-id="${ v.user_id }" data-rank="${ v.rank }">
                        <i style="background-image:url('${ v.photo }');"></i>
                        <div class="text t_1">${ v.nick_name }</div>
                        <div class="text t_1"><span class="i_1"> ${ v.exp } 次</span></div>
                    </div>`;
                tree.append(user);
            });
            
            $tree.append(tree);
        }
    }
    
    /**
     * 更新用户信息
     * @return {void}
     */
    private updateUserInfo(): void {
        const _this = this,
            $boxInfo = Global.$('#box_info');
        
        let rank = 0;
        
        _this.rankList.forEach((v, i, a) => {
            if (_this.user.id === v.user_id) rank = v.rank;
        });
        
        $boxInfo.children('.text').eq(0).find('span').text(' ' + _this.user.fraction + ' 次');
        $boxInfo.children('.text').eq(1).find('span').text(rank === 0 ? '未上榜' : '第 ' + rank + ' 名');
        $boxInfo.children('.text').eq(2).find('span').text('可浇水 ' + _this.user.water + ' 次');
    }
    
    /**
     * 滚动到当前用户
     * @return {void}
     */
    private scrollUser(): void {
        const _this = this,
            $tree = Global.$('#box_tree'),
            $user = Global.$('.box_user[data-id=' + _this.user.id + ']');
        
        if ($user.length === 0) return;
        
        $tree.animate({
            scrollTop: $user.offset().top - 300
        }, 1000);
    }
    
    /**
     * 浇水动画
     * @return {void}
     */
    private waterAnimation(): void {
        const _this = this,
            $boxWater = Global.$('#box_water');
        
        let i = 0;
        
        if (_this.setTimeList.waterAnim) clearInterval(_this.setTimeList.waterAnim);
        _this.setTimeList.waterAnim = setInterval(() => {
            if (i >= 10) {
                $boxWater.children('i').removeClass('show');
                clearInterval(_this.setTimeList.waterAnim);
                return;
            }
            
            $boxWater
                .children('i').removeClass('show')
                .eq(i).addClass('show');
            i++;
        }, 150);
    }
    
    /**
     * 获取随机数
     * 结果不与上次相同
     * @param {number} prev 上一次结果
     * @private
     */
    private getRandomTree(prev: number): number {
        const _this = this,
            n = Global.FN.getRandomInt(1, 3);
        return n === prev ? _this.getRandomTree(prev) : n;
    }
    
    /**
     * 获取信息
     * @param {boolean} isScroll 是否滚动到用户位置
     * @return {void}
     */
    private getInfo(isScroll: boolean = false): void {
        const _this = this,
            level = _this.level;
        
        if (!_this.switchList.info) return;
        _this.switchList.info = false;
        
        _this.ajax(
            '/tree/info',
            {
                sing: _this.server.key,
                timestamp: new Date().valueOf()
            },
            (result: any) => {
                const data = result.data;
                
                _this.switchList.info = true;
                
                if (!_this.isInit) return;
                if (result.retCode !== 0) {
                    alert(result.retMsg);
                    return;
                }
                
                _this.fraction = data.global_exp;
                _this.rankList = Global.FN.sortArray(data.rank_data, 'rank');
                
                _this.user.id = data.user_id;
                _this.user.fraction = data.exp;
                _this.user.water = data.props;
                
                _this.updateLevel();
                if (_this.level !== level) _this.updateTree();
                _this.updateTreeDom();
                
                _this.updateUserInfo();
                
                if (isScroll) _this.scrollUser();
            },
            (e: Event) => {
                _this.switchList.info = true;
            }
        );
    }
    
    /**
     * 浇水
     * @return {void}
     */
    private addWater(): void {
        const _this = this;
        
        if (_this.user.water === 0) {
            alert('可浇水次数不足');
            return;
        }
        
        if (!_this.switchList.water) return;
        _this.switchList.water = false;
        _this.setTimeList.water = setTimeout(() => {
            _this.switchList.water = true;
        }, 2000);
        
        _this.ajax(
            '/tree/water',
            {
                sing: _this.server.key,
                timestamp: new Date().valueOf()
            },
            (result: any) => {
                const data = result.data;
                
                if (!_this.isInit) return;
                if (result.retCode !== 0) {
                    alert(result.retMsg);
                    return;
                }
                
                _this.user.fraction++;
                _this.user.water--;
                _this.updateUserInfo();
                
                _this.getInfo();
                
                _this.waterAnimation();
            },
            (e: Event) => {
            }
        );
    }
    
    /**
     * 获取分享链接
     * @return {void}
     */
    private getShare(): void {
        const _this = this;
        
        if (!_this.switchList.share) return;
        _this.switchList.share = false;
        
        _this.ajax(
            '/tree/share',
            {
                sing: _this.server.key,
                timestamp: new Date().valueOf()
            },
            (result: any) => {
                const data = result.data;
                
                _this.switchList.share = true;
                
                if (!_this.isInit) return;
                if (result.retCode !== 0) {
                    alert(result.retMsg);
                    return;
                }
                
                _this.user.share = data.url;
                Platform.data.share = data.url;
                
                console.log(Platform.data.share);
            },
            (e: Event) => {
                _this.switchList.share = true;
            }
        );
    }
    
    /**
     * Ajax请求
     * @param {string} url
     * @param {object} data
     * @param {Function} successCallback
     * @param {Function} errorCallback
     * @return {void}
     */
    private ajax(url: string, data: object, successCallback: Function, errorCallback: Function): void {
        const _this = this;
        
        Global.$.ajax({
            url: _this.server.domain + url,
            data,
            dataType: 'json',
            type: 'post',
            cache: false,
            async: true,
            beforeSend: (xhr: any) => {
                xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                xhr.setRequestHeader('Login-Token', _this.user.token);
                xhr.setRequestHeader('Activity-Id', _this.server.id);
            },
            success: (result: any) => {
                successCallback(result);
            },
            error: (e: Event) => {
                console.log(e);
                errorCallback(e);
            }
        });
    }
}
