<template>
  <div enter-class="container">
    <div class="d-flex justify-content-center">
      <div class="mt-5 col-12 col-sm-6 col-md-4 col-xl-3">
        <div class="card " >
          <img
            :src="stateGlobal.img"
            :alt="stateGlobal.nombre"
            class="card-img-top"
          />

          <div class="card-body" >
            <h1>{{ stateGlobal.nombre }}</h1>
            <p>
              correo: <span>{{ stateGlobal.email }}</span>
            </p>
            <p>
              rol: <span>{{ stateGlobal.rol }}</span>
            </p>

            <div class="d-flex justify-content-around">
              <h1 class="icono" @click="editarUser(stateGlobal.id)"><i class="fas fa-user-edit"></i></h1>
              <h1 class="icono" @click="eliminarUser()"><i class="fas fa-trash-alt"></i></h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { inject } from "@vue/runtime-core";
import axios from "axios";
import Swal from "sweetalert2";
import { useRouter } from 'vue-router';
export default {
  name: "User",
  setup() {
    const stateGlobal = inject("stateGlobalLogin");
    const router = useRouter()
    const eliminarUser = async () => {
      try {
        Swal.fire({
          title: "¿Estas seguro?",
          text: "¡No podrás revertir esto!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Si, eliminar!",
        }).then(async (result) => {
          if (result.isConfirmed) {
            const { data } = await axios.delete(
              "https://unexpected-brainy-emmental.glitch.me/api/user/delete/" + stateGlobal.value.id,
              {
                headers: { authorization: "onegroup " + stateGlobal.value.token },
              }
            );
           router.push("/")
           stateGlobal.value.login = false;
            Swal.fire({
              text: data.mensaje,
              icon: "success",
              showConfirmButton: false,
              timer: 1500,
            });
          }
        });
      } catch (error) {
        console.log(
          "error en la funcion eliminarProductComponent",
          error.message
        );
      }
    };

    const editarUser = (id) => {
      router.push(`/user/update/${id}`);
    }

    return { stateGlobal, eliminarUser, editarUser };
  },
};
</script>
<style>
.icono{
  cursor: pointer;
}
</style>
