import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://oneupbackend.zeabur.app/api/oneup/v1',
  headers: {
    'Content-Type': 'application/json'
  }
});

export default {
  authenticate(user) {
    return apiClient.post('/user/authenticate', user);
  },
  register(user) {
    return apiClient.post('/users', user);
  }
};
