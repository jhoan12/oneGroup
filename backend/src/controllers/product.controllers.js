const productsCtrl = {};
const deleteImg = require("../helpers/deleteImgs");
const ProductsModel = require("../models/product.model");
const UserModel = require('../models/user.models')

//obtener todos los productos de un usuario
productsCtrl.productsUser = async (req, res) => {
  try {
  
    const id = req.params.user;
    const user = await UserModel.findById({_id: id})
 
    const products = await ProductsModel.find({})
    if(user.rol === 'VENDEDOR' || user.rol === 'SUPER_ROL'){
      const productsAdmin = await ProductsModel.find({ user: id });
        return res.json({
            ok: true,
            rol: user.rol,
            products,
            productsAdmin,
        })
    }
    res.json({
      ok: true,
      products,
    });
  } catch (error) {
    res.json({
      ok: false,
      mensaje: `error en productsUser ${error.message}`,
    });
  }
};

//obtener producto por id
productsCtrl.productId = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await ProductsModel.findById({_id: id})
    res.json({
        ok: true,
        product
    })
  } catch (error) {
    res.json({
      ok: false,
      mensaje: `error en productId ${error.message}`,
    });
  }
};

//crear producto
productsCtrl.addProduct = async (req, res) => {
  try {
    const { nombre, precio, user, descripcion } = req.body;
    const newProduct = new ProductsModel({
      user,
      descripcion,
      nombre,
      precio
    });

    if(req.file){
        const {filename} = req.file
        newProduct.setImgUrl(filename)
    }
    const saveProduct = await newProduct.save();
    res.json({
      ok: true,
      mensaje: "Producto Guardado",
      saveProduct,
    });
  } catch (error) {
    res.json({
      ok: false,
      mensaje: `error en addProduct ${error.message}`,
    });
  }
};

//actualizar producto
productsCtrl.update = async (req, res) => {
    try {
        const id = req.params.id
        const product = await ProductsModel.findById({_id: id})
    
        if(product){
            product.nombre = req.body.nombre || product.nombre;
            product.descripcion = req.body.descripcion || product.descripcion;
            product.precio = req.body.precio || product.precio;

            if(req.file){
                const {nameImage} = product
                if(nameImage){
                    deleteImg.deleteImage(nameImage)
                }
                const {filename} = req.file
                product.setImgUrl(filename)
            }
            
             await product.save();
            res.json({
                ok: true,
                mensaje: "Producto Actualizado",
                product
            })
        }else{
            res.json({
                mensaje: "Producto no encontrado",
              });
        }
    } catch (error) {
        res.json({
            ok: false,
            mensaje: `error en updateProduct ${error.message}`,
          });
    }
}

//delete producto
productsCtrl.delete = async (req, res) => {
    try {
        const id = req.params.id
        const product = await ProductsModel.findById({_id: id})
        const {nameImage} = product
        if(nameImage){
            deleteImg.deleteImage(nameImage)
        }
        await product.deleteOne()
        res.json({
            ok: true,
            mensaje: "Producto Eliminado",
            product
        })
    } catch (error) {
        res.json({
            ok: false,
            mensaje: `error en deleteProduct ${error.message}`,
          });
    }
}

module.exports = productsCtrl;
