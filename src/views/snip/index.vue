<template>
  <div>
    <div id="container">
      <div class="title">天花乱坠天花乱坠</div>
      <div class="title2">天花乱坠天花乱坠</div>
      <div>天花乱坠天花乱坠</div>
      <div>天花乱坠天花乱坠</div>
      <div>天花乱坠天花乱坠</div>
      <div style="display: none">天花乱坠天花乱坠NOnenenenenenen</div>
      <div style="display: flex">
        <img class="img" src="@/assets/test.png" alt="" />
        <img class="img" src="@/assets/dragon.jpg" alt="" />
        <div class="back-img"></div>
      </div>
    </div>
    <button @click="handleClick">截图</button>
  </div>
</template>
<script>
import snipio from "./index.js";
export default {
  data() {
    return {
      baseimg: "",
    };
  },
  mounted() {},
  methods: {
    async handleClick() {
      snipio();
      // this.shotcut();
    },
    async shotcut() {
      const bodyEl = document.getElementsByTagName("body")[0];
      this.DFSDomTraversal(bodyEl).forEach(this.copyStyle);
      const imgElements = [...bodyEl.querySelectorAll("img")];

      const base64Result = await Promise.all(imgElements.map(this.img2base64));

      console.log("图片", base64Result[0]);
      // this.baseimg = base64Result[0];
      const width = bodyEl.offsetWidth;
      const height = bodyEl.offsetHeight;
      console.log(width, height, "width,height");

      let XHTML = new XMLSerializer().serializeToString(bodyEl);
      imgElements.forEach((element, index) => {
        XHTML = XHTML.replace(element.src, base64Result[index]);
      });
      setTimeout(() => {
        console.log(XHTML, "xhtml");
        const SVGDomElement = `<svg xmlns="http://www.w3.org/2000/svg" height="${height}" width="${width}">
                            <foreignObject height="100%" width="100%">${XHTML}</foreignObject>
                        </svg>`;
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        canvas.width = width * 2;
        canvas.height = height * 2;
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;

        const img = new Image();
        img.onload = function () {
          ctx.scale(2, 2);
          ctx.drawImage(this, 0, 0);

          bodyEl.appendChild(canvas);
        };

        img.src = `data:image/svg+xml,${SVGDomElement}`;
      }, 100);
    },
    // 遍历节点，为所有节点重新渲染css样式
    DFSDomTraversal(root) {
      if (!root) return;
      const arr = [],
        queue = [root];
      let node = queue.shift();

      while (node) {
        console.log(node.localName);
        if (node.localName === "noscript") {
          node.style.display = "none";
        }
        arr.push(node);
        if (node.children.length) {
          for (let i = node.children.length - 1; i >= 0; i--) {
            queue.unshift(node.children[i]);
          }
        }

        node = queue.shift();
      }
      console.log(arr, "arr");
      return arr;
    },
    copyStyle(element) {
      const CSSRules = ["color", "border", "width", "margin-right"];
      const styles = getComputedStyle(element);

      CSSRules.forEach((rule) => {
        element.style.setProperty(rule, styles.getPropertyValue(rule));
      });
    },
    img2base64(element) {
      return new Promise((resolve, reject) => {
        const img = new Image();

        img.onerror = reject;
        img.onload = function () {
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");

          canvas.width = img.naturalWidth;
          canvas.height = img.naturalHeight;
          ctx.drawImage(img, 0, 0);

          resolve(canvas.toDataURL());
        };

        img.src = element.src;
      });
    },
  },
};
</script>
<style scoped>
.title {
  color: red;
}
.title2 {
  color: green;
}
.img {
  width: 300px;
  height: 200px;
}
.back-img {
  background-image: url("~@/assets/test.png");
  background-size: cover;
  width: 300px;
  height: 200px;
}
</style>
