import Global from '../constant/global';
import _Controller from '../interface/controller';
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';

interface Resource { // 资源
    name: string // 名称
    path: string // 地址
}

interface LoadConfig { // 控制器配置
    loadedCallback?: Function // 加载完成（单个资源）
    finishCallback?: Function // 加载完成（全部资源）
}

/**
 * 加载
 */
export default class Loader implements _Controller {
    private readonly loader: object = { // 加载器对象
        image: null as THREE.TextureLoader,
        json: null as THREE.ObjectLoader,
        audio: null as THREE.AudioLoader,
        svg: null as SVGLoader,
        obj: null as OBJLoader,
        mtl: null as MTLLoader,
        fbx: null as FBXLoader
    };
    private list: Resource[] = []; // 资源列表
    private data: object = {}; // 资源对象
    private finish: number = 0; // 完成总数
    private loadedCallback: Function = null; // 加载完成（单个资源）
    private finishCallback: Function = null; // 加载完成（全部资源）
    
    /**
     * 构造函数
     * @constructor Loader
     * @param {Resource[]} list 资源列表
     * @param {object} config 配置
     */
    constructor(list: Resource[] = [], config: LoadConfig = {}) {
        const _this = this;
        
        _this.list = list;
        _this.loadedCallback = config.loadedCallback || null;
        _this.finishCallback = config.finishCallback || null;
        
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
            promiseList = _this.list.map(async (v: Resource, i: number, a: Resource[]) => {
                if (!v.name || !v.path) return Promise.resolve();
                return await _this.load(v);
            });
        
        await Promise.all(promiseList);
        
        _this.finishCallback && _this.finishCallback(_this.data);
    }
    
    /**
     * 销毁
     * @return {void}
     */
    public destroy(): void {
        const _this = this;
        
        _this.list = [];
        _this.data = {};
    }
    
    /**
     * 加载
     * @param {Resource} res 资源
     * @return {void}
     */
    private async load(res: Resource): Promise<any> {
        const _this = this;
        
        let loader = null,
            type = '';
        
        if (res.path.indexOf('.jpg') > -1 ||
            res.path.indexOf('.jpeg') > -1 ||
            res.path.indexOf('.png') > -1) {
            type = 'Image';
            !_this.loader.image &&
            (_this.loader.image = new Global.THREE.TextureLoader());
            loader = _this.loader.image;
        } else if (res.path.indexOf('.json') > -1) {
            type = 'Json';
            !_this.loader.json &&
            (_this.loader.json = new Global.THREE.ObjectLoader());
            loader = _this.loader.json;
        } else if (res.path.indexOf('.mp3') > -1) {
            type = 'Audio';
            !_this.loader.audio &&
            (_this.loader.audio = new Global.THREE.AudioLoader());
            loader = _this.loader.audio;
        } else if (res.path.indexOf('.svg') > -1) {
            type = 'SVG';
            !_this.loader.svg &&
            (_this.loader.svg = new SVGLoader());
            loader = _this.loader.svg;
        } else if (res.path.indexOf('.obj') > -1) {
            type = 'OBJ';
            !_this.loader.obj &&
            (_this.loader.obj = new OBJLoader());
            loader = _this.loader.obj;
        } else if (res.path.indexOf('.mtl') > -1) {
            type = 'MTL';
            !_this.loader.mtl &&
            (_this.loader.mtl = new MTLLoader());
            loader = _this.loader.mtl;
        } else if (res.path.indexOf('.fbx') > -1) {
            type = 'FBX';
            !_this.loader.fbx &&
            (_this.loader.fbx = new FBXLoader());
            loader = _this.loader.fbx;
        }
        
        if (type === '') return Promise.resolve();
        
        return new Promise((resolve, reject) => {
            loader.load(
                res.path,
                (object: any) => { // 加载完成
                    _this.finish++;
                    _this.data[res.name] = object;
                    _this.loadedCallback && _this.loadedCallback(
                        _this.finish,
                        _this.list.length,
                        parseInt(String(_this.finish / _this.list.length * 100), 10)
                    );
                    resolve();
                },
                (xhr) => { // 加载进度
                },
                (error) => { // 加载失败
                    _this.data[res.name] = '';
                    console.log(`${ type }加载错误：名称-${ res.name }`);
                    resolve();
                }
            );
        });
    }
}
