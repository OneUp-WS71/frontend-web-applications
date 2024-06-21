<template>
    <div>
      <h1>Información del Paciente</h1>
      <div v-if="patientDevice" class="device-info">
        <h2>Dispositivo del Paciente</h2>
        <div class="info-box">
          <p><strong>ID del Dispositivo:</strong> {{ patientDevice.id }}</p>
          <p><strong>Cantidad del Producto:</strong> {{ patientDevice.productQuantity }}</p>
        </div>
      </div>
      <div v-else>
        <p>Cargando información del dispositivo...</p>
      </div>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue';
  import patientService from '@/services/patientservice';
  
  export default {
    setup() {
      const patientDevice = ref(null);
  
      const fetchPatientDevice = async () => {
        const patientId = localStorage.getItem('patientId');
        if (!patientId) {
          console.error('No patientId found in localStorage');
          return;
        }
        try {
          const deviceData = await patientService.getPatientDevice(patientId);
          patientDevice.value = deviceData;
        } catch (error) {
          console.error('Error fetching patient device data:', error);
        }
      };
  
      onMounted(() => {
        fetchPatientDevice();
      });
  
      return {
        patientDevice,
      };
    },
  };
  </script>
  
  <style>
  .device-info {
    margin-top: 20px;
  }
  
  .info-box {
    border: 1px solid #ccc;
    padding: 20px;
    width: 50%;
    border-radius: 5px;
    background-color: #f9f9f9;
  }
  </style>
  