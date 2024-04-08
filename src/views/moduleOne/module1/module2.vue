<template>
  <div class="module-2">
    <div>{{ fullName }}</div>
    <div @click="handleClick">button</div>
  </div>
</template>
<script>
function render() {
  console.log("模拟视图渲染");
}
let data = {
  name: "浪里行舟",
  location: { x: 100, y: 200 },
};
observe(data);
function observe(obj) {
  // 我们来用它使对象变成可观察的
  // 判断类型
  if (!obj || typeof obj !== "object") {
    return;
  }
  Object.keys(obj).forEach((key) => {
    defineReactive(obj, key, obj[key]);
  });
  function defineReactive(obj, key, value) {
    // 递归子属性
    observe(value);
    Object.defineProperty(obj, key, {
      enumerable: true, //可枚举（可以遍历）
      configurable: true, //可配置（比如可以删除）
      get: function reactiveGetter() {
        console.log("get", value); // 监听
        return value;
      },
      set: function reactiveSetter(newVal) {
        observe(newVal); //如果赋值是一个对象，也要递归子属性
        if (newVal !== value) {
          console.log("set", newVal); // 监听
          render();
          value = newVal;
        }
      },
    });
  }
}
data.location = {
  x: 1000,
  y: 2000,
}; //set {x: 1000,y: 1000} 模拟视图渲染
data.name; // get 浪里行舟

export default {
  data() {
    return {
      firstName: "李",
      lastName: "四",
    };
  },
  computed: {
    fullName: {
      get: function () {
        return this.firstName + "," + this.lastName;
      },
      set: function (value) {
        this.firstName = value.split(",")[0];
        this.lastName = value.split(",")[1];
        console.log(value.split(","));
      },
    },
  },
  methods: {
    handleClick() {
      this.fullName = "张,三";
    },
  },
};
</script>
