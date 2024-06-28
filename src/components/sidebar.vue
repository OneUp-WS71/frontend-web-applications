<template>
  <div class="sidebar">
    <Button :label="$t('sidebar.addNewPatient')"
            class="p-button-rounded add-patient-button"
            icon="pi pi-plus"
            @click="onAddPatientClick"
            :disabled="hasOnePatient" />
    <ul class="menu">
      <li class="menu-item" @click="DashboardClick"><i class="pi pi-home"></i><h3>{{$t('sidebar.home')}}</h3></li>
      <li class="menu-item" @click="ProfileClick"><i class="pi pi-user"></i><h3>{{$t('sidebar.profile')}}</h3></li>
      <li class="menu-item" @click="PatientsClick"><i class="pi pi-users"></i><h3>{{$t('sidebar.patients')}}</h3></li>
      <li class="menu-item" @click="ProductsClick"><i class="pi pi-folder"></i><h3>{{$t('sidebar.products')}}</h3></li>
      <li class="menu-item" @click="LocationClick"><i class="pi pi-map-marker"></i><h3>{{$t('sidebar.location')}}</h3></li>
    </ul>
    <div class="sidebar-footer">
      <div class="language-switch">
        <span style="font-weight: 300 !important;">{{ $t('sidebar.userRole') }}</span><br>
        <h3 @click="changeLanguage('en')">EN</h3>
        <img src="https://flagsapi.com/US/flat/64.png">
        <span class="separator">|</span>
        <h3 @click="changeLanguage('es')">ES</h3>
        <img src="https://flagsapi.com/ES/flat/64.png">
      </div>
      <a href="#" class="footer-item" @click="LogOutClick"><i class="pi pi-sign-out"></i><h3>{{$t('sidebar.logout')}}</h3></a>
    </div>

    <!-- Dialogo para agregar nuevo paciente -->
    <Dialog :header="$t('sidebar.addPatientDialog.header')" v-model:visible="showAddPatientDialog" modal>
      <div class="p-fluid">
        <div class="p-field">
          <label for="name">{{$t('sidebar.addPatientDialog.name')}}</label>
          <InputText v-model="newPatient.name" id="name" />
        </div>
        <div class="p-field">
          <label for="address">{{$t('sidebar.addPatientDialog.address')}}</label>
          <InputText v-model="newPatient.address" id="address" />
        </div>
        <div class="p-field">
          <label for="date">{{$t('sidebar.addPatientDialog.date')}}</label>
          <Calendar v-model="newPatient.date" id="date" date-format="yy-mm-dd" />
        </div>
        <div class="p-field">
          <label for="phone">{{$t('sidebar.addPatientDialog.phone')}}</label>
          <InputText v-model="newPatient.phone" id="phone" :class="{'p-invalid': errors.phone !== ''}" />
          
        </div>
        <div class="p-field">
          <label for="weight">{{$t('sidebar.addPatientDialog.weight')}}</label>
          <InputNumber v-model="newPatient.weight" id="weight" :class="{'p-invalid': errors.weight !== ''}" :minFractionDigits="2" :maxFractionDigits="2" />
          
        </div>
        <div class="p-field">
          <label for="height">{{$t('sidebar.addPatientDialog.height')}}</label>
          <InputNumber v-model="newPatient.height" id="height" :class="{'p-invalid': errors.height !== ''}" :minFractionDigits="2" :maxFractionDigits="2" />
          
        </div>
        <br>
        <Button :label="$t('sidebar.addPatientDialog.addButton')" icon="pi pi-check" @click="addPatient" />
      </div>
    </Dialog>

    <!-- Toast for notifications -->
    <Toast ref="toast" position="top-right" />
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';
import InputNumber from 'primevue/inputnumber';
import Calendar from 'primevue/calendar';
import Button from 'primevue/button';
import Toast from 'primevue/toast';
import userService from '@/services/userservice';
import i18n from '@/config/i18n';

export default {
  components: {
    Dialog,
    InputText,
    InputNumber,
    Calendar,
    Button,
    Toast,
  },
  setup() {
    const router = useRouter();
    const showAddPatientDialog = ref(false);
    const newPatient = ref({
      name: '',
      address: '',
      date: null,
      weight: null,
      height: null,
      phone: null
    });
    const errors = ref({ phone: '', weight: '', height: '' });
    const toast = ref(null);

    // Variable reactiva para verificar si existe al menos un paciente
    const hasOnePatient = ref(false); // Inicialmente no hay pacientes

    // Función para obtener pacientes y actualizar hasOnePatient
    const fetchPatients = async () => {
      const username = localStorage.getItem('username');
      if (username) {
        const patients = await userService.getPatients(username);
        hasOnePatient.value = patients.length > 0;
      } else {
        console.error('Username not found in localStorage');
      }
    };

    // Llamar a fetchPatients al cargar el componente
    onMounted(fetchPatients);

    const onAddPatientClick = async () => {
      const username = localStorage.getItem('username');
      if (username) {
        const patients = await userService.getPatients(username);
        if (patients.length > 0) {
          toast.value.add({ severity: 'error', summary: i18n.global.t('sidebar.errorDialog.message'), life: 3000 });
        } else {
          showAddPatientDialog.value = true;
        }
      } else {
        console.error('Username not found in localStorage');
      }
    };

    const addPatient = async () => {
      if (!validateFields()) {
        return;
      }

      try {
        const username = localStorage.getItem('username');
        if (username) {
          const userData = await userService.getUserData(username);
          const userId = userData.id;
          const formattedDate = newPatient.value.date ? newPatient.value.date.toISOString().split('T')[0] : null;
          const patientData = { ...newPatient.value, date: formattedDate };
          await userService.addPatient(userId, patientData);
          showAddPatientDialog.value = false;
          toast.value.add({ severity: 'success', summary: i18n.global.t('sidebar.successDialog.message'), life: 3000 });
          newPatient.value = {
            name: '',
            address: '',
            date: null,
            weight: null,
            height: null,
            phone: null
          };

          // Esperar 3 segundos y actualizar la página
          setTimeout(() => {
            location.reload();
          }, 3000);

        } else {
          console.error('Username not found in localStorage');
        }
      } catch (error) {
        console.error('Error adding patient:', error);
      }
    };

    const validateFields = () => {
      let valid = true;

      // Validar teléfono
      if (newPatient.value.phone && newPatient.value.phone > 999999999) {
        errors.value.phone = 'editPatientDialog.errors.phone';
        valid = false;
        toast.value.add({ severity: 'error', summary: i18n.global.t('editPatientDialog.errors.phone'), life: 3000 });
      } else {
        errors.value.phone = '';
      }

      // Validar peso
      if (newPatient.value.weight && newPatient.value.weight > 300) {
        errors.value.weight = 'editPatientDialog.errors.weight';
        valid = false;
        toast.value.add({ severity: 'error', summary: i18n.global.t('editPatientDialog.errors.weight'), life: 3000 });
      } else {
        errors.value.weight = '';
      }

      // Validar altura
      if (newPatient.value.height && newPatient.value.height > 3.0) {
        errors.value.height = 'editPatientDialog.errors.height';
        valid = false;
        toast.value.add({ severity: 'error', summary: i18n.global.t('editPatientDialog.errors.height'), life: 3000 });
      } else {
        errors.value.height = '';
      }

      return valid;
    };

    const ProductsClick = () => {
      router.push('/products');
    };

    const LogOutClick = () => {
      router.push('/login');
    };

    const PatientsClick = () => {
      router.push('/patients');
    };

    const DashboardClick = () => {
      router.push('/dashboard');
    };

    const ProfileClick = () => {
      router.push('/user-profile');
    };

    const LocationClick = () => {
      router.push('/location');
    };

    const changeLanguage = (language) => {
      i18n.global.locale = language;
    };

    return {
      showAddPatientDialog,
      newPatient,
      errors,
      toast,
      hasOnePatient,
      ProductsClick,
      PatientsClick,
      DashboardClick,
      ProfileClick,
      LocationClick,
      LogOutClick,
      onAddPatientClick,
      addPatient,
      changeLanguage,
    };
  }
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

.language-switch {
  text-align: center;
  margin-bottom: 10px;
}

.language-switch h3 {
  display: inline-block;
  margin: 0 5px;
  cursor: pointer;
  vertical-align: middle;
}

.language-switch h3:hover {
  text-decoration: underline;
}

.language-switch .separator {
  display: inline-block;
  margin: 0 5px;
  color: #555;
  vertical-align: middle;
}

.language-switch img {
  display: inline-block;
  width: 20px;
  height: auto;
  margin-left: 5px;
  vertical-align: middle;
}
</style>
