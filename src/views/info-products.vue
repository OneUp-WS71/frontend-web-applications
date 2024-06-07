<template >
    <div class="titulo-container">
        <h1>Information about the product</h1>
    </div>
    <div class="products-container">
        <div class="img-container">
            <img alt="reloj":src="products.length > 0 ? products[1].productImageUrl : ''" />
        </div>
        <div class="titulo2-container">
            <h1 class="bold">{{ products.length > 0 ? products[1].productName : '' }}</h1>
            <div class="info-container">
                <Card class="card1">
                    <template #title>Specifications</template>
                    <template #content>
                        <p class="m-0">
                            {{ products.length > 0 ? products[1].productDescription : '' }}
                        </p>
                    </template>
                </Card>
                <Card class="card2">
                    <template #title>${{ products.length > 0 ? products[1].productPrice : '' }}</template>
                    <template #content>
                        <p class="m-0">
                            <i class="pi pi-truck"></i> Home Delivery
                        </p>
                        <p class="m-0">
                            <i class="pi pi-search"></i> Order status monitoring

                        </p>
                    </template>
                    <template #footer>
                        <div class="buttons">
                            <Button class="cart-button" icon="pi pi-shopping-cart" aria-label="Cart" @click="handleBuyClick"/>
                            <Button class="buy-button" icon="pi pi-angle-right" label="Buy Now" @click="handleBuyClick"/>
                        </div>
                    </template>
                </Card>
            </div>
        </div>
    </div>
    
</template>
<script>
import axios from 'axios';
export default {
    data() {
        return {
            products: []
        }
    },
    mounted() {

    axios
        .get('https://oneupbackend.zeabur.app/api/oneup/v1/products')
        .then(response => {
            this.products = response.data;
            
        })
        .catch(error => {
          console.log(error);
        });
    },
    methods: {
        handleBuyClick(){
            this.$router.push('/payment-methods');
        }
    },
}
</script>
<style scoped>
    
    .titulo-container{
        padding-top: 7%;
        text-align: center;
    }
    .products-container{
        flex: 0 0 50%;
        display: flex;
        
    }
    .img-container {
        flex: 0 0 50%;
        padding-top: 5%;
        padding-left: 5%;
       
        
    }
    
    .titulo2-container{
        flex: 0 0 50%;
        
        font-weight: 400px !important;
        font-size: bolder !important;
        text-align: center;
        padding-right: 5%;
        padding-top: 1%;
    }
    .info-container{
        display: flex;
        height: 100%;
        

    }
    .card1{
        text-align: left;
        margin: 5%;
        width: 40%;
    }
    .card2 {
        text-align: left;
        margin: 5%;
        width: 40%;
        position: relative;  
        padding-bottom: 80px;
        
    }
    

    .card2 .p-card-body {
        height: 433.03px !important;
    }
    .card2 .p-card-content {
        margin-top: 1000px !important;
        text-align: center !important;
        flex: 1 !important;
    }

    .card2 .p-card-footer {
        padding: 0 !important;
        margin-bottom: 0 !important;
    }
    
    .buttons {
        position: absolute;
        bottom: 10px;
        left: 10px;
        right: 10px;
        display: flex;
        justify-content: center;
    }
    .cart-button {
        margin-right: 10px;
        width: 20%;
    }
    .buy-button {
        width: 70%;
        text-align: center;
    }
</style>