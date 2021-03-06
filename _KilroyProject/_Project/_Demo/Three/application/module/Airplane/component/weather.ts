import Global from '../../../constant/global';
import Component from '../../../interface/component';

import * as THREE from 'three';
import Stage from "../../Solar/stage";

/**
 * 天气
 */
export default class Weather implements Component {
    private readonly name: string = 'Weather-天气';
    
    private scene: THREE.Scene = null; // 场景
    
    private isSwitch: boolean = false; // 是否正在切换
    private day: boolean = false; // 是否是白天
    private initY: number = -1000; // 初始高度
    private sun: THREE.Mesh = null; // 太阳
    private moon: THREE.Mesh = null; // 月亮
    
    public instance: THREE.Group = null; // 实例
    
    /**
     * 构造函数
     * @constructor Weather
     * @param {object} scene 场景
     */
    constructor(scene: object) {
        const _this = this;
        
        _this.scene = scene.instance;
        
        _this.create();
        _this.init();
    }
    
    /**
     * 创建
     * @return {void}
     */
    private create(): void {
        const _this = this;
        
        _this.instance = new THREE.Group();
        _this.instance.name = _this.name;
        _this.instance.position.set(0, 0, -850);
        
        _this.createSun();
        _this.createMoon();
    }
    
    /**
     * 初始化
     * @return {void}
     */
    private init(): void {
        const _this = this;
        
        _this.instance.add(_this.sun);
        _this.instance.add(_this.moon);
        _this.scene.add(_this.instance);
        
        _this.switchDay();
        
        Global.Window.addEventListener('keyup', (e: KeyboardEvent) => {
            if (e.code === 'Space') _this.switchDay();
        }, false);
    }
    
    /**
     * 更新
     * @return {void}
     */
    public update(): void {
        const _this = this;
        
        if (!_this.instance) return;
    }
    
    /**
     * 创建太阳
     * @return {void}
     */
    private createSun(): void {
        const _this = this;
        
        const geometry = new THREE.SphereGeometry(
            1200, 20, 10
        );
        geometry.scale(1, 1, 0.1);
        
        const material = new THREE.MeshPhongMaterial({
            color: '#fffd00',
            flatShading: true
        });
        
        _this.sun = new THREE.Mesh(geometry, material);
        _this.sun.name = _this.name;
        _this.sun.position.set(0, _this.initY, 0);
    }
    
    /**
     * 创建月亮
     * @return {void}
     */
    private createMoon(): void {
        const _this = this;
        
        const geometry = new THREE.SphereGeometry(
            700, 20, 10
        );
        geometry.scale(1, 1, 0.2);
        
        const material = new THREE.MeshPhongMaterial({
            color: '#ffffff',
            flatShading: true
        });
        
        _this.moon = new THREE.Mesh(geometry, material);
        _this.moon.name = _this.name;
        _this.moon.position.set(0, _this.initY, 0);
    }
    
    /**
     * 切换昼夜
     * @return {void}
     */
    private switchDay(): void {
        const _this = this,
            Tween = Global.Tween.Tween,
            Ease = Global.Tween.Easing.Cubic.InOut,
            timeA = 3000, // 动画时间
            timeD = 2000, // 延迟时间
            color = [
                '#ffe1b9',
                '#000783'
            ],
            bg = _this.scene.background,
            fog = _this.scene.fog.color,
            sun = _this.sun.position,
            moon = _this.moon.position;
        
        if (_this.isSwitch) return;
        _this.isSwitch = true;
        
        if (_this.day) { // 切换到黑夜
            _this.day = false;
            
            const bgColor = new THREE.Color(color[1]),
                tweenBG = new Tween(bg)
                    .easing(Ease)
                    .delay(timeD)
                    .to({
                        b: bgColor.b,
                        g: bgColor.g,
                        r: bgColor.r
                    }, timeA)
                    .onComplete(() => {
                        tweenBG.stop();
                    })
                    .onStop(() => {
                    })
                    .start(),
                tweenFog = new Tween(fog)
                    .easing(Ease)
                    .delay(timeD)
                    .to({
                        b: bgColor.b,
                        g: bgColor.g,
                        r: bgColor.r
                    }, timeA)
                    .onComplete(() => {
                        tweenFog.stop();
                    })
                    .onStop(() => {
                    })
                    .start();
            
            const tweenSun = new Tween(sun)
                .easing(Ease)
                .to({
                    y: _this.initY
                }, timeA)
                .onComplete(() => {
                    tweenSun.stop();
                })
                .onStop(() => {
                })
                .start();
            
            const tweenMoon = new Tween(moon)
                .easing(Ease)
                .delay(timeD)
                .to({
                    y: 850
                }, timeA)
                .onComplete(() => {
                    tweenMoon.stop();
                })
                .onStop(() => {
                    _this.isSwitch = false;
                })
                .start();
        } else { // 切换到白昼
            _this.day = true;
            
            const bgColor = new THREE.Color(color[0]),
                tweenBG = new Tween(bg)
                    .easing(Ease)
                    .delay(timeD)
                    .to({
                        b: bgColor.b,
                        g: bgColor.g,
                        r: bgColor.r
                    }, timeA)
                    .onComplete(() => {
                        tweenBG.stop();
                    })
                    .onStop(() => {
                    })
                    .start(),
                tweenFog = new Tween(fog)
                    .easing(Ease)
                    .delay(timeD)
                    .to({
                        b: bgColor.b,
                        g: bgColor.g,
                        r: bgColor.r
                    }, timeA)
                    .onComplete(() => {
                        tweenFog.stop();
                    })
                    .onStop(() => {
                    })
                    .start();
            
            const tweenSun = new Tween(sun)
                .easing(Ease)
                .delay(timeD)
                .to({
                    y: 450
                }, timeA)
                .onComplete(() => {
                    tweenSun.stop();
                })
                .onStop(() => {
                    _this.isSwitch = false;
                })
                .start();
            
            const tweenMoon = new Tween(moon)
                .easing(Ease)
                .to({
                    y: _this.initY
                }, timeA)
                .onComplete(() => {
                    tweenMoon.stop();
                })
                .onStop(() => {
                })
                .start();
        }
    }
}
