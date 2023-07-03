<template>
  <div class="my-parent">
    <my-children></my-children>
  </div>
</template>
<script>
export default {
  name:"myParent",
  componentName:'myParent',
  data() {
    return {
      name: "父组件",
    };
  },
  created() {
    this.$on("father",this.pTest)
  },
  methods: {
    pTest(val){
       console.log("父组件种的方法",val)
    }
  },
};
</script>
