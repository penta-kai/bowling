const express = require('express');
const router = express.Router();
const {body, validationResult} = require('express-validator');

const FrameDto = require('./frameDto');
const FrameService = require('./services/frameService');
const ScoreService = require('./services/scoreService');

router.get('/', (req, res) => {
    res.send('Hello, this is a bowling game!');
});

router.post('/game', (req, res) => {
    FrameService.startGame()
        .then(() => {
            res.status(204).send();
        })
        .catch(error => {
            console.error(error);
            res.status(503).send();
        });
});

router.put(
    '/scores',
    [
        body('first').isInt({min: 0, max: 10}),
        body('second').isInt({min: 0, max: 10}),
        body('third').optional().isInt({min: 0, max: 10}),
    ],
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json(errors);
        } else {
            const frameDto = new FrameDto(req.body);

            FrameService.getCountFrame()
                .then(framesCount => {        
                    if (framesCount === 10) {
                        res.status(409).send('game is over');
                    } else {
                        const frameService = new FrameService(frameDto, framesCount);
                        frameService.create()
                            .then(frame => {
                                res.status(200).json(new FrameDto(frame));
                            })
                            .catch(error => {
                                console.error(error);
                                res.status(503).send();
                            });
                    }
                });
        }
    }
);

router.get('/scores', (req, res) => {
    FrameService.getResult()
        .then(framesList => {
            res.status(200).json(
                {
                    frames: framesList.map(frame => new FrameDto(frame)),
                    total: ScoreService.getScore(framesList)
                }
            );
        })
        .catch(error => {
            console.error(error);
            res.status(503).send()
        });
});

module.exports = router;