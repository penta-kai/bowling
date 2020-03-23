const {
    TYPE_OPEN,
    TYPE_STRIKE,
    TYPE_SPARE,
    TYPE_FAIL,
} = require('../constants');
const ScoreService = require('./scoreService');

const strikeFrame = {first: 10, second: 0, type: TYPE_STRIKE};
const strikeLastFrame = {first: 10, second: 10, third: 10, type: TYPE_STRIKE};
const spareFrame = {first: 8, second: 2, type: TYPE_SPARE};
const failFrame = {first: 0, second: 0, type: TYPE_SPARE};

test('total score for strike', () => {
    expect(ScoreService.getScore([strikeFrame, strikeFrame, strikeFrame].map((value, index) => {
        value.index = index + 1;
        return value;
    }))).toBe(60);
    expect(ScoreService.getScore([strikeFrame,strikeFrame,strikeFrame,strikeFrame,strikeFrame,strikeFrame,strikeFrame,strikeFrame,strikeFrame,strikeFrame].map((value, index) => {
        value.index = index + 1;
        return value;
    }))).toBe(270);
    expect(ScoreService.getScore([strikeFrame,strikeFrame,strikeFrame,strikeFrame,strikeFrame,strikeFrame,strikeFrame,strikeFrame,strikeFrame,strikeLastFrame].map((value, index) => {
        value.index = index + 1;
        return value;
    }))).toBe(300);
    expect(ScoreService.getScore(Array(5).fill(strikeFrame).map((value, index) => {
        value.index = index + 1;
        return value;
    }))).toBe(130);
});

test('total score for spare', () => {
    expect(ScoreService.getScore([spareFrame, spareFrame].map((value, index) => {
        value.index = index + 1;
        return value;
    }))).toBe(28);
});