<template>
    <div>
      <h1>{{ $t('patientList.title') }}</h1>
      <DataTable :value="patients" style="margin: 100px;">
        <Column field="name" :header="$t('patientList.columns.name')" sortable>
          <template #body="slotProps">
            <a @click="onPatientClick(slotProps.data.id)" style="cursor: pointer; color: blue;">
              {{ slotProps.data.name }}
            </a>
          </template>
        </Column>
        <Column field="id" :header="$t('patientList.columns.id')" sortable></Column>
        <Column field="address" :header="$t('patientList.columns.address')" sortable></Column>
        <Column field="date" :header="$t('patientList.columns.date')" sortable></Column>
        <Column field="phone" :header="$t('patientList.columns.phone')" sortable></Column>
        <Column field="weight" :header="$t('patientList.columns.weight')" sortable></Column>
        <Column field="height" :header="$t('patientList.columns.height')" sortable></Column>
        <Column :header="$t('patientList.columns.actions')">
          <template #body="slotProps">
            <Button icon="pi pi-trash" class="p-button-rounded p-button-danger" @click="onDeletePatient(slotProps.data.id)" />
            <Button icon="pi pi-user-edit" class="p-button-rounded" @click="onEditPatient(slotProps.data)" />
          </template>
        </Column>
      </DataTable>
    </div>
  
    <Dialog :header="$t('editPatientDialog.header')" v-model:visible="showEditPatientDialog" modal>
      <div class="p-fluid">
        <div class="p-field">
          <label for="name">{{$t('editPatientDialog.name')}}</label>
          <InputText v-model="editedPatient.name" id="name" />
        </div>
        <div class="p-field">
          <label for="address">{{$t('editPatientDialog.address')}}</label>
          <InputText v-model="editedPatient.address" id="address" />
        </div>
        <div class="p-field">
          <label for="date">{{$t('editPatientDialog.date')}}</label>
          <Calendar v-model="editedPatient.date" id="date" date-format="yy-mm-dd" />
        </div>  
        <div class="p-field">
          <label for="phone">{{$t('editPatientDialog.phone')}}</label>
          <InputNumber v-model="editedPatient.phone" id="phone" :class="{'p-invalid': errors.phone !== ''}"/>
          <small v-if="errors.phone !== ''" class="p-error">{{ $t(errors.phone) }}</small>
        </div>  
        <div class="p-field">
          <label for="weight">{{$t('editPatientDialog.weight')}}</label>
          <InputNumber v-model="editedPatient.weight" id="weight" :class="{'p-invalid': errors.weight !== ''}" :minFractionDigits="2" :maxFractionDigits="2"/>
          <small v-if="errors.weight !== ''" class="p-error">{{ $t(errors.weight) }}</small>
        </div>
        <div class="p-field">
          <label for="height">{{$t('editPatientDialog.height')}}</label>
          <InputNumber v-model="editedPatient.height" id="height" :class="{'p-invalid': errors.height !== ''}" :minFractionDigits="2" :maxFractionDigits="2" />
          <small v-if="errors.height !== ''" class="p-error">{{ $t(errors.height) }}</small>
        </div>
        <br>
        <Button :label="$t('editPatientDialog.saveButton')" icon="pi pi-check" @click="savePatient" />
      </div>
    </Dialog>
  </template>
  
  
  <script>
  import { ref, onMounted } from 'vue';
  import { useRouter } from 'vue-router'; 
  import DataTable from 'primevue/datatable';
  import Column from 'primevue/column';
  import Button from 'primevue/button'; 
  import userService from '@/services/userservice';
  import Dialog from 'primevue/dialog';
  import InputText from 'primevue/inputtext';
  import Calendar from 'primevue/calendar';
  import InputNumber from 'primevue/inputnumber';
  
  export default {
    components: {
      Dialog,
      DataTable,
      Column,
      Button,
      InputText,
      Calendar,
      InputNumber
    },
    setup() {
      const patients = ref([]);
      const router = useRouter(); 
      const showEditPatientDialog = ref(false);
      const editedPatient = ref({ id: null, name: '', address: '', date: null, phone: null, weight: null, height: null });
      const errors = ref({ phone: '', weight: '', height: '' });
  
      const fetchPatients = async () => {
        try {
          const username = localStorage.getItem('username');
          if (username) {
            const patientsData = await userService.getPatients(username);
            patients.value = patientsData;
          } else {
            console.error('Username not found in localStorage');
          }
        } catch (error) {
          console.error('Error fetching patients:', error);
        }
      };
  
      const onDeletePatient = async (patientId) => {
        if (patientId === undefined) {
          console.error('Error: patientId is undefined');
          return;
        }
        try {
          await userService.deletePatient(patientId);
          patients.value = patients.value.filter(patient => patient.id !== patientId);
          setTimeout(() => {
            location.reload();
          }, 3000);
        } catch (error) {
          console.error('Error deleting patient:', error);
        }
      };
      
      const onPatientClick = (patientId) => {
        localStorage.setItem('patientId', patientId); 
        router.push('/patient-info'); 
      };
  
      const onEditPatient = (patient) => {
        editedPatient.value = {
          ...patient,
          phone: patient.phone ? parseInt(patient.phone) : null,
          weight: patient.weight ? parseFloat(patient.weight) : null,
          height: patient.height ? parseFloat(patient.height) : null 
        };
        errors.value = { phone: '', weight: '', height: '' };
        showEditPatientDialog.value = true;
      };
  
      const validateFields = () => {
        let valid = true;
  
        // Validar teléfono
        if (editedPatient.value.phone && editedPatient.value.phone > 999999999) {
          errors.value.phone = 'editPatientDialog.errors.phone';
          valid = false;
        } else {
          errors.value.phone = '';
        }
  
        // Validar peso
        if (editedPatient.value.weight && editedPatient.value.weight > 300) {
          errors.value.weight = 'editPatientDialog.errors.weight';
          valid = false;
        } else {
          errors.value.weight = '';
        }
  
        // Validar altura
        if (editedPatient.value.height && editedPatient.value.height > 3.0) {
          errors.value.height = 'editPatientDialog.errors.height';
          valid = false;
        } else {
          errors.value.height = '';
        }
  
        return valid;
      };
  
      const savePatient = async () => {
        if (!validateFields()) {
          return;
        }
  
        try {
          const formattedDate = editedPatient.value.date instanceof Date 
            ? editedPatient.value.date.toISOString().split('T')[0] 
            : editedPatient.value.date;
  
          const patientData = { ...editedPatient.value, date: formattedDate };
  
          const originalPatient = patients.value.find(patient => patient.id === editedPatient.value.id);
          const updatedPatient = { ...originalPatient, ...patientData };
  
          await userService.updatePatient(editedPatient.value.id, updatedPatient);
  
          const username = localStorage.getItem('username');
          if (username) {
            const patientsData = await userService.getPatients(username);
            patients.value = patientsData;
          }
  
          showEditPatientDialog.value = false;
          editedPatient.value = { id: null, name: '', address: '', date: null, phone: null, weight: null, height: null };
        } catch (error) {
          console.error('Error saving patient:', error);
        }
      };
  
      onMounted(() => {
        fetchPatients();
      });
  
      return {
        patients,
        onDeletePatient,
        onPatientClick,
        onEditPatient,
        savePatient,
        showEditPatientDialog,
        editedPatient,
        errors
      };
    },
  };
  </script>
  
  
  <style>
  .p-invalid {
    border-color: red;
  }
  </style>
  
