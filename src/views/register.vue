<template>
    <div class="pagina">
        <div class="img-container">
            <img alt="user header" src="../assets/logo_lila.png" />
        </div>
        <div class="sign-in-container">
            <div class="title">
                <h1 class="bolder">Sign In</h1>
            </div>
            <div class="form">
                <div class="form-column">
                    <FloatLabel style="margin-top: 1rem;">
                        <InputText v-model="formData.username" />
                        <label for="username" class="normal">Username</label>
                    </FloatLabel>
                    <FloatLabel style="margin-top: 1rem;">
                        <InputText v-model="formData.password" type="password" />
                        <label for="password" class="normal">Password</label>
                    </FloatLabel>
                    <FloatLabel style="margin-top: 1rem;">
                        <InputText v-model="formData.name" />
                        <label for="name" class="normal">Name</label>
                    </FloatLabel>
                    <FloatLabel style="margin-top: 1rem;">
                        <InputText v-model="formData.lastname" />
                        <label for="lastname" class="normal">Lastname</label>
                    </FloatLabel>
                </div>
                <div class="form-column">
                    <FloatLabel style="margin-top: 1rem;">
                        <InputText v-model="formData.email" />
                        <label for="email" class="normal">Email</label>
                    </FloatLabel>
                    <FloatLabel style="margin-top: 1rem;">
                        <InputText v-model="formData.phone" />
                        <label for="phone" class="normal">Phone</label>
                    </FloatLabel>
                    <FloatLabel style="margin-top: 1rem;">
                        <InputText v-model="formData.type" />
                        <label for="type" class="normal">Type</label>
                    </FloatLabel>
                    <FloatLabel style="margin-top: 1rem;">
                        <InputText v-model="formData.gender" />
                        <label for="gender" class="normal">Gender</label>
                    </FloatLabel>
                </div>
            </div>
            <div class="buttons">
                <Button style="margin-top: 1rem;width: 150px;border-radius: 100px;text-align: center;"
                    class="buy-button" label="Log In" @click="Login"/>
                <Button style="margin-top: 1rem;border-radius: 100px;text-align: center;" class="buy-button"
                    label="Create Account" @click="registerUser" />
            </div>
        </div>
    </div>
</template>
<script>
import loginService from '@/services/loginservice';
export default {
  data() {
    return {
      formData: {
        username: '',
        password: '',
        name: '',
        lastname: '',
        email: '',
        phone: '',
        type: '',
        gender: ''
      }
    };
  },
  methods: {
    async registerUser() {
      try {
        const response = await loginService.register(this.formData);
        console.log('User registered:', response.data);
        this.$router.push('/user-profile');
      } catch (error) {
        console.error('Registration failed:', error);

      }
    },
    Login() {
      this.$router.push('/login');
    }
  }
}
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

.sign-in-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 600px;
  background-color: white;
  border-radius: 10px;
  color: var(--indigo-600);
  padding: 20px;
}

.title {
  margin-bottom: 20px;
}

.img-container {
  height: 100px;
  width: 100px;
}

.img-container img {
  width: 100%;
  height: 100%;
}

.form {
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 20px;
}

.form-column {
  width: 45%;
}

.buttons {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 75%;
}
</style>