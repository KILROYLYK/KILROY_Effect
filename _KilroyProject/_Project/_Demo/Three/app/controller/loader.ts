import Global from '../constant/global';
import _Controller from '../interface/controller';
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';

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
        loader: {
            image: null as THREE.TextureLoader,
            json: null as THREE.ObjectLoader,
            audio: null as THREE.AudioLoader,
            svg: null as SVGLoader,
            obj: null as OBJLoader,
            mtl: null as MTLLoader,
            fbx: null as FBXLoader
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
        
        _this.config.list = config.list || [];
        _this.config.loadingCallback = config.loadingCallback || null;
        _this.config.finishCallback = config.finishCallback || null;
        
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
                return await _this.load(v);
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
     * 加载
     * @param {Resources} res 资源
     * @return {void}
     */
    private async load(res: Resources): Promise<any> {
        const _this = this;
        
        let loader = null,
            type = '';
        
        if (res.path.indexOf('.jpg') > -1 ||
            res.path.indexOf('.jpeg') > -1 ||
            res.path.indexOf('.png') > -1) {
            type = 'Image';
            !_this.config.loader.image &&
            (_this.config.loader.image = new Global.THREE.TextureLoader());
            loader = _this.config.loader.image;
        } else if (res.path.indexOf('.json') > -1) {
            type = 'Json';
            !_this.config.loader.json &&
            (_this.config.loader.json = new Global.THREE.ObjectLoader());
            loader = _this.config.loader.json;
        } else if (res.path.indexOf('.mp3') > -1) {
            type = 'Audio';
            !_this.config.loader.audio &&
            (_this.config.loader.audio = new Global.THREE.AudioLoader());
            loader = _this.config.loader.audio;
        } else if (res.path.indexOf('.svg') > -1) {
            type = 'SVG';
            !_this.config.loader.svg &&
            (_this.config.loader.svg = new SVGLoader());
            loader = _this.config.loader.svg;
        } else if (res.path.indexOf('.obj') > -1) {
            type = 'OBJ';
            !_this.config.loader.obj &&
            (_this.config.loader.obj = new OBJLoader());
            loader = _this.config.loader.obj;
        } else if (res.path.indexOf('.mtl') > -1) {
            type = 'MTL';
            !_this.config.loader.mtl &&
            (_this.config.loader.mtl = new MTLLoader());
            loader = _this.config.loader.mtl;
        } else if (res.path.indexOf('.fbx') > -1) {
            type = 'FBX';
            !_this.config.loader.fbx &&
            (_this.config.loader.fbx = new FBXLoader());
            loader = _this.config.loader.fbx;
        }
        
        if (type === '') return Promise.resolve();
        
        return new Promise((resolve, reject) => {
            loader.load(
                res.path,
                (object: any) => { // 加载完成
                    _this.config.finish++;
                    _this.config.data[res.name] = object;
                    _this.config.loadingCallback && _this.config.loadingCallback(
                        parseInt(String(_this.config.finish / _this.config.list.length * 100), 10)
                    );
                    resolve();
                },
                (xhr) => { // 加载进度
                },
                (error) => { // 加载失败
                    _this.config.data[res.name] = '';
                    console.log(`${ type }加载错误：名称-${ res.name }`);
                    resolve();
                }
            );
        });
    }
}
