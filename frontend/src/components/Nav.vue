<template lang="">
  <nav class="navbar navbar-expand-lg navbar-dark fondo">
    <div class="container">

      <!-- <h1 class="navbar-brand" >oneGroup</h1> -->
      <img class="navbar-brand col-3 col-sm-2 col-md-1" src="../assets/logo.jpg" alt=""/>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul v-if="stateGlobal.login" class="navbar-nav ms-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link to="/products" class="nav-link" aria-current="page"
              >Productos</router-link
            >
          </li>
          <li
            v-if="
              stateGlobal.rol === 'VENDEDOR' || stateGlobal.rol === 'SUPER_ROL'
            "
            class="nav-item"
          >
            <router-link to="/myproducts" class="nav-link" aria-current="page">
              Mis Productos</router-link
            >
          </li>
          <li v-if="stateGlobal.rol === 'SUPER_ROL'" class="nav-item">
            <router-link to="/users" class="nav-link" aria-current="page">
              Usuarios</router-link
            >
          </li>
          <li class="nav-item">
            <router-link class="nav-link" aria-current="page" to="/user"
              >Bienvenido {{ stateGlobal.nombre }}</router-link
            >
          </li>
          <li class="nav-item ">
            <p class="btn nav-link" @click="salir">
              <i class="fas fa-sign-out-alt"></i> Salir
            </p>
          </li>
        </ul>

        <ul v-else class="navbar-nav ms-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link class="nav-link" aria-current="page" to="/"
              >Login</router-link
            >
          </li>
          <li class="nav-item">
            <router-link class="nav-link" aria-current="page" to="/register"
              >Registrar</router-link
            >
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
<script>
import { inject } from "@vue/runtime-core";
import { useRouter } from "vue-router";
export default {
  name: "Nav",
  setup() {
    const stateGlobal = inject("stateGlobalLogin");
    const router = useRouter();
    const salir = () => {
      stateGlobal.value = {
        login: false,
        nombre: "",
        rol: "",
        token: "",
        id: "",
      };
      router.push("/");
    };
    return { stateGlobal, salir };
  },
};
</script>
<style lang="css">
.fondo{
  background: black;
}
</style>
