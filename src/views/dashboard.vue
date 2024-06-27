<template>
  <div style="padding: 20px;">
    <br><br><br><br>
    <!-- Tarjeta para la última frecuencia cardíaca -->
    <v-card
      class="mx-auto"
      color="surface-light"
      max-width="600"
      style="display: grid; grid-template-columns: auto 1fr; margin: 20px;"
    >
      <template v-slot:prepend>
        <svg
          :style="{ fill: checking ? 'red' : 'indigo', width: '64px', height: '64px', marginRight: '8px', cursor: 'pointer' }"
          viewBox="0 0 24 24"
          @click="openDialog('heartRate')"
        >
          <path d="M7.5,4A5.5,5.5 0 0,0 2,9.5C2,10 2.09,10.5 2.22,11H6.3L7.57,7.63C7.87,6.83 9.05,6.75 9.43,7.63L11.5,13L12.09,11.58C12.22,11.25 12.57,11 13,11H21.78C21.91,10.5 22,10 22,9.5A5.5,5.5 0 0,0 16.5,4C14.64,4 13,4.93 12,6.34C11,4.93 9.36,4 7.5,4V4M3,12.5A1,1 0 0,0 2,13.5A1,1 0 0,0 3,14.5H5.44L11,20C12,20.9 12,20.9 13,20L18.56,14.5H21A1,1 0 0,0 22,13.5A1,1 0 0,0 21,12.5H13.4L12.47,14.8C12.07,15.81 10.92,15.67 10.55,14.83L8.5,9.5L7.54,11.83C7.39,12.21 7.05,12.5 6.6,12.5H3Z"></path>
        </svg>
      </template>

      <template v-slot:title>
        <div class="text-caption text-grey text-uppercase">
          {{ $t('lastHeartRate') }}
        </div>
        <span class="text-h3 font-weight-black" v-text="lastHeartRate || '—'"></span>
        <strong v-if="lastHeartRate" class="heart-rate-text">{{ $t('bpm') }}</strong>
      </template>
    </v-card>

    <!-- Tarjeta para la última frecuencia respiratoria -->
    <v-card 
      class="mx-auto"
      color="surface-light"
      max-width="600"
      style="display: grid; grid-template-columns: auto 1fr; margin: 20px;"
    >
      <template v-slot:prepend>
        <svg
          :style="{ fill: checking ? 'red' : 'indigo', width: '64px', height: '64px', marginRight: '8px', cursor: 'pointer' }"
          viewBox="0 0 24 24"
          @click="openDialog('breathingFrequency')"
        >
          <path d="M12,4C14.8,4 17,6.2 17,9L17,18C17,18.9 16.1,19.8 15,20L14,20C12.9,20 12,19.1 12,18L12,9C12,8.5 12.5,8 13,8C13.5,8 14,8.5 14,9L14,18C14,18.6 14.4,19 15,19L15,9C15,5.7 13.8,4 12,4L12,4M9,9L9,18C9,18.6 8.6,19 8,19L8,20C7.1,20 6.2,19.1 6.2,18L6,9C6,8.5 6.5,8 7,8C7.5,8 8,8.5 8,9L8,18C8,18.6 8.4,19 9,19L9,9C9,5.7 10.2,4 12,4L12,4"/>
        </svg>
      </template>

      <template v-slot:title>
        <div class="text-caption text-grey text-uppercase">
          {{ $t('lastBreathingFrequency') }}
        </div>
        <span class="text-h3 font-weight-black" v-text="lastBreathingFrequency || '—'"></span>
        <strong v-if="lastBreathingFrequency" class="heart-rate-text">{{ $t('bpm') }}</strong>
      </template>
    </v-card>

    <!-- Tarjeta para la última temperatura -->
    <v-card
      class="mx-auto"
      color="surface-light"
      max-width="600"
      style="display: grid; grid-template-columns: auto 1fr; margin: 20px;"
    >
      <template v-slot:prepend>
        <svg
          :style="{ fill: checking ? 'red' : 'indigo', width: '64px', height: '64px', marginRight: '8px', cursor: 'pointer' }"
          viewBox="0 0 24 24"
          @click="openDialog('temperature')"
        >
          <path d="M15 17a3 3 0 01-2 2.83V21a1 1 0 01-2 0v-1.17A3 3 0 1115 17M11 5v6.29a5 5 0 000 9.42V21a3 3 0 006 0v-1.29a5 5 0 000-9.42V5a4 4 0 00-8 0z"/>    
        </svg>
      </template>

      <template v-slot:title>
        <div class="text-caption text-grey text-uppercase">
          {{ $t('lastTemperature') }}
        </div>
        <span class="text-h3 font-weight-black" v-text="lastTemperature || '—'"></span>
        <strong v-if="lastTemperature" class="heart-rate-text">{{ $t('celsius') }}</strong>
      </template>
    </v-card>

    <v-dialog v-model="dialogVisible" max-width="800">
      <v-card>
        <v-card-title>
          {{ $t('statistics') }} - {{ $t(dialogType) }}
          <v-spacer></v-spacer>
        </v-card-title>
        <v-card-text>
          <v-data-table
            :headers="dialogHeaders"
            :items="filteredDialogData"
            item-key="date"
            class="elevation-1"
          ></v-data-table>

          <v-chart
            :options="chartOptions"
            :data="chartData"
            type="line"
          ></v-chart>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { Line } from 'vue-chartjs';
import PatientService from '@/services/patientservice';

export default {
  components: {
    'v-chart': Line,
  },
  data() {
    return {
      checking: false,
      lastHeartRate: null,
      lastBreathingFrequency: null,
      lastTemperature: null,
      dialogVisible: false,
      dialogType: '',
      dialogHeaders: [
        { text: this.$t('date'), value: 'date' },
        { text: this.$t('heartRateBPM'), value: 'heartRate' },
        { text: this.$t('breathingFrequencyBPM'), value: 'breathingFrequency' },
        { text: this.$t('temperatureCelsius'), value: 'temperature' },
      ],
      dialogData: [],
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            barPercentage: 0.3,
          },
        },
      },
      chartData: {
        labels: [],
        datasets: [],
      },
    };
  },
  created() {
    this.takePulse(false);
  },
  methods: {
    async takePulse(inhale = true) {
      this.checking = true;

      if (inhale) {
        await this.exhale(1000);
      }

      try {
        const username = localStorage.getItem('username');
        const patients = await PatientService.getUserPatients(username);

        if (patients.length > 0) {
          const patientId = patients[0].id;

          const lastReport = await PatientService.getPatientLastReport(patientId);
          this.lastHeartRate = lastReport ? lastReport.heartRate : null;
          this.lastBreathingFrequency = lastReport ? lastReport.breathingFrequency : null;
          this.lastTemperature = lastReport ? lastReport.temperature : null;

          const allReports = await PatientService.getAllPatientReports(patientId);
          this.dialogData = allReports;

          localStorage.setItem('heartbeats', JSON.stringify(this.heartbeats));
        }
      } catch (error) {
        console.error('Error fetching patient data:', error);
      }

      this.checking = false;
    },
    async exhale(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    },
    openDialog(type) {
      this.dialogType = type;
      this.updateChartData(type);
      this.dialogVisible = true;
    },
    closeDialog() {
      this.dialogVisible = false;
    },
    updateChartData(type) {
      const filteredData = this.dialogData
        .filter(report => report[type] !== null)
        .map(report => ({
          date: new Date(report.reportTime).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
          value: report[type],
        }));

      this.chartData = {
        labels: filteredData.map(report => report.date),
        datasets: [
          {
            label: `${this.$t(type)} ${this.$t('overTime')}`,
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
            data: filteredData.map(report => report.value),
          },
        ],
      };
    },
  },
};
</script>

<style scoped>
.text-caption {
  font-size: 14px;
}

.text-grey {
  color: #666;
}

.text-uppercase {
  text-transform: uppercase;
}

.text-h3 {
  font-size: 24px;
}

.font-weight-black {
  font-weight: bold;
}

.mx-auto {
  margin-left: auto;
  margin-right: auto;
}

.elevation-1 {
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.v-card {
  margin-bottom: 20px;
}

.v-dialog {
  overflow-y: auto; }

.v-card-title {
  display: flex;
  align-items: center;
}

.v-card-title {
  margin-right: 8px;
}

.v-card-text {
  padding: 16px 24px;
}

.v-chart {
  margin-top: 16px;
}

.heart-rate-text {
  color: #333;
  font-weight: bold;
}

.bpm-scale {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-right: 10px; 
}
.bpm-scale-item {
  text-align: right;
  font-size: 15px;
  color: #999;
  font-weight: bold;
}

.heart-rate-graph {
  width: 80%;
  height: 200px;
}
</style>

