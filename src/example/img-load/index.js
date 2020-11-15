
function loadResource (url) { // 预加载函数
    let link = document.createElement('li');

    link.rel = 'preload';
    link.href = url;
    link.as = 'image'

    document.head.appendChild(link)
}

function execResource(url) { // 图片赋值
    let image = document.getElementById('xxxx');
    image.src = url
}