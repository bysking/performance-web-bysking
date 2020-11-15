# performance-web-bysking
前端性能优化-学习笔记


# 前端性能优化学习笔记

> 第8章 前沿的性能优化解决方案

## 图片的优化

- 图标库
  1. iconfont[阿里巴巴矢量图标库](https://www.iconfont.cn/) -> 支持svg
  2. fontawesome.com 也是一个图标2

- 相比iconFont svg的优点
  1. 保持图片能力支持多色彩
  2. 独立的矢量图形
  3. xml语法，搜索引擎SEO和无障碍读屏软件读取

- svg在项目中集成使用
    
    1. 安装svg的loader: @svgr/webpack
    ```
    // webpack依赖安装，使用
    {
        test: /\.svg$/,
        use: ['@svg/webpack']
    }

    ```

    2. 引入svg
    ```
    import SvgCmp from './img/xxx.svg';
    // 当成一个组件使用
    <svg-cmp :width="100" color="red"/> // 需要传递基础属性才能展示
    ```

## FlexBox进行布局优化

- 绘制10万节点消耗时间(同一台电脑测试)----测试代码路径（src\example\flex-box\index.html）
```html
<div id="main" class="main">
    <!-- 10万个div -->
</div>

.main {
    width: 100%;
    height: 1000px;
    background-color: gray;
    
    /* flex布局测试2 */
    display: flex;
    flex-flow: row wrap;
}
.box {
    width: 100px;
    height: 100px;
    background-color: red;
    margin: 5px;

    /* float布局测试1 */
    /* float: left; */
}
```
  
> 1. float布局1700ms
> 1. flex布局660ms

- 结论： 

1. flex-box更高的性能实现方案
2. 容器有能力决定子元素的大小，顺序，对齐，间隔等
3. 双向布局


实现响应式布局

```html
<div>
    <div>top</div>
    <div>content</div>
    <div>nav</div>
    <div>ads</div>
    <div>footer</div>
</div>
```

flex: 1 100%; // 每个元素占1份，每个宽度100%
@media ass and (min-width: 700px) {
    aside {
        flex: 1 0 0; 均分占比1 缩小0 宽度0，让剩余空间进行比例均分
    }
}
@media ass and (min-width: 700px) {
    .main {
        flex: 3 0 0;
        order: 2;
    }

    .nav {
        order: 1;
    }

   .ads: {

        order: 3
    }

    .footer {
        order: 4;
    }
}


## 优化资源加载顺序

查看控制台-performance priority选项-查看资源优先级，浏览器默认安排（根据已有的固定经验，比如index.html最高）

- 优先级调整

1.preload 需要指定类型

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        .wrapper img {
            width: 100px;
            height: 100px;
        }
    </style>
    <!-- 提升加载优先级： 提前加载较晚出现但是对当前页面非常重要的资源 -->
    <link rel="preload" href="./img/logo2.jpg" as="image">
</head>
<body>
    <div id="wrapper">
        <a href="./product1.html">
            <img src="./img/logo1.jpg" alt="111" srcset="">
        </a>
        <a href="./product2.html">
            <img src="./img/logo2.jpg" alt="222" srcset="">
        </a>
    </div>
    <script src="./index.js"></script>
</body>
</html>
```
加载顺序由1-2变成2-1


如何加载字体：
在css文件中
```css
@import url(https://fonts.googleapis.com/css?family=Long+Cang); // 引入字体

.text {
    font-family: 'Long Cang'; // 使用字体
    font-weight: 400;
    font-size: 40px;
    font-style: normal;
    text-align: center;
}
```
在html中

```
 <div class="text">你好世界</div>
```


现在想把字体提前加载
```
<link as="font" type="font/woff2" rel="preload" href="https://fonts.gstatic.com/**字体路径">
```


2.prefetch 提前加载后面的页面需要的资源（仅在当前页面有空闲的时候，不会修改已有资源优先级）

## 图片延迟加载

```

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

```

webpack里面使用

```
import(/* webpackPrefetch: true */ 'LoginModal'); // 加上注释
```
