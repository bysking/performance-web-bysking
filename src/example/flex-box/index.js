window.addEventListener('load', () => {
    let mainNode = document.getElementById('main');

    for(let i=0; i < 100000; i++) {
        let div = document.createElement('div');
        div.setAttribute('class', 'box')
        mainNode.appendChild(div)
    }
})