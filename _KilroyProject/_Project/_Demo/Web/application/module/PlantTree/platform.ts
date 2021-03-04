// // @ts-nocheck*
// import CryptoJS from '/usr/local/lib/node_modules/crypto-js';
//
// export default class Platform {
//     /**
//      * App调用显示
//      * @return {void}
//      */
//     public static onShow(): void {
//         console.log("App触发-onShow");
//     }
//
//     /**
//      * App调用隐藏
//      * @return {void}
//      */
//     public static onHide(): void {
//         console.log("App触发-onHide");
//     }
//
//     public static  shareAppMessage(title: string, content: string, image: string, url: string) {
//         // let a = document.getElementById("btnShare");
//         var params = { title: title, content: content, image: image, url: url };
//         let href = "wanxiu://innerlink?type=webshare&parameters=" + GameConst.appShareParamsEncrypt(params);
//         // a.setAttribute('href', href);
//
//         var a = document.createElement('a');
//         a.setAttribute('href', href);
//         // a.setAttribute('target', '_blank'); // 添加这个属性后安卓监触发不了内链监听
//         document.body.appendChild(a);
//         // a.setAttribute('style', 'display:block;height: 100%;width:100%;position: absolute;z-index: 100;');
//         // window.open(href);
//
//         // var a = document.createElement('a');
//         // a.setAttribute('target', '_blank');
//         // document.body.appendChild(a);
//         a.click();
//
//         GameConst.delay(100).then(() => {
//             document.body.removeChild(a);
//         });
//     }
//
//     /**
//      * 参数加密
//      * @param {string} content 内容
//      * @return string
//      */
//     public static encryptParam(content: string): string {
//         const encodedWord = CryptoJS.enc.Utf8.parse(content),
//             base64Str = CryptoJS.enc.Base64.stringify(encodedWord);
//         return encodeURIComponent(base64Str);
//     }
// }
//
// window.platform = Platform;
// window.setParametersByApp = (token: string, preid: string, version: string, platform: string, userId: string, useTraditional: string, extJson: string) => {
//     try {
//         // ext_json: ext_json ? GameConst.encodeAppParam(ext_json) : {}
//         GameConst.token = token || "";
//         GameConst.preid = preid || "";
//         GameConst.version = version || "";
//         GameConst.platform = platform || "";
//         GameConst.traditional = useTraditional === "yes" ? "true" : "false" || "";
//     } catch (error) {
//     }
// }
// window.appGetShareInfo = () => { // 分享配置
//     return Platform.encryptParam({
//         title: '旅法师营地，懂你的人在这里',
//         content: '一个有温度的玩家社区，国内超具影响力的卡牌和桌游玩家聚集地，快来加入营地的大家庭吧~',
//         image: '',
//         url: ''
//     }.toString());
// };
