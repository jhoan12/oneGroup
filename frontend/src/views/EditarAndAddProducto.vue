<template lang="">
  <div class="container mt-5">
    <div class="d-flex justify-content-center">
      <div class="col-md-8">
        <div class="card">
          <div class="card-header">
            <h1 v-if="stateGlobal.editProduct" class="text-center card-title">
              Actualizar
            </h1>
            <h1 v-else class="text-center card-title">
              Agregar
            </h1>
          </div>

          <div class="card-body">
            <form v-on:submit.prevent="action">
              <div class="mb-3">
                <input
                  type="text"
                  placeholder="Nombre"
                  class="form-control"
                  required
                  v-model="addProductState.nombre"
                />
              </div>
              <div class="mb-3">
                <textarea
                  type="text"
                  placeholder="Descripcion del producto"
                  class="form-control"
                  required
                  v-model="addProductState.descripcion"
                ></textarea>
              </div>
              <div class="mb-3">
                <input
                  type="text"
                  placeholder="Precio"
                  class="form-control"
                  required
                  v-model="addProductState.precio"
                />
              </div>
              <div class="mb-3">
                <input
                  type="file"
                  placeholder="Subir imagen"
                  class="form-control  inputfile"
                  @change="validarFormato($event)"
                />
              </div>
              <button
                v-if="stateGlobal.editProduct"
                class="btn btn-dark form-control"
                type="submit"
              >
                Actualizar
              </button>
              <button v-else class="btn btn-dark form-control" type="submit">
                Guardar
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { inject, onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";
import Swal from "sweetalert2";
export default {
  name: "EditAdd",
  setup() {
    const router = useRouter();
    const route = useRoute();
    const stateGlobal = inject("stateGlobalLogin");
    const formData = new FormData();
    const addProductState = ref({
      nombre: "",
      descripcion: "",
      user: stateGlobal.value.id,
      precio: "",
      img: "",
    });

    onMounted(() => {
      if (stateGlobal.value.editProduct) {
        llenarCamposEditar();
      }
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
          addProductState.value.img = img;
        }
      }
    };

    const llenarCamposEditar = async () => {
      try {
        const id = route.params.id;
        const { data } = await axios.get(
          `https://unexpected-brainy-emmental.glitch.me/api/product/product/${id}`,
          {
            headers: { authorization: "onegroup " + stateGlobal.value.token },
          }
        );
        if (data.ok) {
          addProductState.value = data.product;
        }
      } catch (error) {
        console.log("error en la funcion llenarCamposEditar", error.message);
      }
    };

    const action = () => {
      stateGlobal.value.editProduct ? updateProduct() : addProduct();
    };

    const addProduct = async () => {
      try {
        addProductState.value.img !== "" &&
          formData.append("img", addProductState.value.img);
        formData.append("nombre", addProductState.value.nombre);
        formData.append("descripcion", addProductState.value.descripcion);
        formData.append("precio", addProductState.value.precio);
        formData.append("user", addProductState.value.user);

        const { data } = await axios.post(
          "https://unexpected-brainy-emmental.glitch.me/api/product/add",
          formData,
          {
            headers: { authorization: "onegroup " + stateGlobal.value.token },
          }
        );
        if (data.ok) {
          Swal.fire({
            icon: "success",
            text: data.mensaje,
            timer: 1500,
            showConfirmButton: false,
          });
          router.push("/myproducts");
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: data.mensaje,
          });
        }
      } catch (error) {
        console.log(
          "error en la funcion regiaddEditProductstrar",
          error.message
        );
      }
    };

    const updateProduct = async () => {
      try {
        const id = route.params.id;
        addProductState.value.img !== "" &&
          formData.append("img", addProductState.value.img);
        formData.append("nombre", addProductState.value.nombre);
        formData.append("descripcion", addProductState.value.descripcion);
        formData.append("precio", addProductState.value.precio);
        formData.append("user", addProductState.value.user);

        const { data } = await axios.put(
          `https://unexpected-brainy-emmental.glitch.me/api/product/update/${id}`,
          formData,
          {
            headers: { authorization: "onegroup " + stateGlobal.value.token },
          }
        );
        if (data.ok) {
          router.push("/myproducts");
        }
      } catch (error) {
        console.log("error en la funcion updateProduct", error.message);
      }
    };
    return { action, validarFormato, addProductState, stateGlobal };
  },
};
</script>
<style lang=""></style>
