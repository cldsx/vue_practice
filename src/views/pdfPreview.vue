<template>
  <div class="wrap">
    <div class="pdf-container">
      <canvas ref="watermark" class="watermark"></canvas>

      <canvas ref="myCanvas" ></canvas>
    </div>
    <div class="pdf-control">
      <div class="pdf-control-page">
        <div @click="prev">左</div>
        <span class="page-number-container">
          <input
            type="number"
            v-model="pageNum"
            :disabled="pageCount === 1"
            class="page-number-input"
            @blur="queueRenderPage(pageNum)"
          />
          / {{ pageCount }}页
        </span>

        <div @click="next">右</div>
      </div>
      <div class="pdf-control-zoom">
        <div @click="minus">加</div>
        <div @click="addscale">减</div>
      </div>
      <div>
        <span @click="getPdf">关闭</span>
      </div>
    </div>
  </div>
</template>

<script>
import pdfJS from "pdfjs-dist";
import pdfbase64 from "./pdfbase64.js";
export default {
  props: {
    base64: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      pdfUrl: "", // PDF的base64
      pdfDoc: null, // pdfjs 生成的对象
      pageNum: 0, // 当前页数
      pageRendering: false,
      pageNumPending: null,
      scale: 0.6, // 放大倍数
      page_num: 0, // 当前页数
      pageCount: 0, // 总页数
      maxscale: 5, // 最大放大倍数
      minscale: 0.3, // 最小放大倍数
      waterInfo: {},
    };
  },
  computed: {},
  mounted() {
    // console.log(pdfJS, "===");
    this.init();
  },
  methods: {
    getPdf() {
      console.log(pdfJS, "===");
    },
    // 初始化pdf
    init() {
      pdfJS
        .getDocument({
          data: atob(pdfbase64),
          cMapUrl: "https://cdn.jsdelivr.net/npm/pdfjs-dist@2.0.943/cmaps/",
          cMapPacked: true,
        })
        .promise.then((pdfDoc_) => {
          this.pdfDoc = pdfDoc_;
          this.pageCount = this.pdfDoc.numPages;
          this.pageNum = 1;
          this.renderPage(this.pageNum);
        });
    },
    // 渲染pdf
    renderPage(num) {
      this.pageRendering = true;
      let canvas = this.$refs.myCanvas;
      // Using promise to fetch the page
      this.pdfDoc.getPage(num).then((page) => {
        var viewport = page.getViewport(this.scale);
        canvas.height = viewport.height;
        canvas.width = viewport.width;
        let ctx = canvas.getContext("2d");
        var renderContext = {
          canvasContext: ctx,
          viewport: viewport,
        };
        var renderTask = page.render(renderContext);
        renderTask.promise.then(() => {
          ctx.fillStyle = ctx.createPattern(this.$refs.watermark, "repeat");
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          this.pageRendering = false;
          if (this.pageNumPending !== null) {
            this.renderPage(this.pageNumPending);
            this.pageNumPending = null;
          }
        });
      });
    },
    // 放大
    addscale() {
      if (this.scale >= this.maxscale) {
        return;
      }
      this.scale += 0.1;
      this.queueRenderPage(this.pageNum);
    },
    // 缩小
    minus() {
      if (this.scale <= this.minscale) {
        return;
      }
      this.scale -= 0.1;
      this.queueRenderPage(this.pageNum);
    },
    // 上一页
    prev() {
      if (this.pageNum <= 1) {
        return;
      }
      this.pageNum--;
      this.queueRenderPage(this.pageNum);
    },
    // 下一页
    next() {
      if (this.pageNum >= this.pageCount) {
        return;
      }
      this.pageNum++;
      this.queueRenderPage(this.pageNum);
    },
    queueRenderPage(num) {
      var number = Number(num);
      if (this.pageRendering) {
        this.pageNumPending = number;
      } else {
        this.renderPage(number);
      }
    },
  },
};
</script>

<style scoped>
.wrap {
  background-color: #fff !important;
  display: flex;
  flex-direction: column;
  position: fixed;
  z-index: 1000;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}
.pdf-container {
  flex: 1;
  overflow: auto;
  text-align: center;
  background-color: rgba(0, 0, 0, 0.1);
  padding: 0.5rem 0.2rem;
}
.watermark {
  display: none;
}
.pdf-control {
  padding: 0px 16px;
  height: 152px;
  line-height: 50px;
  background: rgba(103, 103, 103, 1);
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  color: #fff;
}

.page-number-container {
  margin: 0px 7px;
}
.page-number-input {
  width: 50px;
  background-color: #363636;
  border: none;
  border-radius: 2px;
  padding: 2px 4px;
  text-align: center;
  box-sizing: border-box;
  color: #fff;
  height: 20px;
}
.pdf-control-zoom {
}
.zoom-out {
  margin-right: 20px;
}
</style>
