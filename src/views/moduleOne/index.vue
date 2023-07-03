<template>
  <div class="moduleOne">
    <div class="container-left">
      <div @click="handleClick">点击跳转1</div>
      <div @click="handleClick2">点击跳转2</div>
    </div>

    <div class="container-right">
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {
    handleClick() {
      this.$router.push({ name: "moduleOne-module1-module1" });
    },
    handleClick2() {
      this.$router.push({ name: "moduleOne-module1-module2" });
    },
  },
};
</script>
<style>
.moduleOne {
  display: flex;
}
.container-left {
  border: 1px solid skyblue;
}
.container-right {
  width: 80%;
  border: 1px solid red;
}
</style>
