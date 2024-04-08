<template>
  <div class="my-guandson">
    <el-button @click="handleClick">点击</el-button>
  </div>
</template>
<script>
import emitter from "@/mixins/emitter.js";
export default {
  name: "myGrandson",
  mixins: [emitter],
  componentName:'myGrandson',
  data() {
    return {
      name: "孙子",
    };
  },
  created() {
    this.$on("grandFun", this.sFun);
  },
  methods: {
    sFun(val) {
      console.log("孙子组件接受", val);
    },
    handleClick() {
      this.dispatch("myParent", "father", "123");
    },
  },
};
</script>
