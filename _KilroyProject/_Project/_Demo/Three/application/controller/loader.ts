import Global from '../constant/global';
import Controller from '../interface/controller';

import * as THREE from 'three';
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';

interface LoadConfig { // 加载配置
    loadedCallback?: Function // 加载完成（单个资源）
    finishCallback?: Function // 加载完成（全部资源）
}

interface PathConfig { // 地址配置
    name: string
    url: string | string[]
    onComplete?: Function
}

/**
 * 加载
 */
export default class Loader implements Controller {
    private readonly loader: object = { // 加载器对象
        image: null as THREE.TextureLoader,
        cube: null as THREE.CubeTextureLoader,
        font: null as THREE.FontLoader,
        json: null as THREE.ObjectLoader,
        audio: null as THREE.AudioLoader,
        svg: null as SVGLoader,
        obj: null as OBJLoader,
        mtl: null as MTLLoader,
        fbx: null as FBXLoader
    };
    private path: PathConfig[] = []; // 资源地址
    private data: object = {}; // 资源对象
    private total: number = 0; // 资源总数
    private finish: number = 0; // 完成总数
    private loadedCallback: Function = null; // 加载完成（单个资源）
    private finishCallback: Function = null; // 加载完成（全部资源）
    
    /**
     * 构造函数
     * @constructor Loader
     * @param {PathConfig[]} path 资源列表
     * @param {object} config 配置
     */
    constructor(path: PathConfig[], config: LoadConfig = {}) {
        const _this = this;
        
        _this.path = path;
        _this.total = _this.path.length;
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
            promiseList = [];
        
        _this.path.forEach((v, i, a) => {
            promiseList.push(
                v.url
                    ? _this.load(v)
                    : Promise.resolve()
            );
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
    }
    
    /**
     * 加载
     * @param {PathConfig} path 地址
     * @return {void}
     */
    private async load(path: PathConfig): Promise<any> {
        const _this = this,
            name = path.name,
            url = path.url,
            onComplete = path.onComplete;
        
        let loader = null,
            type = '';
        
        if (name.indexOf('image_') > -1) { // 图片
            type = 'Image';
            !_this.loader.image &&
            (_this.loader.image = new THREE.TextureLoader());
            loader = _this.loader.image;
        } else if (name.indexOf('cube_') > -1) { // 图片
            type = 'Cube';
            !_this.loader.cube &&
            (_this.loader.cube = new THREE.CubeTextureLoader());
            loader = _this.loader.cube;
        } else if (name.indexOf('font_') > -1) { // 字体
            type = 'Font';
            !_this.loader.font &&
            (_this.loader.font = new THREE.FontLoader());
            loader = _this.loader.font;
        } else if (name.indexOf('json_') > -1) { // 模型
            type = 'Json';
            !_this.loader.json &&
            (_this.loader.json = new THREE.ObjectLoader());
            loader = _this.loader.json;
        } else if (name.indexOf('audio_') > -1) {
            type = 'Audio';
            !_this.loader.audio &&
            (_this.loader.audio = new THREE.AudioLoader());
            loader = _this.loader.audio;
        } else if (name.indexOf('svg_') > -1) {
            type = 'SVG';
            !_this.loader.svg &&
            (_this.loader.svg = new SVGLoader());
            loader = _this.loader.svg;
        } else if (name.indexOf('obj_') > -1) {
            type = 'OBJ';
            !_this.loader.obj &&
            (_this.loader.obj = new OBJLoader());
            loader = _this.loader.obj;
        } else if (name.indexOf('mtl_') > -1) {
            type = 'MTL';
            !_this.loader.mtl &&
            (_this.loader.mtl = new MTLLoader());
            loader = _this.loader.mtl;
        } else if (name.indexOf('fbx_') > -1) {
            type = 'FBX';
            !_this.loader.fbx &&
            (_this.loader.fbx = new FBXLoader());
            loader = _this.loader.fbx;
        }
        
        if (type === '') return Promise.resolve();
        
        return new Promise((resolve, reject) => {
            loader.load(url,
                (object: any) => { // 加载完成
                    _this.data[name] = object;
                    _this.finish++;
                    onComplete && onComplete();
                    _this.loadedCallback && _this.loadedCallback(
                        _this.finish, _this.total,
                        parseInt(String(_this.finish / _this.total * 100), 10)
                    );
                    resolve();
                },
                (xhr) => { // 加载进度
                },
                (error) => { // 加载失败
                    _this.data[name] = '';
                    console.log(`${ type }加载错误：名称-${ name }`);
                    resolve();
                }
            );
        });
    }
}
