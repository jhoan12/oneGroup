<template>
  <div class="container">
    <div class="row g-2 my-3">
      <Product
        v-for="product of products"
        :key="product._id"
        :product="product"
        :obtenerProductos="obtenerProductos"
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
  name: "Products",
  components: {
    Product,
  },
  setup() {
    const products = ref([]);
    const stateGlobal = inject("stateGlobalLogin");

    onMounted(() => {
      obtenerProductos();
    });

    const obtenerProductos = async () => {
      try {
        const { data } = await axios.get(
          "https://unexpected-brainy-emmental.glitch.me/api/product/products/" + stateGlobal.value.id,
          {
            headers: { authorization: "onegroup " + stateGlobal.value.token },
          }
        );
        products.value = data.products;
      } catch (error) {
        console.log("error en la funcion obtenerProductos", error.message);
      }
    };
    return { products, obtenerProductos };
  },
};
</script>
<style></style>
