/**
 * 坐标
 */
interface Position {
    x: number // X轴
    y: number // Y轴
}

/**
 * 点
 */
interface Point {
    show: boolean // 显示
    position: Position // 当前位置
    target: Position // 目标位置
    speed: Position // 速度
    color: number // 颜色
    opacity: number // 不透明度
    radius: number // 半径
    direction: number // 方向 1 | -1
}

/**
 * 粒子控制器
 */
export default class Particle {
    public readonly config: object = { // 配置
        size: 150,
        color: [
            '255,255,255',
            '151,19,55',
            '0,72,255',
            '136,0,255',
            '255,237,0'
        ] as string[],
        colorS: 0.05, // 颜色变化速度
        density: 3, // 密度（越大越稀疏）
        radiusMax: 3, // 最大半径
        radiusMin: 1, // 最小半径
        radiusS: 0.5, // 半径变化速度
        mouseP: { // 鼠标位置
            x: -1000,
            y: -1000,
        } as Position,
        mouseR: 50, // 鼠标半径
        mouseS: 100, // 鼠标推动速度（越大速度越慢）
        interval: 300, // 运动间隔
        restoreS: 10, // 恢复速度
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
        
        for (let i = 0, n = _this.config.list.length; i < n; i++) {
            const point = _this.config.list[i];
            _this.updatePoint(point);
            _this.drawPoint(point);
            if (!point.show && point.opacity) {
                const index = _this.config.list.indexOf(point);
                _this.config.list.splice(index, 1);
                i--;
                n--;
            }
        }
        
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
        const _this = this,
            cList = _this.config.list,
            list = [];
        
        _this.clearCanvas();
        
        _this.context.fillStyle = '#ffffff';
        _this.context.font = `${ _this.config.size }px Times`;
        _this.context.fillText(
            text,
            _this.canvas.width / 2 - _this.context.measureText(text).width / 2,
            _this.canvas.height / 2 + _this.config.size / 4,
        );
        
        // 获取画布数据
        const data = _this.context.getImageData(
            0, 0,
            _this.canvas.width,
            _this.canvas.height
        ).data;
        
        for (let i = 0; i < data.length; i += _this.config.density) {
            if (data[i] !== 0 && ~~(Math.random() * 5) === 1) {
                if (data[i + 4] !== 255 ||
                    data[i - 4] !== 255 ||
                    data[i + _this.canvas.width * 4] !== 255 ||
                    data[i - _this.canvas.width * 4] !== 255) {
                    
                    const target = {
                        x: (i / 4) % _this.canvas.width,
                        y: ~~((i / 4) / _this.canvas.width)
                    };
                    
                    list.push(_this.createPoint(target));
                }
            }
        }
        
        const cListL = cList.length,
            listL = list.length;
        if (cListL === 0) {
            _this.config.list = list;
        } else if (cListL === listL) {
            _this.config.list.forEach((v: Point, i: number, a: Point[]) => {
                v.target = list[i].target;
            });
        } else if (cListL < listL) {
            list.sort(() => {
                return 0.5 - Math.random();
            });
            list.forEach((v: Point, i: number, a: Point[]) => {
                cList[i] && (cList[i].target = v.target);
            });
            _this.config.list = cList.concat(list.slice(cListL, listL - 1));
        } else if (cListL > listL) {
            cList.sort(() => {
                return 0.5 - Math.random();
            });
            cList.forEach((v: Point, i: number, a: Point[]) => {
                if (list[i]) {
                    v.target = list[i].target;
                } else {
                    v.show = false;
                    v.target = {
                        x: Math.random() * _this.canvas.width,
                        y: Math.random() * _this.canvas.height
                    };
                }
            });
        }
    }
    
    /**
     * 创建点
     * @param {Position} target 目标位置
     */
    private createPoint(target: Position): Point {
        const _this = this,
            sign = [1, -1]; // 放大或缩小
        
        return {
            show: true,
            position: {
                x: Math.random() * _this.canvas.width,
                y: Math.random() * _this.canvas.height
            },
            target,
            speed: {
                x: 0,
                y: 0
            },
            color: ~~(Math.random() * _this.config.color.length),
            opacity: 0,
            radius: _this.config.radiusMax - Math.random() * _this.config.radiusMin,
            direction: sign[~~(Math.random() * 2)] * Math.random() / 10
        }
    }
    
    /**
     * 绘制点
     * @param {Point} point 点
     * @return {void}
     */
    private drawPoint(point: Point): void {
        const _this = this;
        
        _this.context.beginPath();
        _this.context.fillStyle = `rgba(${ _this.config.color[point.color] },${ point.opacity })`;
        _this.context.arc(
            point.position.x,
            point.position.y,
            point.radius,
            0,
            Math.PI * 2,
            false);
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
            distance = _this.getDistance({
                x1: point.position.x,
                y1: point.position.y,
                x2: mouseX,
                y2: mouseY
            });
        
        // 颜色
        point.show
            ? point.opacity += _this.config.colorS
            : point.opacity -= _this.config.colorS;
        (point.opacity > 1) && (point.opacity = 1);
        (point.opacity < 0) && (point.opacity = 0);
        
        // 半径
        point.radius += point.direction * _this.config.radiusS;
        (point.radius >= _this.config.radiusMax) && (point.direction *= -1);
        (point.radius <= 1) && (point.direction *= -1);
        
        // 速度
        point.speed.x = (point.position.x - point.target.x) / _this.config.interval;
        point.speed.y = (point.position.y - point.target.y) / _this.config.interval;
        
        // 鼠标推动约束
        if (distance < _this.config.mouseR) {
            point.speed.x += point.speed.x - (point.position.x - mouseX) / _this.config.mouseS;
            point.speed.y += point.speed.y - (point.position.y - mouseY) / _this.config.mouseS;
        }
        
        // 更新位置
        point.position.x -= point.speed.x * _this.config.restoreS;
        point.position.y -= point.speed.y * _this.config.restoreS;
    }
    
    /**
     * 获取两点之间距离
     * @param {Object} position 双坐标对象
     * @return {number} 距离
     */
    private getDistance(position): number {
        return Math.sqrt(
            Math.pow((position.x2 - position.x1), 2) +
            Math.pow((position.y2 - position.y1), 2)
        );
    }
}
