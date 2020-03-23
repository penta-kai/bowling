const FramesModel = require('../framesModel');
const {
    TYPE_OPEN,
    TYPE_STRIKE,
    TYPE_SPARE,
    TYPE_FAIL,
    LAST_FRAME_INDEX
} = require('../constants');

class FrameService {    
    constructor(data, framesCount) {
        this.frame = new FramesModel(data);
        console.log(data, this.frame, framesCount);
        
        this.framesCount = framesCount;  
        this.frameIndex = this.framesCount + 1;

        this.frame.index = this.frameIndex;
        this.frame.type = this.getFrameType();
    }

    static startGame() {
        return FramesModel.deleteMany();
    }

    static async getResult() {
        const frames = await FramesModel.find({}).sort({index: 'asc'});
        return frames;
    }

    gameIsOver() {
        return this.frameIndex > LAST_FRAME_INDEX;
    }

    getFrame () {
        return this.frame;
    }

    static getCountFrame() {
        return FramesModel.estimatedDocumentCount();
    }

    getFrameType() {
        let type = TYPE_FAIL;
        if (this.frame.first > 0) {
            type = TYPE_OPEN;
            if (this.frame.first === 10) {
                type = TYPE_STRIKE;
            } else if ((this.frame.first + this.frame.second) === 10) {
                type = TYPE_SPARE;
            }
        }
        return type;
    }

    create() {
        // @todo очистить ключ от очков в зависимости от типа
        return this.frame.save();
    }
}

module.exports = FrameService;