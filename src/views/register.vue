<template>
  <div class="pagina">
    <div class="img-container">
      <img alt="user header" src="../assets/logo_lila.png" />
    </div>
    <div class="register-container">
      <div class="title">
        <h2 class="bolder">Sign Up</h2>
      </div>
      <div class="form">
        <div class="form-column">
          <FloatLabel style="margin-top: 1rem;">
            <InputText style="width: 350px;border-radius: 100px;" v-model="formData.username" />
            <label for="username" class="normal">Username</label>
          </FloatLabel>
          <FloatLabel style="margin-top: 1rem;">
            <InputText style="width: 350px;border-radius: 100px;" v-model="formData.name" />
            <label for="name" class="normal">Name</label>
          </FloatLabel>
          <FloatLabel style="margin-top: 1rem;">
            <InputText style="width: 350px;border-radius: 100px;" v-model="formData.lastname" />
            <label for="lastname" class="normal">Lastname</label>
          </FloatLabel>
          <FloatLabel style="margin-top: 1rem;">
            <InputText style="width: 350px;border-radius: 100px;" v-model="formData.phone" @input="validatePhone" />
            <label for="phone" class="normal">Phone</label>
          </FloatLabel>
          <FloatLabel style="margin-top: 1rem;">
            <InputText style="width: 350px;border-radius: 100px;" v-model="formData.password" type="password" />
            <label for="password" class="normal">Password</label>
          </FloatLabel>
          <FloatLabel style="margin-top: 1rem;">
            <InputText style="width: 350px;border-radius: 100px;" v-model="formData.email" />
            <label for="email" class="normal">Email</label>
          </FloatLabel>
        </div>
      </div>
      <div class="buttons">
        <Button style="margin-top: 1rem;width: 350px;border-radius: 100px;text-align: center;" class="buy-button" label="Create Account" :disabled="!validateForm()" @click="createAccount" />
        <Button style="margin-top: 1rem;width: 350px;border-radius: 100px;text-align: center;" class="sign-in-button" label="Log In" @click="signIn" :disabled="!validateForm()"/>
      </div>
    </div>
    <Toast ref="toast" position="top-right" />
  </div>
</template>

<script>
import loginService from '@/services/loginservice';
import Toast from 'primevue/toast';

export default {
  data() {
    return {
      formData: {
        username: '',
        name: '',
        lastname: '',
        phone: '',
        password: '',
        email: ''
      }
    };
  },
  methods: {
    async createAccount() {
      try {
        const response = await loginService.register(this.formData);
        console.log('User registered:', response.data);
        this.$refs.toast.add({ severity: 'success', summary: 'Account created successfully', life: 3000 });
        
        // Save username to localStorage
        localStorage.setItem('username', this.formData.username);
        
        // Navigate to login page after successful registration
        this.$router.push('/login');
      } catch (error) {
        console.error('Registration failed:', error);
        this.$refs.toast.add({ severity: 'error', summary: 'Registration failed', life: 3000 });
      }
    },
    signIn() {
      // Implement sign-in functionality here
      // For example, navigate to the sign-in route
      this.$router.push('/signin');
    },
    validatePhone() {
      // Validate phone number not greater than 999999999
      if (this.formData.phone > 999999999) {
        this.formData.phone = '';
        this.$refs.toast.add({ severity: 'error', summary: 'Phone number cannot exceed 999999999', life: 3000 });
      }
    },
    validateForm() {
      // Validate form fields before enabling the Create Account button
      return this.formData.username && this.formData.name && this.formData.lastname &&
             this.formData.phone && this.formData.password && this.formData.email;
    }
  },
  mounted() {
    // Retrieve username from localStorage if needed
    this.username = localStorage.getItem('username');
  },
};
</script>

<style scoped>
.pagina {
  height: 100vh;
  width: 100vw;
  background-color: var(--indigo-500);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.register-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 630px;
  width: 500px;
  background-color: white;
  border-radius: 10%;
  color: var(--indigo-600);
  justify-content: center;
}
.title {
  margin-top: -7%;
  margin-bottom: 5%;
}
.img-container {
  height: 300px;
  width: 300px;
}
.img-container img {
  width: 100%;
  height: 100%;
}
.form {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}
.form-column {
  width: 100%; 
}
.buttons {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 350px;
}
</style>
