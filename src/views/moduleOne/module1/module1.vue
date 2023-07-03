<template>
  <div class="module-1">
    <div @click="handleOpen">打开弹窗</div>
    <el-dialog
      title="标题"
      :visible.sync="dialogVisible"
      :modal-append-to-body="false"
      cancelText="取消"
      confirmText="确定"
      @confirm="confirm"
      @cancel="cancel"
    >
      <el-select v-model="value" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
      <div>aaaa</div>
      <div>bbbbb</div>
       <div>aaaa</div>
      <div>bbbbb</div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      dialogVisible: false,
      options: [
        {
          value: "选项1",
          label: "黄金糕",
        },
        {
          value: "选项2",
          label: "双皮奶",
        },
        {
          value: "选项3",
          label: "蚵仔煎",
        },
        {
          value: "选项4",
          label: "龙须面",
        },
        {
          value: "选项5",
          label: "北京烤鸭",
        },
      ],
      value: "",
    };
  },
  methods: {
    handleOpen() {
      this.dialogVisible = true;
    },
    confirm() {
      this.$message.success("确定");
    },
    cancel() {
      this.dialogVisible = false;
    },
  },
};
</script>
