<template>
    <div class="profile-container">
      <h1>Hola Enrique</h1>
      <div class="profile-card">
        <img class="profile-pic" src="https://via.placeholder.com/150" alt="Profile Picture">
        <div class="profile-info">
          <div class="info-row">
            <label>Nombres</label>
            <InputText v-model="user.nombres" />
          </div>
          <div class="info-row">
            <label>Apellidos</label>
            <InputText v-model="user.apellidos" />
          </div>
          <div class="info-row">
            <label>Dirección</label>
            <InputText v-model="user.direccion" />
          </div>
          <div class="info-row">
            <label>Distrito</label>
            <InputText v-model="user.distrito" />
          </div>
          <div class="info-row">
            <label>Número</label>
            <InputText v-model="user.numero" />
          </div>
          <div class="info-row">
            <label>Edad</label>
            <InputText v-model="user.edad" />
          </div>
          <div class="info-row">
            <label>Género</label>
            <InputText v-model="user.genero" />
          </div>
          <div class="info-row">
            <label>Tipo de Usuario</label>
            <InputText v-model="user.tipoUsuario" />
          </div>
        </div>
        <Button label="Editar Perfil" icon="pi pi-user-edit" class="edit-button" />
      </div>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  import InputText from 'primevue/inputtext';
  import Button from 'primevue/button';
  export default {
    components: {
      InputText,
      Button,
    },
    setup() {
      const user = ref({
        nombres: 'Enrique Aldhair',
        apellidos: 'Llatas Flores',
        direccion: 'AV La MARINA 2810',
        distrito: 'San Miguel',
        numero: '939498334',
        edad: '20',
        genero: 'M',
        tipoUsuario: '939498334',
      });
  
      return { user };
    },
  };
  </script>
  
  <style scoped>
  .profile-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 20px;
    padding-top: 120px;
  }
  
  .profile-card {
    width: 500px;
    padding: 20px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: white;
  }
  
  .profile-pic {
    border-radius: 50%;
    width: 100px;
    height: 100px;
    object-fit: cover;
    margin-bottom: 20px;
  }
  
  .profile-info {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    width: 100%;
  }
  
  .info-row {
    display: flex;
    flex-direction: column;
    margin-bottom: 15px;
    width: 45%;
  }
  
  .info-row label {
    margin-bottom: 5px;
    font-weight: bold;
  }
  
  .edit-button {
    margin-top: 20px;
    background-color: #5a67d8;
    border: none;
    color: white;
  }
  </style>
  