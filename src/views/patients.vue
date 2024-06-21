<template>
  <div>
    <h1>Lista de Pacientes</h1>
    <DataTable :value="patients" style="margin: 100px;">
      <Column field="name" header="Nombre">
        <template #body="slotProps">
          <a @click="onPatientClick(slotProps.data.id)" style="cursor: pointer; color: blue;">
            {{ slotProps.data.name }}
          </a>
        </template>
      </Column>
      <Column field="address" header="address"></Column>
      <Column field="date" header="date"></Column>
      <Column field="weight" header="weight"></Column>
      <Column field="height" header="height"></Column>
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
import { useRouter } from 'vue-router'; // Importa useRouter para la navegación
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
    const router = useRouter(); // Crea una instancia de router

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

    const onPatientClick = (patientId) => {
      localStorage.setItem('patientId', patientId); // Guarda el ID del paciente en localStorage
      router.push('/patient-info'); // Redirige a la ruta /patient-info
    };

    onMounted(() => {
      fetchPatients();
    });

    return {
      patients,
      onDeletePatient,
      onPatientClick, // Asegúrate de devolver onPatientClick
    };
  },
};
</script>

<style>
/* Estilos si es necesario */
</style>
