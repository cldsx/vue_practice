import snipping from "./snipping";
import edit from "./edit"
import { mergeArray } from "./tool/array";

export default function () {
    snipping("h5", function (base64, width, height, left, top) {
        edit(base64, width, height, left, top);

    });
}