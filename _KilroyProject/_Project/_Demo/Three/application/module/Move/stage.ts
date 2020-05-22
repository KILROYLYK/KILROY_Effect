import Global from '../../constant/global';
import _Stage from '../../interface/stage';

import Renderer from './layout/renderer';
import Scene from './layout/scene';
import Camera from './layout/camera';
import Ground from './component/ground';
import LightNatural from './component/lightNatural';
import LightAngle from './component/lightAngle';
import Loader from '../../controller/loader';

/**
 * 场景
 */
export default class Stage implements _Stage {
    private isInit: boolean = false; // 是否初始化
    private readonly resource: object = { // 资源
        path: [ // 地址
            {
                name: 'grassland',
                path: 'https://image.gaeamobile.net/image/20190718/130858/grassland.jpg'
            }
        ] as object[],
        data: null as object // 数据
    };
    private renderer: Renderer = null; // 渲染器
    private scene: Scene = null; // 场景
    private camera: Camera = null; // 相机
    private object: object = { // 对象
        lightNatural: null as LightNatural, // 灯光-自然光
        lightAngle: null as LightAngle, // 灯光-角度光
        ground: null as Ground // 地面
    };
    private controller: object = { // 控制器
        loader: null as Loader // 加载
    };

    /**
     * 构造函数
     * @constructor Stage
     */
    constructor() {
        const _this = this;

        _this.controller.loader = new Loader(_this.resource.path, {
            loadedCallback(index, total, progress) {
                // console.log(`加载进度：${ index } ${ total } ${ progress }`);
            },
            finishCallback(data) {
                _this.resource.data = data;

                _this.create();
                _this.init();
            }
        });
    }

    /**
     * 创建
     * @return {void}
     */
    private create(): void {
        const _this = this;

        _this.renderer = new Renderer();
        _this.scene = new Scene();
        _this.camera = new Camera();

        _this.object.ground = new Ground(_this.scene, _this.resource.data.grassland);
        _this.object.lightNatural = new LightNatural(_this.scene);
        _this.object.lightAngle = new LightAngle(_this.scene);
    }

    /**
     * 初始化
     * @return {void}
     */
    private init(): void {
        const _this = this;

        _this.isInit = true;

        Global.Dom.appendChild(_this.renderer.instance.domElement);
        Global.Function.updateFrame(() => {
            _this.update();
        });
        Global.Function.updateResize(() => {
            Global.Function.resizeDom();
            _this.update(true);
        });
    }

    /**
     * 销毁
     * @return {void}
     */
    public destroy(): void {
        const _this = this;

        if (!_this.isInit) return;
        _this.isInit = false;

        _this.controller.loader.destroy();

        _this.object.light.destroy();
        _this.object.ground.destroy();

        _this.camera.destroy();
        _this.scene.destroy();
        _this.renderer.destroy();
    }

    /**
     * 更新
     * @param {boolean} isResize 是否调整大小
     * @return {void}
     */
    public update(isResize: boolean = false): void {
        const _this = this;

        if (!_this.isInit) return;

        _this.camera.update(isResize);
        _this.renderer.update(isResize);

        _this.renderer.instance.render(
            _this.scene.instance,
            _this.camera.instance
        );
    }
}
