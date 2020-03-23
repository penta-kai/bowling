const {
    TYPE_OPEN,
    TYPE_STRIKE,
    TYPE_SPARE,
    TYPE_FAIL,
} = require('../constants');
const ScoreService = require('./scoreService');

test('total score for strike', () => {
    expect(ScoreService.getScore([
        {first: 10, second: 0, type: TYPE_STRIKE, index: 1},
        {first: 10, second: 0, type: TYPE_STRIKE, index: 2},
        {first: 10, second: 0, type: TYPE_STRIKE, index: 3},
    ])).toBe(60);
    expect(ScoreService.getScore([
        {first: 10, second: 0, type: TYPE_STRIKE, index: 1},
        {first: 10, second: 0, type: TYPE_STRIKE, index: 2},
        {first: 10, second: 0, type: TYPE_STRIKE, index: 3},
        {first: 10, second: 0, type: TYPE_STRIKE, index: 4},
        {first: 10, second: 0, type: TYPE_STRIKE, index: 5},
        {first: 10, second: 0, type: TYPE_STRIKE, index: 6},
        {first: 10, second: 0, type: TYPE_STRIKE, index: 7},
        {first: 10, second: 0, type: TYPE_STRIKE, index: 8},
        {first: 10, second: 0, type: TYPE_STRIKE, index: 9},
        {first: 10, second: 10, third: 10, type: TYPE_STRIKE, index: 10}
    ])).toBe(300);
    expect(ScoreService.getScore([
        {first: 10, second: 0, type: TYPE_STRIKE, index: 1},
        {first: 10, second: 0, type: TYPE_STRIKE, index: 2},
        {first: 10, second: 0, type: TYPE_STRIKE, index: 3},
        {first: 10, second: 0, type: TYPE_STRIKE, index: 4},
        {first: 10, second: 0, type: TYPE_STRIKE, index: 5},
        {first: 10, second: 0, type: TYPE_STRIKE, index: 6},
        {first: 10, second: 0, type: TYPE_STRIKE, index: 7},
        {first: 10, second: 0, type: TYPE_STRIKE, index: 8},
        {first: 10, second: 0, type: TYPE_STRIKE, index: 9},
        {first: 10, second: 0, third: 0, type: TYPE_STRIKE, index: 10}
    ])).toBe(270);
    expect(ScoreService.getScore([
        {first: 10, second: 5, type: TYPE_STRIKE, index: 1},
        {first: 10, second: 0, type: TYPE_STRIKE, index: 2},
        {first: 10, second: 0, type: TYPE_STRIKE, index: 3},
        {first: 10, second: 2, type: TYPE_STRIKE, index: 4},
        {first: 10, second: 0, type: TYPE_STRIKE, index: 5},
        {first: 10, second: 0, type: TYPE_STRIKE, index: 6},
        {first: 10, second: 3, type: TYPE_STRIKE, index: 7},
        {first: 10, second: 0, type: TYPE_STRIKE, index: 8},
        {first: 10, second: 2, type: TYPE_STRIKE, index: 9},
        {first: 10, second: 4, third: 0, type: TYPE_STRIKE, index: 10}
    ])).toBe(278);
    expect(ScoreService.getScore([
        {first: 10, second: 0, type: TYPE_STRIKE, index: 1},
        {first: 10, second: 0, type: TYPE_STRIKE, index: 2},
        {first: 10, second: 0, type: TYPE_STRIKE, index: 3},
        {first: 10, second: 0, type: TYPE_STRIKE, index: 4},
        {first: 10, second: 0, type: TYPE_STRIKE, index: 5},
    ])).toBe(120);
});

test('total score for spare', () => {
    expect(ScoreService.getScore([
        {first: 6, second: 4, type: TYPE_SPARE, index: 1}, // 18
        {first: 8, second: 2, type: TYPE_SPARE, index: 2}, // 15
        {first: 5, second: 5, type: TYPE_SPARE, index: 3}, // 10
    ])).toBe(43);

    expect(ScoreService.getScore([
        {first: 6, second: 4, type: TYPE_SPARE, index: 1}, // 18
        {first: 8, second: 2, type: TYPE_SPARE, index: 2}, // 15
        {first: 5, second: 5, type: TYPE_SPARE, index: 3}, // 15
        {first: 5, second: 5, type: TYPE_SPARE, index: 4}, // 18
        {first: 8, second: 2, type: TYPE_SPARE, index: 5}, // 14
        {first: 4, second: 6, type: TYPE_SPARE, index: 6}, // 18
        {first: 8, second: 2, type: TYPE_SPARE, index: 7}, // 12
        {first: 2, second: 8, type: TYPE_SPARE, index: 8}, // 17
        {first: 7, second: 3, type: TYPE_SPARE, index: 9}, // 11
        {first: 1, second: 9, type: TYPE_SPARE, index: 10}, // 10
    ])).toBe(148);

    expect(ScoreService.getScore([
        {first: 6, second: 4, type: TYPE_SPARE, index: 1}, // 18
        {first: 8, second: 2, type: TYPE_SPARE, index: 2}, // 15
        {first: 5, second: 5, type: TYPE_SPARE, index: 3}, // 15
        {first: 5, second: 5, type: TYPE_SPARE, index: 4}, // 18
        {first: 8, second: 2, type: TYPE_SPARE, index: 5}, // 14
        {first: 4, second: 6, type: TYPE_SPARE, index: 6}, // 18
        {first: 8, second: 2, type: TYPE_SPARE, index: 7}, // 12
        {first: 2, second: 8, type: TYPE_SPARE, index: 8}, // 17
        {first: 7, second: 3, type: TYPE_SPARE, index: 9}, // 11
        {first: 1, second: 9, third: 5, type: TYPE_SPARE, index: 10}, // 15
    ])).toBe(153);
});

class Frame {
    constructor(frame) {
        this.type = frame.type;
        this.first = frame.first;
        this.second = frame.second;
        this.third = frame.third ? frame.third : 0;
        this.index = frame.index ? frame.index : 0;
    }
}

const strikeFrame = {first: 10, second: 0, type: TYPE_STRIKE};
const strikeLastFrame = {first: 10, second: 10, third: 10, type: TYPE_STRIKE};
const spareFrame = {first: 8, second: 2, type: TYPE_SPARE};
const failFrame = {first: 0, second: 0, type: TYPE_SPARE};

// не работает генерация пакетов
// expect(ScoreService.getScore(
    //     Array(9) 
    //         .fill(new Frame(strikeFrame))
    //         .map((frame, index) => {
    //             frame.index = index;
    //             return frame;
    //         })
    // )).toBe(300);