<template>
    <div class="main-container">
        
        <div class="column middle-column">
            <div class="credit-card-container">
                <div class="img-container">
                    <img alt="user header" src="../assets/Logo_negro.png"/>
                </div>
                <div class="credit-card-info same-size">
                    <i class="pi pi-credit-card"></i><h3>{{ $t('paymentMethods.cardInfo') }}</h3> 
                </div>
                <br>
                <div class="dropdown same-size">
                    <Dropdown v-model="selectedCard" :options="cardOptions" optionLabel="label" :placeholder="$t('paymentMethods.selectCardPlaceholder')" class="w-full md:w-14rem same-size" />
                </div>
                <br>
                <div class="buttons">
                    <Button class="continue-button" :label="$t('paymentMethods.continueButton')" @click="ContinueClick"/>
                    <Button class="cancel-button" :label="$t('paymentMethods.cancelButton')" @click="BackClick"/>
                </div>
            </div>
        </div>
        <div class="column right-column">
            <div class="purchase-summary-container">
                <div class="top">
                    <img alt="user header" src="../assets/Logo_negro.png"class="summary-image"/>
                </div>
                <div class="content">
                    <h2>{{ $t('paymentMethods.purchaseSummary.title') }}</h2>
                    <h3>{{ $t('paymentMethods.purchaseSummary.quantity') }}</h3>
                    <div class="total">
                        <h3>{{ $t('paymentMethods.purchaseSummary.totalLabel') }}</h3>
                        <h3>{{ $t('paymentMethods.purchaseSummary.totalPrice') }}</h3>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            selectedCard: null,
            cardOptions: []
        };
    },
    methods: {
        ContinueClick() {
            this.$router.push('/payment-confirm');
        },
        BackClick() {
            this.$router.push('/products');
        },
        updateCardOptions() {
            this.cardOptions = this.$i18n.messages[this.$i18n.locale].paymentMethods.cards.map(card => ({ label: card.name, value: card }));
        }
    },
    created() {
        this.updateCardOptions(); // Llamar a la función una vez al crear el componente
    },
    watch: {
        '$i18n.locale': 'updateCardOptions' // Actualizar opciones cuando cambia el idioma
    }
}
</script>

<style scoped>
.back-button {
    margin-top: 120px;
    margin-left: 20px; 
}
.main-container {
    display: flex;
    justify-content: space-between;

}
.column {
    flex: 1;
}
.left-column{
    max-width: 150px;
}
.middle-column {
   margin-left: 50px;
}
.right-column{
    margin-left: 100px;
    margin-top: 0px;
}
.credit-card-container,
.purchase-summary-container {
    margin-top: 120px; 
    border: 1px solid #ccc; 
    border-radius: 20px; 
    
    display: inline-block;
}
.credit-card-container{
    padding: 20px;
}
.img-container {
    height: 300px;
    width: 300px;
}
.img-container img {
    width: 100%;
    height: 100%;
}
.top {
    height: 300px;
    width: 300px;
    background-color: #F0F0F0;
    border-radius: 20px;
}
.summary-image {
    width: 100%;
    height: 100%;
    border-radius: 20px;
}
.credit-card-info {
    display: inline-flex; 
    align-items: center;
    border: 1px solid #ccc; 
    border-radius: 20px;
    padding: 10px; 
    background-color: #81F5D6;
    margin-bottom: 10px;
    justify-content: center;
}
.credit-card-info i {
    margin-right: 10px;
}
.dropdown{
    display: inline-flex;
    
    margin-bottom: 200px;
}
.buttons{
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 10px;
}

.continue-button{
    margin-bottom: 10px;
}
.continue-button,
.cancel-button,
.same-size {
    
    width: 100%; 
}
.content{
    padding: 20px;
}
.total{ 
    border-radius: 20px;
    padding: 10px;
    background-color: #F5E7FF;
    color: #8A00E6;
}
</style>
