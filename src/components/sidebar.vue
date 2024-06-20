<template>
  <div class="sidebar">
    <Button label="Agregar nuevo paciente" class="p-button-rounded add-patient-button" icon="pi pi-plus" @click="onAddPatientClick" />
    <ul class="menu">
      <li class="menu-item"><i class="pi pi-home"></i><h3>Dashboard</h3></li>
      <li class="menu-section">SUPPORT</li>
      <li class="menu-item" @click="ProfileClick"><i class="pi pi-user"></i><h3>Profile</h3></li>
      <li class="menu-item" @click="PatientsClick"><i class="pi pi-users"></i><h3>Patients</h3></li>
      <li class="menu-section">SHOP</li>
      <li class="menu-item" @click="ProductsClick"><i class="pi pi-folder"></i><h3>Products</h3></li>
    </ul>
    <div class="sidebar-footer">
      <a href="#" class="footer-item"><i class="pi pi-cog"></i><h3>Settings</h3></a>
      <a href="#" class="footer-item"><i class="pi pi-sign-out"></i><h3>Logout</h3></a>
    </div>

    <!-- Dialogo para agregar nuevo paciente -->
    <Dialog header="Agregar Paciente" v-model:visible="showAddPatientDialog" modal>
      <div class="p-fluid">
        <div class="p-field">
          <label for="name">Nombre</label>
          <InputText v-model="newPatient.name" id="name" />
        </div>
        <div class="p-field">
          <label for="age">Edad</label>
          <InputNumber v-model="newPatient.age" id="age" />
        </div>
        <div class="p-field">
          <label for="direction">Dirección</label>
          <InputText v-model="newPatient.direction" id="direction" />
        </div>
        <div class="p-field">
          <label for="disease">Enfermedad</label>
          <InputText v-model="newPatient.disease" id="disease" />
        </div>
        <br>
        <Button label="Agregar" icon="pi pi-check" @click="addPatient" />
      </div>
    </Dialog>

    <!-- Confirmation Dialog -->
    <Dialog header="Confirmación" v-model:visible="showConfirmationDialog" modal>
      <p>¿Está seguro que quiere eliminar el paciente anterior?</p>
      <Button label="Sí" icon="pi pi-check" @click="confirmReplacePatient" />
      <Button label="No" icon="pi pi-times" @click="cancelReplacePatient" class="p-button-secondary" />
    </Dialog>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';
import InputNumber from 'primevue/inputnumber';
import Button from 'primevue/button';
import userService from '@/services/userservice';

export default {
  components: {
    Dialog,
    InputText,
    InputNumber,
    Button,
  },
  setup() {
    const router = useRouter();
    const showAddPatientDialog = ref(false);
    const showConfirmationDialog = ref(false);
    const newPatient = ref({
      name: '',
      age: null,
      direction: '',
      disease: ''
    });
    const existingPatient = ref(null);

    const ProductsClick = () => {
      router.push('/products');
    };

    const PatientsClick = () => {
      router.push('/patients');
    };

    const ProfileClick = () => {
      router.push('/user-profile');
    };

    const onAddPatientClick = () => {
      if (existingPatient.value) {
        showConfirmationDialog.value = true;
      } else {
        showAddPatientDialog.value = true;
      }
    };

    const confirmReplacePatient = () => {
      showConfirmationDialog.value = false;
      showAddPatientDialog.value = true;
    };

    const cancelReplacePatient = () => {
      showConfirmationDialog.value = false;
    };

    const addPatient = async () => {
      try {
        const username = localStorage.getItem('username');
        if (username) {
          const userData = await userService.getUserData(username);
          const userId = userData.id;
          await userService.addPatient(userId, newPatient.value);
          existingPatient.value = newPatient.value;
          showAddPatientDialog.value = false;
          newPatient.value = { name: '', age: null, direction: '', disease: '' };
          window.location.reload();
        } else {
          console.error('Username not found in localStorage');
        }
      } catch (error) {
        console.error('Error adding patient:', error);
      }
    };

    return {
      showAddPatientDialog,
      showConfirmationDialog,
      newPatient,
      existingPatient,
      ProductsClick,
      PatientsClick,
      ProfileClick,
      onAddPatientClick,
      confirmReplacePatient,
      cancelReplacePatient,
      addPatient
    };
  },
};
</script>

<style scoped>
.sidebar {
  width: 250px;
  background: #f8f9fa;
  padding-top: 120px;
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
  padding: 20px;
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
