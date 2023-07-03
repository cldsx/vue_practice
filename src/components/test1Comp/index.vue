<template>
    <div style="color:blue;">
       <slot name="test1"></slot>
       <slot name="test2" v-bind:user="useName"></slot>
       
    </div>
</template>
<script>
export default {
    data(){
        return{
           useName:'qqqweeqwe'
        }
    },
    methods:{

    }
}
</script>