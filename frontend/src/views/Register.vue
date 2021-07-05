<template>
  <div class="container mt-5">
    <div class="d-flex justify-content-center">
      <div class=" col-12 col-sm-10 col-md-8">
        <div class="card">
          <div class="card-header">
            <h1 class="text-center card-title"><i class=" fas fa-user"></i></h1>
            <h1 class="text-center card-title">Registrar</h1>
          </div>

          <div class="card-body">
            <form v-on:submit.prevent="registrar">
              <div class="mb-3">
                <input
                  type="text"
                  placeholder="Nombre"
                  class="form-control"
                  required
                  v-model="registerState.nombre"
                />
              </div>
              <div class="mb-3">
                <input
                  type="email"
                  placeholder="Email"
                  class="form-control"
                  required
                  v-model="registerState.email"
                />
              </div>
              <div class="mb-3">
                <select
                  class="form-select"
                  aria-label="Default select example"
                  v-model="registerState.rol"
                  ><option value="VENDEDOR">VENDEDOR</option>
                  <option value="COMPRADOR">COMPRADOR</option>
                </select>
              </div>
              <div class="mb-3">
                <input
                  type="password"
                  placeholder="Contraseña"
                  class="form-control"
                  required
                  v-model="registerState.password"
                />
              </div>
              <div class="mb-3">
                <input
                  type="file"
                  placeholder="Subir imagen"
                  class="form-control  inputfile"
                  required
                  @change="validarFormato($event)"
                />
              </div>
              <button class="btn btn-dark form-control" type="submit">
                Registrar
              </button>
            </form>
          </div>
        </div>
        <p class="text-center">
          ¿Ya tienes cunta?
          <router-link aria-current="page" to="/"> ¡Login! </router-link>
        </p>
      </div>
    </div>
  </div>
</template>
<script>
import { useRouter } from "vue-router";
import { inject, ref } from "vue";
import axios from "axios";
import Swal from "sweetalert2";
export default {
  name: "Register", 
  setup() {
    const router = useRouter();
    const stateGlobal = inject("stateGlobalLogin");
    const formData = new FormData();
    const registerState = ref({
      nombre: "",
      email: "",
      password: "",
      rol: "VENDEDOR",
      img: "",
    });
    const validarFormato = (e) => {
      console.log("entre a validar");
      if (e.target.files && e.target.files[0]) {
        const img = e.target.files[0];
        if (!/\.(jpeg|jpg|png|JPG|gif|svg|PNG)$/i.test(img.name)) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "el Formato no es valido",
          });
          e.target.value = "";
        } else {
          registerState.value.img = img;
        }
      }
    };
    const registrar = async () => {
      try {
        registerState.value.img !== "" &&
          formData.append("img", registerState.value.img);
        formData.append("nombre", registerState.value.nombre);
        formData.append("email", registerState.value.email);
        formData.append("password", registerState.value.password);
        formData.append("rol", registerState.value.rol);

        const { data } = await axios.post(
          "https://unexpected-brainy-emmental.glitch.me/api/user/register",
          formData
        );
        if (data.ok) {
          stateGlobal.value = {
            token: data.token,
            nombre: data.nombre,
            rol: data.rol,
            id: data.id,
            img: data.img,
            email: data.email,
            login: true,
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
        console.log("error en la funcion registrar", error.message);
      }
    };
    return { registrar, validarFormato, registerState };
  },
};
</script>
<style></style>
