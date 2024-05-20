import mousePosition from "../xhtml/mousePosition";
export default function () {
    var isInputText = false
    let textPosition
    let inputTexts
    return {
        on: {
            mouseDown: function (event) {
                var p = mousePosition(this.view, event);
                if (this.inputEl.value) {
                    this.inputEl.style.display = "none"
                } else {
                    this.inputEl.style.display = ""
                }
                if (isInputText) {
                    inputTexts = (this.inputEl.value || "").replace(/\n\n/g, "\n").split(/\n/)
                    if (this.inputEl.value) {
                        this.history.push({
                            type: "text",
                            value: { inputTexts: inputTexts, textPosition: textPosition }
                        });
                    }
                    this.inputEl.value = ""
                    for (let index = 0; index < inputTexts.length; index++) {
                        this.painter.config({
                            fillStyle: "red",
                            lineWidth: 1,
                            fontSize: 14,
                        }).fillText(inputTexts[index], textPosition[0], textPosition[1] + (index + 0.5) * 16)
                    }

                    isInputText = false
                }




                textPosition = [p.x, p.y]

                this.inputEl.style.left = event.clientX + "px"
                this.inputEl.style.top = (event.clientY - 7) + "px"
                setTimeout(() => {
                    this.inputEl.focus()

                })

                isInputText = true
            },
            mouseMove: function (event) {

            },
            mouseUp: function (event) {

                // this.history.push({
                //     type: "text",
                //     value: { inputTexts: inputTexts, textPosition: textPosition }
                // });
            }
        }
    }
}