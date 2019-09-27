/**
 * Controller
 */
import { src } from '../controller/window';

/**
 * 页面资源
 */
export const img = [src.img + 'rotate_screen.png'];

/**
 * 游戏资源
 */
export const gameImg = [
    {
        name: 'border',
        url: src.img + 'game_border.png',
        onComplete: () => {
        }
    }
];
export const gameAnimation = [
    {
        name: 'character',
        url: src.json + 'character.json',
        onComplete: () => {
        }
    }
];
export const gameMusic = [
    {
        name: 'walk',
        url: src.media + 'walk.mp3',
        onComplete: () => {
        }
    }
];
