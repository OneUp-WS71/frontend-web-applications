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