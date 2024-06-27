<template>
  <div class="sidebar">
    <Button :label="$t('sidebar.addNewPatient')" class="p-button-rounded add-patient-button" icon="pi pi-plus" @click="onAddPatientClick" />
    <ul class="menu">
      <li class="menu-item" @click="DashboardClick"><i class="pi pi-home"></i><h3>{{$t('sidebar.home')}}</h3></li>
      <li class="menu-section">SUPPORT</li>
      <li class="menu-item" @click="ProfileClick"><i class="pi pi-user"></i><h3>{{$t('sidebar.profile')}}</h3></li>
      <li class="menu-item" @click="PatientsClick"><i class="pi pi-users"></i><h3>{{$t('sidebar.patients')}}</h3></li>
      <li class="menu-section">SHOP</li>
      <li class="menu-item" @click="ProductsClick"><i class="pi pi-folder"></i><h3>{{$t('sidebar.products')}}</h3></li>
      <li class="menu-item" @click="LocationClick"><i class="pi pi-map-marker"></i><h3>{{$t('sidebar.location')}}</h3></li>
    </ul>
    <div class="sidebar-footer">
      <a href="#" class="footer-item" @click="showLanguageDialog = true"><i class="pi pi-cog"></i><h3>{{$t('sidebar.settings')}}</h3></a>
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
          <InputNumber v-model="newPatient.phone" id="phone" :class="{'p-invalid': errors.phone !== ''}" />
          <small v-if="errors.phone !== ''" class="p-error">{{ $t(errors.phone) }}</small>
        </div>
        <div class="p-field">
          <label for="weight">{{$t('sidebar.addPatientDialog.weight')}}</label>
          <InputNumber v-model="newPatient.weight" id="weight" :class="{'p-invalid': errors.weight !== ''}" :minFractionDigits="2" :maxFractionDigits="2" />
          <small v-if="errors.weight !== ''" class="p-error">{{ $t(errors.weight) }}</small>
        </div>
        <div class="p-field">
          <label for="height">{{$t('sidebar.addPatientDialog.height')}}</label>
          <InputNumber v-model="newPatient.height" id="height" :class="{'p-invalid': errors.height !== ''}" :minFractionDigits="2" :maxFractionDigits="2" />
          <small v-if="errors.height !== ''" class="p-error">{{ $t(errors.height) }}</small>
        </div>
        <br>
        <Button :label="$t('sidebar.addPatientDialog.addButton')" icon="pi pi-check" @click="addPatient" />
      </div>
    </Dialog>

    <!-- Dialogo de error para paciente existente -->
    <Dialog :header="$t('sidebar.errorDialog.header')" v-model:visible="showErrorDialog" modal>
      <p>{{ $t('sidebar.errorDialog.message') }}</p>
      <Button :label="$t('sidebar.errorDialog.okButton')" icon="pi pi-check" @click="closeErrorDialog" />
    </Dialog>

    <!-- Dialogo de éxito para paciente registrado -->
    <Dialog :header="$t('sidebar.successDialog.header')" v-model:visible="showSuccessDialog" modal>
      <p>{{ $t('sidebar.successDialog.message') }}</p>
      <ul>
        <li>{{ $t('sidebar.successDialog.name') }}: {{ addedPatient.name }}</li>
        <li>{{ $t('sidebar.successDialog.address') }}: {{ addedPatient.address }}</li>
        <li>{{ $t('sidebar.successDialog.date') }}: {{ addedPatient.date }}</li>
        <li>{{ $t('sidebar.successDialog.phone') }}: {{ addedPatient.phone }}</li>
        <li>{{ $t('sidebar.successDialog.weight') }}: {{ addedPatient.weight }}</li>
        <li>{{ $t('sidebar.successDialog.height') }}: {{ addedPatient.height }}</li>
      </ul>
      <Button :label="$t('sidebar.successDialog.okButton')" icon="pi pi-check" @click="closeSuccessDialog" />
    </Dialog>

    <!-- Dialogo de configuracion de idioma -->
    <Dialog :header v-model:visible="showLanguageDialog" modal>
      
      <Button label="English" @click="changeLanguage('en')" style="margin: 5px;"/>
      <Button label="Español" @click="changeLanguage('es')" style="margin: 5px;"/>
      <Button :label="closeButton" icon="pi pi-check" @click="showLanguageDialog = false" style="margin: 5px;"/>
    </Dialog>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';
import InputNumber from 'primevue/inputnumber';
import Calendar from 'primevue/calendar';
import Button from 'primevue/button';
import userService from '@/services/userservice';
import i18n from '@/config/i18n';

export default {
  components: {
    Dialog,
    InputText,
    InputNumber,
    Calendar,
    Button,
  },
  setup() {
    const router = useRouter();
    const showAddPatientDialog = ref(false);
    const showErrorDialog = ref(false);
    const showSuccessDialog = ref(false);
    const showLanguageDialog = ref(false);
    const newPatient = ref({
      name: '',
      address: '',
      date: null,
      weight: null,
      height: null,
      phone: null
    });
    const addedPatient = ref({});
    const errors = ref({ phone: '', weight: '', height: '' });

    const validateFields = () => {
      let valid = true;

      // Validar teléfono
      if (newPatient.value.phone && newPatient.value.phone > 999999999) {
        errors.value.phone = 'editPatientDialog.errors.phone';
        valid = false;
      } else {
        errors.value.phone = '';
      }

      // Validar peso
      if (newPatient.value.weight && newPatient.value.weight > 300) {
        errors.value.weight = 'editPatientDialog.errors.weight';
        valid = false;
      } else {
        errors.value.weight = '';
      }

      // Validar altura
      if (newPatient.value.height && newPatient.value.height > 3.0) {
        errors.value.height = 'editPatientDialog.errors.height';
        valid = false;
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

    const SettingsClick = () => {
      showLanguageDialog.value = true;
    };

    const onAddPatientClick = async () => {
      const username = localStorage.getItem('username');
      if (username) {
        const patients = await userService.getPatients(username);
        if (patients.length > 0) {
          showErrorDialog.value = true;
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
          addedPatient.value = { ...newPatient.value, date: formattedDate };
          showAddPatientDialog.value = false;
          showSuccessDialog.value = true;
          newPatient.value = {
            name: '',
            address: '',
            date: null,
            weight: null,
            height: null,
            phone: null
          };
          // Redireccionar a la página de pacientes después de agregar el paciente
          
        } else {
          console.error('Username not found in localStorage');
        }
      } catch (error) {
        console.error('Error adding patient:', error);
      }
    };

    const closeErrorDialog = () => {
      showErrorDialog.value = false;
    };

    const closeSuccessDialog = () => {
      showSuccessDialog.value = false;
    };

    const changeLanguage = (language) => {
      i18n.global.locale = language;
      
    };

    return {
      showAddPatientDialog,
      showErrorDialog,
      showSuccessDialog,
      showLanguageDialog,
      newPatient,
      addedPatient,
      errors,
      ProductsClick,
      PatientsClick,
      DashboardClick,
      ProfileClick,
      LocationClick,
      SettingsClick,
      LogOutClick,
      onAddPatientClick,
      addPatient,
      closeErrorDialog,
      closeSuccessDialog,
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
</style>