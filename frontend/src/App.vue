<template>
  <Nav />
  <router-view />
</template>

<script>
import { ref, provide, watchEffect } from "vue";
import Nav from "./components/Nav.vue";
export default {
  components: {
    Nav,
  },
  setup() {
    // este es el que sera el state global
    const stateGlobalLogin = ref({
      editProduct: false,
      login: false,
      nombre: "",
      rol: "",
      token: "",
      id: "",
      img: "",
      email: "",
    });


    watchEffect(()=>{
      sessionStorage.setItem('login',stateGlobalLogin.value.login)
    })

    const productState = ref({});
    const editState = ref({})
    provide("stateGlobalLogin", stateGlobalLogin);
    provide("productState", productState);
    provide("editState"), editState

  },
};
</script>

<style></style>
