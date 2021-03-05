import Global from '../../constant/global';
import _Stage from '../../interface/stage';
import Platform from './platform';

import '../../../resource/css/PlantTree/public.less';
import '../../../resource/css/PlantTree/share.less';

/**
 * 分享页
 */
export default class Share implements _Stage {
    private readonly template: any = { // 模板对象
        main: `<div id="box_tree" class="box_tree">
                <div class="tree"></div>
            </div>
            <div id="box_user" class="box_user"><i></i></div>
            <div id="button_help" class="button button_help"></div>
            <div id="button_index" class="button button_index"></div>`,
    };
    private readonly switchList: any = { // 开关列表
        authorization: true
    };
    private readonly setTimeList: any = { // 定时器列表
    };
    private server: any = { // 服务器
        domain: 'http://yd-active.gaeamobile-inc.net',
        id: 'arbor_day_2021',
        key: '8ed81f4eed31633b1ab1dd67a0234188',
        appId: 'wxa54a0fb1c7856283'
    };
    private user: any = { // 用户信息
        // code: Global.FN.url.getParam('code') || Global.FN.cookie.get('yd_code') || '',
        code: '081Eik100xMZiL1pu4400NqJx23Eik1p',
        id: '',
    };
    private share: any = { // 分享
        id: Global.FN.url.getParam('uid')
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
        
        if (_this.user.code === '') {
            Global.Window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize' +
                '?appid=' + _this.server.appId +
                '&redirect_uri=' + encodeURIComponent(Global.Window.location.href) +
                '&response_type=code' +
                '&scope=snsapi_userinfo' +
                '&state=yd' +
                '#wechat_redirect';
        } else {
            Global.FN.cookie.set('yd_code', _this.user.code);
            
            Global.Dom.innerHTML = _this.template.main;
            
            _this.init();
        }
    }
    
    /**
     * 初始化
     * @return {void}
     */
    public init(): void {
        const _this = this;
        
        _this.authorization();
    }
    
    /**
     * 更新
     * @return {void}
     */
    public update(): void {
        const _this = this;
    }
    
    /**
     * 微信授权
     * @return {void}
     */
    private authorization(): void {
        const _this = this;
        
        if (!_this.switchList.authorization) return;
        _this.switchList.authorization = false;
        
        _this.ajax(
            '/tree/wechat-auth',
            {
                code: _this.user.code
            },
            (result: any) => {
                const data = result.data;
                
                console.log(result);
                
                _this.switchList.authorization = true;
                
                if (result.retCode !== 0) {
                    alert(result.retMsg);
                    return;
                }
                
                _this.user.id = data.openid;
            },
            (e: Event) => {
                _this.switchList.authorization = true;
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
        const _this = this,
            timestamp = new Date().valueOf(),
            encrypt = {
                timestamp,
                key: _this.server.key
            },
            encryptData = Object.assign(Global.FN.unlinkObject(data), encrypt);
        
        let param = '';
        
        for (const item in encryptData) param += (param === '' ? '' : '&') + item + '=' + encryptData[item];
        
        Global.$.ajax({
            url: _this.server.domain + url,
            data: Object.assign(data, {
                sign: Global.CryptoJS.MD5(param).toString(),
                timestamp
            }),
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
