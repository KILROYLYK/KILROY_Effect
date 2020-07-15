import Global from '../../constant/global';
import _Stage from '../../interface/stage';

import Particle from './component/particle';

/**
 * 场景
 */
export default class Stage implements _Stage {
    private isInit: boolean = false; // 是否初始化
    private canvas: HTMLCanvasElement = null; // 画布
    private context: CanvasRenderingContext2D = null; // 语境
    private component: object = { // 组件
        particle: null as Particle // 粒子对象
    };
    private controller: object = { // 控制器
    };


    /**
     * 构造函数
     * @constructor Stage
     */
    constructor() {
        const _this = this;

        _this.create();
        _this.init();
    }

    /**
     * 创建
     * @return {void}
     */
    private create(): void {
        const _this = this;

        _this.canvas = Global.D.createElement('canvas');
        _this.canvas.width = Global.Width;
        _this.canvas.height = Global.Height;

        _this.context = _this.canvas.getContext('2d');

        _this.component.particle = new Particle(_this.context);
    }

    /**
     * 初始化
     * @return {void}
     */
    private init(): void {
        const _this = this;

        _this.isInit = true;

        Global.Dom.appendChild(_this.canvas);
        Global.Function.updateFocusPosition(false);
        Global.Function.updateFrame(() => {
            _this.update();
        });
        Global.Function.updateResize(() => {
            Global.Function.resizeDom();
            _this.update(true);
        });

        _this.component.particle.writeText('♥');
        _this.component.particle.writeText('KILROY');
    }

    /**
     * 销毁
     * @return {void}
     */
    public destroy(): void {
        const _this = this;
    }

    /**
     * 更新
     * @param {boolean} isResize 是否调整大小
     * @return {void}
     */
    public update(isResize: boolean = false): void {
        const _this = this;

        _this.canvas.width = Global.Width;
        _this.canvas.height = Global.Height;

        _this.component.particle.update(isResize);
    }
}
