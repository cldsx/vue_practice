<template>
  <div>
    <!-- 上传文件 -->
    <input type="file" id="imageFile" @change="handleChange" accept="image/*" />
    <!-- 保存被裁剪的原图像，初始样式需要设置 display: none -->
    <div class="canvasContainer1">
      <canvas id="canvas1" @mousedown="handleMouseDown"></canvas>
    </div>
    <!-- 保存裁剪区域的图像，初始样式需要设置 display: none -->
    <div class="canvasContainer2">
      <canvas id="canvas2"></canvas>
    </div>
  </div>
</template>
<script>
const imageBox = new Image();

export default {
  data() {
    return {
      ctx: null,
      ctx2: null,
      canvas1: null,
      canvas2: null,
      canvasContainer1: null,
      canvasContainer2: null,
    };
  },
  mounted() {
    this.canvasContainer1 = document.querySelector(".canvasContainer1");
    this.canvasContainer2 = document.querySelector(".canvasContainer2");
    this.canvas1 = document.getElementById("canvas1");
    this.canvas2 = document.getElementById("canvas2");
    this.ctx = canvas1.getContext("2d");
    this.ctx2 = canvas2.getContext("2d");
  },
  methods: {
    handleChange(e) {
      const imgFile = e.target.files[0];

      const reader = new FileReader();
      const _this = this;
      reader.onload = function (ev) {
        //获取图片base64,reader.readAsDataURL调用之后才能获取reslut
        const imgsrc = ev.target.result;
        imageBox.src = imgsrc; // 把上传的图像放入 img 容器
        imageBox.onload = function () {
          // 获取上传的图片的宽高
          const imgWidth = this.width;
          const imgHeight = this.height;
          console.log(imgWidth, imgHeight);
          _this.canvasContainer1.width = imgWidth + "px";
          _this.canvasContainer1.height = imgHeight + "px";
          _this.canvas1.width = imgWidth;
          _this.canvas1.height = imgHeight;
          _this.canvasContainer1.style.display = "block";
          _this.ctx.drawImage(imageBox, 0, 0, imgWidth, imgHeight);
        };
      };

      reader.readAsDataURL(imgFile);
    },
    handleMouseDown() {},
  },
};
</script>
<style lang="scss" scoped></style>
