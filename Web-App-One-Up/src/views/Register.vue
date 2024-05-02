<template>
    <div class="pagina">
        <div class="img-container">
            <img alt="user header" src="../assets/logo_lila.png"/>
        </div>
        <div class="login-container">
            <div class="title">
                <h1 class="bolder">Registrate</h1>
            </div>
            <div class="flex flex-column gap-2">
                <FloatLabel style="margin-top: 1rem;">
                    <InputText style="width: 350px;border-radius: 100px;" id="username" v-model="value" />
                    <label for="username" class="normal">Ingresa tu correo</label>
                </FloatLabel>
                <FloatLabel style="margin-top: 1rem;">
                    <InputText style="width: 350px;border-radius: 100px;" id="username" v-model="value" />
                    <label for="username" class="normal">Ingresa tu Nombre</label>
                </FloatLabel>
                <FloatLabel style="margin-top: 1rem;">
                    <InputText style="width: 350px;border-radius: 100px;" id="username" v-model="value" />
                    <label for="username" class="normal">Ingrese su contraseña</label>
                </FloatLabel>
            </div>
            <div class="buttons">
                <Button style="margin-top: 1rem;margin-right: 1rem;border-radius: 100px;text-align: center;" class="buy-button"label="Iniciar Sesión" />
                    <Button style="margin-top: 1rem;border-radius: 100px;text-align: center;" class="buy-button"label="Crear Cuenta" />
                
            </div>
        </div>
        
    </div>
</template>
<script>
export default {
    
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
        justify-content: space-between;
        align-items: center;
        width: 350px;
        
    }
    
</style>