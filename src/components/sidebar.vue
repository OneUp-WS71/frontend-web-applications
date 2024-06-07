
<template>
    <div class="sidebar">
      <Button label="Agregar nuevo paciente" class="p-button-rounded add-patient-button" icon="pi pi-plus" />
      <ul class="menu">
        <li class="menu-item"><i class="pi pi-home"></i><h3>Dashboard</h3></li>
        <li class="menu-section">ANALYTICS</li>
        <li class="menu-item"><i class="pi pi-chart-line"></i><h3>Performance</h3></li>
        <li class="menu-section">SUPPORT</li>
        <li class="menu-item"><i class="pi pi-ticket"></i><h3>Tickets</h3><h3 class="badge">15</h3></li>
        <li class="menu-item"><i class="pi pi-user"></i><h3>Profile</h3></li>
        <li class="menu-item"><i class="pi pi-users"></i><h3>Patients</h3></li>
        <li class="menu-section">SHOP</li>
        <li class="menu-item" @click="ProductsClick"><i class="pi pi-folder"></i><h3>Products</h3></li>
        <li class="menu-item"><i class="pi pi-bell"></i><h3>Orders</h3></li>
        <li class="menu-item"><i class="pi pi-file"></i><h3>Report</h3></li>
      </ul>
      <div class="sidebar-footer">
        <a href="#" class="footer-item"><i class="pi pi-cog"></i><h3>Settings</h3></a>
        <a href="#" class="footer-item"><i class="pi pi-sign-out"></i><h3>Logout</h3></a>
      </div>
    </div>
  </template>
  
  <script>
  
  export default {
    methods: {
      ProductsClick() {
          this.$router.push('/products');
      }
    }
  };
  </script>
  
  <style scoped>
  .sidebar {
    width: 250px;
    background: #f8f9fa;
    padding-top: 120px ;
    padding-left: 20px;
    padding-right: 20px;
    padding-bottom: 20px;
    height: 100vh;
    display: flex;
    flex-direction: column;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;
    overflow-y: auto;
  }
  
  
  
  .logo {
    font-size: 24px;
    font-weight: bold;
  }
  
  .add-patient-button {
    width: 100%;
    margin: 20px 0;
    background-color: #5a67d8;
    color: white;
    border: none;
  }
  
  .menu {
    list-style-type: none;
    padding: 0;
    margin: 0;
  }
  
  .menu-section {
    padding: 10px 0;
    font-size: 20px;
    font-weight: bold;
    color: #b0b0b0;
  }
  
  .menu-item {
    display: flex;
    align-items: center;
    padding: 10px 0;
    font-size: 14px;
    color: #555;
    cursor: pointer;
  }
  
  .menu-item i {
    margin-right: 10px;
  }
  
  .menu-item .badge {
    margin-left: auto;
    background-color: #e74c3c;
    color: white;
    padding: 2px 8px;
    border-radius: 12px;
    font-size: 12px;
  }
  
  .menu-item:hover {
    background-color: #e0e0e0;
    border-radius: 4px;
  }
  
  .sidebar-footer {
    margin-top: auto;
    padding-top: 20px;
    border-top: 1px solid #e5e5e5;
  }
  
  .footer-item {
    display: flex;
    align-items: center;
    padding: 10px 0;
    font-size: 14px;
    color: #555;
    cursor: pointer;
  }
  
  .footer-item i {
    margin-right: 10px;
  }
  
  .footer-item:hover {
    background-color: #e0e0e0;
    border-radius: 4px;
  }
  </style>
  