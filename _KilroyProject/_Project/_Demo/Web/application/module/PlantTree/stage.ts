import Global from '../../constant/global';
import _Stage from '../../interface/stage';

import '../../../resource/css/PlantTree/public.less';
import '../../../resource/css/PlantTree/index.less';

/**
 * 场景
 */
export default class Stage implements _Stage {
    private isInit: boolean = false; // 是否初始化
    private template: object = { // 模板对象
        base: `<div id="box_tree" class="box_tree"></div>
            <div id="box_progress" class="box_progress">
                <div class="progress_bar">
                    <div class="text text_1">0/0</div>
                </div>
            </div>
            <div id="box_water_info" class="box_water_info">
                <div class="text"><span>已浇水：</span>0次</div>
                <div class="text"><span>当前排名：</span>未上榜</div>
                <div class="text">可浇水0次</div>
            </div>
            <div id="button_water" class="button_water"></div>
            <div id="button_explain" class="button_explain"></div>
            <div id="button_share" class="button_share"></div>`,
        addProgress: `<div class="progress_add text_1 icon_1">+1</div>`
    };
    
    /**
     * 构造函数
     * @constructor Stage
     */
    constructor() {
        const _this = this;
        
        new Global.Rem();
        
        _this.create();
        _this.init();
    }
    
    /**
     * 创建
     * @return {void}
     */
    private create(): void {
        const _this = this;
        
        Global.Dom.innerHTML = _this.template.base;
    }
    
    /**
     * 初始化
     * @return {void}
     */
    private init(): void {
        const _this = this;
        
        _this.isInit = true;
        
    }
}

