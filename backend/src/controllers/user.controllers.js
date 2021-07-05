const userCtrl = {};
const UserModel = require("../models/user.models");
const generateToken = require("../helpers/generateToken");
const productsModel = require("../models/product.model");
const deleteImg = require("../helpers/deleteImgs");

//obtener todos los usuarios
userCtrl.Users = async (req, res) => {
  try {
   
    const users = await UserModel.find();
    res.json({
      ok: true,
      users,
    });
  } catch (error) {
    res.json({
      ok: false,
      mensaje: `error en Obtener usuarios ${error.message}`,
    });
  }
};

//obtener usuario por id
userCtrl.userId = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await UserModel.findById({ _id: id });
    if (!user) {
      return res.json({
        ok: false,
        mensaje: `el usuario con id ${id} no existe`,
        token: generateToken(user._id),
      });
    }
    res.json({
      ok: true,
      nombre: user.nombre,
      rol: user.rol,
      mensaje: `Bienvenido ${user.nombre}`,
      id: user._id,
      email: user.email,
      img: user.img || ""
    });
  } catch (error) {
    res.json({
      ok: false,
      mensaje: `error en Obtener usuario ${error.message}`,
    });
  }
};

//Login del usuario
userCtrl.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (user && (await user.matchPassword(password))) {
      return res.json({
        ok: true,
        nombre: user.nombre,
        rol: user.rol,
        mensaje: `Bienvenido ${user.nombre}`,
        id: user._id,
        email: user.email,
        img: user.img || "",
        token: generateToken(user._id),
      });
    } else if (!user) {
      return res.json({
        ok: false,
        mensaje: "Email Incorrecto",
      });
    } else if (!(await user.matchPassword(password))) {
      return res.json({
        ok: false,
        mensaje: "Password incorrecto",
      });
    }
  } catch (error) {
    res.json({
      ok: false,
      mensaje: `error en Login de usuario ${error.message}`,
    });
  }
};

//crear usuario
userCtrl.register = async (req, res) => {
  try {
    const { nombre, email, password, rol } = req.body;
    const emailExist = await UserModel.findOne({ email: email });
    if (emailExist) {
      return res.json({
        ok: false,
        mensaje: `el correo ${email} ya existe`,
      });
    }

    const newUser = new UserModel({
      nombre,
      email,
      password,
      rol,
    });
    if (req.file) {
      const { filename } = req.file;
      newUser.setImgUrl(filename);
    }
    const user = await newUser.save();
    if (user) {
      res.json({
        ok: true,
        nombre: user.nombre,
        img: user.img || "",
        rol: user.rol,
        mensaje: `Bienvenido ${user.nombre}`,
        id: user._id,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      res.json({
        mensaje: "datos del usuario no validos",
      });
    }
  } catch (error) {
    res.json({
      ok: false,
      mensaje: `error en Register de usuario ${error.message}`,
    });
  }
};

//actualizar usuario
userCtrl.update = async (req, res) => {
  try {
    const id = req.params.id;
    const email = req.body.email
    const emailExist = await UserModel.findOne({email})
    
    const user = await UserModel.findById({ _id: id });
    if(emailExist !== user.emial){
      if(emailExist){
        return res.json({
          ok: false,
          mensaje: `el correo ${email} ya existe`,
        });
      }
    }
    if (user) {
      user.nombre = req.body.nombre || user.nombre;
      user.email = req.body.email || user.email;
      user.rol = req.body.rol || user.rol;

      if (req.body.password) {
        user.password = req.body.password;
      }
      if (req.file) {
        const { nameImage } = user;
        if (nameImage) {
          deleteImg.deleteImage(nameImage);
        }
        const { filename } = req.file;
        user.setImgUrl(filename);
      }
      const updateUser = await user.save();
      res.json({
        ok: true,
        nombre: updateUser.nombre,
        email: updateUser.email,
        rol: updateUser.rol,
        img: updateUser.img,
        token: generateToken(updateUser._id),
      });
    } else {
      res.json({
        mensaje: "Usuario no encontrado",
      });
    }
  } catch (error) {
    res.json({
      ok: false,
      mensaje: `error en Update de usuario ${error.message}`,
    });
  }
};

//delete usuario y sus respectivos productos
userCtrl.delete = async (req, res) => {
  try {
    const id = req.params.id;
    const userExist = await UserModel.findById({ _id: id });
    if (!userExist) {
      return res.json({
        ok: false,
        mensaje: "El Usuario no existe",
      });
    }
    const products = await productsModel.find({ user: id });

    for (let i = 0; i < products.length; i++) {
      deleteImg.deleteImage(products[i].nameImage);
    }
    const { nameImage } = userExist;
    if (nameImage) {
      deleteImg.deleteImage(nameImage);
    }
    await userExist.deleteOne();
    await productsModel.deleteMany({ user: id });
    res.json({
      ok: true,
      mensaje: `Adios ${userExist.nombre} ;( `,
      email: userExist.email
    });
  } catch (error) {
    res.json({
      ok: false,
      mensaje: `error en Delete de usuario ${error.message}`,
    });
  }
};

module.exports = userCtrl;
