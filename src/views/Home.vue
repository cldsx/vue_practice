<template>
  <div>
    <div @click="handleSnip">截图</div>
    <!-- <my-parent
      class="myhome"
      bute1="bute11"
      bute2="butt22"
      bute3="butt33"
      @printBute1="printBute1"
      @printB2="printB2"
    >
      aaaaaa
    </my-parent> -->
    <!-- <div @click="checkc">点击</div>
    <coll-transtion>
      <div v-if="show" class="testshow">
        <div>sssssss</div>
        <div>sssssss</div>
        <div>sssssss</div>
        <div>sssssss</div>
        <div>sssssss</div>
      </div>
    </coll-transtion> -->
    <!-- <el-upload
      class="upload-demo"
      action="https://jsonplaceholder.typicode.com/posts/"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :before-remove="beforeRemove"
      multiple
      :limit="3"
      :on-exceed="handleExceed"
      :file-list="fileList"
    >
      <el-button size="small" type="primary">点击上传</el-button>
      <div slot="tip" class="el-upload__tip">
        只能上传jpg/png文件，且不超过500kb
      </div>
    </el-upload> -->
    <div v-html="htmlTxt"></div>
    <div @click="handleclick">点击</div>
    <div class="text">文本吧文本文本为保卫呢吧</div>
  </div>
</template>
<script>
import "../css/base.css";
import MyParent from "../components/my-parent";
import CollTranstion from "../utils/coll-transtion.js";
export default {
  components: {
    MyParent,
    CollTranstion,
  },
  data() {
    return {
      show: true,
      fileList: [],
      htmlTxt: "<span style='color:red'>aaaaaBBBBB</span> ",
    };
  },

  methods: {
    handleSnip() {
      this.$router.push({ name: "snip" });
    },
    handleclick() {
      var aareg = /icon-/g;
      var bb = "圆钻元";
      console.log(aareg.test(bb));
      this.$router.push({ name: "moduleOne" });
    },
    checkc() {
      this.show = !this.show;
    },
    printBute1(e) {
      console.log("home页面打印1", e);
    },
    printB2(e) {
      console.log("home页面打印2", e);
    },
    clickInput() {
      var ttEL = document.getElementById("tt");
    },
    test() {
      var myTextRange = document.body.createTextRange(); //创建包含文本的对象
      if (myTextRange.findText("123")) {
        myTextRange.select(); //将字符选中
        var myTextRange2 = document.selection.createRange(); //已选中的对象
        alert(myTextRange2.text);
      }
    },
  },
};
</script>
<style>
.testshow {
  padding: 10px 10px;
  background-color: aqua;
}
.text {
  width: 200px;
  height: 475px;
  transform: translateY(50%);
}
</style>
