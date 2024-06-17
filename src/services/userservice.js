import axios from 'axios';

const getUserData = async (username) => {
  try {
    const response = await axios.get(`http://localhost:8080/api/oneup/v1/users/username/${username}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error;
  }
};

const updateUserData = async (username, userData) => {
  try {
    const response = await axios.put(`http://localhost:8080/api/oneup/v1/users/username/${username}`, userData);
    return response.data;
  } catch (error) {
    console.error('Error updating user data:', error);
    throw error;
  }
};

const getPatients = async (username) => {
  try {
    const response = await axios.get(`http://localhost:8080/api/oneup/v1/users/${username}/patients`);
    console.log('Fetched patients:', response.data); // Log para verificar los datos de los pacientes
    return response.data;
  } catch (error) {
    console.error('Error fetching patients:', error);
    throw error;
  }
};

const addPatient = async (userId, patientData) => {
  try {
    const response = await axios.post(`http://localhost:8080/api/oneup/v1/patients/${userId}`, patientData);
    return response.data;
  } catch (error) {
    console.error('Error adding patient:', error);
    throw error;
  }
};

const deletePatient = async (patientId) => {
  if (patientId === undefined) {
    console.error('Error: patientId is undefined');
    return;
  }
  try {
    const response = await axios.delete(`http://localhost:8080/api/oneup/v1/patients/${patientId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting patient:', error);
    throw error;
  }
};

export default {
  getUserData,
  updateUserData,
  getPatients,
  addPatient,
  deletePatient,
};
      