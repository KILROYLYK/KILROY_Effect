import Global from '../../constant/global';
import _Stage from '../../interface/stage';
import Platform from './platform';

import '../../../resource/css/PlantTree/public.less';
import '../../../resource/css/PlantTree/share.less';

/**
 * 分享页
 */
export default class Share implements _Stage {
    private isInit: boolean = false; // 是否初始化
    private readonly template: any = { // 模板对象
        main: `<div id="box_tree" class="box_tree">
                <div class="tree"></div>
            </div>
            <div id="box_user" class="box_user"><i></i></div>
            <div id="button_help" class="button button_help"></div>
            <div id="button_index" class="button button_index"></div>
            <div id="box_water" class="box_water">
                <i></i><i></i><i></i><i></i><i></i>
                <i></i><i></i><i></i><i></i><i></i>
            </div>`,
    };
    private readonly switchList: any = { // 开关列表
    };
    private readonly setTimeList: any = { // 定时器列表
    };
    private server: any = { // 服务器
        domain: 'http://yd-active.gaeamobile-inc.net',
        id: 'arbor_day_2021',
        key: '8ed81f4eed31633b1ab1dd67a0234188'
    };
    private user: any = { // 用户信息
        id: Global.FN.url.getParam('user_id'),
    };
    
    /**
     * 构造函数
     * @constructor Stage
     */
    constructor() {
        const _this = this;
        
        Global.Adaptation.openRem();
        
        _this.create();
    }
    
    /**
     * 创建
     * @return {void}
     */
    public create(): void {
        const _this = this;
        
        Global.Dom.innerHTML = _this.template.main;
        
        _this.init();
    }
    
    /**
     * 初始化
     * @return {void}
     */
    public init(): void {
        const _this = this;
        
        _this.isInit = true;
    }
    
    /**
     * 更新
     * @return {void}
     */
    public update(): void {
        const _this = this;
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
        const _this = this,
            timestamp = new Date().valueOf();
        
        let param = '';
        
        data.timestamp = timestamp;
        data.key = _this.server.key;
        
        for (const item in data) param += (param === '' ? '' : '&') + item + '=' + data[item];
        
        Global.$.ajax({
            url: _this.server.domain + url,
            data: {
                sign: Global.CryptoJS.MD5(param).toString(),
                timestamp
            },
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
