<template>
  <div class="container">
    <div class="col-12 col-sm-6 col-md-4 col-xl-3">
      <div class="card">
        <img
          :src="product.img"
          alt="img"
          class="btn card-img-top"
          @click="Detalleproduct(product)"
        />

        <div class="card-body">
          <h1 class="card-title">{{ product.nombre }}</h1>
          <span v-if="product.precio">${{ product.precio }}</span>
          <h5 v-if="product.email">Correo: {{ product.email }}</h5>
          <span v-if="product.rol">Rol: {{ product.rol }}</span>
          <div v-if="product.email" class="d-flex justify-content-center mt-3">
            <h1 class="icono text-center" @click="eliminarUser(product)">
              <i class="fas fa-trash-alt"></i>
            </h1>
          </div>
          <div
            v-if="
              stateGlobal.rol === 'VENDEDOR' || stateGlobal.rol === 'SUPER_ROL'
            "
          >
            <div
              v-if="stateGlobal.id === product.user"
              class="d-flex justify-content-around mt-4"
            >
              <h1 class="icono" @click="addEdit(product._id)">
                <i class="fas fa-user-edit"></i>
              </h1>
              <h1 class="icono" @click="eliminar(product._id)">
                <i class="fas fa-trash-alt"></i>
              </h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { inject } from "@vue/runtime-core";
import { useRouter } from "vue-router";
import axios from "axios";
import Swal from "sweetalert2";
export default {
  name: "Product",
  props: {
    product: Object,
    obtenerProductos: Function,
  },
  setup(props) {
    const router = useRouter();
    const stateGlobal = inject("stateGlobalLogin");
    const productState = inject("productState");
    const Detalleproduct = (product) => {
      if (!product.email) {
        productState.value = product;
        router.push("/product");
      }
    };
    const eliminar = async (id) => {
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
              "https://unexpected-brainy-emmental.glitch.me/api/product/delete/" +
                id,
              {
                headers: {
                  authorization: "onegroup " + stateGlobal.value.token,
                },
              }
            );
            props.obtenerProductos();
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
    const eliminarUser = async (user) => {
      try {
        const id = user._id;

        Swal.fire({
          title:
            stateGlobal.value.email === user.email
              ? "¡esta es tu cuenta! "
              : "¿Estas seguro?",
          text:
            stateGlobal.value.email === user.email
              ? "¿Estas seguro de que quieres eliminarla? ¡No podrás revertir esto!"
              : "¡No podrás revertir esto!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Si, eliminar!",
        }).then(async (result) => {
          if (result.isConfirmed) {
            const { data } = await axios.delete(
              "https://unexpected-brainy-emmental.glitch.me/api/user/delete/" +
                id,
              {
                headers: {
                  authorization: "onegroup " + stateGlobal.value.token,
                },
              }
            );
            if (data.email === stateGlobal.value.email) {
              router.push("/");
              stateGlobal.value.login = false;
            } else {
              props.obtenerProductos();
            }
            Swal.fire({
              text: data.mensaje,
              icon: "success",
              showConfirmButton: false,
              timer: 2000,
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

    const addEdit = (id) => {
      stateGlobal.value.editProduct = true;
      router.push(`/update/${id}`);
    };
    return { stateGlobal, Detalleproduct, addEdit, eliminar, eliminarUser };
  },
};
</script>
<style>
.icono {
  cursor: pointer;
}
</style>
