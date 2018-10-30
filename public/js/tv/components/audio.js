const audio = () => {

    const audioEl = document.querySelector('.js-audio');
    const path = '../../audio/';
    const suffix = '.mp3';

    const play = (filename, el = audioEl) => {
        el.setAttribute('src', `${path}/${filename}${suffix}`);
        el.pause();
        el.play();
    }

    return {
        play
    };

};

const instance = audio();

export default instance;