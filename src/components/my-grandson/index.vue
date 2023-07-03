<template>
  <div class="my-guandson">
      <el-button @click="handleClick">点击</el-button>
  </div>
   
</template>
<script>
import emitter from "@/mixins/emitter.js"
export default {
    name:"myGrandson",
  mixins:[emitter],
  data() {
    return {
      name: "孙子",
    };
  },
  created() {},
  methods:{
      handleClick(){
       
        this.dispatch("myParent","father","123")
      }
  }
};
</script>
