const scenes = {
    idle: {
        audio: {
            id: 'idle',
            loop: true,
            volume: .5
        }
    },
    intro: {
        video: {
            id: 'static',
            loop: true
        },
        audio: {
            id: 'static',
            loop: true,
            volume: .15
        }
    },
    gameIdle: {
        video: {
            id: 'game-idle',
            loop: true
        }
    },
    gameGreen: {
        video: {
            id: 'game-green',
            loop: true
        },
        audio: {
            id: 'rigor-mortis-flesh',
            loop: false
        }
    },
    gameYellow1: {
        video: {
            id: 'game-yellow-1',
            loop: false
        },
        audio: {
            id: 'growl',
            loop: false
        }
    },
    gameYellow2: {
        video: {
            id: 'game-yellow-2',
            loop: true
        }
    },
    gameRed: {
        video: {
            id: 'game-red',
            loop: false
        },
        audio: {
            id: 'dead',
            loop: false
        }
    },
    gameWin: {
        video: {
            id: 'game-win',
            loop: false
        },
        audio: {
            id: 'hair',
            loop: false,
            volume: 4
        }
    }
};

export default scenes;