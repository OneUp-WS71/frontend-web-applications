<template>
    <div class="pagina">
      <div class="img-container">
        <img alt="user header" src="../assets/logo_lila.png"/>
      </div>
      <div class="login-container">
        <div class="title">
          <h1 class="bolder">Log In</h1>
        </div>
        <div class="flex flex-column gap-2">
          <FloatLabel style="margin-top: 1rem;" >
            <InputText style="width: 350px;border-radius: 100px;" id="username" v-model="username" />
            <label for="username" class="normal">Enter Name</label>
          </FloatLabel>
          <FloatLabel style="margin-top: 1rem;">
            <InputText style="width: 350px;border-radius: 100px;" id="password" type="password" v-model="password" />
            <label for="password" class="normal">Enter Password</label>
          </FloatLabel>
        </div>
        <div class="buttons">
          <Button style="margin: 1rem; width: 350px;border-radius: 100px;" class="buy-button" label="Log in into your account" @click="LogInClick"/>
          <div class="buttons-childs">
            <Button style="margin-top: 1rem;margin-right: 2rem;border-radius: 100px;text-align: center;" class="buy-button" label="Sign In" @click="SignInClick"/>
            <Button style="margin-top: 1rem;border-radius: 100px;text-align: center;" class="buy-button" label="Forgot your password?" @click="ForgotClick"/>
          </div>
        </div>
      </div>
 <!--     <Message v-if="loginSuccess" severity="success" :closable="true" :life="3000" class="p-message-success" position="top-right">Login Successful</Message>
      <Message v-if="loginError" severity="error" :closable="true" :life="3000" class="p-message-error" position="top-right">Login Failed</Message>
    --> </div>
  </template>
  
<script>
import loginService from '@/services/loginservice';
export default {
    data() {
        return {
            username: '',
            password: '',
            loginSuccess: false,
            loginError: false
        };
    },
    methods: {
        async LogInClick() {
            try {
                const response = await loginService.authenticate({
                    username: this.username,
                    password: this.password
                });
                console.log('Authenticated:', response.data);
                this.loginSuccess = true;
                this.loginError = false;
                this.$router.push('/user-profile');
            }   catch (error) {
                console.error('Authentication failed:', error);
                this.loginSuccess = false;
                this.loginError = true;
                this.$router.push('/login');
            }
        },
        
        SignInClick() {
            this.$router.push('/register');
        },
        ForgotClick() {
            this.$router.push('/forgot');
        }
    },
    data() {
        return {
            username: '',
            password: '',
            loginSuccess: false,
            loginError: false
        };
    },
}
</script>
<style scoped>
    .pagina{
        height: 100vh;
        width: 100vw;
        background-color: var(--indigo-500);
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    .login-container{
        display: flex;
        flex-direction: column;
        align-items: center;
        height: 500px;
        width: 500px;
        background-color: white;
        border-radius: 10%;
        color: var(--indigo-600);
        justify-content: center;
    }
    .title{
        margin-top: -7%;
        margin-bottom: 5%;
    }
    .img-container{
        
        height: 300px;
        width: 300px;
    }
    .img-container img{
        width: 100%;
        height: 100%;
    }
    .buttons{
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 350px;
        
    }
    .buttons-childs {
        display: flex;
        
        
    }
    .buttons-childs p-button{
        display: flex;
        
        
    }
</style>