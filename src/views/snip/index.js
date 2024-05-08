import snipping from "./snipping";
import edit from "./edit"
import { mergeArray } from "./tool/array";
import _tool from "./toolbox/index";
export default function (options) {
    options = options || {};

    var tool = mergeArray(_tool, options.tool || []);

    snipping("h5", function (base64, width, height, left, top) {
        edit(base64, width, height, left, top, tool);

    });
}