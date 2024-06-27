// services/PatientService.js
import axios from 'axios';

const API_URL ='https://oneupmain.zeabur.app/api/oneup/v1'
//const API_URL = 'http://localhost:8080/api/oneup/v1';

class PatientService {
  getPatientDevice(patientId) {
    return axios.get(`${API_URL}/patients/${patientId}/device`)
      .then(response => response.data)
      .catch(error => {
        console.error('Error fetching patient device:', error);
        throw error;
      });
  }

  getPatientLastReport(patientId) {
    return axios.get(`${API_URL}/patients/${patientId}/reports`)
      .then(response => {
        const reports = response.data;
        return reports.length ? reports[reports.length - 1] : null;
      })
      .catch(error => {
        console.error('Error fetching patient reports:', error);
        throw error;
      });
  }

  getAllPatientReports(patientId) {
    return axios.get(`${API_URL}/patients/${patientId}/reports`)
      .then(response => response.data)
      .catch(error => {
        console.error('Error fetching all patient reports:', error);
        throw error;
      });
  }

  getUserPatients(username) {
    return axios.get(`${API_URL}/users/${username}/patients`)
      .then(response => response.data)
      .catch(error => {
        console.error('Error fetching user patients:', error);
        throw error;
      });
  }
}

export default new PatientService();
