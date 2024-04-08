<template>
  <div class="my-select" v-clickoutside="handleOutsideClick">
    <div class="my-tag"></div>
    <el-input ref="reference" @focus="handleFocus"></el-input>
    <transition name="el-zoom-in-top">
      <div
        class="my-popover"
        :style="{ minWidth: minWidth }"
        v-show="showPopper"
      >
        <div>aaaa</div>
        <div>bbbbb</div>
      </div>
    </transition>
  </div>
</template>
<script>
import Popper from "element-ui/src/utils/vue-popper";
import { PopupManager } from "element-ui/src/utils/popup";
import Dropdown from "./dropdown";
import Clickoutside from "element-ui/src/utils/clickoutside";
export default {
  name: "mySelect",
  componentName: "mySelect",
  mixins: [Popper],
  directives: {
    Clickoutside,
  },
  props: {},
  data() {
    return {
      isMounted: false,
     
    };
  },
  computed: {
    minWidth() {
      if (this.isMounted) {
        return this.$refs.reference.$el.getBoundingClientRect().width + "px";
      }
    },
  },
  watch: {
    showPopper(val) {
      if (
        val === true &&
        parseInt(this.popperJS._popper.style.zIndex, 10) < PopupManager.zIndex
      ) {
        this.popperJS._popper.style.zIndex = PopupManager.nextZIndex();
      }
    },
  },
  created() {},
  mounted() {
    this.isMounted = true;
    this.popperElm = document.querySelector(".my-popover");
    this.referenceElm = this.$refs.reference.$el;
    this.$watch("showPopper", (value) => {
      if (value) {
        Dropdown.open(this);
      } else {
        Dropdown.close(this);
      }
    });
  },
  methods: {
    handleFocus() {
      this.showPopper = true;
    },
    handleOutsideClick() {
      setTimeout(() => {
        this.showPopper = false;
      }, 16);
    },
  },
};
</script>
<style>
.my-popover{
  border: 1px red solid;
}
</style>
