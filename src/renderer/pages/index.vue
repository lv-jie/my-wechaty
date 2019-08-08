<template>
  <div class="indexPage">
    <app-header></app-header>
  </div>
</template>
<script>
import appHeader from '../components/app/app-header'
export default {
  components:{
    appHeader
  },
  methods:{
    goStart(){
      this.$router.push('/home')
    }
  }
}
</script>
