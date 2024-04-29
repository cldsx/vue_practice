var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

var rotate = function (cx, cy, deg, x, y) {
    var cos = Math.cos(deg), sin = Math.sin(deg);
    return [
        +((x - cx) * cos - (y - cy) * sin + cx).toFixed(7),
        +((x - cx) * sin + (y - cy) * cos + cy).toFixed(7)
    ];
};
function arc (beginA, rotateA, cx, cy, r1, r2, doback) {
    if (rotateA < 0) {
        beginA += rotateA;
        rotateA *= -1;
    }
    var temp = [];
    var p;
    p = rotate(0, 0, beginA, r1, 0);
    temp[0] = p[0];
    temp[1] = p[1];
    p = rotate(0, 0, rotateA, p[0], p[1]);
    temp[2] = p[0];
    temp[3] = p[1];
    p = rotate(0, 0, beginA, r2, 0);
    temp[4] = p[0];
    temp[5] = p[1];
    p = rotate(0, 0, rotateA, p[0], p[1]);
    temp[6] = p[0];
    temp[7] = p[1];
    doback(beginA, beginA + rotateA, temp[0] + cx, temp[1] + cy, temp[4] + cx, temp[5] + cy, temp[2] + cx, temp[3] + cy, temp[6] + cx, temp[7] + cy, (r2 - r1) * 0.5);
}

var initText = function (painter, config, x, y, deg) {
    painter.beginPath();
    painter.translate(x, y);
    painter.rotate(deg);
    painter.font =
        config.fontStyle +
            " " +
            config.fontWeight +
            " " +
            config.fontSize +
            "px " +
            config.fontFamily;
    return painter;
};
var initArc = function (painter, config, cx, cy, r1, r2, beginDeg, deg) {
    if (r1 > r2) {
        var temp = r1;
        r1 = r2;
        r2 = temp;
    }
    beginDeg = beginDeg % (Math.PI * 2);
    if (deg >= Math.PI * 1.999999 || deg <= -Math.PI * 1.999999) {
        deg = Math.PI * 2;
    }
    else {
        deg = deg % (Math.PI * 2);
    }
    arc(beginDeg, deg, cx, cy, r1, r2, function (beginA, endA, begInnerX, begInnerY, begOuterX, begOuterY, endInnerX, endInnerY, endOuterX, endOuterY, r) {
        if (r < 0)
            r = -r;
        painter.beginPath();
        painter.moveTo(begInnerX, begInnerY);
        painter.arc(cx, cy, r1, beginA, endA, false);
        if (config.arcEndCap == "round")
            painter.arc((endInnerX + endOuterX) * 0.5, (endInnerY + endOuterY) * 0.5, r, endA - Math.PI, endA, true);
        else if (config.arcEndCap == "-round")
            painter.arc((endInnerX + endOuterX) * 0.5, (endInnerY + endOuterY) * 0.5, r, endA - Math.PI, endA, false);
        else
            painter.lineTo(endOuterX, endOuterY);
        painter.arc(cx, cy, r2, endA, beginA, true);
        if (config.arcStartCap == "round")
            painter.arc((begInnerX + begOuterX) * 0.5, (begInnerY + begOuterY) * 0.5, r, beginA, beginA - Math.PI, true);
        else if (config.arcStartCap == "-round")
            painter.arc((begInnerX + begOuterX) * 0.5, (begInnerY + begOuterY) * 0.5, r, beginA, beginA - Math.PI, false);
        else
            painter.lineTo(begInnerX, begInnerY);
    });
    if (config.arcStartCap == "butt")
        painter.closePath();
    return painter;
};
var initCircle = function (painter, cx, cy, r) {
    painter.beginPath();
    painter.moveTo(cx + r, cy);
    painter.arc(cx, cy, r, 0, Math.PI * 2);
    return painter;
};
var initRect = function (painter, x, y, width, height) {
    painter.beginPath();
    painter.rect(x, y, width, height);
    return painter;
};

function texts (painter, contents, width, height, doback) {
    var lineNumber = 0, content = "";
    for (var i = 0; i < contents.length; i++) {
        if (painter.measureText(content + contents[i]).width > width || /\n$/.test(content)) {
            lineNumber += 1;
            doback(content, (lineNumber - 0.5) * height);
            content = contents[i];
        }
        else if (i == contents.length - 1) {
            lineNumber += 1;
            doback(content + contents[i], (lineNumber - 0.5) * height);
        }
        else {
            content += contents[i];
        }
    }
    return lineNumber * height;
}

var Painter = (function () {
    function Painter(canvas, opts, region, isPainter, scaleSize) {
        if (opts === void 0) { opts = {}; }
        if (isPainter === void 0) { isPainter = false; }
        this.__region = null;
        this.__onlyRegion = false;
        this.__specialConfig = {
            "fontSize": 16,
            "fontFamily": "sans-serif",
            "fontWeight": 400,
            "fontStyle": "normal",
            "arcStartCap": 'butt',
            "arcEndCap": 'butt'
        };
        this.__initConfig = {
            "fillStyle": 'black',
            "strokeStyle": 'black',
            "lineWidth": 1,
            "textAlign": 'left',
            "textBaseline": 'middle',
            "lineDash": [],
            "shadowBlur": 0,
            "shadowColor": "black"
        };
        this.painter = canvas.getContext("2d", opts);
        this.__region = region;
        this.__isPainter = isPainter;
        this.painter.textBaseline = 'middle';
        this.painter.textAlign = 'left';
    }
    Painter.prototype.useConfig = function (key, value) {
        if (this.__region) {
            if (['fillStyle', 'strokeStyle', 'shadowBlur', 'shadowColor'].indexOf(key) < 0) {
                this.__region.useConfig(key, value);
            }
        }
        if (this.__isPainter && this.__onlyRegion)
            return this;
        if (key == 'lineDash') {
            if (this.painter.setLineDash)
                this.painter.setLineDash(value);
        }
        else if (key in this.__specialConfig) {
            if (key == 'fontSize') {
                value = Math.round(value);
            }
            this.__specialConfig[key] = value;
        }
        else if (key in this.__initConfig) {
            this.painter[key] = value;
        }
        else {
            throw new Error('Illegal configuration item of painter : ' + key + " !");
        }
        return this;
    };
    Painter.prototype.fillText = function (text, x, y, deg) {
        if (deg === void 0) { deg = 0; }
        if (this.__region)
            this.__region.fillText(text, x, y, deg);
        if (this.__isPainter && this.__onlyRegion)
            return this;
        this.painter.save();
        initText(this.painter, this.__specialConfig, x, y, deg).fillText(text, 0, 0);
        this.painter.restore();
        return this;
    };
    Painter.prototype.strokeText = function (text, x, y, deg) {
        if (deg === void 0) { deg = 0; }
        if (this.__region)
            this.__region.strokeText(text, x, y, deg);
        if (this.__isPainter && this.__onlyRegion)
            return this;
        this.painter.save();
        initText(this.painter, this.__specialConfig, x, y, deg).strokeText(text, 0, 0);
        this.painter.restore();
        return this;
    };
    Painter.prototype.fullText = function (text, x, y, deg) {
        if (deg === void 0) { deg = 0; }
        if (this.__region)
            this.__region.fullText(text, x, y, deg);
        if (this.__isPainter && this.__onlyRegion)
            return this;
        this.painter.save();
        initText(this.painter, this.__specialConfig, x, y, deg);
        this.painter.fillText(text, 0, 0);
        this.painter.strokeText(text, 0, 0);
        this.painter.restore();
        return this;
    };
    Painter.prototype.fillTexts = function (contents, x, y, width, lineHeight, deg) {
        var _this = this;
        if (lineHeight === void 0) { lineHeight = 1.2; }
        if (deg === void 0) { deg = 0; }
        var h = 0;
        if (this.__region)
            h = this.__region.fillTexts(contents, x, y, width, lineHeight);
        if (this.__isPainter && this.__onlyRegion)
            return h;
        this.painter.save();
        initText(this.painter, this.__specialConfig, x, y, deg);
        var height = texts(this.painter, contents, width, this.__specialConfig.fontSize * lineHeight, function (content, top) {
            _this.painter.fillText(content, 0, top);
        });
        this.painter.restore();
        return height;
    };
    Painter.prototype.strokeTexts = function (contents, x, y, width, lineHeight, deg) {
        var _this = this;
        if (lineHeight === void 0) { lineHeight = 1.2; }
        if (deg === void 0) { deg = 0; }
        var h = 0;
        if (this.__region)
            h = this.__region.fillTexts(contents, x, y, width, lineHeight);
        if (this.__isPainter && this.__onlyRegion)
            return h;
        this.painter.save();
        initText(this.painter, this.__specialConfig, x, y, deg);
        var height = texts(this.painter, contents, width, this.__specialConfig.fontSize * lineHeight, function (content, top) {
            _this.painter.strokeText(content, 0, top);
        });
        this.painter.restore();
        return height;
    };
    Painter.prototype.fullTexts = function (contents, x, y, width, lineHeight, deg) {
        var _this = this;
        if (lineHeight === void 0) { lineHeight = 1.2; }
        if (deg === void 0) { deg = 0; }
        var h = 0;
        if (this.__region)
            h = this.__region.fillTexts(contents, x, y, width, lineHeight);
        if (this.__isPainter && this.__onlyRegion)
            return h;
        this.painter.save();
        initText(this.painter, this.__specialConfig, x, y, deg);
        var height = texts(this.painter, contents, width, this.__specialConfig.fontSize * lineHeight, function (content, top) {
            _this.painter.fillText(content, 0, top);
            _this.painter.strokeText(content, 0, top);
        });
        this.painter.restore();
        return height;
    };
    Painter.prototype.beginPath = function () {
        if (this.__region)
            this.__region.beginPath();
        if (this.__isPainter && this.__onlyRegion)
            return this;
        this.painter.beginPath();
        return this;
    };
    Painter.prototype.closePath = function () {
        if (this.__region)
            this.__region.closePath();
        if (this.__isPainter && this.__onlyRegion)
            return this;
        this.painter.closePath();
        return this;
    };
    Painter.prototype.moveTo = function (x, y) {
        if (this.__region)
            this.__region.moveTo(x, y);
        if (this.__isPainter && this.__onlyRegion)
            return this;
        this.painter.moveTo(Math.round(x) + 0.5, Math.round(y) + 0.5);
        return this;
    };
    Painter.prototype.lineTo = function (x, y) {
        if (this.__region)
            this.__region.lineTo(x, y);
        if (this.__isPainter && this.__onlyRegion)
            return this;
        this.painter.lineTo(Math.round(x) + 0.5, Math.round(y) + 0.5);
        return this;
    };
    Painter.prototype.arc = function (x, y, r, beginDeg, deg) {
        if (this.__region)
            this.__region.arc(x, y, r, beginDeg, deg);
        if (this.__isPainter && this.__onlyRegion)
            return this;
        this.painter.arc(x, y, r, beginDeg, beginDeg + deg, deg < 0);
        return this;
    };
    Painter.prototype.fill = function () {
        if (this.__region)
            this.__region.fill();
        if (this.__isPainter && this.__onlyRegion)
            return this;
        this.painter.fill();
        return this;
    };
    Painter.prototype.stroke = function () {
        if (this.__region)
            this.__region.stroke();
        if (this.__isPainter && this.__onlyRegion)
            return this;
        this.painter.stroke();
        return this;
    };
    Painter.prototype.full = function () {
        if (this.__region)
            this.__region.full();
        if (this.__isPainter && this.__onlyRegion)
            return this;
        this.painter.fill();
        this.painter.stroke();
        return this;
    };
    Painter.prototype.save = function () {
        if (this.__region)
            this.__region.save();
        if (this.__isPainter && this.__onlyRegion)
            return this;
        this.painter.save();
        return this;
    };
    Painter.prototype.restore = function () {
        if (this.__region)
            this.__region.restore();
        if (this.__isPainter && this.__onlyRegion)
            return this;
        this.painter.restore();
        return this;
    };
    Painter.prototype.clip = function () {
        if (this.__region)
            this.__region.clip();
        if (this.__isPainter && this.__onlyRegion)
            return this;
        this.painter.clip();
        return this;
    };
    Painter.prototype.quadraticCurveTo = function (cpx, cpy, x, y) {
        if (this.__region)
            this.__region.quadraticCurveTo(cpx, cpy, x, y);
        if (this.__isPainter && this.__onlyRegion)
            return this;
        this.painter.quadraticCurveTo(cpx, cpy, x, y);
        return this;
    };
    Painter.prototype.bezierCurveTo = function (cp1x, cp1y, cp2x, cp2y, x, y) {
        if (this.__region)
            this.__region.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y);
        if (this.__isPainter && this.__onlyRegion)
            return this;
        this.painter.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y);
        return this;
    };
    Painter.prototype.clearRect = function (x, y, w, h) {
        if (this.__region)
            this.__region.clearRect(x, y, w, h);
        if (this.__isPainter && this.__onlyRegion)
            return this;
        this.painter.clearRect(x, y, w, h);
        return this;
    };
    Painter.prototype.fillArc = function (cx, cy, r1, r2, beginDeg, deg) {
        if (this.__region)
            this.__region.fillArc(cx, cy, r1, r2, beginDeg, deg);
        if (this.__isPainter && this.__onlyRegion)
            return this;
        initArc(this.painter, this.__specialConfig, cx, cy, r1, r2, beginDeg, deg).fill();
        return this;
    };
    Painter.prototype.strokeArc = function (cx, cy, r1, r2, beginDeg, deg) {
        if (this.__region)
            this.__region.strokeArc(cx, cy, r1, r2, beginDeg, deg);
        if (this.__isPainter && this.__onlyRegion)
            return this;
        initArc(this.painter, this.__specialConfig, cx, cy, r1, r2, beginDeg, deg).stroke();
        return this;
    };
    Painter.prototype.fullArc = function (cx, cy, r1, r2, beginDeg, deg) {
        if (this.__region)
            this.__region.fullArc(cx, cy, r1, r2, beginDeg, deg);
        if (this.__isPainter && this.__onlyRegion)
            return this;
        initArc(this.painter, this.__specialConfig, cx, cy, r1, r2, beginDeg, deg);
        this.painter.fill();
        this.painter.stroke();
        return this;
    };
    Painter.prototype.fillCircle = function (cx, cy, r) {
        if (this.__region)
            this.__region.fillCircle(cx, cy, r);
        if (this.__isPainter && this.__onlyRegion)
            return this;
        initCircle(this.painter, cx, cy, r).fill();
        return this;
    };
    Painter.prototype.strokeCircle = function (cx, cy, r) {
        if (this.__region)
            this.__region.strokeCircle(cx, cy, r);
        if (this.__isPainter && this.__onlyRegion)
            return this;
        initCircle(this.painter, cx, cy, r).stroke();
        return this;
    };
    Painter.prototype.fullCircle = function (cx, cy, r) {
        if (this.__region)
            this.__region.fullCircle(cx, cy, r);
        if (this.__isPainter && this.__onlyRegion)
            return this;
        initCircle(this.painter, cx, cy, r);
        this.painter.fill();
        this.painter.stroke();
        return this;
    };
    Painter.prototype.fillRect = function (x, y, width, height) {
        if (this.__region)
            this.__region.fillRect(x, y, width, height);
        if (this.__isPainter && this.__onlyRegion)
            return this;
        initRect(this.painter, x, y, width, height).fill();
        return this;
    };
    Painter.prototype.strokeRect = function (x, y, width, height) {
        if (this.__region)
            this.__region.strokeRect(x, y, width, height);
        if (this.__isPainter && this.__onlyRegion)
            return this;
        initRect(this.painter, x, y, width, height).stroke();
        return this;
    };
    Painter.prototype.fullRect = function (x, y, width, height) {
        if (this.__region)
            this.__region.fullRect(x, y, width, height);
        if (this.__isPainter && this.__onlyRegion)
            return this;
        initRect(this.painter, x, y, width, height);
        this.painter.fill();
        this.painter.stroke();
        return this;
    };
    Painter.prototype.draw = function () {
        return Promise.resolve();
    };
    Painter.prototype.drawImage = function (img, x, y, w, h, isImage) {
        var _this = this;
        if (isImage === void 0) { isImage = false; }
        return new Promise(function (resolve) {
            if (_this.__region) {
                _this.__region.fillRect(x, y, w, h);
            }
            if (_this.__isPainter && _this.__onlyRegion) {
                resolve({});
                return;
            }
            if (typeof img == 'string' && !isImage) {
                var imgInstance_1 = new Image();
                imgInstance_1.onload = function () {
                    _this.painter.drawImage(imgInstance_1, 0, 0, imgInstance_1.width, imgInstance_1.height, x, y, w, h);
                    resolve({});
                };
                imgInstance_1.src = img;
            }
            else {
                _this.painter.drawImage(img, 0, 0, w, h, x, y, w, h);
                resolve({});
            }
        });
    };
    return Painter;
}());

function assemble (begin, end, step, count) {
    var val = [];
    for (var index = 0; index < count; index++)
        val[index] = begin;
    return function () {
        for (var i = 0; i < count; i++) {
            if (val[i] + step < end) {
                val[i] = +(val[i] + step).toFixed(7);
                break;
            }
            else if (i < count - 1) {
                val[i] = begin;
            }
        }
        return val;
    };
}

var enhanceGradient = function (gradient) {
    var enhanceGradient = {
        "value": function () {
            return gradient;
        },
        "setColor": function (stop, color) {
            gradient.addColorStop(stop, color);
            return enhanceGradient;
        }
    };
    return enhanceGradient;
};
var linearGradient = function (painter, x0, y0, x1, y1) {
    var gradient = painter.createLinearGradient(x0, y0, x1, y1);
    return enhanceGradient(gradient);
};
var radialGradient = function (painter, cx, cy, r) {
    var gradient = painter.createRadialGradient(cx, cy, 0, cx, cy, r);
    return enhanceGradient(gradient);
};

var Canvas$1 = (function (_super) {
    __extends(Canvas, _super);
    function Canvas(ViewCanvas, RegionCanvas, opts, scaleSize) {
        if (opts === void 0) { opts = {}; }
        if (scaleSize === void 0) { scaleSize = 1; }
        var _this = _super.call(this, ViewCanvas, opts, RegionCanvas ? new Painter(RegionCanvas, {
            willReadFrequently: true,
        }) : undefined, true, scaleSize) || this;
        _this.name = "Canvas";
        _this.__regionList = {};
        _this.__regionAssemble = assemble(0, 255, 10, 3);
        _this.__scaleSize = scaleSize;
        _this.setRegion("");
        return _this;
    }
    Canvas.prototype.config = function (configs) {
        for (var key in configs) {
            this.useConfig(key, configs[key]);
        }
        return this;
    };
    Canvas.prototype.onlyRegion = function (flag) {
        this.__onlyRegion = flag;
        return this;
    };
    Canvas.prototype.setRegion = function (regionName) {
        if (this.__region) {
            if (regionName) {
                if (this.__regionList[regionName] == void 0) {
                    var tempColor = this.__regionAssemble();
                    this.__regionList[regionName] =
                        "rgb(" + tempColor[0] + "," + tempColor[1] + "," + tempColor[2] + ")";
                }
                this.__region.useConfig("fillStyle", this.__regionList[regionName]) &&
                    this.__region.useConfig("strokeStyle", this.__regionList[regionName]);
            }
            else {
                this.__region.useConfig("fillStyle", "#000000") &&
                    this.__region.useConfig("strokeStyle", "#000000");
            }
        }
        return this;
    };
    Canvas.prototype.getRegion = function (x, y) {
        var _this = this;
        return new Promise(function (resolve) {
            var imgData = _this.__region ? _this.__region.painter.getImageData(x - 0.5, y - 0.5, 1, 1) : {
                data: [0, 0, 0, 0]
            };
            var currentRGBA = imgData.data;
            var doit = function () {
                if (_this.__region) {
                    for (var key in _this.__regionList) {
                        if ("rgb(" +
                            currentRGBA[0] +
                            "," +
                            currentRGBA[1] +
                            "," +
                            currentRGBA[2] +
                            ")" ==
                            _this.__regionList[key]) {
                            resolve(key);
                            break;
                        }
                    }
                }
                resolve("");
            };
            if (currentRGBA) {
                doit();
            }
            else {
                imgData.then(function (data) {
                    currentRGBA = data;
                    doit();
                });
            }
        });
    };
    Canvas.prototype.textWidth = function (text) {
        this.painter.save();
        initText(this.painter, this.__specialConfig, 0, 0, 0);
        var width = this.painter.measureText(text + "").width;
        this.painter.restore();
        return width;
    };
    Canvas.prototype.getContext = function (isRegion) {
        if (isRegion === void 0) { isRegion = false; }
        return isRegion ? (this.__region ? this.__region.painter : null) : this.painter;
    };
    Canvas.prototype.getInfo = function () {
        return {
            width: this.painter.canvas.width / this.__scaleSize,
            height: this.painter.canvas.height / this.__scaleSize
        };
    };
    Canvas.prototype.createLinearGradient = function (x0, y0, x1, y1) {
        return linearGradient(this.painter, x0, y0, x1, y1);
    };
    Canvas.prototype.createRadialGradient = function (cx, cy, r) {
        return radialGradient(this.painter, cx, cy, r);
    };
    Canvas.prototype.getColor = function (x, y) {
        x *= this.__scaleSize;
        y *= this.__scaleSize;
        var currentRGBA = this.painter.getImageData(x - 0.5, y - 0.5, 1, 1).data;
        return ("rgba(" +
            currentRGBA[0] +
            "," +
            currentRGBA[1] +
            "," +
            currentRGBA[2] +
            "," +
            currentRGBA[3] +
            ")");
    };
    return Canvas;
}(Painter));

function mergeOption (option, defaultOption) {
    for (var key in option) {
        defaultOption[key] = option[key];
    }
    return defaultOption;
}

var Canvas = (function (_super) {
    __extends(Canvas, _super);
    function Canvas(el, option, width, height) {
        if (option === void 0) { option = {}; }
        if (width === void 0) { width = 0; }
        if (height === void 0) { height = 0; }
        var _this = this;
        if (!el) {
            throw new Error("VISLite Canvas:The mount point requires an HTMLElement type but encountered null.");
        }
        option = mergeOption(option, {
            region: true,
            willReadFrequently: false
        });
        width = width || el.clientWidth;
        height = height || el.clientHeight;
        var ViewCanvas, RegionCanvas = null;
        var _el = el;
        if (_el._vislite_canvas_) {
            ViewCanvas = _el._vislite_canvas_[0];
            RegionCanvas = _el._vislite_canvas_[1];
        }
        else {
            ViewCanvas = document.createElement('canvas');
            el.appendChild(ViewCanvas);
            if (option.region) {
                RegionCanvas = document.createElement('canvas');
            }
            _el._vislite_canvas_ = [ViewCanvas, RegionCanvas];
            el.setAttribute('vislite', 'Canvas');
        }
        var canvasArray = [RegionCanvas, ViewCanvas];
        for (var index = 0; index < canvasArray.length; index++) {
            var canvas = canvasArray[index];
            if (canvas) {
                canvas.style.width = width + "px";
                canvas.setAttribute('width', (index * width + width) + "");
                canvas.style.height = height + "px";
                canvas.setAttribute('height', (index * height + height) + "");
            }
        }
        _this = _super.call(this, ViewCanvas, RegionCanvas, {
            willReadFrequently: option.willReadFrequently,
        }, 2) || this;
        _this.__canvas = ViewCanvas;
        _this.painter.scale(2, 2);
        return _this;
    }
    Canvas.prototype.toDataURL = function () {
        var _this = this;
        return new Promise(function (resolve) {
            resolve(_this.__canvas.toDataURL());
        });
    };
    return Canvas;
}(Canvas$1));

export { Canvas as default };
