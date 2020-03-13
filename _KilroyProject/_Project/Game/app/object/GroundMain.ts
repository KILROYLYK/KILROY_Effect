import _Object from '../interface/Object';
import Global from '../constant/Global';


/**
 * 地面
 */
export default class GroundMain implements _Object {
    public config: any = {};
    public instance: any = {
        texture: null,
        material: null,
        geometry: null,
        mesh: null
    };
    
    /**
     * 构造函数
     * @constructor GroundMain
     */
    protected constructor() {
        const _this = this;
        
        _this.config = {
            loader: new Global.THREE.TextureLoader(),
            image: {
                grass: 'https://image.gaeamobile.net/image/20190718/130858/grassland.jpg'
            },
            repeat: 25, // 重复
            anisotropy: 16, // 各向异性
            size: 20000 // 尺寸
        };
        
        _this.create();
        _this.init();
    }
    
    /**
     * 创建
     * @return {any} 实例
     */
    protected create(): void {
        const _this = this;
        
        // 质地
        const texture = _this.config.loader.load(_this.config.image.grass);
        texture.wrapS = texture.wrapT = Global.THREE.RepeatWrapping;
        texture.repeat.set(_this.config.repeat, _this.config.repeat);
        texture.anisotropy = _this.config.anisotropy;
        texture.encoding = Global.THREE.sRGBEncoding;
        _this.instance.texture = texture;
        
        // 材料
        const material = new Global.THREE.MeshLambertMaterial({ map: texture });
        _this.instance.material = material;
        
        // 几何
        const geometry = new Global.THREE.PlaneBufferGeometry(
            _this.config.size,
            _this.config.size
        );
        _this.instance.geometry = geometry;
        
        // 啮合
        const mesh = new Global.THREE.Mesh(geometry, material);
        mesh.position.y = 0;
        mesh.rotation.x = -Math.PI / 2; // 平放
        mesh.receiveShadow = true;
        _this.instance.mesh = mesh;
    }
    
    /**
     * 初始化
     * @return {void}
     */
    protected init(): void {
        const _this = this;
    }
    
    /**
     * 更新
     * @param {boolean} isResize 是否调整大小
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
        
        _this.instance.texture = null;
        _this.instance.material = null;
        _this.instance.geometry = null;
        _this.instance.mesh = null;
    }
}
