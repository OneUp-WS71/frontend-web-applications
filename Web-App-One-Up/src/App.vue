<script setup>
import Header from './components/Header.vue'
</script>

<template>
  
    <Header v-if="showHeader"></Header>
    <RouterView></RouterView>
    
  

  <main>
    
  </main>
</template>
<script>
export default {
  computed: {
    showHeader() {
      const routesWithoutHeader = ['/login','/Login','/Register','/register'];
      return !routesWithoutHeader.includes(this.$route.path);
    }
  }
}
</script>

<style >
  body{
    font-family: "Inter", sans-serif;
    font-weight: 100 !important;
  }
  h1, h2, h3, h4, h5{
    font-weight: 300 !important;
  }
  .normal{
    font-weight: 300 !important;
  }
  .bold{
    font-weight: 500 !important;
  }
  .bolder{
    font-weight: 700 !important;
  }
  .container{
    width: 70vw !important;
    margin: 0 auto !important;
  }
  .p-card-footer {
      padding: 0!important;
      
  }  
   

</style>
