<template>
  <div class="outer-container">
    <Button class="top-left-button" label="Return" @click="BackClick"/>
    <div class="purchase-success">
      <div class="header">
        <img src="../assets/Logo_negro.png" alt="Success Icon" class="icon" />
        <h2>Successful purchase!</h2>
        <h4>Purchase ID 098764323</h4>
      </div>
      <div class="details">
        <div class="cost">
          <h3>Total cost</h3>
          <h3 class="amount">$ 100.000</h3>
        </div>
        <div class="card-info">
          <h3>Debit card</h3>
          <h3>************ 1320</h3>
        </div>
        <div class="commerce-info">
          <h3>Commerce</h3>
          <h3>MARMOT</h3>
        </div>
        <div class="purchase-info">
          <h3>Date of purchase</h3>
          <h3>25-01-2022</h3>
        </div>
        <div class="purchase-info2">
          <h3>Purchase time</h3>
          <h3>12:56</h3>
        </div>  
        <div class="auth-code">
          <h3>Authorization code</h3>
          <h3>94655272</h3>
        </div>
      </div>
      <div class="actions">
        <button @click="BackClick">See products again</button>
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
