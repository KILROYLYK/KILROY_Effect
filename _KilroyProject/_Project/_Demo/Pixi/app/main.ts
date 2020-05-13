import Global from './constant/global'; // 全局对象

const Config = Global.Config, // 配置
    Stage = Global.Stage, // 对象
    Function = Global.Function; // 函数

const StageMain = new Stage.Stereoscopic(); // 动画

// Function.autoUpdate(() => {
//     StageMain.update();
// });
// Function.resizeUpdate(() => {
//     StageMain.update(true);
// });
