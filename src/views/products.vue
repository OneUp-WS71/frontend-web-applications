<template>
    <div class="pagina">
      <div class="card-container">
        <div class="cards">
          <Card class="card">
            <template #header>
              <img alt="user header" src="../assets/watch.png" />
            </template>
            <template #title>{{ $t('home.title') }}</template>
            <template #subtitle>{{ $t('home.subtitle') }}</template>
            <template #content>
              <p class="m-0">{{ $t('home.content') }}</p>
            </template>
            <template #footer>
              <div class="buttons">
                <Button class="cart-button" icon="pi pi-shopping-cart" aria-label="Cart" @click="handleBuyClick"/>
                <Button class="buy-button" icon="pi pi-angle-right" :label="$t('home.buttonInfo')" @click="handleCartClick"/>
              </div>
            </template>
          </Card>
          <!-- Segunda tarjeta -->
          <Card class="card">
            <template #header>
              <img alt="user header" src="../assets/watch.png" />
            </template>
            <template #title>{{ $t('home.title') }}</template>
            <template #subtitle>{{ $t('home.subtitle') }}</template>
            <template #content>
              <p class="m-0">{{ $t('home.content') }}</p>
            </template>
            <template #footer>
              <div class="buttons">
                <Button class="cart-button" icon="pi pi-shopping-cart" aria-label="Cart" @click="handleBuyClick"/>
                <Button class="buy-button" icon="pi pi-angle-right" :label="$t('home.buttonInfo')" @click="handleCartClick"/>
              </div>
            </template>
          </Card>
        </div>
      </div>
      <div class="image-container">
        <img alt="Abuelos" src="../assets/ProductsImage.png" />
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    methods: {
      handleCartClick() {
        this.$router.push('/infoproducts');
      },
      handleBuyClick() {
        this.$router.push('/payment-methods');
      },
    },
  };
  </script>


<style scoped>


    .pagina {
        display: flex;
        justify-content: space-between;
        width: 100%;
        height: 100%;
        
    }
    .title{
        text-align: center;
             margin-top: 10%;
       
        
    }
    .card-container {
        display: flex;
        flex-direction: column;
        justify-content: center;
       
        
    }
    .cards {
        display: flex;
        flex: 0 0 70%;
        padding-top: 10%;
        justify-content: center;
       
        
    }
    .card {
        align-self: flex-start;
        margin-right: 50px;
        width: 400px;
        
    }
    .card img{
        width: 100%;
        padding: 20px;
       
    }
    .buttons {
        display: flex;
    }
    .cart-button {
        margin-right: 30px;
    }
    .buy-button {
        width: 300px;
        text-align: center;
    }
    .image-container {
        
        flex: 0 0 30%;
        display: flex;
        
    }
    .image-container img {
        width: 100%;
        height: 100vh;
        object-fit: cover;
        
    }
</style>