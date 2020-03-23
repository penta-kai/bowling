class FrameDto {
    first = 0;
    second  = 0;
    third = 0;

    constructor(frame) {
        this.first = +frame.first;
        this.second = +frame.second;
        this.third = +(frame.third ? frame.third : 0);
    }
}

module.exports = FrameDto;