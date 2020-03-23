const {
    TYPE_OPEN,
    TYPE_STRIKE,
    TYPE_SPARE,
    TYPE_FAIL,
    LAST_FRAME_INDEX
} = require('../constants');

class ScoreService {
    static getScore(frames) {     
        let totalScore = 0;
            
        const framesCount = frames.length;
        for (let iter = 0; iter < framesCount; iter++) {
            let score = 0;
            let frame = frames[iter];
            let isLast = frame.index === LAST_FRAME_INDEX;
            let nextFrame = null;
            
            if (frame.type === TYPE_STRIKE) {
                console.log(frame, LAST_FRAME_INDEX, isLast);
                
                if (isLast) {
                    score = getFrameScore(frame, true);
                } else {
                    score = frame.first;

                    nextFrame = frames[iter + 1];
                    if (nextFrame && nextFrame.type === TYPE_STRIKE) {
                        // берем 2 фрейма если следующий страйк
                        if (nextFrame.index === LAST_FRAME_INDEX) {
                            score += getFrameScore(nextFrame);
                        } else {
                            score += nextFrame.first;

                            nextFrame = frames[iter + 2];
                            if (nextFrame) {
                                score += nextFrame.first;
                            }
                        }
                    } else if (nextFrame) {
                        // берем 1 фрейм если следующий обычный
                        score = getFrameScore(nextFrame);
                    }
                }
            } else if (frame.type === TYPE_SPARE) {
                // сумма очков + берем следующий и прибавляем first
                score = getFrameScore(frame, isLast);
                nextFrame = frames[iter + 1];
                if (nextFrame) {
                    score += nextFrame.first;
                }
            } else {
                // сумма очков
                score = getFrameScore(frame);
            }
            totalScore += score;
        }
        
        return totalScore;
    }
}

module.exports = ScoreService;

function getFrameScore(frame, isLast = false) {
    console.log(frame.first + frame.second + (isLast && frame.third ? frame.third : 0), isLast);
    
    return frame.first + frame.second + (isLast && frame.third ? frame.third : 0);
}

// страйк
// берем 1 пакет
    // это страйк?
        // да - прибавляем first
        // нет - прибавляем first + second