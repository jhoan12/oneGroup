<template>
  <div class="container">
    <div class="mt-5 d-flex justify-content-around">
      <router-link to="/add" class="btn btn-dark" aria-current="page"
        >Agregar Producto</router-link
      >
    </div>
    <div class="row g-2 my-3">
      <Product
        v-for="product of products"
        :key="product._id"
        :product="product"
        :obtenerProductos="obtenerMisProductos"
      ></Product>
    </div>
  </div>
</template>
<script>
import { inject, onMounted, ref } from "vue";
import axios from "axios";
import Product from "../components/Product.vue";

export default {
  //nombre para el componente que se va a exportar
  name: "MyProducts",
  components: {
    Product,
  },
  setup() {
    const products = ref([]);
    const stateGlobal = inject("stateGlobalLogin");
    onMounted(() => {
      obtenerMisProductos();
    });

    const obtenerMisProductos = async () => {
      try {
        const { data } = await axios.get(
          "https://unexpected-brainy-emmental.glitch.me/api/product/products/" + stateGlobal.value.id,
          {
            headers: { authorization: "onegroup " + stateGlobal.value.token },
          }
        );
        products.value = data.productsAdmin;
      } catch (error) {
        console.log("error en la funcion obtenerMisProductos", error.message);
      }
    };

    return { products, obtenerMisProductos };
  },
};
</script>
<style></style>
