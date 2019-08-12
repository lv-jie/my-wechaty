<template>
  <div>messageInfo</div>
</template>
<script>
export default {
  created(){
    console.log(this.$route.params.id)
  },
  watch:{
    '$route.params.id':(newVal,oldVal)=>{
      console.log(newVal,oldVal)
    }
  }
}
</script>
