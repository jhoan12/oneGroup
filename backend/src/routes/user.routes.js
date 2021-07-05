const { Router } = require("express");
const userCtrl = require("../controllers/user.controllers");
const protegida = require("../middlewares/auth");
const upload = require('../middlewares/multer')

const route = Router();
route.get("/users", protegida,  userCtrl.Users)
route.get("/user/:id", protegida,  userCtrl.userId);
route.post("/login", userCtrl.login);
route.post("/register", upload.single("img"), userCtrl.register);
route.put("/update/:id", protegida, upload.single("img"),userCtrl.update);
route.delete("/delete/:id", protegida, userCtrl.delete);
module.exports = route;