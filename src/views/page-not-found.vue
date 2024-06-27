<template>
    <div class="error-page">
      <h1>404 - Página No Encontrada</h1>
      <p>Lo sentimos, la página que estás buscando no existe.</p>
      <router-link to="/">Volver al Inicio</router-link>
    </div>
  </template>
  
  <script>
  export default {

  };
  </script>
  
  <style scoped>
  .error-page {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    text-align: center;
    color: #555;
  }
  
  .error-page h1 {
    font-size: 4em;
    margin-bottom: 0.5em;
  }
  
  .error-page p {
    font-size: 1.5em;
    margin-bottom: 1em;
  }
  
  .error-page a {
    font-size: 1.2em;
    color: #5a67d8;
    text-decoration: none;
  }
  
  .error-page a:hover {
    text-decoration: underline;
  }
  </style>
  