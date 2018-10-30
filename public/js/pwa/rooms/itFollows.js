import {replaceContent} from '../../utils/domUtils.js';

const itFollows = (el, options = {}) => {

    const defaults = {
        endTriggerClass: 'itfollows-end-trigger',
        taskButtonClass: 'itfollows-task-button'
    };
    const settings = {...defaults, ...options};
    const correctCountRef = firebase.database().ref(`/roomManagement/itFollows/correctCount`);
    let userData;
    let buttonsWrapperEl;
    let correctTask;

    const init = () => {
        userData = getUserData();
        bindEvents();
    };

    const start = () => {
        replaceContent(el, `
            <div class="itfollows-wrapper">
                <div class="js-buttons-wrapper">
                    <h1>It Follows</h1>
                </div>
            </div>
        `);
        buttonsWrapperEl = buttonsWrapperEl || el.querySelector('.js-buttons-wrapper');
        buttonsWrapperEl.classList.remove('flicker');
    };

    const bindEvents = () => {
        el.addEventListener('click', e => {
            const clickedEl = e.target;
            if (clickedEl.matches(`.${settings.endTriggerClass}`)) {
                settings.onEnd(settings.roomId);
            }
            if (clickedEl.matches(`.${settings.taskButtonClass}`)) {
                onTaskButtonClick(clickedEl);
            }
        });
        firebase.database().ref(`/roomManagement/itFollows/users/${userData.key}/`).on('value', onUserDataChange);
        firebase.database().ref(`/roomManagement/itFollows/winOrLose`).on('value', winOrLose);
    };

    const onUserDataChange = snapshot => {
        const vals = snapshot.val();
        if (vals && vals.correctTask) {
            correctTask = vals.correctTask;
        }
        renderButtons(vals);
    };

    const winOrLose = snapshot => {
        if (snapshot.val() === true) {
            replaceContent(el, `
                <div class="itfollows-wrapper"></div>
            `);
        }
    }

    const onTaskButtonClick = el => {
        if (el.name === correctTask.name && isTrueStr(el.value) === correctTask.value) {
            correctCountRef.once('value').then(snapshot => {
                correctCountRef.set(snapshot.val() + 1);
            });
        }
    };

    const renderButtons = vals => {
        if (vals && vals.tasks && vals.tasks.length > 0) {
            replaceContent(buttonsWrapperEl, vals.tasks.reduce((output, task) => `
                ${output}
                <button class="${settings.taskButtonClass}" name="${task.name}" value="${task.value}">${task.label}</button>
            `, ''));
            buttonsWrapperEl.classList.add('flicker');
        }
    };

    const getUserData = () => {
        return JSON.parse(localStorage.getItem('degHalloween'));
    };

    const isTrueStr = str => str === 'true';

    init();

    return {
        start
    };

};

export default itFollows;