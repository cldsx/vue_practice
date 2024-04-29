
import Canvas from "./canvas";
import setStyle from "./xhtml/setStyle";

export default function (base64, width, height, left, top) {
    console.log(base64, width, height, left, top)
    var bodyEl = document.getElementsByTagName("body")[0];
    var editEl = document.createElement("div");
    var viewEl = document.createElement("div");

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
        left: left + 'px',
        top: top + "px",
        width: width + "px",
        height: height + "px",
        backgroundColor: "white"
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
        position: "absolute",
        left: left + 'px',
        top: top + "px",
        height: "30px",
        backgroundColor: "white",
        boxShadow: "0 0 5px 3px #607D8B",
        zIndex: "9999999"
    });

}