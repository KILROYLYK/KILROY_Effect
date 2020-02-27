import { W, D } from '../../../_Base/javascript/window';
import Global from "./Global"; // 浏览器对象

/**
 * Function
 */
export default class Function {
    private static setTime: object = { // 定时器
        resize: null
    };
    
    /**
     * 获取或创建游戏节点
     * @param {string} domID 节点ID
     * @return {D} 游戏节点
     */
    public static getGameDom(domID: string): D {
        let dom = D.getElementById(domID);
        
        if (!dom) { // 不存在则新建
            dom = D.createElement('div');
            dom.id = domID;
            dom.setAttribute('data-name', 'GameContainer');
            D.getElementsByTagName('body')[0].appendChild(dom);
        }
        
        return dom;
    }
    
    /**
     * 监听屏幕变化
     * @param {function} callback 回调
     * @param {number} time 间隔时间
     * @return {void}
     */
    public static resizeWindow(callback: Function, time: number = 300) {
        const _this = this;
        let resizeSetTime = null;
        
        //监听屏幕
        D.addEventListener('DOMContentLoaded', callback, false);
        W.addEventListener('onorientationchange' in W ? 'orientationchange' : 'resize', () => {
            clearTimeout(_this.setTime.resize);
            _this.setTime.resize = setTimeout(callback, time);
        }, false);
        W.addEventListener('pageshow', (e) => {
            if (!e.persisted) return;
            clearTimeout(_this.setTime.resize);
            _this.setTime.resize = setTimeout(callback, time);
        }, false);
    }
    
    /**
     * 监听屏幕变化并更新全局尺寸
     * @param {function} callback 回调
     * @return {void}
     */
    public static resizeGame(callback?: Function): void {
        Function.resizeWindow(() => {
            Global.Width = Global.Window.innerWidth;
            Global.Height = Global.Window.innerHeight;
            callback && callback();
        });
    }
}
