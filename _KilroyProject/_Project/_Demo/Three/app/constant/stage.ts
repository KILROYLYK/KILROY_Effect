import Move from '../stage/move/stage';
import Panoramic from '../stage/panoramic/stage';
import Flight from '../stage/flight/stage';
import Universe from '../stage/universe/stage';

/**
 * 场景
 */
export default class GlobalStage {
    readonly static Move: Function = Move; // 移动
    readonly static Panoramic: Function = Panoramic; // 全景
    readonly static Flight: Function = Flight; // 飞行
    readonly static Universe: Function = Universe; // 宇宙
}
