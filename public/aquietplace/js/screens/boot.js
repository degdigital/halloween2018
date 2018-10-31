import router from '../router.js';

function render() {
    const html = `
        <button class="button centered" id="boot-button">Boot</button>
    `;
    
    document.body.innerHTML = html;
    document.addEventListener('click', onClick);
}

function destroy() {
    document.removeEventListener('click', onClick);
}

function onClick(e) {
    if(e.target.id === 'boot-button') {
        router.route('loader');
    }
}

function boot() {
    return {
        render,
        destroy
    };
}

export default boot();