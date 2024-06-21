import axios from 'axios';

const API_URL = 'http://localhost:8080/api/oneup/v1/patients';

class PatientService {
  getPatientDevice(patientId) {
    return axios.get(`${API_URL}/${patientId}/device`)
      .then(response => response.data)
      .catch(error => {
        console.error('Error fetching patient device:', error);
        throw error;
      });
  }
}

export default new PatientService();
