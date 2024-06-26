import axios from 'axios';

const apiClient = axios.create({
 //baseURL:'http://localhost:8080/api/oneup/v1',
  baseURL: 'https://oneupmain.zeabur.app/api/oneup/v1',
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
