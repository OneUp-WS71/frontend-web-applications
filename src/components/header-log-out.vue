<template>
    <div class="header">
      <div class="left-header">
        <div class="img">
          <img alt="reloj" src="../assets/Logo_negro.png" />
        </div>
        <div class="title">
          <h2 class="normal">{{ $t('appTitle') }}</h2>
        </div>
      </div>
      
      <div class="buttons">
        <Button :label="$t('logout')" @click="LogOut"  rounded/>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    methods: {
      LogOut() {
        this.$router.push('/login');
      }
    }
  };
  </script>
  
  <style scoped>
    h1 {
      font-weight: 300;
    }
    .img img {
      width: 100px;
      height: 100px;
    }
    .header {
      color: white;
      text-align: left;
      padding: 20px;
      position: fixed;
      width: 100%;
      height: 100px;
      top: 0;
      left: 0;
      z-index: 1000;
      background-color: var(--indigo-500);
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .left-header {
      display: flex;
      align-items: center;
    }
    .p-button {
      background-color: var(--surface-0);
      color: black;
      margin-left: 10px;
    }
    .buttons {
      display: flex;
    }
  </style>
  