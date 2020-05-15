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
    public static getGameDom(domID: string): HTMLElement {
        const _this = this,
            body = D.getElementsByTagName('body')[0],
            lastChild = body.lastChild;
        
        let dom = D.getElementById(domID);
        
        if (!dom) { // 不存在则新建
            dom = D.createElement('div');
            dom.id = domID;
            dom.setAttribute('data-name', 'GameContainer');
            lastChild ? body.insertBefore(dom, lastChild) : body.append(dom);
        }
        
        return dom;
    }
    
    /**
     * 更新游戏尺寸
     * @return {void}
     */
    public static resizeGame(): void {
        const _this = this;
        Global.Width = Global.Window.innerWidth;
        Global.Height = Global.Window.innerHeight;
    }
    
    /**
     * 获取游戏宽高比
     * @return {number} 宽高比
     */
    public static getGameAspect(): number {
        const _this = this;
        return Global.Width / Global.Height;
    }
    
    /**
     * 隐藏游戏鼠标
     * @return {void}
     */
    public static hideGameCursor(): void {
        const _this = this;
        Global.GameDom.style.cursor = 'none'; // 隐藏鼠标
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
            _this.resizeGame();
            callback && callback();
        });
    }
    
    /**
     * 缓冲效果
     * @param {object} position 当前位置
     * @param {object} targetP 目标位置
     * @param {number} ease 缓冲系数
     * @return {void}
     */
    public static ease(position: object, targetP: object, ease: number): void {
        const _this = this;
        position.x += (targetP.x - position.x) / ease;
        position.y += (targetP.y - position.y) / ease;
        position.z += (targetP.z - position.z) / ease;
    }
}
