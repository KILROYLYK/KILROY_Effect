import { W, D } from '../../../_Base/javascript/window';
import Global from './Global';

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
     * 开起WebGL2
     * @return {void}
     */
    public static openWebGL2(): void {
        // 待实现
    }
    
    /**
     * 自动刷新游戏
     * @param {function} callback 回调
     * @return {void}
     */
    public static refreshGame(callback) {
        const _this = this;
        
        if (!callback) return;
        
        callback();
        requestAnimationFrame(() => {
            _this.refreshGame(callback);
        });
    }
    
    /**
     * 监听屏幕变化
     * @param {function} callback 回调
     * @param {number} time 间隔时间
     * @return {void}
     */
    public static resizeWindow(callback: Function, time: number = 300) {
        const _this = this;
        
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
     * @return {void}
     */
    public static resizeDom(): void {
        const _this = this;
        Global.Width = Global.Window.innerWidth;
        Global.Height = Global.Window.innerHeight;
    }
    
    /**
     * 监听屏幕变化并更新
     * @param {function} callback 回调
     * @return {void}
     */
    public static resizeAuto(callback?: Function): void {
        const _this = this;
        _this.resizeWindow(() => {
            _this.resizeDom();
            callback && callback();
        });
    }
}
