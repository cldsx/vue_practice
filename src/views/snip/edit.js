
import Canvas from "./canvas";
import setStyle from "./xhtml/setStyle";
import { createMosaic } from "./tool/mosaic";


export default function (base64, width, height, left, top, tool) {
    var bodyEl = document.getElementsByTagName("body")[0];
    var editEl = document.createElement("div");
    var viewEl = document.createElement("div");
    // 辅助div用于mouseMove
    var rectEl = document.createElement("div");
    var inputEl = document.createElement("input")
    var arrowEl = document.createElement("div")
    var deltaEL = document.createElement("div")
    bodyEl.appendChild(editEl);
    editEl.setAttribute("snipio", "edit");

    setStyle(editEl, {
        width: "100vw",
        height: "100vh",
        position: "fixed",
        left: 0,
        top: 0,
        zIndex: 9999999,
        backgroundColor: "rgb(0 0 0 / 67%)"
    });

    editEl.appendChild(viewEl);


    setStyle(viewEl, {
        position: "absolute",
        left: "calc(50vw - " + width * 0.5 + "px)",
        top: "calc(50vh - " + height * 0.5 + "px)",
        width: width + "px",
        height: height + "px",
        backgroundColor: "white"
    });
    viewEl.appendChild(rectEl)
    viewEl.appendChild(inputEl)
    viewEl.appendChild(arrowEl)
    viewEl.appendChild(deltaEL)
    setStyle(deltaEL, {
        position: "fixed",
        pointerEvents: "none",
        // 'border-top': '20px solid transparent',
        // 'border-bottom': '20px solid transparent',
        // 'border-left': '20px solid red',
        // 'border-right': '20px solid transparent',
        width: '20px',
        height: '20px',
        background: 'linear-gradient(45deg, red, red 50%, transparent 50%, transparent 100%)',
        display: 'none'
    })
    setStyle(arrowEl, {
        position: "fixed",
        pointerEvents: "none"
    })
    setStyle(inputEl, {
        position: "fixed",
        minHeight: "16px",
        minWidth: '60px',
        fontSize: "14px",
        lineHeight: "16px",
        outline: "none",
        border: '1px solid red',
        color: "red",
        backgroundColor: 'transparent',
        display: 'none'
    });
    inputEl.setAttribute('contentEditable', true)
    setStyle(rectEl, {
        position: "fixed",
        borderStyle: "solid",
        borderWidth: "2px",
        pointerEvents: "none"
    });
    var painter = new Canvas(viewEl);

    // 画布初始化绘制
    if (base64) {
        painter.drawImage(base64, 0, 0, width, height);
    } else {
        painter.config({
            fillStyle: "white"
        }).fillRect(0, 0, width, height);
    }

    // 编辑工具箱
    var toolboxEl = document.createElement("div");
    bodyEl.appendChild(toolboxEl);
    toolboxEl.setAttribute("snipio", "toolbox");

    setStyle(toolboxEl, {
        position: "fixed",
        right: "calc(50vw - " + width * 0.5 + "px)",
        bottom: "calc(50vh - " + (height * 0.5 + 30) + "px)",
        height: "30px",
        backgroundColor: "white",
        boxShadow: "0 0 5px 3px #607D8B",
        zIndex: "9999999"
    });

    var mosaicBase64 = createMosaic(width, height);
    setStyle(viewEl, {
        backgroundImage: "url(" + mosaicBase64 + ")",
        backgroundSize: "100% auto"
    });

    var drawHistroy = {};
    for (var k = 0; k < tool.length; k++) {
        if (tool[k].drawHistroy) {
            for (var key in tool[k].drawHistroy) {
                drawHistroy[key] = tool[k].drawHistroy[key];
            }
        }
    }
    console.log(drawHistroy)

    // 为工具箱提供的实例对象
    var instance = {

        // 绘制历史记录
        drawHistroy: function () {
            for (var i = 0; i < this.history.length; i++) {
                if (drawHistroy[this.history[i].type]) {
                    drawHistroy[this.history[i].type].call(this, this.history[i].value);
                } else { }
            }
        },

        // 获取当前画布base64
        toDataURL: function () {
            return new Promise(function (resolve) {
                painter.toDataURL().then(function (base64) {
                    painter.drawImage(mosaicBase64, 0, 0, width, height).then(function () {
                        painter.drawImage(base64, 0, 0, width, height).then(function () {
                            painter.toDataURL().then(function (_base64) {
                                resolve(_base64);
                            });
                        });
                    });
                });
            });
        },

        // 截图
        base64: base64,

        // 画布节点
        view: viewEl,
        // 辅助div
        rectEl: rectEl,
        inputEl: inputEl,
        arrowEl: arrowEl,
        deltaEL: deltaEL,
        // 画布尺寸
        width: width,
        height: height,

        // 画笔
        painter: painter,

        // 历史记录
        history: [],

        // 关闭
        close: function () {
            bodyEl.removeChild(editEl);
            bodyEl.removeChild(toolboxEl);
        }
    };

    // 注册的事件
    var on = {};

    viewEl.addEventListener("mousedown", function (event) {
        if (on.mouseDown) on.mouseDown.call(instance, event);
    });

    viewEl.addEventListener("mousemove", function (event) {
        if (on.mouseMove) on.mouseMove.call(instance, event);
    });

    viewEl.addEventListener("mouseup", function (event) {
        if (on.mouseUp) on.mouseUp.call(instance, event);
    });

    // 点击后需要维持点击状态的
    var holdEls = [];

    for (var index = 0; index < tool.length; index++) {
        (function (index) {
            var toolEl = document.createElement("div");
            toolboxEl.appendChild(toolEl);

            if (tool[index].hold) holdEls.push(toolEl);

            toolboxEl.setAttribute("snipio", "tool");
            setStyle(toolEl, {
                display: "inline-block",
                lineHeight: "24px",
                outline: "1px solid gray",
                backgroundColor: "#2196F3",
                color: "white",
                margin: "3px",
                fontWeight: "200",
                fontSize: "14px",
                padding: "0 5px",
                border: "none",
                outline: "none",
                cursor: "pointer",
                userSelect: "none"
            });

            toolEl.innerText = tool[index].label;
            toolEl.addEventListener("click", function () {
                var result = tool[index].callback.call(instance) || {};

                if (tool[index].hold) {
                    for (var i = 0; i < holdEls.length; i++)  holdEls[i].style.backgroundColor = "#2196F3";
                    toolEl.style.backgroundColor = "#076ec1";

                    // 更新事件
                    on = result.on || {};
                }
            });
        })(index);
    }

};