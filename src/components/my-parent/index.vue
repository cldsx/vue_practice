<template>
  <div class="">
    
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },

  props:{
      bute3:{
          type:String,
      }
  },
//   props: {
//     bute1: {
//       type: String,
//       default: "111",
//     },
//     bute2: {
//       type: String,
//       default: "222",
//     },
//     bute3: {
//       type: String,
//       default: "333",
//     },
//   },
  created(){
    
      console.log(this.$props,"1111")
      console.log(this.bute3,"0000")
  },
  methods:{
     doClick(){
        this.$emit("printBute1",this.bute3)
     }
  }
};
</script>
