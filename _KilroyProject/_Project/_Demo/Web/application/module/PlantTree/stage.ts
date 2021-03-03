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
 * 场景
 */
export default class Stage implements _Stage {
    private isInit: boolean = false; // 是否初始化
    private template: any = { // 模板对象
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
    private popup: any = { // 弹窗对象
        explain: null // 说明弹窗
    };
    private userId: number = 0; // 用户ID
    private fraction: number = 0; // 分数
    private level: number = 1; // 等级
    private propWater: number = 0; // 可以浇水次数
    private countWater: number = 0; // 已经浇水浇水次数
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
     * 浇水
     * @return {void}
     */
    private addWater(): void {
    
    }
}
