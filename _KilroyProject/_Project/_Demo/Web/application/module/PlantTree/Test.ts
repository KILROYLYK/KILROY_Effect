import Global from '../../constant/global';
import _Stage from '../../interface/stage';

import '../../../resource/css/PlantTree/public.less';
import '../../../resource/css/PlantTree/test.less';

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
    private readonly isCallApp: boolean = false;
    private readonly template: any = { // 模板对象
        main: `
            <div class="box_call_app">
            <wx-open-launch-app
                id="button_app"
                appid="wx49314fe3c5b5402b"
                extinfo="innerlink?type=miniprogram&url=${ encodeURIComponent('https://activity-test.iyingdi.com/planttree/home/') }">
                <!-- 微信内置窗口 Start -->
                <template>
                    <style>
                    div {
                      padding: 0;
                    }
                    
                    .button_app {
                      position: relative;
                      width: 100px;
                      height: 100px;
                      padding: 0;
                      background-color: white;
                      border: none;
                    }
                    </style>
                    <button class="button_app"></button>
                </template>
                <!-- 微信内置窗口 End -->
            </wx-open-launch-app>
            </div>`,
        popupToast: `<div class="popup_content"></div>`,
    };
    private readonly switchList: any = { // 开关列表
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
     * @constructor Stage
     */
    constructor() {
        const _this = this;
        
        new Global.Console({ // 日志
            maxLogNumber: 1000,
            theme: 'dark'
        });
        
        _this.create();
    }
    
    /**
     * 创建
     * @return {void}
     */
    public create(): void {
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
        
        Global.Dom.innerHTML = _this.template.main;
        
        _this.init();
    }
    
    /**
     * 初始化
     * @return {void}
     */
    public init(): void {
        const _this = this,
            button = document.getElementById('button_app');
        
        if (button) {
            button.addEventListener('launch', (e: any) => {
                console.log('success');
            });
            button.addEventListener('error', (e: any) => {
                console.log('fail', e.detail);
            });
        }
        
        _this.share();
    }
    
    /**
     * 更新
     * @return {void}
     */
    public update(): void {
        const _this = this;
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
