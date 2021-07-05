<template>
  <div class="container mt-5">
    <div  class="d-flex justify-content-center">
      <div class="col-12 col-sm-10 col-md-8">
        <div class="card" >
          <div class="card-header">
            <h1 class="text-center card-title"><i class=" fas fa-user"></i></h1>
            <h1 class="text-center card-title">Login</h1>
          </div>

          <div class="card-body">
            <form v-on:submit.prevent="login">
              <div class="mb-3">
                <input
                  type="email"
                  placeholder="Email"
                  class="form-control"
                  v-model="loginState.email"
                  required
                />
              </div>
              <div class="mb-3">
                <input
                  type="password"
                  placeholder="Contraseña"
                  class="form-control"
                  v-model="loginState.password"
                  required
                />
              </div>
              <button class="btn btn-dark form-control" type="submit">
                Login
              </button>
            </form>
          </div>
        </div>
        <p class="text-center">
          ¿Notienes cunta?
          <router-link aria-current="page" to="/register">
            ¡Registrate!
          </router-link>
        </p>
      </div>
    </div>
  </div>
</template>
<script>
import { inject, ref } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import Swal from "sweetalert2";
export default {
  name: "Login",
  setup() {
    const router = useRouter();
    const loginState = ref({
      email: "",
      password: "",
    });
    const stateGlobal = inject("stateGlobalLogin");

    const login = async () => {
      try {
        const { data } = await axios.post(
          "https://unexpected-brainy-emmental.glitch.me/api/user/login",
          loginState.value
        );
        if (data.ok) {
          //con la idea de que mi app sea mas rapida, guardo la info del usuario en mi state global
          //asi, cuando la pida mas adelante, no tendre que hacer una nueva peticion
          stateGlobal.value = {
            editProduct: false,
            token: data.token,
            nombre: data.nombre,
            rol: data.rol,
            email: data.email,
            img: data.img,
            login: true,
            id: data.id,
          };
          Swal.fire({
            icon: "success",
            text: data.mensaje,
            timer: 1500,
            showConfirmButton: false,
          });
          router.push("/products");
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: data.mensaje,
          });
        }
      } catch (error) {
        console.log("error en la funcion login", error.message);
      }
    };
    return { loginState, login, stateGlobal };
  },
};
</script>
<style></style>
