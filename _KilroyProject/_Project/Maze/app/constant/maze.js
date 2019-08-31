/**
 * 迷宫道路
 */
export const type = [
    '', // 0
    'top', // 1
    'left', // 2
    'right', // 3
    'bottom', // 4
    'top bottom', // 5
    'left right', // 6
    'top left', // 7
    'top right', // 8
    'bottom left', // 9
    'bottom right', // 10
    'top left right', // 11
    'bottom left right', // 12
    'top left bottom', // 13
    'top right bottom' // 14
];

/**
 * 迷宫地图
 */
export const matrix = [
    {
        name: '校招地图',
        grid: 30,
        enter: {
            grid: 870,
            door: 'bottom'
        },
        out: {
            grid: 29,
            door: 'top'
        },
        map: [
            7, 1, 5, 8, 13, 1, 14, 7, 5, 1, 5, 5, 5, 5, 5, 8, 13, 5, 5, 5, 1, 5, 8, 13, 5, 1, 1, 5, 8, 6,
            6, 9, 8, 9, 5, 10, 7, 10, 11, 6, 7, 5, 8, 11, 7, 10, 7, 8, 7, 5, 10, 11, 9, 1, 5, 10, 6, 11, 9, 10,
            9, 8, 9, 8, 7, 5, 10, 7, 3, 6, 6, 11, 6, 6, 6, 13, 3, 9, 10, 7, 5, 4, 5, 3, 7, 5, 10, 2, 5, 8,
            11, 9, 8, 9, 4, 8, 7, 10, 12, 9, 3, 6, 6, 6, 9, 8, 2, 8, 7, 10, 7, 5, 8, 12, 9, 8, 11, 2, 8, 12,
            2, 14, 6, 7, 8, 9, 10, 7, 5, 8, 9, 3, 6, 2, 8, 6, 12, 6, 9, 14, 9, 8, 9, 1, 14, 6, 6, 6, 9, 8,
            2, 8, 6, 6, 6, 7, 8, 6, 11, 6, 7, 10, 6, 6, 6, 9, 5, 3, 7, 1, 14, 6, 11, 9, 5, 10, 6, 9, 8, 6,
            6, 12, 12, 6, 9, 10, 9, 10, 6, 6, 9, 8, 6, 12, 9, 8, 7, 10, 6, 9, 8, 9, 3, 7, 5, 5, 3, 7, 10, 6,
            9, 5, 8, 6, 7, 1, 8, 7, 3, 6, 13, 10, 9, 5, 8, 9, 10, 7, 10, 11, 9, 8, 6, 12, 7, 5, 3, 6, 11, 6,
            11, 7, 10, 6, 12, 6, 12, 6, 9, 4, 5, 5, 8, 7, 10, 7, 5, 4, 5, 10, 7, 3, 9, 8, 2, 8, 12, 2, 10, 6,
            2, 10, 11, 6, 7, 10, 7, 10, 7, 5, 5, 8, 9, 10, 7, 4, 5, 14, 7, 5, 10, 6, 11, 6, 12, 6, 7, 10, 7, 10,
            6, 13, 3, 6, 2, 8, 6, 7, 10, 7, 8, 9, 5, 5, 10, 7, 8, 7, 10, 7, 8, 9, 10, 2, 8, 6, 6, 11, 9, 8,
            9, 5, 10, 6, 6, 6, 6, 6, 7, 10, 9, 8, 13, 5, 8, 6, 9, 10, 11, 6, 9, 5, 14, 6, 6, 2, 10, 6, 7, 3,
            7, 5, 8, 6, 6, 9, 10, 9, 10, 13, 8, 9, 5, 5, 3, 6, 13, 8, 2, 10, 13, 5, 1, 10, 6, 6, 13, 3, 6, 6,
            6, 11, 9, 10, 6, 7, 5, 5, 5, 8, 2, 8, 7, 8, 6, 9, 8, 9, 3, 7, 5, 8, 9, 8, 6, 9, 5, 3, 6, 12,
            6, 2, 5, 14, 6, 9, 8, 7, 8, 9, 10, 6, 6, 6, 2, 14, 9, 8, 6, 2, 8, 9, 8, 6, 9, 5, 8, 12, 9, 8,
            6, 6, 7, 5, 4, 5, 10, 6, 6, 7, 5, 4, 10, 12, 6, 7, 5, 10, 6, 6, 9, 14, 9, 0, 14, 7, 10, 7, 5, 3,
            6, 9, 4, 5, 8, 7, 8, 6, 9, 4, 14, 7, 8, 7, 10, 6, 11, 7, 10, 2, 14, 11, 7, 10, 7, 10, 7, 10, 7, 10,
            2, 8, 13, 5, 10, 6, 6, 9, 5, 14, 7, 10, 9, 10, 7, 10, 6, 9, 8, 6, 7, 10, 9, 8, 9, 5, 10, 11, 6, 11,
            6, 9, 5, 5, 5, 10, 9, 5, 8, 7, 4, 5, 14, 7, 10, 7, 3, 7, 10, 12, 6, 7, 14, 9, 8, 7, 5, 3, 9, 3,
            6, 13, 1, 8, 7, 8, 7, 8, 9, 4, 14, 7, 5, 10, 7, 3, 9, 4, 5, 5, 10, 6, 7, 5, 10, 6, 7, 10, 7, 10,
            6, 7, 10, 9, 10, 9, 3, 9, 14, 7, 5, 10, 13, 5, 10, 2, 8, 7, 1, 5, 8, 6, 9, 5, 8, 6, 9, 8, 9, 8,
            6, 6, 7, 5, 5, 5, 10, 7, 8, 6, 7, 5, 5, 5, 5, 10, 6, 12, 6, 13, 4, 10, 7, 5, 10, 6, 11, 9, 5, 10,
            6, 6, 2, 5, 5, 14, 7, 10, 6, 6, 9, 8, 7, 8, 13, 8, 6, 7, 10, 7, 5, 8, 6, 7, 8, 9, 3, 7, 5, 8,
            9, 10, 12, 7, 5, 8, 9, 8, 6, 2, 8, 9, 10, 9, 5, 3, 6, 9, 5, 4, 14, 6, 9, 10, 9, 8, 6, 6, 11, 6,
            7, 5, 5, 10, 11, 9, 5, 10, 6, 6, 9, 5, 14, 7, 5, 10, 9, 5, 8, 7, 8, 2, 14, 7, 5, 10, 6, 9, 3, 6,
            2, 8, 13, 5, 0, 5, 14, 7, 10, 2, 5, 8, 7, 10, 7, 8, 7, 5, 3, 6, 6, 6, 7, 4, 5, 14, 6, 13, 10, 6,
            6, 9, 5, 8, 6, 7, 5, 10, 13, 4, 14, 6, 6, 11, 6, 6, 6, 7, 10, 6, 6, 9, 10, 7, 5, 8, 9, 8, 7, 10,
            6, 11, 7, 10, 9, 4, 5, 5, 8, 7, 5, 3, 6, 6, 6, 9, 10, 9, 8, 6, 9, 5, 8, 6, 11, 9, 5, 10, 9, 8,
            9, 3, 9, 5, 5, 8, 13, 5, 4, 10, 13, 10, 6, 6, 6, 7, 5, 8, 12, 6, 13, 8, 6, 9, 4, 8, 7, 8, 7, 3,
            7, 4, 5, 5, 14, 9, 5, 5, 5, 5, 5, 5, 4, 10, 9, 4, 14, 9, 5, 4, 5, 10, 9, 5, 5, 4, 10, 9, 10, 12
        ]
    }
];
