/**
 * 粒子控制器
 */
export default class Particle {
    public readonly config: object = { // 配置
        color: [
            '#bf1337',
            '#f3f1f3',
            '#084c8d',
            '#f2d108',
            '#efd282'
        ],
        total: 200, // 粒子总数
        radiusMax: 3, // 最大半径
        radiusMin: 1, // 最小半径
        flag: true, // 开关
        mouseP: { // 鼠标位置
            x: -10000,
            y: -10000,
        }
    };
    private dom: HTMLElement = null; // 父元素
    private canvas: HTMLCanvasElement = null; // Canvas
    private context: CanvasRenderingContext2D = null; // Context
    
    /**
     * 构造函数
     * @constructor Particle
     * @param {HTMLElement} dom 父元素
     */
    constructor(dom: HTMLElement) {
        const _this = this;
        
        _this.dom = dom;
        
        _this.create();
        _this.init();
    }
    
    /**
     * 创建
     * @return {any} 实例
     */
    private create(): void {
        const _this = this;
        
        _this.canvas = document.createElement('canvas');
        _this.context = _this.canvas.getContext('2d');
        _this.dom.appendChild(_this.canvas);
    }
    
    /**
     * 初始化
     * @return {void}
     */
    private init(): void {
        const _this = this;
        
        _this.dom.onmousemove = (e: MouseEvent) => { // 鼠标移动
            _this.config.mouseP.x = e.clientX;
            _this.config.mouseP.y = e.clientY;
        };
        
        _this.dom.onmouseout = (e: MouseEvent) => { // 鼠标移出
            _this.config.mouseP.x = -10000;
            _this.config.mouseP.y = -10000;
        };
    }
    
    /**
     * 更新
     * @return {void}
     */
    public update(): void {
        const _this = this;
        
        _this.canvas.width = _this.dom.clientWidth;
        _this.canvas.height = _this.dom.clientHeight;
        
    }
    
    /**
     * 销毁
     * @return {void}
     */
    public destroy(): void {
        const _this = this;
        
        _this.dom.removeChild(_this.canvas);
        
        _this.context = null;
        _this.canvas = null;
    }
    
    /**
     * 清理画布
     * @return {void}
     */
    private clearCanvas(): void {
        const _this = this;
        if (!_this.canvas || !_this.context) return;
        
        _this.context.clearRect(
            0, 0,
            _this.canvas.width,
            _this.canvas.height
        );
    }
    
    /**
     * 两点之间距离
     * @param {Object} position 双坐标对象
     * @return {number} 距离
     */
    private distance(position): number {
        return Math.sqrt(Math.pow((position.x2 - position.x1), 2) + Math.pow((position.y2 - position.y1), 2));
    }
}
