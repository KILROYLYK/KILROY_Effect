import Global from '../../constant/global';
import _Stage from '../../interface/stage';

import '../../../resource/css/PlantTree/public.less';
import '../../../resource/css/PlantTree/index.less';

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
        base: `<div id="box_tree" class="box_tree l_1">
                <div class="tree tree_t"></div>
                <div class="tree tree_1"></div>
                <div class="tree tree_2"></div>
                <div class="tree tree_3"></div>
                <div class="tree tree_b"></div>
            </div>
            <div class="bg_bottom"></div>
            <div id="box_progress" class="box_progress l_1">
                <div class="progress_bar">
                    <div class="text t_1"><span>0 / 0</span></div>
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
        user: `<div class="box_user">
                <div class="text t_1">昵称</div>
                <div class="text t_1"><span class="i_1"> 0 次</span></div>
            </div>`,
        popup: `<div class="popup_content">
                <div class="image"></div>
            </div>`
    };
    private readonly popup: any = { // 弹窗对象
        explain: null // 说明弹窗
    };
    private readonly fractionList: number[] = [ 5000, 10000, 30000, 50000 ]; // 分数界限
    private readonly levelList: number[] = [ 10, 30, 50, 80, 100 ]; // 等级人数
    private avatar: object = { // 头像在树上的位置
        l1: {
            tt: [
                { top: 0, left: 0 },
                { top: 0, left: 0 },
                { top: 0, left: 0 },
                { top: 0, left: 0 },
                { top: 0, left: 0 }
            ],
            tb: [
                { top: 0, left: 0 },
                { top: 0, left: 0 },
                { top: 0, left: 0 },
                { top: 0, left: 0 },
                { top: 0, left: 0 }
            ]
        }
    };
    private tree: string[] = []; // 树排序
    private userId: number = 0; // 用户ID
    private fraction: number = 0; // 用户已浇水次数
    private propWater: number = 0; // 可以浇水次数
    private count: number = 0; // 世界已浇水次数
    private level: number = 0; // 世界等级
    private rankList: UserInfo[] = []; // 排名列表
    
    /**
     * 构造函数
     * @constructor Stage
     */
    constructor() {
        const _this = this;
        
        _this.create();
        _this.init();
    }
    
    /**
     * 创建
     * @return {void}
     */
    public create(): void {
        const _this = this;
        
        Global.Adaptation.openRem();
        Global.Dom.innerHTML = _this.template.base;
        _this.popup.explain = new Global.Popup('popup_explain', {
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
            _this.popup.explain.open();
        });
        $('#button_share').click(() => {
        
        });
        
        $('#popup_explain').click(() => {
            _this.popup.explain.close();
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
    }
    
    /**
     * 更新世界等级
     * @return {void}
     */
    private updateLevel(): void {
        const _this = this;
        
        let level = 0;
        if (_this.fraction >= 0 && _this.fraction < _this.fractionList[0]) level = 1;
        if (_this.fraction >= _this.fractionList[0] && _this.fraction < _this.fractionList[1]) level = 2;
        if (_this.fraction >= _this.fractionList[1] && _this.fraction < _this.fractionList[2]) level = 3;
        if (_this.fraction >= _this.fractionList[2] && _this.fraction < _this.fractionList[3]) level = 4;
        if (_this.fraction >= _this.fractionList[3]) level = 5;
        
        _this.level = level;
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
        
        for (const i = 5; i < count; i + 5) {
            prev = _this.getRandomTree(prev);
            tree.push(prev.toString());
        }
        
        tree.push('b');
        
        console.log('树排序：' + tree.toString());
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
