<template>
  <div class="container">
    <div class="row g-2 my-3">
      <Product
        v-for="product of products"
        :key="product._id"
        :product="product"
        :obtenerProductos="obtenerUsers"
      ></Product>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import Product from "../components/Product.vue";
import { inject, onMounted, ref } from "vue";
export default {
  name: "Users",
  components: {
    Product,
  },
  setup() {
    const products = ref([]);
     const stateGlobal = inject("stateGlobalLogin");
    onMounted(() => {
      obtenerUsers();
    });

    const obtenerUsers = async () => {
      try {
        const { data } = await axios.get(
          "https://unexpected-brainy-emmental.glitch.me/api/user/users",
          {
            headers: { authorization: "onegroup " + stateGlobal.value.token },
          }
        );
        products.value = data.users;
      } catch (error) {
        console.log("error en la funcion obtenerUsers", error.message);
      }
    };
    return { products, obtenerUsers };
  },
};
</script>
<style></style>
