<template>
  <div class="container my-5">
    <div class="d-flex justify-content-center">
      <div>
        <div class="card" v-bind:style="{ width: '400px' }">
          <img :src="productState.img" alt="img" class="card-img-top" />
          <div class="card-body">
            <h1 class="card-title">Nombre: {{ productState.nombre }}</h1>
            <p class="lead">Descripcion: {{ productState.descripcion }}</p>
            <span>Valor: ${{ productState.precio }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { inject } from "vue";
export default {
  name: "Product",
  setup() {
    const productState = inject("productState");
    return { productState };
  },
};
</script>
<style></style>
