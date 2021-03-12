import Global from '../../constant/global';

declare global {
    interface Window {
        platform: any; // 旅法师营地App平台对接SDK
        setParametersByApp: Function; // 传递参数
        appGetShareInfo: Function; // 获取分享参数
    }
}

export default class Platform {
    public static data: any = { // 数据
        token: '',
        preid: '',
        version: '',
        platform: '',
        traditional: false,
        share: ''
    };
    
    public static updateDataCB: Function | null = null; // 更新数据回调
    public static shareCB: Function | null = null; // 分享回调
    
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
        Platform.data.token = token;
        Platform.data.preid = preid;
        Platform.data.version = version;
        Platform.data.platform = platform;
        Platform.data.traditional = (useTraditional === 'yes') || false;
        
        Platform.updateDataCB && Platform.updateDataCB();
    }
    
    /**
     * 分享
     * @return {void}
     */
    public static onShare(): string {
        const share = {
            title: '老哥一起来，让营地添点绿！',
            content: '旅法师营地2021年度爬树比赛，现在开始！',
            image: 'https://image.gaeamobile.net/image/20210305/114814/share.jpg',
            url: Platform.data.share
        };
        
        Platform.shareCB && Platform.shareCB();
        
        return Global.Crypto.encryptBase64(share);
    }
}

window.platform = Platform;
window.setParametersByApp = Platform.updateData;
window.appGetShareInfo = Platform.onShare;
