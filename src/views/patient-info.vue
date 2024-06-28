<template>
  <div>
    <h1 class="title">{{ $t('patientInfo.title') }}</h1>
    <div class="content-container">
      <div class="info-section">
        <div v-if="patientDevice" class="device-info">
          <h2>{{ $t('patientInfo.deviceTitle') }}</h2>
          <div class="info-box">
            <div class="report-details">
              <div class="report-text">
                <p><strong>{{ $t('patientInfo.deviceId') }}:</strong> {{ patientDevice.id }}</p>
                <p><strong>{{ $t('patientInfo.productQuantity') }}:</strong> {{ patientDevice.productQuantity }}</p>
              </div>
              <img src="../assets/watch.png" alt="user header" class="report-image">
            </div>
          </div>
        </div>
        <div v-else>
          <p>{{ $t('patientInfo.loadingDevice') }}</p>
        </div>

        <div v-if="patientLastReport" class="report-info">
          <h2>{{ $t('patientInfo.lastReportTitle') }}</h2>
          <div class="info-box">
            <div class="report-details">
              <div class="report-text">
                <p><strong>{{ $t('patientInfo.reportId') }}:</strong> {{ patientLastReport.id }}</p>
                <p><strong>{{ $t('patientInfo.heartRate') }}:</strong> {{ patientLastReport.heartRate }}</p>
                <p><strong>{{ $t('patientInfo.breathingFrequency') }}:</strong> {{ patientLastReport.breathingFrequency }}</p>
                <p><strong>{{ $t('patientInfo.temperature') }}:</strong> {{ patientLastReport.temperature }}</p>
                <p><strong>{{ $t('patientInfo.location') }}:</strong> {{ locationName }}</p>
              </div>
            </div>
          </div>
          <button class="buttonpdf" @click="downloadPDF">{{ $t('patientInfo.downloadPDF') }}</button>
        </div>
        <div v-else>
          <p>{{ $t('patientInfo.loadingReport') }}</p>
        </div>
      </div>

      <!-- Contenedor del mapa -->
      <div id="map" class="map-container"></div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, watch } from 'vue';
import mapboxgl from 'mapbox-gl';
import patientService from '@/services/patientservice';
import jsPDF from 'jspdf';
import logo from '../assets/logo_lila.png';
import abuelo from '../assets/ProductsImage.png';
import 'mapbox-gl/dist/mapbox-gl.css';
import i18n from '@/config/i18n';

mapboxgl.accessToken = 'pk.eyJ1IjoiY3Jpc29yczA5IiwiYSI6ImNseHMzcGIzMDE2dXQyd3BrbzRxZDJpemkifQ.DflG0_KHMBjn7c26appWIg';

export default {
  setup() {
    const patientDevice = ref(null);
    const patientLastReport = ref(null);
    const map = ref(null);
    const locationName = ref('');

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

    const fetchPatientLastReport = async () => {
      const patientId = localStorage.getItem('patientId');
      if (!patientId) {
        console.error('No patientId found in localStorage');
        return;
      }
      try {
        const lastReportData = await patientService.getPatientLastReport(patientId);
        patientLastReport.value = lastReportData;
      } catch (error) {
        console.error('Error fetching patient last report data:', error);
      }
    };

    const getPlaceName = async (latitude, longitude) => {
      const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=${mapboxgl.accessToken}`;
      try {
        const response = await fetch(url);
        const data = await response.json();
        if (data.features && data.features.length > 0) {
          locationName.value = data.features[0].place_name;
        } else {
          locationName.value = 'Ubicación desconocida';
        }
      } catch (error) {
        console.error('Error fetching place name:', error);
        locationName.value = 'Error al obtener la ubicación';
      }
    };

    const initializeMap = (latitude, longitude) => {
      latitude = parseFloat(latitude);
      longitude = parseFloat(longitude);

      if (latitude < -90 || latitude > 90) {
        console.error('Invalid latitude value:', latitude);
        return;
      }
      if (longitude < -180 || longitude > 180) {
        console.error('Invalid longitude value:', longitude);
        return;
      }

      console.log('Initializing map with latitude:', latitude, 'and longitude:', longitude);

      const mapContainer = document.getElementById('map');
      if (!mapContainer) {
        console.error('Map container not found');
        return;
      }

      map.value = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [longitude, latitude],
        zoom: 17,
        pitch: 45
      });

      new mapboxgl.Marker()
        .setLngLat([longitude, latitude])
        .addTo(map.value);

      map.value.on('load', () => {
        map.value.addSource('mapbox-dem', {
          'type': 'raster-dem',
          'url': 'mapbox://mapbox.mapbox-terrain-dem-v1',
          'tileSize': 512,
          'maxzoom': 14
        });
        map.value.setTerrain({ 'source': 'mapbox-dem', 'exaggeration': 1.5 });
      });
    };

    watch(patientLastReport, (newReport) => {
      if (newReport && newReport.latitude && newReport.longitude) {
        console.log('New report received:', newReport);
        initializeMap(newReport.latitude, newReport.longitude);
        getPlaceName(newReport.latitude, newReport.longitude);
      }
    });

    const downloadPDF = () => {
  const doc = new jsPDF();

  doc.addImage(logo, 'PNG', 10, 10, 30, 30);
  doc.setFontSize(22);
  doc.text('ONEUP', 50, 30);

  doc.setFontSize(18);
  doc.text(i18n.global.t('patientInfo.patientInfoTitle'), 105, 50, null, null, 'center');

  const imageX = 125;
  const imageY = 60;
  const imageWidth = 75;
  const imageHeight = 100;

  doc.addImage(abuelo, 'PNG', imageX, imageY, imageWidth, imageHeight);

  doc.setFontSize(12);

  const textX = imageX - 115; // Ajusta esta posición para alinear con la imagen

  if (patientDevice.value) {
    doc.text(i18n.global.t('patientInfo.deviceSectionTitle'), textX, 70);
    doc.text(`${i18n.global.t('patientInfo.deviceId')}: ${patientDevice.value.id}`, textX, 80);
    doc.text(`${i18n.global.t('patientInfo.productQuantity')}: ${patientDevice.value.productQuantity}`, textX, 90);
  }

  let currentY = 70;
  if (patientLastReport.value) {
    doc.text(i18n.global.t('patientInfo.lastReportSectionTitle'), textX, currentY);
    currentY += 10;
    doc.text(`${i18n.global.t('patientInfo.reportId')}: ${patientLastReport.value.id}`, textX, currentY);
    currentY += 10;
    doc.text(`${i18n.global.t('patientInfo.heartRate')}: ${patientLastReport.value.heartRate}`, textX, currentY);
    currentY += 10;
    doc.text(`${i18n.global.t('patientInfo.breathingFrequency')}: ${patientLastReport.value.breathingFrequency}`, textX, currentY);
    currentY += 10;
    doc.text(`${i18n.global.t('patientInfo.temperature')}: ${patientLastReport.value.temperature}`, textX, currentY);
    currentY += 10;
    
    const locationText = `${i18n.global.t('patientInfo.location')}: ${locationName.value}`;
    const locationLines = doc.splitTextToSize(locationText, imageX - textX); // Ajusta el ancho máximo del texto

    // Ajusta la primera línea a la par del resto del texto
    doc.text(locationLines[0], textX, currentY);
    currentY += 10;

    // Comprueba si las líneas restantes tocan la imagen
    locationLines.slice(1).forEach((line) => {
      if (currentY >= imageY && currentY <= imageY + imageHeight) {
        currentY =   imageHeight + 30;  // Mueve currentY debajo de la imagen
      }
      doc.text(line, textX, currentY);
      currentY += 10;
    });
  }

  doc.save('reporte_paciente.pdf');
};
    onMounted(() => {
      fetchPatientDevice();
      fetchPatientLastReport();
    });

    return {
      patientDevice,
      patientLastReport,
      downloadPDF,
      map,
      locationName
    };
  },
};
</script>

<style>
.title {
  text-align: center;
  font-size: 36px;
  margin-top: 20px;
}

.content-container {
  display: flex;
  justify-content: space-between;
}

.info-section {
  width: 50%;
  margin-left: 30px;
}

.device-info, .report-info {
  margin-top: 20px;
}

.info-box {
  border: 1px solid #ccc;
  padding: 20px;
  width: 100%;
  border-radius: 5px;
  background-color: #f9f9f9;
}

.report-details {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.report-text {
  flex: 1;
}

.report-image {
  width: 150px;
  height: auto;
  margin-left: 20px;
}

.info-box p {
  font-weight: bold; 
  font-size: 16px;
  margin-bottom: 8px;
}

.buttonpdf {
  margin-top: 20px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  border: none;
  border-radius: 5px;
  background-color: #007bff;
  color: white;
  margin-left: 10px;
}

.map-container {
  width: 45%;
  height: 520px;
  border: 1px solid #ccc;
  border-radius: 5px;
  overflow: hidden;
  margin-top: 70px;
  margin-right: 20px;
}
</style>
