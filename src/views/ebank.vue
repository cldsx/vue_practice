<template>
  <div class="my-parent">
    <!-- <my-children :btn-list="btnList" @handler="handleClick1"></my-children> -->
    <!-- <el-button @click="handleClick">父button</el-button>
    <div v-for="(item, index) in tablelist" :key="index">
      {{ item.name }}
    </div> -->
    <div @click="handleClicktttt">diadndiandiand</div>
  </div>
</template>
<script>
function foo() {}
var f1 = new foo();
console.log(f1.__proto__ == foo.prototype);
console.log(foo.prototype.__proto__.__proto__);
import emitter from "@/mixins/emitter.js";
import { toggleRowStatus } from "@/utils/utils.js";
export default {
  name: "myParent",
  mixins: [emitter],
  componentName: "myParent",
  data() {
    return {
      name: "父组件",
      objList: [
        {
          name: "aaa",
          age: "7",
          sex: "male",
        },
        {
          name: "bbb",
          age: "8",
          sex: "male",
        },
        {
          name: "ccc",
          age: "9",
          sex: "male",
        },
        {
          name: "ddd",
          age: "10",
          sex: "male",
        },
      ],
      tablelist: [],
      state: {
        selection: [],
      },
      btnList: [
        {
          value: "按钮1",
          id: "type1",
        },
        {
          value: "按钮2",
          id: "type2",
        },
        {
          value: "按钮3",
          id: "type3",
        },
      ],
    };
  },
  created() {
    this.$on("father", this.pTest);
  },
  methods: {
    handleClicktttt(val) {
      const a = "+12.00%";
      console.log(a.replace("+", ""));
    },
    pTest(val) {
      console.log("父组件种的方法", val);
    },
    handleClick() {
      let row = {
        name: "aaa",
        age: "bbb",
        sex: "ccc",
      };
      toggleRowStatus(this.state.selection, row, true);
      console.log(this.state.selection);
    },
    handleClick1(val) {
      if (val == "type1") {
        alert("111");
      } else if (val == "type2") {
        alert("222");
      } else {
        alert("333");
      }
    },
  },
};
</script>
