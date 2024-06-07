<script setup>
import Header from './components/header.vue'
import Header2 from './components/header-log-out.vue'
import Sidebar from './components/sidebar.vue';

</script>

<template>
  
  <div class="app-container">
    <Sidebar v-show="showSidebar" />

    <div class="main-content" :class="{ 'with-sidebar': showSidebar }">
      <Header v-show="showHeader" />
      <Header2 v-show="showHeader2" />
      
      <RouterView />
    </div>
  </div>
  <main>
    
  </main>
</template>
<script>
export default {
  computed: {
    showHeader() {
      const allowedRoutes = [
        '/',
        '/products',
        '/infoproducts'
      ];
      const currentPath = this.$route.path;
      return allowedRoutes.includes(currentPath) && currentPath === currentPath.toLowerCase();
    },
    showHeader2() {
      const allowedRoutes = [
        '/payment-methods',
        '/payment-confirm',
        '/user-profile'
      ];
      const currentPath = this.$route.path;
      return allowedRoutes.includes(currentPath) && currentPath === currentPath.toLowerCase();
    },
    showSidebar() {
      const currentPath = this.$route.path;
      return currentPath === '/user-profile' && currentPath === currentPath.toLowerCase();
    }
  },
  watch: {
    $route(to) {
      if (to.path !== to.path.toLowerCase()) {
        this.$router.replace('/page-not-found');
      }
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
  .app-container {
    display: flex;
  }   
  .main-content {
    flex: 1;
  }

  .main-content.with-sidebar {
    margin-left: 250px; 
  }

</style>
