// @ts-nocheck
import CryptoJS from '/usr/local/lib/node_modules/crypto-js';

export default class Platform {
    public static data: any = { // 数据
        token: '',
        preid: '',
        version: '',
        platform: '',
        traditional: false,
        share: ''
    };
    
    /**
     * App调用显示
     * @return {void}
     */
    public static onShow(): void {
        console.log("App触发-onShow");
    }
    
    /**
     * App调用隐藏
     * @return {void}
     */
    public static onHide(): void {
        console.log("App触发-onHide");
    }
    
    /**
     * 更新数据
     * @return {void}
     */
    public static updateData(token: string = '', preid: string = '', version: string = '', platform: string = '', userId: string = '', useTraditional: string = '', extJson: string = '') {
        const _this = this;
        
        try {
            _this.data.token = token;
            _this.data.preid = preid;
            _this.data.version = version;
            _this.data.platform = platform;
            _this.data.traditional = (useTraditional === 'yes') || false;
        } catch (error) {
        }
    }
    
    /**
     * 分享
     * @return {void}
     */
    public static onShare(): string {
        const _this = this;
        
        return Platform.encryptParam({
            title: '只要帮我浇一下树，绿的就是别人',
            content: '一个有温度的玩家社区，国内超具影响力的卡牌和桌游玩家聚集地，快来加入营地的大家庭吧~',
            image: 'https://image.gaeamobile.net/image/20210305/114814/share.jpg',
            url: _this.data.share
        }.toString());
    }
    
    /**
     * 参数加密
     * @param {string} content 内容
     * @return string
     */
    public static encryptParam(content: string): string {
        const encodedWord = CryptoJS.enc.Utf8.parse(content),
            base64Str = CryptoJS.enc.Base64.stringify(encodedWord);
        return encodeURIComponent(base64Str);
    }
}

window.platform = Platform;
window.setParametersByApp = Platform.updateData;
window.appGetShareInfo = Platform.onShare;
