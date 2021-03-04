import Global from '../../constant/global';
import _Stage from '../../interface/stage';

import '../../../resource/css/PlantTree/public.less';
import '../../../resource/css/PlantTree/index.less';
import { D } from "../../../../../_Base/Asset/_Global/Global";

interface UserInfo { // 用户信息
    user_id: number,
    nick_name: string,
    photo: string,
    exp: number
}

/**
 * 首页
 */
export default class Index implements _Stage {
    private isInit: boolean = false; // 是否初始化
    private readonly template: any = { // 模板对象
        base: `<div id="box_tree" class="box_tree"></div>
            <div id="box_progress" class="box_progress">
                <div class="progress_bar">
                    <i></i><div class="text t_1"><span>0 / 0</span></div>
                </div>
            </div>
            <div id="box_water_info" class="box_water_info">
                <div class="text t_1">已浇水：<span> 0 次</span></div>
                <div class="text t_1">当前排名：<span>未上榜</span></div>
                <div class="text t_1"><span>可浇水 0 次</span></div>
            </div>
            <div id="button_water" class="button button_water"></div>
            <div id="button_explain" class="button button_explain"></div>
            <div id="button_share" class="button button_share"></div>`,
        add: `<div class="progress_add t_1 i_1"><span>+1</span></div>`,
        popup: `<div class="popup_content"><div class="image"></div></div>`
    };
    private readonly fractionList: number[] = [ 5000, 10000, 30000, 50000 ]; // 分数界限
    private readonly levelList: number[] = [ 10, 30, 50, 80, 100 ]; // 等级人数
    private readonly popupList: any = { // 弹窗对象
        explain: null // 说明弹窗
    };
    private treeList: string[] = []; // 树列表
    private rankList: UserInfo[] = []; // 排名列表
    private fraction: number = 50000; // 世界已浇水次数
    private level: number = 0; // 世界等级
    private userId: number = 0; // 用户ID
    private userWater: number = 0; // 用户可以浇水次数
    private userFraction: number = 0; // 用户已浇水总次数
    
    /**
     * 构造函数
     * @constructor Stage
     */
    constructor() {
        const _this = this;
        
        _this.create();
        _this.init();
        
        _this.update();
    }
    
    /**
     * 创建
     * @return {void}
     */
    public create(): void {
        const _this = this;
        
        Global.Adaptation.openRem();
        Global.Dom.innerHTML = _this.template.base;
        _this.popupList.explain = new Global.Popup('popup_explain', {
            content: _this.template.popup
        });
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
        $('#popup_explain .box_popup').click((e: any) => {
            e.stopPropagation();
        });
    }
    
    /**
     * 更新
     * @return {void}
     */
    public update(): void {
        const _this = this;
        
        _this.updateLevel();
        _this.updateTree();
        _this.updateTreeDom();
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
            fraction = 0,
            progress = 0;
        
        if (_this.fraction >= 0 && _this.fraction < _this.fractionList[0]) {
            level = 1;
            fraction = _this.fractionList[0];
            progress = _this.fraction / _this.fractionList[0];
        }
        if (_this.fraction >= _this.fractionList[0] && _this.fraction < _this.fractionList[1]) {
            level = 2;
            fraction = _this.fractionList[1];
            progress = _this.fraction / _this.fractionList[1];
        }
        if (_this.fraction >= _this.fractionList[1] && _this.fraction < _this.fractionList[2]) {
            level = 3;
            fraction = _this.fractionList[2];
            progress = _this.fraction / _this.fractionList[2];
        }
        if (_this.fraction >= _this.fractionList[2] && _this.fraction < _this.fractionList[3]) {
            level = 4;
            fraction = _this.fractionList[3];
            progress = _this.fraction / _this.fractionList[3];
        }
        if (_this.fraction >= _this.fractionList[3]) {
            level = 5;
            fraction = _this.fractionList[3];
            progress = 1;
        }
        
        _this.level = level;
        $tree.removeClass(levelClass).addClass(level);
        $progress.removeClass(levelClass).addClass(level);
        
        $progress.find('.progress_bar i').width(progress * 100 + '%');
        $progress.find('.progress_bar .text span').text(_this.fraction + ' / ' + fraction);
    }
    
    /**
     * 更新树
     * @return {void}
     */
    private updateTree(): void {
        const _this = this,
            tree = [ 't' ],
            count = _this.levelList[_this.level] - 5;
        
        let prev = 0;
        
        if (_this.level === 1) {
            tree.push('b');
            return;
        }
        
        for (let i = 5; i < count; i += 5) {
            prev = _this.getRandomTree(prev);
            tree.push(prev.toString());
        }
        
        tree.push('b');
        
        console.log('树排序：' + tree.toString());
    }
    
    /**
     * 更新树节点
     * @return {void}
     */
    private updateTreeDom(): void {
        const _this = this,
            $tree = Global.$('#box_tree');
        
        $tree.html('');
        for (let i = 0, ii = 0, n = _this.treeList.length; i < n; i++, ii += 5) {
            const tree = Global.$(`<div class="tree tree_${ _this.treeList[i] }"></div`),
                userList = _this.rankList.slice(ii, ii + 4);
            
            userList.forEach((v, iii) => {
                const u = (ii === 0 && iii < 3) ? 'u_' + (iii + 1) : 'u',
                    user = `<div class="box_user u"><i></i>
                        <div class="text t_1">${ v.nick_name }</div>
                        <div class="text t_1"><span class="i_1"> ${ v.exp } 次</span></div>
                    </div>`;
                tree.append(user);
            });
            
            $tree.append(tree);
        }
    }
    
    /**
     * 浇水
     * @return {void}
     */
    private addWater(): void {
    
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
}
