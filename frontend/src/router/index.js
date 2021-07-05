import { createRouter, createWebHistory } from "vue-router";
import Swal from "sweetalert2";
import Products from "../views/Products.vue";
import Login from "../views/Login.vue";
import Product from "../views/Product.vue";
import Register from "../views/Register.vue";
import MyProducts from "../views/MyProducts.vue";
import Users from "../views/Users.vue";
import User from "../views/User.vue";
import EditAdd from "../views/EditarAndAddProducto.vue";
import EditUser from "../views/EditUser.vue"

const routes = [
  {
    path: "/",
    name: "login",
    component: Login,
    meta: {
      protegida: false,
    },
  },
  {
    path: "/products",
    name: "Products",
    component: Products,
    meta: {
      protegida: true,
    },
  },
  {
    path: "/product",
    name: "Product",
    component: Product,
    meta: {
      protegida: true,
    },
  },
  {
    path: "/register",
    name: "register",
    component: Register,
    meta: {
      protegida: false,
    },
  },
  {
    path: "/myproducts",
    name: "MyProducts",
    component: MyProducts,
    meta: {
      protegida: true,
    },
  },
  {
    path: "/users",
    name: "Users",
    component: Users,
    meta: {
      protegida: true,
    },
  },
  {
    path: "/user",
    name: "User",
    component: User,
    meta: {
      protegida: true,
    },
  },
  {
    path: "/update/:id",
    name: EditAdd,
    component: EditAdd,
    meta: {
      protegida: true,
    },
  },
  {
    path: "/add",
    name: EditAdd,
    component: EditAdd,
    meta: {
      protegida: true,
    },
  },
  {
    path: "/user/update/:id",
    name: EditUser,
    component: EditUser,
    meta: {
      protegida: true,
    },
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const login = sessionStorage.getItem("login");
  if (to.meta.protegida && login === "false") {
    console.log("ruta 1");
    Swal.fire('Debes logearte o crear una cuenta para poder acceder a esta ruta')
    next("/");
  } else if (!to.meta.protegida && login === "true") {
    Swal.fire('Debes logearte o crear una cuenta para poder acceder a esta ruta')
    next({ path: from.fullPath });
    console.log("ruta 2");
  } else {
    console.log("ruta 3");
    next();
  }
});

export default router;
