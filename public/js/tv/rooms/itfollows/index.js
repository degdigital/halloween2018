import {replaceContent} from '../../../utils/domUtils.js';
import {countdownTimer} from '../../../utils/countdownTimer.js';
import roomManagement from '../../components/roomManagement.js';
import audio from '../../components/audio.js';
import gameplayManagement from './gameplayManagement.js';

const el = document.getElementById('app');
const winScreenTime = 10;
const diedScreenTime = 10;
const gameplayTime = 50;
let gameplayManagementInst = null;
let roomManagementInst;
let gameWon = false;
let gameplayTimer = null;

const init = () => {
    document.addEventListener('click', onInitialClick);
    
};

const onInitialClick = () => {
    initRoomManagement();
    audio.play('background');
    document.removeEventListener('click', onInitialClick);
};

const initRoomManagement = () => {
    roomManagementInst = roomManagement({
        roomId: 'itFollows',
        onIdle,
        onAwaitingPlayers,
        onOccupied
    });
};

const onIdle = generatedCode => {
    gameplayManagementInst = null;
    replaceContent(el, `
        <div class="itfollowstv">
            <div class="wrapper">
                <h1>It Follows</h1>
                <p class="room-code">Room code: <strong>${generatedCode}</strong></p>
            </div>
        </div>
    `);
};

const onAwaitingPlayers = generatedCode => {
    replaceContent(el, `
        <div class="itfollowstv">
            <div class="wrapper">
                <h1>It Follows</h1>
                <p class="room-code">Room code: <strong>${generatedCode}</strong></p>
                <p>Waiting for more players. Press start on your device when everyone's here.</p>
            </div>
        </div>
    `);
};

const onOccupied = userInfo => {
    replaceContent(el, `
        <div class="js-gameplay"></div>
        <div class="js-countdown timer-wrapper"></div>
    `);
    const gameplayEl = el.querySelector('.js-gameplay');
    const countdownEl = el.querySelector('.js-countdown');
    gameplayManagementInst = gameplayManagement(gameplayEl, {
        onStartCallback: () => {
            countdownTimer(countdownEl, gameplayTime);
            gameplayTimer = setTimeout(() => onDead, gameplayTime);
        },
        onWinCallback: onWin
    });
};

const onWin = () => {
    gameWon = true;
    replaceContent(el, `
        <div class="itfollowstv">
            <div class="wrapper">
                <h1 class="survived">You survived...this time.</h1>
            </div>
        </div>
    `);
    audio.stop('heartbeat');
    clearTimeout(gameplayTimer);
    if (gameplayManagementInst) {
        gameplayManagementInst.reset();
    }
    countdownTimer(null, winScreenTime, () => {
        gameWon = false;
        roomManagementInst.endSession();
    });
};

const onDead = () => {
    if (gameWon === false) {
        audio.stop('heartbeat');
        audio.play('scream');
        replaceContent(el, `
            <div class="itfollowstv">
                <div class="wrapper">
                    <video src="/video/dead.mp4" preload="true" autoplay muted class="video js-video"></video>
                </div>
            </div>
        `);
        const wrprEl = el.querySelector('.wrapper');
        setTimeout(() => {
            wrprEl.insertAdjacentHTML('afterbegin', `
                <h1 class="dead">YOU'RE DEAD.</h1>
            `);
        }, 2500);
        
    }
    if (gameplayManagementInst) {
        gameplayManagementInst.reset();
    }
    countdownTimer(null, diedScreenTime, () => roomManagementInst.endSession());
};

init();
