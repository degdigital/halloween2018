const audio = () => {

    const audioEl = document.querySelector('.js-audio');
    const path = '../../audio/';
    const suffix = '.mp3';

    const play = (filename, el = audioEl) => {
        el.setAttribute('src', `${path}/${filename}${suffix}`);
        stop();
        el.play();
    };

    const stop = (el = audioEl) => {
        el.pause();
    };

    return {
        play,
        stop
    };

};

const instance = audio();

export default instance;