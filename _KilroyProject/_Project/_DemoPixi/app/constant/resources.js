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
        name: 'rocker',
        url: src.img + 'game_rocker.png',
        onComplete: () => {
        }
    },
    {
        name: 'rocker_button',
        url: src.img + 'game_rocker_button.png',
        onComplete: () => {
        }
    }
];
export const gameAnimation = [];
export const gameMusic = [];
