function render() {
    const html = `
        <div class="loading centered">Loading...</div>
    `;
    
    document.body.innerHTML = html;
}

function loader() {
    return {
        render,
        destroy: () => {}
    };
}

export default loader();