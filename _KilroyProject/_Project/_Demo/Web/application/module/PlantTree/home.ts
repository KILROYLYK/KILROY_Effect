import Global from '../../constant/global';
import _Stage from '../../interface/stage';
import Platform from './platform';
import AnalysysAgent from '../../plugin/AnalysysAgent';

import '../../../resource/css/PlantTree/public.less';
import '../../../resource/css/PlantTree/home.less';

/**
 * 首页
 * https://activity.iyingdi.com/planttree/home/
 */
export default class Home implements _Stage {
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
            <div id="button_article" class="button button_article"></div>
            <div id="button_explain" class="button button_explain"></div>
            <div id="button_share" class="button button_share"></div>
            <div id="box_water" class="box_water">
                <i></i><i></i><i></i><i></i><i></i>
                <i></i><i></i><i></i><i></i><i></i>
            </div>`,
        login: `<a id="login" class="login" href="wanxiu://innerlink?type=weblogin"></a>`,
        add: `<div class="progress_add t_1 i_1"><span>+1</span></div>`,
        popupToast: `<div class="popup_content"></div>`,
        popupExplain: `<div class="popup_content"><div class="image"></div></div>`
    };
    private readonly fractionList: number[] = [ 5000, 6000, 7000, 8000 ]; // 分数界限
    private readonly levelList: number[] = [ 10, 30, 50, 80, 100 ]; // 等级人数
    private readonly switchList: any = { // 开关列表
        info: true, // 获取信息
        water: true, // 浇水
        share: true, // 分享
    };
    private readonly setTimeList: any = { // 定时器列表
        toast: null, // 提示弹窗
        info: null, // 获取信息
        water: null, // 浇水
        waterAnim: null // 浇水动画
    };
    private readonly popupList: any = { // 弹窗对象
        toast: null, // 提示弹窗
        explain: null // 说明弹窗
    };
    private treeList: string[] = []; // 树列表
    private rankList: any[] = []; // 排名列表
    private fraction: number = 0; // 世界已浇水次数
    private level: number = 0; // 世界等级
    private serverData: any = { // 服务器
        domain: 'https://activity-api.iyingdi.com',
        // domain: 'https://activity-api-test.iyingdi.com',
        id: 'arbor_day_2021',
        key: '8ed81f4eed31633b1ab1dd67a0234188'
    };
    private userData: any = { // 用户信息
        token: Global.FN.url.getParam('login_token') || '',
        // token: '235a5c694d8b4a11b832f483d45c5548',
        id: 0,
        fraction: 0, // 已浇水总次数
        water: 0, // 可以浇水次数
        share: '' // 分享链接
    };
    private platformData: any = {
        version: Global.FN.url.getParam('app_version') || '',
        system: Global.FN.url.getParam('platform') || '',
        browser: Global.FN.isPSB.browser()
    };
    
    /**
     * 构造函数
     * @constructor Home
     */
    constructor() {
        const _this = this;
        
        _this.create();
        
        // 平台
        Platform.updateDataCB = () => { // 平台更新数据回调
            const token = _this.userData.token;
            
            _this.userData.token = Platform.data.token;
            _this.platformData.version = Platform.data.version;
            _this.platformData.system = Platform.data.platform;
            
            if (_this.userData.token !== token) Global.Window.location.reload();
        };
        Platform.shareCB = () => { // 平台分享回调
            AnalysysAgent.track('worldtree_share', {
                user_id: String(_this.userData.id)
            });
        }
        
        // 统计
        AnalysysAgent.init({
            appkey: '01cfd55a0542cd89',
            uploadURL: 'https://yingdidatacollect.gaeadata.com',
            sendType: 'post'
        });
    }
    
    /**
     * 创建
     * @return {void}
     */
    private create(): void {
        const _this = this;
        
        if (_this.popupList.toast === null) {
            _this.popupList.toast = new Global.Popup('popup_toast', {
                content: _this.template.popupToast,
                openCallback: (data: any) => {
                    _this.popupList.toast.$content.find('.popup_content').text(data);
                    
                    if (_this.setTimeList.toast) clearTimeout(_this.setTimeList.toast);
                    _this.setTimeList.toast = setTimeout(() => {
                        _this.popupList.toast.close();
                    }, 2500);
                },
                closeCallback: () => {
                    _this.popupList.toast.$content.find('.popup_content').text('');
                    
                    clearTimeout(_this.setTimeList.toast);
                }
            });
        }
        
        if (_this.popupList.explain === null) {
            _this.popupList.explain = new Global.Popup('popup_explain', {
                content: _this.template.popupExplain
            });
        }
        
        if (_this.userData.token === '') { // 未登录
            Global.Dom.innerHTML = _this.template.login;
        } else { // 已登录
            Global.Dom.innerHTML = _this.template.main;
            
            _this.init();
        }
    }
    
    /**
     * 初始化
     * @return {void}
     */
    private init(): void {
        const _this = this;
        
        Global.$('#button_water').click(() => {
            _this.addWater();
        });
        Global.$('#button_article').click(() => {
            AnalysysAgent.track('worldtree_article', {
                user_id: String(_this.userData.id)
            });
            
            Global.Window.location.href = 'wanxiu://innerlink?type=bbspost_url&id=2356751';
        });
        Global.$('#button_explain').click(() => {
            _this.popupList.explain.open();
        });
        Global.$('#button_share').click(() => {
            Global.Window.location.href = 'wanxiu://innerlink?type=webshareurl&parameters=' + Platform.onShare();
        });
        
        Global.$('#popup_explain').click(() => {
            _this.popupList.explain.close();
        });
        Global.$('#popup_explain .box_popup').click((e: Event) => {
            e.stopPropagation();
        });
        
        _this.getInfo(true);
        _this.getShare();
        
        _this.setTimeList.info = setInterval(() => {
            _this.getInfo();
        }, 60 * 1000);
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
            const tree = Global.$(`<div class="tree tree_${ _this.treeList[i] }"></div>`),
                userList = _this.rankList.slice(ii, ii + 5);
            
            userList.forEach((v, iii) => {
                const u = (ii === 0 && iii < 3) ? 'u_' + (iii + 1) : 'u',
                    user = `<div class="box_user ${ u }" data-id="${ v.user_id }" data-rank="${ v.rank }">
                        <i style="background-image:url('${ v.photo }');"></i>
                        ${ _this.getRank(v.rank) }
                        <div class="text t_1">${ v.nick_name }</div>
                        <div class="text t_1"><span class="i_1"> ${ v.exp } 次</span></div>
                    </div>`;
                tree.append(user);
            });
            
            $tree.append(tree);
        }
    }
    
    /**
     * 获取排名节点
     * @param {number} rank 排名
     * @return {string} 节点字符串
     */
    private getRank(rank: number): string {
        const str = rank.toString();
        
        let dom = `<div class="rank">`;
        
        if (rank < 4) return dom + `</div>`;
        
        for (let i = 0, n = str.length; i < n; i++) dom += `<i class="n_${ str[i] }"></i>`;
        
        return dom + `</div>`;
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
            if (_this.userData.id === v.user_id) rank = v.rank;
        });
        
        $boxInfo.children('.text').eq(0).find('span').text(' ' + _this.userData.fraction + ' 次');
        $boxInfo.children('.text').eq(1).find('span').text(rank === 0 ? '未上榜' : '第 ' + rank + ' 名');
        $boxInfo.children('.text').eq(2).find('span').text('可浇水 ' + _this.userData.water + ' 次');
    }
    
    /**
     * 滚动到当前用户
     * @return {void}
     */
    private scrollUser(): void {
        const _this = this,
            $tree = Global.$('#box_tree'),
            $user = Global.$('.box_user[data-id=' + _this.userData.id + ']');
        
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
                timestamp: Global.FN.getTimestamp()
            },
            (result: any) => {
                const data = result.data;
                
                _this.switchList.info = true;
                
                if (result.retCode !== 0) {
                    _this.popupList.toast.open(result.retMsg);
                    return;
                }
                
                _this.fraction = data.global_exp;
                _this.rankList = Global.FN.sortArray(data.rank_data, 'rank');
                
                _this.userData.id = data.user_id;
                _this.userData.fraction = data.exp;
                _this.userData.water = data.props;
                
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
        
        if (!_this.switchList.water) return;
        _this.switchList.water = false;
        _this.setTimeList.water = setTimeout(() => {
            _this.switchList.water = true;
        }, 2000);
        
        _this.ajax(
            '/tree/water',
            {
                timestamp: Global.FN.getTimestamp()
            },
            (result: any) => {
                const data = result.data;
                
                if (result.retCode !== 0) {
                    if (_this.userData.water === 0) { // 浇水次数不足
                        _this.popupList.toast.open('分享给好友获得更多次数吧');
                        return;
                    }
                    
                    _this.popupList.toast.open(result.retMsg);
                    return;
                }
                
                _this.userData.fraction++;
                _this.userData.water--;
                _this.updateUserInfo();
                
                _this.getInfo();
                
                _this.waterAnimation();
                
                AnalysysAgent.track('worldtree_plant', {
                    user_id: String(_this.userData.id),
                    today_total: data.today_exp
                });
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
                timestamp: Global.FN.getTimestamp()
            },
            (result: any) => {
                const data = result.data;
                
                _this.switchList.share = true;
                
                if (result.retCode !== 0) {
                    _this.popupList.toast.open(result.retMsg);
                    return;
                }
                
                const share = Global.Window.location.origin +
                    '/planttree/share/index.html?uid=' + data.uid + '&key=' + data.key;
                _this.userData.share = Platform.data.share = share;
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
    private ajax(url: string, data: any, successCallback: Function, errorCallback: Function): void {
        const _this = this;
        
        Global.Ajax.encryptMD5Ajax({
            type: 'post',
            url: _this.serverData.domain + url,
            dataType: 'json',
            data,
            beforeSend: (xhr: any) => {
                xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                xhr.setRequestHeader('Login-Token', _this.userData.token);
                xhr.setRequestHeader('Activity-Id', _this.serverData.id);
            },
            success: (result: any) => {
                successCallback(result);
            },
            error: (e: any) => {
                console.log(e);
                e.responseJSON && _this.popupList.toast.open(e.responseJSON.retMsg);
                errorCallback(e);
            }
        }, {
            key: _this.serverData.key
        });
    }
}
