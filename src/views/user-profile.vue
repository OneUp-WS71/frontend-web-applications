<template>
  <div class="profile-container">
    <h1>Hola {{ user.name }}</h1>
    <div class="profile-card">
      <img class="profile-pic" :src="previewImage || 'https://via.placeholder.com/150'" alt="Profile Picture">
      <div v-if="isEditing">
        <label for="file-upload" class="custom-file-label">Elegir archivo</label>
        <input id="file-upload" type="file" @change="onFileChange" class="custom-file-input" />
      </div>
      <div class="profile-info">
        <div class="info-row">
          <label>Nombres</label>
          <InputText v-model="editableUser.name" />
        </div>
        <div class="info-row">
          <label>Apellidos</label>
          <InputText v-model="editableUser.lastname" />
        </div>
        <div class="info-row">
          <label>Dirección</label>
          <InputText v-model="editableUser.email" />
        </div>
        <div class="info-row">
          <label>Número</label>
          <InputText v-model="editableUser.phone" />
        </div>
        <div class="info-row">
          <label>Género</label>
          <InputText v-model="editableUser.gender" />
        </div>
        <div class="info-row">
          <label>Tipo de Usuario</label>
          <InputText v-model="editableUser.type" />
        </div>
      </div>
      <div v-if="isEditing">
        <Button label="Confirmar" icon="pi pi-check" class="confirm-button" @click="confirmEdit" />
        <Button label="Cancelar" icon="pi pi-times" class="cancel-button" @click="cancelEdit" />
      </div>
      <Button v-else label="Editar Perfil" icon="pi pi-user-edit" class="edit-button" @click="editProfile" />
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import userService from '@/services/userservice';

export default {
  components: {
    InputText,
    Button,
  },
  setup() {
    const user = ref({
      name: '',
      lastname: '',
      email: '',
      phone: '',
      gender: '',
      type: '',
      image: '',
    });

    const editableUser = ref({ ...user.value });
    const isEditing = ref(false);
    const previewImage = ref('');

    const fetchUserData = async () => {
      try {
        const username = localStorage.getItem('username');
        if (username) {
          const userData = await userService.getUserData(username);
          user.value = {
            ...userData,
            // Convertir la imagen a base64 si es necesario
            image: userData.image ? `data:image/jpeg;base64,${userData.image}` : '',
          };
          editableUser.value = { ...user.value };
          previewImage.value = user.value.image; // Establecer la imagen de vista previa al cargar los datos del usuario
        } else {
          console.error('Username not found in localStorage');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    const onFileChange = (event) => {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const base64Image = e.target.result.split(',')[1]; // Obtener solo la parte base64
          editableUser.value.image = base64Image; // Asignar la imagen al estado editableUser
          previewImage.value = e.target.result; // Establecer la imagen de vista previa
        };
        reader.readAsDataURL(file);
      }
    };

    const editProfile = () => {
      isEditing.value = true;
    };

    const cancelEdit = () => {
      isEditing.value = false;
      // Al cancelar la edición, restauramos los datos originales del usuario
      editableUser.value = { ...user.value };
      previewImage.value = user.value.image; // Restaurar la imagen de vista previa
    };

    const confirmEdit = async () => {
      try {
        const username = localStorage.getItem('username');
        if (username) {
          await userService.updateUserData(username, editableUser.value);
          // Actualizamos los datos del usuario con los datos editables
          user.value = { ...editableUser.value };
          isEditing.value = false;
          console.log('¡Perfil actualizado correctamente!');
        } else {
          console.error('Username not found in localStorage');
        }
      } catch (error) {
        console.error('Error updating user data:', error);
        console.log('¡Error al actualizar el perfil!');
      }
    };

    onMounted(() => {
      fetchUserData();
    });

    return {
      user,
      editableUser,
      isEditing,
      editProfile,
      cancelEdit,
      confirmEdit,
      onFileChange,
      previewImage,
    };
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

.confirm-button {
  margin: 20px;
  background-color: #4CAF50;
  border: none;
  color: white;
}

.cancel-button {
  margin: 20px;
  background-color: #f44336;
  border: none;
  color: white;
}

.custom-file-input {
  display: none;
}

.custom-file-label {
  padding: 10px;
  background-color: #B1B8E1;
  color: #030000;
  font-weight: bold;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  display: inline-block; /* Añadido */
}

.custom-file-label:hover {
  background-color: #0056b3;
}


</style>
