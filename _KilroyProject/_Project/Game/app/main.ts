import Global from './constant/Global'; // 全局对象

const Config = Global.Config; // 配置
const Object = Global.Object; // 对象
const Function = Global.Function; // 函数

const RendererMain = new Object.RendererMain();
const SceneMain = new Object.SceneMain();
const CameraMain = new Object.CameraMain();

Function.resizeGame(() => {
    RendererMain.update(true);
});

console.log(SceneMain);
console.log(RendererMain);
console.log(CameraMain);
