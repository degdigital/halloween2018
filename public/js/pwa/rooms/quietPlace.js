import {replaceContent} from '../../utils/domUtils.js';

const quietPlace = (el, options = {}) => {

    const defaults = {
        endTriggerClass: 'quietplace-end-trigger'
    };
    const  settings = {...defaults, ...options};

    const init = () => {
        bindEvents()
    };

    const start = () => {
        replaceContent(el, `
            A Quiet Place
            <button class="${settings.endTriggerClass}">End room</button>
        `);
    };

    const bindEvents = () => {
        el.addEventListener('click', e => {
            const clickedEl = e.target;
            if (clickedEl.matches(`.${settings.endTriggerClass}`)) {
                settings.onEnd(settings.roomId);
            }
        })
    };

    init();

    return {
        start
    };

};

export default quietPlace;