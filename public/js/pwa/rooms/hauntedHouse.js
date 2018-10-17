import {replaceContent} from '../../utils/domUtils.js';

const hauntedHouse = (el, options = {}) => {

    const roomOneDataRef = firebase.app().database().ref('roomData/hauntedHouse/roomOne');
    const defaults = {
        holdTriggerClass: 'hauntedhouse-hold-trigger',
        endTriggerClass: 'hauntedhouse-end-trigger'
    };
    const  settings = {...defaults, ...options};

    const init = () => {
        bindEvents()
    };

    const start = () => {
        replaceContent(el, `
            Haunted House
            <button class="${settings.holdTriggerClass}">Hold to enter</button>
            <button class="${settings.endTriggerClass}">End room</button>
        `);
    };

    const bindEvents = () => {
        el.addEventListener('click', e => {
            const clickedEl = e.target;
            if (clickedEl.matches(`.${settings.endTriggerClass}`)) {
                settings.onEnd(settings.roomId);
            }
        });
        el.addEventListener('mousedown', e => {
            const clickedEl = e.target;
            if (clickedEl.matches(`.${settings.holdTriggerClass}`)) {
                onMouseDown();
            }
        });
        el.addEventListener('mouseup', e => {
            const clickedEl = e.target;
            if (clickedEl.matches(`.${settings.holdTriggerClass}`)) {
                onMouseUp();
            }
        });
    };

    const onMouseDown = () => {
        const userData = getUserData();
        roomOneDataRef.update({
            [userData.key]: true
        });
    };

    const onMouseUp = () => {

    };

    const getUserData = () => {
        return JSON.parse(localStorage.getItem('degHalloween'));
    };

    init();

    return {
        start
    };

};

export default hauntedHouse;