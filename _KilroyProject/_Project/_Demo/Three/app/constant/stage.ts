import Move from '../stage/move/stage';
import Panoramic from '../stage/panoramic/stage';
import Flight from '../stage/flight/stage';

/**
 * Stage
 */
export default class Stage {
    readonly static Move: Function = Move; // 移动
    readonly static Panoramic: Function = Panoramic; // 全景
    readonly static Flight: Function = Flight; // 飞行
}
