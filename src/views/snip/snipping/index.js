import elToTemplate from './elToTemplate';
import html2canvas from 'html2canvas'
export default function (_left, _top, _width, _height, el) {
    return new Promise(function (resolve, reject) {

        // setTimeout(() => {
        //     html2canvas(el, {
        //         width: _width,
        //         height: _height,
        //         useCORS: true, // 【重要】开启跨域配置
        //         scale: window.devicePixelRatio < 3 ? window.devicePixelRatio : 2,
        //         allowTaint: true, // 允许跨域图片
        //     }).then((canvas) => {

        //         var ctx = document.createElement('canvas')
        //         ctx.setAttribute('width', _width)
        //         ctx.setAttribute('height', _height)
        //         var painter = ctx.getContext('2d');
        //         // 绘制
        //         console.log('图片截图', _left, _top, _width, _height)
        //         painter.drawImage(canvas, _left, _top, _width, _height, 0, 0, _width, _height);

        //         resolve(ctx.toDataURL());


        //     })
        // }, 100);
        var width = el.offsetWidth;
        var height = el.offsetHeight;

        // var img = document.createElement('img');

        // img.setAttribute('width', width);
        // img.setAttribute('height', height);
        // img.setAttribute('src', "data:image/svg+xml;charset=utf-8,<svg xmlns='http://www.w3.org/2000/svg' width='" + width + "' height='" + height + "'><foreignObject width='" + width + "' height='" + height + "' ><body style='margin:0px;' xmlns='http://www.w3.org/1999/xhtml'>" + template + "</body></foreignObject></svg>");

        // setTimeout(function () {
        // el.scrollTop = 1500
        html2canvas(el, {
            // width: width,
            // height: height
            scale: 1,
            ignoreElements: function (elements) {
                const arr = ["SCRIPT", "#comment", "NOSCRIPT"]
                if (arr.indexOf(elements.nodeName) > -1) {
                    return true
                }
                return false
            }
        }).then(function (img) {

            // 准备画布
            var canvas = document.createElement('canvas');
            canvas.setAttribute('width', _width);
            canvas.setAttribute('height', _height);

            var painter = canvas.getContext('2d');

            // 绘制底色
            painter.fillStyle = "white";
            painter.fillRect(0, 0, _width, _height);
            console.log([img])
            // 绘制截图
            painter.drawImage(img, _left, _top + document.documentElement.scrollTop, _width, _height, 0, 0, _width, _height);

            resolve(canvas.toDataURL());

        });
    })

}