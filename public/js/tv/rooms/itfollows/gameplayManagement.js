import {replaceContent} from '../../../utils/domUtils.js';
import tasks from './tasks.js';
import audio from '../../components/audio.js';
import {countdownTimer} from '../../../utils/countdownTimer.js';

const gameplayManagement = (el, settings = {}) => {

    const db = firebase.database();
    const correctTaskRef = db.ref('roomManagement/itFollows/correctTask');
    const correctCountRef = db.ref('roomManagement/itFollows/correctCount');
    const usersRef = db.ref('roomManagement/itFollows/users');
    const instructionsTime = 15;
    let buttonCount = 6;
    let users;
    let numberToWin = 15;
    let data = {
        instructions: `You're being followed.`,
        subInstructions: `<div class="pre-subinstructions"><p>To escape, press the button on your phone to complete the ${numberToWin} tasks on the TV.</p><p>If the timer expires&hellip;so do you.</p><p>Get ready!</p></div>`,
        correctCount: 0,
        correctTask: null
    };
    let videoWrapperEl = null;
    let contentWrapperEl = null;
    let timerWrapperEl = null;

    const init = async () => {
        users = await getUsers();
        if (users) {
            renderWrappers();
            countdownTimer(timerWrapperEl, instructionsTime, onTimerExpiration);
        } else {
            db.ref('roomManagement/itFollows').update({
                correctTask: null,
                correctCount: 0,
                users: null,
                status: 'idle'
            }).then(() => init());
        }
    };

    const renderWrappers = () => {
        replaceContent(el, `
            <div class="itfollowstv itfollowstv-gameplay">
                <div class="wrapper">
                    <video preload="true" autoplay muted class="video js-video"></video>
                    <div class="js-content-wrapper content-wrapper">
                        <h1 class="js-instructions pre-instructions">${data.instructions}</h1>
                        ${data.subInstructions}
                    </div>
                    <div class="js-timer-wrapper timer-wrapper"></div>
                </div>
            </div>
        `);
        videoWrapperEl = el.querySelector('.js-video');
        contentWrapperEl = el.querySelector('.js-content-wrapper');
        timerWrapperEl = el.querySelector('.js-timer-wrapper');
    };

    const render = () => {
        replaceContent(contentWrapperEl, `
                <h1 class="js-instructions instructions">${data.instructions}</h1>
                <div class="correct-count">${data.correctCount} / ${numberToWin}</div>
            </div>
        `);
    };

    const onTimerExpiration = () => {
        replaceContent(timerWrapperEl, ``);
        bindEvents();
        start();
    };

    const start = () => {
        settings.onStartCallback();
        audio.play('heartbeat');
        startNewTask(true);
    };

    const startNewTask = (resetVideo = false) => {
        const correctTask = getRandomTask();
        saveUserTasks(correctTask);
        saveCorrectTask(correctTask);
        if (resetVideo === true) {
            videoWrapperEl.setAttribute('src', '../../video/warehouse.mp4');
        }
    };

    const saveUserTasks = correctTask => {
        const tasksArray = generateRandomizedTasksArray(correctTask);
        let updates = {};
        Object.keys(users).forEach((key, index) => {
            const userKey = users[key];
            const startIndex = index * buttonCount;
            const endIndex = startIndex + buttonCount;
            const tasksSet = tasksArray.slice(startIndex, endIndex);
            updates[`/roomManagement/itFollows/users/${userKey}/tasks`] = tasksSet;
            updates[`/roomManagement/itFollows/users/${userKey}/correctTask`] = correctTask;
        });
        db.ref().update(updates);
    };

    const generateRandomizedTasksArray = correctTask => {
        const userCount = users.length;
        const totalIncorrectTasksNeeded = (userCount * buttonCount) - 1;
        const incorrectTasks = tasks.filter(task => task.name !== correctTask.name);
        let randomizedTasks = Array.from({length: totalIncorrectTasksNeeded}, () => {
            const randomIndex = Math.floor(Math.random() * incorrectTasks.length);
            return incorrectTasks[randomIndex];
        });
        randomizedTasks.push(correctTask)
        return randomizedTasks.sort(() => .5 - Math.random());
    };

    const saveCorrectTask = correctTask => {
        correctTaskRef.set(correctTask);
    };

    const bindEvents = correctCountEl => {
        correctCountRef.on('value', snapshot => {
            const correctCount = snapshot.val();
            if (correctCount === numberToWin) {
                onWin();
            } else {
                if (correctCount !== 0) {
                    startNewTask();
                }
                onDbValChange(snapshot.val(), 'correctCount');
            }
        });
        correctTaskRef.on('value', snapshot => onDbValChange(snapshot.val().instructions, 'instructions'));
    };

    const onDbValChange = (val, property) => {
        data[property] = val;
        render();
    };

    const onWin = () => {
        reset();
        settings.onWinCallback();
        replaceContent(videoWrapperEl, ``);
    };

    const reset = () => {
        correctCountRef.off('value');
        correctTaskRef.off('value');
        correctCountRef.set(0);
        correctTaskRef.set(null);
        let updates = {};
        Object.keys(users).forEach(key => {
            const userKey = users[key];
            updates[`/roomManagement/itFollows/users/${userKey}/tasks`] = null;
            updates[`/roomManagement/itFollows/users/${userKey}/correctTask`] = null;
        });
        db.ref().update(updates);

        db.ref(`/roomManagement/itFollows`).update({
            winOrLose: true
        }).then(() => {
            db.ref(`/roomManagement/itFollows`).update({
                winOrLose: null
            });
        });
    };

    const getRandomTask = () => {
        return tasks[Math.floor(Math.random()*tasks.length)];
    };

    const getUsers = () => {
        return usersRef.once('value').then(snapshot => {
            return snapshot.val() ? Object.keys(snapshot.val()) : null;
        });
    };

    init();

    return {
        reset
    };

};

export default gameplayManagement;