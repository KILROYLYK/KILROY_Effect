import { D, FN } from '../../../../_Base/Asset/_Global/global';
import Global from './global';

interface Position { // 位置
    x: number,
    y: number
}

/**
 * 函数
 */
export default class GlobalFN {
    /**
     * 获取节点
     * @overview 获取节点，不存在则创建
     * @param {string} id 节点ID
     * @return {HTMLElement} 节点
     */
    public static getDom(id: string = 'app'): HTMLElement {
        const _this = this,
            body = D.getElementsByTagName('body')[0], // Body
            lastChild = body.lastChild; // Body的最后一个节点
        
        let dom = (D.getElementById(id) || null) as HTMLElement;
        
        if (!dom) { // 不存在则创建
            dom = D.createElement('div') as HTMLElement;
            dom.id = id;
            dom.setAttribute('data-name', 'App');
            lastChild ? body.insertBefore(dom, lastChild) : body.append(dom);
        }
        
        return dom;
    }
    
    /**
     * 获取画布
     * @overview 获取画布，不存在则创建
     * @param {string} id 节点ID
     * @return {HTMLElement} 节点
     */
    public static getCanvas(id: string = 'appCanvas'): HTMLCanvasElement {
        const _this = this,
            body = D.getElementsByTagName('body')[0], // Body
            lastChild = body.lastChild; // Body的最后一个节点
        
        let dom = (D.getElementById(id) || null) as HTMLCanvasElement;
        
        if (!dom) { // 不存在则创建
            dom = D.createElement('Canvas') as HTMLCanvasElement;
            dom.id = id;
            dom.setAttribute('data-name', 'AppCanvas');
            lastChild ? body.insertBefore(dom, lastChild) : body.append(dom);
        }
        
        return dom;
    }
    
    /**
     * 获取节点宽高比
     * @param {HTMLElement} dom 节点
     * @return {number} 宽高比
     */
    public static getDomAspect(dom?: HTMLElement): number {
        const _this = this;
        
        let aspect = Global.Width / Global.Height;
        
        dom && (aspect = dom.clientWidth / dom.clientHeight);
        
        return aspect;
    }
    
    /**
     * 获取中心位置
     * @param {HTMLElement} dom 节点
     * @return {Position} 中心位置
     */
    public static getDomCenter(dom?: HTMLElement): Position {
        const _this = this;
        
        let center = {
            x: Global.Width / 2,
            y: Global.Height / 2
        };
        
        dom && (center = {
            x: dom.clientWidth / 2,
            y: dom.clientHeight / 2
        });
        
        return center;
    }
    
    /**
     * 调整宽高
     * @return {void}
     */
    public static resizeDom(): void {
        const _this = this;
        Global.Width = Global.Dom.clientWidth;
        Global.Height = Global.Dom.clientHeight;
    }
    
    /**
     * 显示鼠标
     * @param {boolean} show 显示
     * @return {void}
     */
    public static showCursor(show: boolean = true): void {
        const _this = this;
        Global.Dom.style.cursor = show ? 'default' : 'none';
    }
    
    /**
     * 设置缓冲效果
     * @param {object} position 当前位置
     * @param {object} targetP 目标位置
     * @param {number} ease 缓冲系数
     * @return {void}
     */
    public static setEase(position: any, targetP: any, ease: number): void {
        const _this = this;
        position.x += (targetP.x - position.x) / ease;
        position.y += (targetP.y - position.y) / ease;
        position.z += (targetP.z - position.z) / ease;
    }
    
    /**
     * 更新帧
     * @param {function} callback 回调
     * @return {void}
     */
    public static updateFrame(callback: Function): void {
        const _this = this;
        
        if (!callback) return;
        
        callback();
        requestAnimationFrame(() => {
            _this.updateFrame(callback);
        });
    }
    
    /**
     * 屏幕调整时更新
     * @param {function} callback 回调
     * @return {void}
     */
    public static updateResize(callback: Function): void {
        const _this = this;
        
        if (!callback) return;
        
        FN.resize(() => {
            callback && callback();
        });
    }
    
    /**
     * 更新焦点位置
     * @param {boolean} isReset 是否重置
     * @return {void}
     */
    public static updateFocusPosition(isReset: boolean = true): void {
        const _this = this;
        
        // Mouse
        Global.Window.addEventListener('mousemove', (e: MouseEvent) => {
            Global.FocusP.x = e.clientX;
            Global.FocusP.y = e.clientY;
        }, false);
        
        // Touch
        Global.Window.addEventListener('touchstart', (e: TouchEvent) => {
            Global.FocusP.x = e.touches[0].clientX;
            Global.FocusP.y = e.touches[0].clientY;
        }, false);
        Global.Window.addEventListener('touchmove', (e: TouchEvent) => {
            Global.FocusP.x = e.touches[0].clientX;
            Global.FocusP.y = e.touches[0].clientY;
        }, false);
        
        if (isReset) {
            Global.Window.addEventListener('mouseout', (e: MouseEvent) => {
                const centerP = _this.getDomCenter();
                Global.FocusP.x = centerP.x;
                Global.FocusP.y = centerP.y;
            }, false);
            Global.Window.addEventListener('touchend', (e: TouchEvent) => {
                const centerP = _this.getDomCenter();
                Global.FocusP.x = centerP.x;
                Global.FocusP.y = centerP.y;
            }, false);
        }
    }
}
