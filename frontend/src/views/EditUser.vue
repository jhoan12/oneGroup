<template lang="">
  <div class="container mt-5">
    <div class="d-flex justify-content-center">
      <div class="col-md-8">
        <div class="card">
          <div class="card-header">
            <h1 class="text-center card-title"><i class=" fas fa-user"></i></h1>
            <h1 class="text-center card-title">Actualizar</h1>
          </div>

          <div class="card-body">
            <form v-on:submit.prevent="updateUser">
              <div class="mb-3">
                <input
                  type="text"
                  placeholder="Nombre"
                  class="form-control"
                  required
                  v-model="addUserState.nombre"
                />
              </div>
              <div class="mb-3">
                <input
                  type="email"
                  placeholder="Email"
                  class="form-control"
                  required
                  v-model="addUserState.email"
                />
              </div>
              <div class="mb-3">
                <select
                  class="form-select"
                  aria-label="Default select example"
                  v-model="addUserState.rol"
                  ><option value="VENDEDOR">VENDEDOR</option>
                  <option value="COMPRADOR">COMPRADOR</option>
                </select>
              </div>
              <div class="mb-3">
                <input
                  type="file"
                  placeholder="Subir imagen"
                  class="form-control  inputfile"
                  @change="validarFormato($event)"
                />
              </div>
              <button class="btn btn-dark form-control" type="submit">
                Actualizar
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { inject, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";
import Swal from "sweetalert2";
export default {
  name: "EditUser",
  setup() {
    const router = useRouter();
    const route = useRoute();
    const stateGlobal = inject("stateGlobalLogin");
    const formData = new FormData();
    const addUserState = ref({
      nombre: stateGlobal.value.nombre,
      email: stateGlobal.value.email,
      rol: stateGlobal.value.rol,
      img: stateGlobal.value.img,
    });

    const validarFormato = (e) => {
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
          addUserState.value.img = img;
        }
      }
    };

    const updateUser = async () => {
      try {
        const id = route.params.id;
        console.log(id);
        addUserState.value.img !== "" &&
          formData.append("img", addUserState.value.img);
        formData.append("nombre", addUserState.value.nombre);
        formData.append("email", addUserState.value.email);
        formData.append("rol", addUserState.value.rol);

        const { data } = await axios.put(
          `https://unexpected-brainy-emmental.glitch.me/api/user/update/${id}`,
          formData,
          {
            headers: { authorization: "onegroup " + stateGlobal.value.token },
          }
        );
        console.log(data);
        if (data.ok) {
          stateGlobal.value = {
            ...stateGlobal.value,
            nombre: data.nombre,
            rol: data.rol,
            img: data.img,
            email: data.email,
          };
          router.push("/user");
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: data.mensaje,
          });
        }
      } catch (error) {
        console.log("error en la funcion updateUser", error.message);
      }
    };
    return { updateUser, validarFormato, addUserState };
  },
};
</script>
<style lang=""></style>
