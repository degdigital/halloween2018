import {replaceContent} from '../../utils/domUtils.js';

const quietPlace = (el) => {

    const init = () => {};

    const start = () => {
        replaceContent(el, `
            Watch the screen for instructions!
        `);
    };

    init();

    return {
        start
    };

};

export default quietPlace;