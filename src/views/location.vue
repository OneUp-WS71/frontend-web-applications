<template>
  <div>
    <!-- Contenedor del mapa -->
    <div id="map" class="map-container"></div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import mapboxgl from 'mapbox-gl';
import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions';
import patientService from '@/services/patientservice';

mapboxgl.accessToken = 'pk.eyJ1IjoiY3Jpc29yczA5IiwiYSI6ImNseHMzcGIzMDE2dXQyd3BrbzRxZDJpemkifQ.DflG0_KHMBjn7c26appWIg';

export default {
  setup() {
    const map = ref(null);
    const patientReports = ref([]);

    const fetchPatientReports = async () => {
      const patientId = localStorage.getItem('patientId');
      if (!patientId) {
        console.error('No patientId found in localStorage');
        return;
      }
      try {
        const reportsData = await patientService.getAllPatientReports(patientId);
        patientReports.value = reportsData;
        initializeMap();
      } catch (error) {
        console.error('Error fetching patient reports:', error);
      }
    };

    const initializeMap = () => {
      const coordinates = patientReports.value.map(report => [report.longitude, report.latitude]);

      if (!coordinates || coordinates.length === 0) {
        console.error('No coordinates available');
        return;
      }

      const mapContainer = document.getElementById('map');
      if (!mapContainer) {
        console.error('Map container not found');
        return;
      }

      map.value = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: coordinates[0],
        zoom: 12
      });

      map.value.on('load', async () => {
        const directions = new MapboxDirections({
          accessToken: mapboxgl.accessToken,
          profile: 'mapbox/walking', // Solo caminar
          controls: {
            inputs: false, // Deshabilitar los controles de entrada
            instructions: false, // Deshabilitar las instrucciones
            profileSwitcher: false // Deshabilitar el selector de perfil (conducción, ciclismo, etc.)
          }
        });

        // Añadir el control de direcciones al mapa
        map.value.addControl(directions, 'top-left');

        // Añadir los puntos de origen y destino para la ruta
        directions.setOrigin(coordinates[0]);
        directions.setDestination(coordinates[coordinates.length - 1]);

        // Añadir marcadores en el mapa
        new mapboxgl.Marker()
          .setLngLat(coordinates[0])
          .addTo(map.value);

        new mapboxgl.Marker()
          .setLngLat(coordinates[coordinates.length - 1])
          .addTo(map.value);

        // Opcional: Añadir la línea de ruta basada en los reportes
        // Este bloque de código es opcional y depende de cómo quieras mostrar la ruta.
        /*
        map.value.addSource('route', {
          'type': 'geojson',
          'data': {
            'type': 'Feature',
            'properties': {},
            'geometry': {
              'type': 'LineString',
              'coordinates': coordinates
            }
          }
        });

        map.value.addLayer({
          'id': 'route',
          'type': 'line',
          'source': 'route',
          'layout': {
            'line-join': 'round',
            'line-cap': 'round'
          },
          'paint': {
            'line-color': '#888',
            'line-width': 8
          }
        });
        */

      });
    };

    onMounted(() => {
      fetchPatientReports();
    });

    return {
      map
    };
  },
};
</script>

<style >
.map-container {
  margin-top: 150px;
  margin-left: 20px;
  width: 97%;
  height: 70vh; /* Ajusta la altura según sea necesario */
}

@media (max-width: 768px) {
  .map-container {
    margin-top: 50px;
    height: 60vh; /* Ajusta la altura para dispositivos más pequeños */
  }
}
</style>
  