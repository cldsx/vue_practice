
import mousePosition from "../xhtml/mousePosition";
export default function () {
    var isDown = false;
    var beginX, beginY, width, height, realX, realY
    return {
        on: {
            mouseDown: function (event) {
                isDown = true;
                this.rectEl.style.display = ""
                this.rectEl.style.width = "0px"
                this.rectEl.style.height = "0px"
                this.rectEl.style.backgroundColor = "transparent"
                this.rectEl.style.borderColor = "red"
                var p = mousePosition(this.view, event);

                beginX = event.clientX;
                beginY = event.clientY;
                realX = p.x
                realY = p.y

            },
            mouseMove: function (event) {
                if (isDown) {
                    var p = mousePosition(this.view, event);
                    if ((event.clientX - beginX) < 0) {
                        this.rectEl.style.left = event.clientX + "px"
                        this.rectEl.style.width = (beginX - event.clientX) + "px"
                    } else {
                        this.rectEl.style.left = beginX + "px"
                        this.rectEl.style.width = (event.clientX - beginX) + "px"
                    }

                    if ((event.clientY - beginY) < 0) {
                        this.rectEl.style.top = event.clientY + "px"
                        this.rectEl.style.height = (beginY - event.clientY) + "px"
                    } else {
                        this.rectEl.style.top = beginY + "px"
                        this.rectEl.style.height = (event.clientY - beginY) + "px"
                    }
                }
            },
            mouseUp: function (event) {
                isDown = false;
                var p = mousePosition(this.view, event);
                this.rectEl.style.display = "none"
                this.painter.config({
                    strokeStyle: "red",
                    lineWidth: 1.5
                }).strokeRect(realX, realY, p.x - realX, p.y - realY)
                const w = p.x - realX > 0 ? p.x - realX : realX - p.x
                const h = p.y - realY > 0 ? p.y - realY : realY - p.y
                this.history.push({
                    type: "rect",
                    value: { x: realX, y: realY, width: w, height: h }
                });
            }
        }
    }
}