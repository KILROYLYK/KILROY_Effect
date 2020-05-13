import Global from '../constant/global';
import _Controller from '../interface/controller';

export interface Resources {
    name: string,
    path: string
}

export interface LoadConfig {
    list: Resources[],
    loadingCallback?: Function,
    finishCallback?: Function
}

/**
 * 加载
 */
export default class Loader implements _Controller {
    private readonly config: object = { // 配置
        loader: { // 加载对象
            texture: null as THREE.TextureLoader, // 图片
            model: null, // 模型
            music: null // 音频
        },
        list: [] as Resources[], // 资源列表
        finish: 0 as number, // 完成总数
        data: {} as object, // 完成资源对象
        loadingCallback: null as Function,
        finishCallback: null as Function
    };
    
    /**
     * 构造函数
     * @constructor Loader
     * @param {object} config 配置
     */
    constructor(config: LoadConfig = { list: [] }) {
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
    }
    
    /**
     * 初始化
     * @return {void}
     */
    private async init(): Promise<any> {
        const _this = this,
            promiseList = _this.config.list.map(async (v: Resources, i: number, a: Resources[]) => {
                if (!v.name || !v.path) return Promise.resolve();
                if (v.path.indexOf('.jpg') || v.path.indexOf('.jpeg') || v.path.indexOf('.png')) {
                    await _this.loadImage(v);
                } else if (v.path.indexOf('.obj')) {
                    await _this.loadModel(v);
                } else {
                    return Promise.resolve();
                }
                _this.config.loadingCallback && _this.config.loadingCallback(
                    parseInt(String(_this.config.finish / _this.config.list.length * 100), 10)
                );
            });
        
        await Promise.all(promiseList);
        
        _this.config.finishCallback && _this.config.finishCallback(_this.config.data);
    }
    
    /**
     * 更新
     * @param {boolean} isResize 屏幕是否变化
     * @return {void}
     */
    public update(isResize: boolean = false): void {
        const _this = this;
    }
    
    /**
     * 销毁
     * @return {void}
     */
    public destroy(): void {
        const _this = this;
    }
    
    /**
     * 加载图片
     * @param {Resources} res 资源
     * @return {void}
     */
    private async loadImage(res: Resources): Promise<any> {
        const _this = this;
        
        !_this.config.loader.texture && (_this.config.loader.texture = new Global.THREE.TextureLoader());
        _this.config.loader.texture.load(
            res.path,
            (data: THREE.Texture) => {
                _this.config.finish++;
                _this.config.data[res.name] = data;
            },
            () => {
            },
            () => {
                _this.config.data[res.name] = '';
                console.log(`图片加载错误：名称-${ res.name }`)
            }
        );
    }
    
    /**
     * 加载模型
     * @param {Resources} res 资源
     * @return {void}
     */
    private async loadModel(res: Resources): Promise<any> {
        const _this = this;
        
        !_this.config.loader.model && (_this.config.loader.texture = new Global.THREE.OBJLoader());
        _this.config.loader.model.load(
            res.path,
            (data: THREE.Object3D) => {
                _this.config.finish++;
                _this.config.data[res.name] = data;
            },
            () => {
            },
            () => {
                _this.config.data[res.name] = '';
                console.log(`模型加载错误：名称-${ res.name }`)
            }
        );
    }
}
