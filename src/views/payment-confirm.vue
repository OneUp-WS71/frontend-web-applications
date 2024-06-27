<template>
  <div class="outer-container">
    <Button :label="$t('purchaseConfirm.returnButton')" class="top-left-button"  @click="BackClick"/>
    <div class="purchase-success">
      <div class="header">
        <img src="../assets/Logo_negro.png" alt="Success Icon" class="icon" />
        <h2>{{ $t('purchaseConfirm.successfulPurchase') }}</h2>
        <h4>{{ $t('purchaseConfirm.purchaseID') }} 098764323</h4>
      </div>
      <div class="details">
        <div class="cost">
          <h3>{{ $t('purchaseConfirm.totalCost') }}</h3>
          <h3 class="amount">$ 100.000</h3>
        </div>  
        <div class="card-info">
          <h3>{{ $t('purchaseConfirm.debitCard') }}</h3>
          <h3>************ 1320</h3>
        </div>
        <div class="commerce-info">
          <h3>{{ $t('purchaseConfirm.commerce') }}</h3>
          <h3>MARMOT</h3>
        </div>
        <div class="purchase-info">
          <h3>{{ $t('purchaseConfirm.purchaseDate') }}</h3>
          <h3>25-01-2022</h3>
        </div>
        <div class="purchase-info2">
          <h3>{{ $t('purchaseConfirm.purchaseTime') }}</h3>
          <h3>12:56</h3>
        </div>  
        <div class="auth-code">
          <h3>{{ $t('purchaseConfirm.authorizationCode') }}</h3>
          <h3>94655272</h3>
        </div>
      </div>
      <div class="actions">
        <button @click="BackClick">{{ $t('purchaseConfirm.seeProductsAgain') }}</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    BackClick() {
        this.$router.push('/products');
    }
  }
}
</script>

<style scoped>
.outer-container {
  position: relative;
}

.top-left-button {
  width: 100px; 
  height: 30px; 
  position: absolute;
  top: 10px;
  left: 30px;
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  color: white;
  cursor: pointer;
}

.purchase-success {
  width: 400px;
  margin: auto;
  padding: 20px;
  background-color: #f0f8ff;
  border-radius: 10px;
  text-align: center;
  margin-top: 160px;
}
.header {
  margin-bottom: 20px;
}
.icon {
  width: 50px;
}
.details {
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  margin-bottom: 20px;
}
.cost, .card-info, .commerce-info, .purchase-info, .auth-code, .purchase-info2{
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}
.amount {
  color: #a020f0;
  font-weight: bold;
}
.actions button {
  margin-top: 10px;
  padding: 10px;
  width: 100%;
  border: none;
  border-radius: 5px;
  background-color: #a020f0;
  color: white;
  cursor: pointer;
}
</style>
