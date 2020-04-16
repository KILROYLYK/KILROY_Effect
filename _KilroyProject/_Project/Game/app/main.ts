import Global from './constant/global'; // 全局对象

const Config = Global.Config, // 配置
    Stage = Global.Stage, // 对象
    Function = Global.Function; // 函数

const StageMain = new Stage.Move(); // 移动

Function.autoUpdate(() => {
    StageMain.update();
});
Function.resizeUpdate(() => { // 监听屏幕变化
    StageMain.update(true);
});
