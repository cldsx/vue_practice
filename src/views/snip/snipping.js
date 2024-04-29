import setStyle from "./xhtml/setStyle";
import snipping from "./snipping/index";

export default function (type, callback) {
    var bodyEl = document.getElementsByTagName("body")[0];
    var snippingEl = document.createElement("div");
    var viewEl = document.createElement("div");

    bodyEl.appendChild(snippingEl);
    snippingEl.setAttribute("snipio", "snipping");

    setStyle(snippingEl, {
        width: "100vw",
        height: "100vh",
        position: "fixed",
        left: 0,
        top: 0,
        zIndex: 9999999,
        backgroundColor: "rgb(0 0 0 / 4%)"
    });

    snippingEl.appendChild(viewEl);

    setStyle(viewEl, {
        position: "absolute",
        backgroundColor: "rgb(0 0 0 / 10%)"
    });
    var isSnipping = false; // 记录是否正在截图选择中
    var left, top; // 鼠标按下位置
    var width, height; // 区域尺寸

    snippingEl.addEventListener("mousedown", function (event) {
        left = event.clientX;
        top = event.clientY;

        isSnipping = true;
    });
    snippingEl.addEventListener('mousemove', function (event) {
        if (isSnipping) {
            // 截图选择之后的宽高
            width = event.clientX - left;
            height = event.clientY - top;
            var _left = left, _top = top, _width = width, _height = height;
            if (_width <= 0) { _left += _width; _width *= -1; }
            if (_height <= 0) { _top += _height; _height *= -1; }
            setStyle(viewEl, {
                left: _left + "px",
                top: _top + "px",
                width: _width + "px",
                height: _height + "px"
            });
        }
    })
    snippingEl.addEventListener('mouseup', function (event) {
        if (width <= 0) { left += width; width *= -1; }
        if (height <= 0) { top += height; height *= -1; }

        bodyEl.removeChild(snippingEl);
        snipping(left, top, width, height, bodyEl).then(function (base64) {
            callback(base64, width, height,left,top);
        });
    })

}