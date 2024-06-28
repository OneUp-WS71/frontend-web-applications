<template>
  <div class="profile-container" v-if="userLoaded">
    <h1>{{ $t('greeting') }} {{ user.name }}</h1>
    <div class="profile-card">
      <img class="profile-pic" :src="previewImage || 'https://w7.pngwing.com/pngs/884/512/png-transparent-person-shadow-computer-icons-person-symbol-meridian-energy-group-inc-person-icon-145444-bryan-le-graphy-miscellaneous-silhouette-black.png'" alt="Profile Picture">
      <div class="profile-info">
        <div class="info-row">
          <label>{{$t('name')}}</label>
          <h3>{{ user.name }}</h3>
        </div>
        <div class="info-row">
          <label>{{$t('lastname')}}</label>
          <h3>{{ user.lastname }}</h3>
        </div>
        <div class="info-row">
          <label>{{$t('address')}}</label>
          <h3>{{ user.email }}</h3>
        </div>
        <div class="info-row">
          <label>{{$t('phone')}}</label>
          <h3>{{ user.phone }}</h3>
        </div>
      </div>
    </div>
  </div>
  <div v-else>
    <!-- Muestra un mensaje de carga -->
    <p>Loading...</p>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import userService from '@/services/userservice';

export default {
  setup() {
    const user = ref({
      name: '',
      lastname: '',
      email: '',
      phone: '',
      gender: '',
      type: '',
      image: '',
    });

    const previewImage = ref('');
    const userLoaded = ref(false);

    const fetchUserData = async () => {
      try {
        const username = localStorage.getItem('username');
        if (username) {
          const userData = await userService.getUserData(username);
          user.value = {
            ...userData,
            image: userData.image ? `data:image/jpeg;base64,${userData.image}` : '',
          };
          previewImage.value = user.value.image;
          userLoaded.value = true;
        } else {
          console.error('Username not found in localStorage');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    onMounted(() => {
      fetchUserData();
    });

    return {
      user,
      previewImage,
      userLoaded,
    };
  },
};
</script>

<style scoped>
.profile-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
  padding-top: 120px;
}

.profile-card {
  width: 500px;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
}

.profile-pic {
  border-radius: 50%;
  width: 100px;
  height: 100px;
  object-fit: cover;
  margin-bottom: 20px;
}

.profile-info {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 100%;
}

.info-row {
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
  width: 45%;
}

.info-row label {
  margin-bottom: 5px;
  font-weight: bold;
}

.info-row span {
  padding: 10px 15px;

  border-radius: 4px;
  display: block;
}

.edit-button {
  margin-top: 20px;
  background-color: #5a67d8;
  border: none;
  color: white;
}

.confirm-button {
  margin: 20px;
  background-color: #4CAF50;
  border: none;
  color: white;
}

.cancel-button {
  margin: 20px;
  background-color: #f44336;
  border: none;
  color: white;
}

.custom-file-input {
  display: none;
}

.custom-file-label {
  padding: 10px;
  background-color: #B1B8E1;
  color: #030000;
  font-weight: bold;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  display: inline-block;
}

.custom-file-label:hover {
  background-color: #0056b3;
}
</style>
