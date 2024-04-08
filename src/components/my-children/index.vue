<template>
  <div class="my-children">
    <!-- <my-grandson></my-grandson> -->
    <div v-for="(item,index) in btnList" :key="index" @click="handleClick(index)">
        {{item.value}}
    </div>
  </div>
</template>
<script>
export default {
  name: "myChildren",
  props:{
    btnList:{
      type:Array,
      default:[]
    }
  },

  data() {
    return {
      name: "孩子组件",
    };
  },
  created() {},
  methods:{
    handleClick(index){

     this.$emit("handler",this.btnList[index].id)
    }
  }
};
</script>
