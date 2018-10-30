const audio = () => {

    const backgroundEl = document.querySelector('.js-audio-background');
    const heartbeatEl = document.querySelector('.js-audio-heartbeat');
    const screamEl = document.querySelector('.js-audio-scream');
    const path = '../../audio/';
    const suffix = '.mp3';

    const getMatchingEl = filename => {
        if (filename === 'background') {
            return backgroundEl;
        }
        if (filename === 'heartbeat') {
            return heartbeatEl;
        }
        if (filename === 'scream') {
            return screamEl;
        }
    };

    const play = filename => {
        const el = getMatchingEl(filename);
        el.setAttribute('src', `${path}/${filename}${suffix}`);
        el.play();
    };

    const stop = (filename) => {
        const el = getMatchingEl(filename);
        el.pause();
    };

    return {
        play,
        stop
    };

};

const instance = audio();

export default instance;