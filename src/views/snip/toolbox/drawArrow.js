import mousePosition from "../xhtml/mousePosition";

export default function () {
    var isDown = false;
    var beginX, beginY, realX, realY
    return {
        on: {
            mouseDown: function (event) {
                isDown = true;
                var p = mousePosition(this.view, event);
                this.arrowEl.style.display = ""

                this.arrowEl.style.width = "0px"
                this.arrowEl.style.height = "0px"
                this.arrowEl.setAttribute("arrow", "arrow")
                this.arrowEl.style.backgroundColor = "red"
                beginX = event.clientX
                beginY = event.clientY
                realX = p.x
                realY = p.y
            },
            mouseMove: function (event) {
                if (isDown) {
                    this.deltaEL.style.display = ""
                    var p1 = event.clientX - beginX
                    var p2 = event.clientY - beginY
                    this.arrowEl.style.height = "2px"

                    var width = Math.sqrt(p1 * p1 + p2 * p2);
                    var angle = Math.atan2(p1, p2) * 180 / Math.PI
                    console.log(angle)
                    // 画线
                    this.arrowEl.style.transformOrigin = "top left"
                    this.arrowEl.style.width = width + 'px'
                    this.arrowEl.style.transform = `rotate(${-angle + 90}deg)`
                    this.arrowEl.style.left = beginX + "px"
                    this.arrowEl.style.top = beginY + "px"
                    // 画箭头
                    // 宽高和deltaEL宽高保持一致
                    let w = 20, h = 20
                    // 宽高和deltaEL对角线一半的长度
                    let halfDialine = Math.sqrt(w * w + h * h) / 2;
                    let arrowAngel = -angle - 45
                    // this.deltaEL.innerText = arrowAngel
                    let leftOffset = -Math.sin((-angle + 90) * Math.PI / 180) * halfDialine
                    let topOffset = Math.cos((-angle + 90) * Math.PI / 180) * halfDialine
                    console.log('halfDialine', halfDialine)
                    console.log('leftOffset,topOffset', leftOffset, topOffset)
                    console.log('arrowAngel', arrowAngel)
                    console.log('lineangel', -angle + 90,)
                    console.log('angel', angle)

                    this.deltaEL.style.transformOrigin = "top left"
                    this.deltaEL.style.left = event.clientX + leftOffset + "px"
                    this.deltaEL.style.top = event.clientY + topOffset + "px"
                    this.deltaEL.style.transform = `rotate(${arrowAngel}deg)`
                }

            },
            mouseUp: function (event) {
                isDown = false;
                this.arrowEl.style.display = "none"
                this.deltaEL.style.display = "none"
                var p = mousePosition(this.view, event);
                var p1 = p.x - realX
                var p2 = p.y - realY
                var angle = Math.atan2(p1, p2) * 180 / Math.PI
                // 画线
                this.painter.config({
                    strokeStyle: "red",
                    lineWidth: 2
                }).beginPath().moveTo(realX, realY)
                    .lineTo(p.x, p.y).stroke()
                // 画箭头
                let w = 20, h = 20
                // 宽高和deltaEL对角线一半的长度
                let halfDialine = Math.sqrt(w * w + h * h) / 2;
                let verleftOffset = halfDialine * Math.cos((-angle + 90) * Math.PI / 180)
                let vertopOffset = halfDialine * Math.sin((-angle + 90) * Math.PI / 180)
                let sideleftOffset = halfDialine * Math.sin((-angle + 90) * Math.PI / 180)
                let sidetopOffset = -halfDialine * Math.cos((-angle + 90) * Math.PI / 180)
                this.painter.config({
                    strokeStyle: "red",
                    fillStyle: "red",
                    lineWidth: 1
                }).beginPath().moveTo(p.x, p.y)
                    .lineTo(p.x - sideleftOffset, p.y - sidetopOffset)
                    .lineTo(p.x + verleftOffset, p.y + vertopOffset)
                    .lineTo(p.x + sideleftOffset, p.y + sidetopOffset)
                    .lineTo(p.x, p.y).stroke().fill()

                this.history.push({
                    type: "arrow",
                    value: {
                        realX: realX,
                        realY: realY,
                        x: p.x,
                        y: p.y,
                        verleftOffset: verleftOffset,
                        vertopOffset: vertopOffset,
                        sideleftOffset: sideleftOffset,
                        sidetopOffset: sidetopOffset,
                    }
                })
            }

        }
    }
}