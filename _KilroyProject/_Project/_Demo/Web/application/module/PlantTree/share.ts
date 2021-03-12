import Global from '../../constant/global';
import _Stage from '../../interface/stage';
import AnalysysAgent from '../../plugin/AnalysysAgent';

import '../../../resource/css/PlantTree/public.less';
import '../../../resource/css/PlantTree/share.less';

declare global {
    interface Window {
        wx: any; // 微信分享SDK
    }
}

/**
 * 分享页
 * https://activity.iyingdi.com/planttree/share/
 */
export default class Share implements _Stage {
    private readonly isCallApp: boolean = true;
    private readonly template: any = { // 模板对象
        main: `<div id="box_tree" class="box_tree">
                <div class="tree">
                <div class="box_avatar"><i></i></div>
                <div class="box_avatar"><i></i></div>
                <div class="box_avatar"><i></i></div>
                <div class="box_avatar"><i></i></div>
            </div>
            <div id="box_user" class="box_user"><i></i></div>
            <div id="button_help" class="button button_help"></div>
            <div id="button_app" class="button button_app"></div>
            ${ this.isCallApp // 唤起App
            ? `<div class="box_call_app">
                <wx-open-launch-app
                    id="button_call_app"
                    appid="wx49314fe3c5b5402b"
                    extinfo="wanxiu://innerlink?type=miniprogram&url=${ encodeURIComponent('https://activity.iyingdi.com/planttree/home/index.html') }">
                    <!-- 微信内置窗口 Start -->
                    <template>
                        <style>
                        div {
                          padding: 0;
                        }
                        
                        .button {
                          position: relative;
                          width: 100px;
                          height: 100px;
                          padding: 0;
                          background-color: transparent;
                          border: none;
                        }
                        </style>
                        <button class="button"></button>
                    </template>
                    <!-- 微信内置窗口 End -->
                </wx-open-launch-app>
                </div>`
            : ``
        }`,
        popupToast: `<div class="popup_content"></div>`,
    };
    private readonly switchList: any = { // 开关列表
        info: true,
        help: true,
        authorize: true,
        share: true
    };
    private readonly setTimeList: any = { // 定时器列表
        toast: null // 提示弹窗
    };
    private readonly popupList: any = { // 弹窗对象
        toast: null // 提示弹窗
    };
    private serverData: any = { // 服务器数据
        domain: 'https://activity-api.iyingdi.com',
        // domain: 'https://activity-api-test.iyingdi.com',
        id: 'arbor_day_2021',
        key: '8ed81f4eed31633b1ab1dd67a0234188',
        appId: 'wxa54a0fb1c7856283'
    };
    private userData: any = { // 用户数据
        code: Global.FN.url.getParam('code') || '',
        id: Global.FN.cookie.get('wx_id') || '',
        share: Global.FN.url.getParam('uid') || '',
        key: Global.FN.url.getParam('key') || '',
        name: '',
        photo: ''
    };
    private shareData: any = { // 分享数据
        appId: '',
        timestamp: '',
        nonceStr: '',
        signature: '',
        title: '老哥一起来，让营地添点绿！',
        description: '旅法师营地2021年度爬树比赛，现在开始！',
        img: 'https://image.gaeamobile.net/image/20210305/114814/share.jpg',
        url: Global.FN.url.delParam([ 'code' ])
    };
    
    /**
     * 构造函数
     * @constructor Share
     */
    constructor() {
        const _this = this;
        
        _this.create();
        
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
        
        if (_this.userData.share === '' || _this.userData.key === '') {
            _this.popupList.toast.open('参数错误，链接失效');
            return;
        }
        
        if (_this.userData.code === '' && _this.userData.id === '') { // 未登录
            _this.goAuthorize();
        } else { // 已登录 | 已授权
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
        
        if (_this.userData.id) {
            _this.getInfo();
        } else if (_this.userData.code) {
            _this.authorize();
        }
        
        _this.share();
    }
    
    /**
     * 更新用户信息
     * @return {void}
     */
    private updateUserInfo(): void {
        const _this = this,
            $buttonHelp = Global.$('#button_help'),
            $buttonApp = Global.$('#button_app'),
            $buttonCallApp = Global.$('#button_call_app'),
            $boxCallApp = Global.$('.box_call_app');
        
        Global.$('#box_user').children('i').css('background-image', 'url(' + _this.userData.photo + ')');
        $buttonHelp.click(() => {
            _this.addHelp();
        });
        
        if (_this.isCallApp) { // 唤起App
            $buttonCallApp.bind('launch', (e: any) => {
                console.log('success');
                
                AnalysysAgent.track('worldtree_share_app', {
                    user_id: String(_this.userData.id)
                });
                
                // 安卓App不支持调起，直接跳转至商城
                if (Global.FN.isPSB.system() !== 'iOS') _this.goDownload();
            });
            $buttonCallApp.bind('error', (e: any) => {
                console.log('fail', e.detail);
                
                AnalysysAgent.track('worldtree_share_app', {
                    user_id: String(_this.userData.id)
                });
                
                _this.goDownload();
            });
            Global.FN.resize(() => {
                const font = parseFloat(Global.$('html').css('font-size')) / 100,
                    width = 248 / 100 * font,
                    height = 101 / 100 * font;
                
                $boxCallApp.css('transform', 'scale(' + width + ',' + height + ')');
            });
        } else { // 去往商城
            $buttonApp.click(() => {
                AnalysysAgent.track('worldtree_share_app', {
                    user_id: String(_this.userData.id)
                });
                
                _this.goDownload();
            });
        }
        
        $buttonHelp.show()
    }
    
    /**
     * 去下载
     * @return {void}
     */
    private goDownload(): void {
        const _this = this;
        
        let href = '';
        
        if (Global.FN.isPSB.system() === 'iOS') {
            href = 'https://itunes.apple.com/app/id716483205';
        } else {
            href = 'https://www.iyingdi.com/spread/index.html';
        }
        
        Global.Window.location.href = href;
    }
    
    /**
     * 去授权
     * @return {void}
     */
    private goAuthorize(): void {
        const _this = this,
            url = Global.FN.url.delParam([ 'code' ]);
        
        Global.Window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize' +
            '?appid=' + _this.serverData.appId +
            '&redirect_uri=' + encodeURIComponent(url) +
            '&response_type=code' +
            '&scope=snsapi_userinfo' +
            '&state=yd' +
            '#wechat_redirect';
    }
    
    /**
     * 获取分享人信息
     * @return {void}
     */
    private getInfo(): void {
        const _this = this;
        
        if (!_this.switchList.info) return;
        _this.switchList.info = false;
        
        _this.ajax(
            '/tree/user',
            {
                uid: _this.userData.share,
                key: _this.userData.key,
                source: 'wechat',
                form_user_id: _this.userData.id,
                timestamp: Global.FN.getTimestamp()
            },
            (result: any) => {
                const data = result.data;
                
                _this.switchList.info = true;
                
                if (result.retCode !== 0) {
                    _this.popupList.toast.open(result.retMsg);
                    return;
                }
                
                _this.userData.name = data.nick_name;
                _this.userData.photo = data.photo;
                
                _this.updateUserInfo();
            },
            (e: Event) => {
                _this.switchList.info = true;
            }
        );
    }
    
    /**
     * 助力
     * @return {void}
     */
    private addHelp(): void {
        const _this = this;
        
        if (!_this.switchList.help) return;
        _this.switchList.help = false;
        
        _this.ajax(
            '/tree/help',
            {
                uid: _this.userData.share,
                key: _this.userData.key,
                source: 'wechat',
                form_user_id: _this.userData.id,
                timestamp: Global.FN.getTimestamp()
            },
            (result: any) => {
                const data = result.data;
                
                _this.switchList.help = true;
                
                if (result.retCode !== 0) {
                    if (result.retCode === 810004 ||
                        result.retCode === 810005) { // 达到助力上限 | 已助力
                        Global.$('#button_help').addClass('gray');
                        Global.$('#button_app').addClass('text');
                    }
                    
                    _this.popupList.toast.open(result.retMsg);
                    return;
                }
                
                Global.$('#button_help').addClass('gray');
                Global.$('#button_app').addClass('text');
                
                AnalysysAgent.track('worldtree_share_help', {
                    user_id: String(_this.userData.id)
                });
                
                _this.popupList.toast.open('助力成功');
            },
            (e: Event) => {
                _this.switchList.help = true;
            }
        );
    }
    
    /**
     * 授权
     * @return {void}
     */
    private authorize(): void {
        const _this = this;
        
        if (!_this.switchList.authorize) return;
        _this.switchList.authorize = false;
        
        _this.ajax(
            '/tree/wechat-auth',
            {
                code: _this.userData.code,
                timestamp: Global.FN.getTimestamp()
            },
            (result: any) => {
                const data = result.data;
                
                _this.switchList.authorize = true;
                
                if (result.retCode !== 0) {
                    _this.popupList.toast.open(result.retMsg);
                    return;
                }
                
                _this.userData.id = data.openid;
                Global.FN.cookie.set('wx_id', data.openid);
                
                _this.getInfo();
            },
            (e: Event) => {
                _this.switchList.authorize = true;
            }
        );
    }
    
    /**
     * 分享
     * @return {void}
     */
    private share(): void {
        const _this = this;
        
        if (!_this.switchList.share) return;
        _this.switchList.share = false;
        
        _this.ajax(
            '/tree/wechat-share',
            {
                url: Global.Window.location.href,
                timestamp: Global.FN.getTimestamp()
            },
            (result: any) => {
                const data = Global.$.parseJSON(result.data);
                
                _this.switchList.share = true;
                
                if (result.retCode !== 0) {
                    _this.popupList.toast.open(result.retMsg);
                    return;
                }
                
                _this.shareData.appId = data.appId;
                _this.shareData.timestamp = data.timestamp;
                _this.shareData.nonceStr = data.nonceStr;
                _this.shareData.signature = data.signature;
                
                Global.$.getScript('https://res.wx.qq.com/open/js/jweixin-1.6.0.js', () => {
                    const WX = window.wx || null;
                    
                    if (!WX) return;
                    
                    WX.config({
                        debug: false,
                        appId: _this.shareData.appId,
                        timestamp: _this.shareData.timestamp,
                        nonceStr: _this.shareData.nonceStr,
                        signature: _this.shareData.signature,
                        jsApiList: [ 'checkJsApi', 'onMenuShareAppMessage', 'onMenuShareTimeline' ],
                        openTagList: [ 'wx-open-launch-app' ]
                    });
                    
                    WX.ready(() => {
                        WX.checkJsApi({
                            jsApiList: [ 'wx-open-launch-app' ],
                            success: (res: any) => {
                                console.log('微信开放接口可用');
                            },
                            fail: (err: any) => {
                                console.log('微信开放接口不可用');
                            }
                        })
                        
                        // 分享给好友
                        WX.onMenuShareAppMessage({
                            title: _this.shareData.title,
                            desc: _this.shareData.description,
                            link: _this.shareData.url,
                            imgUrl: _this.shareData.img,
                            type: 'link',
                            dataUrl: '',
                            success: (res: any) => {
                            },
                            cancel: (res: any) => {
                            }
                        });
                        
                        // 分享至朋友圈
                        WX.onMenuShareTimeline({
                            title: _this.shareData.title,
                            link: _this.shareData.url,
                            imgUrl: _this.shareData.img,
                            trigger: (res: any) => {
                            },
                            success: (res: any) => {
                            },
                            cancel: (res: any) => {
                            },
                            fail: (res: any) => {
                            }
                        });
                        
                        // 报错
                        WX.error((res: any) => {
                            console.log(res);
                        });
                    });
                });
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
                xhr.setRequestHeader('Activity-Id', _this.serverData.id);
            },
            success: (result: any) => {
                if (result.retCode === 810003 ||
                    result.retCode === 900001 ||
                    result.retCode === 900002 ||
                    result.retCode === 900003) { // 账号认证失败
                    Global.FN.cookie.del('wx_id');
                    _this.goAuthorize();
                    return;
                }
                
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
