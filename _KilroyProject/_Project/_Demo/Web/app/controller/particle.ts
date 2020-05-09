/**
 * 坐标
 */
interface Position {
    x: number, // X轴
    y: number // Y轴
}

/**
 * 点
 */
interface Point {
    position: Position,
    target: Position,
    vel: Position
    color: string, // 颜色
    radius: number, // 半径
    direction: number // 距离
}

/**
 * 粒子控制器
 */
export default class Particle {
    public readonly config: object = { // 配置
        size: 200,
        color: [
            '#bf1337',
            '#f3f1f3',
            '#084c8d',
            '#ffed00',
            '#8311e7'
        ] as string[],
        total: 300, // 粒子总数
        density: 3, // 密度
        radiusMax: 5, // 最大半径
        radiusMin: 1, // 最小半径
        first: true, // 第一次执行
        mouseP: { // 鼠标位置
            x: -10000,
            y: -10000,
        } as Position,
        mouseR: 50, // 鼠标半径
        mouseS: 100, // 鼠标推动速度（越大速度越慢）
        restoreS: 5, // 恢复速度
        list: [] as Point[] // 点列表
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
        _this.canvas.width = _this.dom.clientWidth;
        _this.canvas.height = _this.dom.clientHeight;
        
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
            _this.config.mouseP.x = -1000;
            _this.config.mouseP.y = -1000;
        };
    }
    
    /**
     * 更新
     * @param {boolean} isResize 是否调整大小
     * @return {void}
     */
    public update(isResize: boolean = false): void {
        const _this = this;
        
        _this.clearCanvas();
        
        _this.config.list.forEach((v, i, a) => {
            _this.updatePoint(v);
            _this.drawPoint(v);
        });
        
        if (isResize) {
            _this.canvas.width = _this.dom.clientWidth;
            _this.canvas.height = _this.dom.clientHeight;
        }
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
     * 写入文案
     * @param {string} text 文案
     * @return {void}
     */
    public writeText(text: string): void {
        const _this = this;
        
        _this.config.list.length = 0;
        
        _this.context.fillStyle = '#ffffff';
        _this.context.font = `${ _this.config.size }px Times`;
        _this.context.fillText(
            text,
            _this.canvas.width / 2 - _this.context.measureText(text).width / 2,
            _this.canvas.height / 2 + _this.config.size / 4,
        );
        const data = _this.context.getImageData(0, 0, _this.canvas.width, _this.canvas.height).data;
        
        for (let i = 0; i < data.length; i += _this.config.density) {
            let temp = {
                x: (i / 4) % _this.canvas.width,
                y: ~~((i / 4) / _this.canvas.width)
            };
            
            if (data[i] !== 0 && ~~(Math.random() * 5) === 1) {
                if (data[i + 4] !== 255 ||
                    data[i - 4] !== 255 ||
                    data[i + _this.canvas.width * 4] !== 255 ||
                    data[i - _this.canvas.width * 4] !== 255) {
                    
                    const sign = [-1, 1],
                        color = _this.config.color[~~(Math.random() * _this.config.color.length)],
                        radius = _this.config.radiusMax - Math.random() * _this.config.radiusMin;
                    
                    temp = {
                        x: Math.random() * _this.canvas.width,
                        y: Math.random() * _this.canvas.height
                    };
                    if (_this.config.first) {
                        temp = {
                            x: (i / 4) % _this.canvas.width,
                            y: ~~((i / 4) / _this.canvas.width)
                        };
                    }
                    
                    _this.config.list.push({
                        position: temp,
                        target: {
                            x: (i / 4) % _this.canvas.width,
                            y: ~~((i / 4) / _this.canvas.width)
                        },
                        vel: {
                            x: 0,
                            y: 0
                        },
                        color,
                        radius,
                        direction: sign[~~(Math.random() * 2)] * Math.random() / 10
                    });
                }
            }
        }
        
        _this.config.first = false;
    }
    
    /**
     * 两点之间距离
     * @param {Object} position 双坐标对象
     * @return {number} 距离
     */
    private distance(position): number {
        return Math.sqrt(
            Math.pow((position.x2 - position.x1), 2) +
            Math.pow((position.y2 - position.y1), 2)
        );
    }
    
    /**
     * 绘制点
     * @param {Point} point 点
     * @return {void}
     */
    private drawPoint(point: Point): void {
        const _this = this;
        
        _this.context.beginPath();
        _this.context.fillStyle = point.color;
        _this.context.arc(
            point.position.x,
            point.position.y,
            point.radius,
            0,
            Math.PI * 2);
        _this.context.fill();
    }
    
    /**
     * 更新点
     * @param {Point} point 点
     * @return {void}
     */
    private updatePoint(point: Point): void {
        const _this = this,
            mouseX = _this.config.mouseP.x,
            mouseY = _this.config.mouseP.y,
            distance = _this.distance({
                x1: point.position.x,
                y1: point.position.y,
                x2: mouseX,
                y2: mouseY
            });
        
        point.radius += point.direction;
        
        point.vel.x = (point.position.x - point.target.x) / _this.config.total;
        point.vel.y = (point.position.y - point.target.y) / _this.config.total;
        if (distance < _this.config.mouseR) {
            point.vel.x += point.vel.x - (point.position.x - mouseX) / _this.config.mouseS;
            point.vel.y += point.vel.y - (point.position.y - mouseY) / _this.config.mouseS;
        }
        
        (point.radius >= _this.config.radiusMax) && (point.direction *= -1);
        (point.radius <= 1) && (point.direction *= -1);
        
        point.position.x -= point.vel.x * _this.config.restoreS;
        point.position.y -= point.vel.y * _this.config.restoreS;
    }
}
