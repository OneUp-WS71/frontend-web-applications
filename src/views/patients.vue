<template>
  <div>
    <h1>Lista de Pacientes</h1>
    <DataTable :value="patients"   style="margin: 100px;">
    
      <Column field="name" header="Nombre"></Column>
      <Column field="age" header="Edad"></Column>
      <Column field="direction" header="Dirección"></Column>
      <Column field="disease" header="Enfermedad"></Column>
      <Column header="Acciones">
        <template #body="slotProps">
          <Button icon="pi pi-trash" class="p-button-rounded p-button-danger" @click="onDeletePatient(slotProps.data.id)" />
        </template>
      </Column>
    </DataTable>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Button from 'primevue/button'; // Importa el componente Button
import userService from '@/services/userservice';

export default {
  components: {
    DataTable,
    Column,
    Button // Asegúrate de importar el componente Button
  },
  setup() {
    const patients = ref([]);

    const fetchPatients = async () => {
      try {
        const username = localStorage.getItem('username');
        if (username) {
          const patientsData = await userService.getPatients(username);
          console.log('Patients Data:', patientsData); 
          patients.value = patientsData;
        } else {
          console.error('Username not found in localStorage');
        }
      } catch (error) {
        console.error('Error fetching patients:', error);
      }
    };

    const onDeletePatient = async (patientId) => {
      console.log('Attempting to delete patient with ID:', patientId); // Verifica el ID del paciente
      if (patientId === undefined) {
        console.error('Error: patientId is undefined');
        return;
      }
      try {
        await userService.deletePatient(patientId);
        patients.value = patients.value.filter(patient => patient.id !== patientId);
        console.log('Patient deleted successfully');
      } catch (error) {
        console.error('Error deleting patient:', error);
      }
    };

    onMounted(() => {
      fetchPatients();
    });

    return {
      patients,
      onDeletePatient,
    };
  },
};
</script>

<style>
/* Estilos si es necesario */
</style>
