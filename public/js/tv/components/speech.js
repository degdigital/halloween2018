const speech = (options = {}) => {

    const defaults = {
        voiceName: 'Whisper'
    };
    let settings;
    let voice;

    const init = () => {
        settings = {...defaults, ...options};
        bindEvents();
    };

    const bindEvents = () => {
        window.speechSynthesis.onvoiceschanged = () => loadVoices();
    };

    const loadVoices = () => {
        const voices = speechSynthesis.getVoices();
        voice = voices.filter(voiceObj => voiceObj.name === settings.voiceName)[0];
    };

    const speak = phrase => {
        const msg = new SpeechSynthesisUtterance();
        msg.text = phrase;
        msg.volume = 1;
        msg.rate = 0.5;
        msg.pitch = 1;
        msg.voice = voice;
        
        speechSynthesis.speak(msg);
	};

    init();
    
    return {
        speak
    };

};

export default speech;