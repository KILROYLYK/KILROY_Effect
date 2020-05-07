import { D, Base } from '../../../../_Base/javascript/window';
import Global from './global';

/**
 * Function
 */
export default class Function {
    /**
     * 获取或创建游戏节点
     * @param {string} domID 节点ID
     * @return {Element} 游戏节点
     */
    public static getGameDom(domID: string): Element {
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
     * 监听屏幕变化并更新全局尺寸
     * @return {void}
     */
    public static resizeDom(): void {
        const _this = this;
        Global.Width = Global.Window.innerWidth;
        Global.Height = Global.Window.innerHeight;
    }
    
    /**
     * 自动刷新游戏
     * @param {function} callback 回调
     * @return {void}
     */
    public static autoUpdate(callback) {
        const _this = this;
        
        if (!callback) return;
        
        callback();
        requestAnimationFrame(() => {
            _this.autoUpdate(callback);
        });
    }
    
    /**
     * 监听屏幕变化并更新
     * @param {function} callback 回调
     * @return {void}
     */
    public static resizeUpdate(callback?: Function): void {
        const _this = this;
        Base.resize(() => {
            _this.resizeDom();
            callback && callback();
        });
    }
}
