const { Schema, model } = require("mongoose");

const productsSchema = new Schema(
  {
    nombre: {
        type: String,
      },
    descripcion: {
      type: String,
    },
    precio: {
        type: String,
      },
    user: {
      type: String,
    },
    img: {
        type: String
      },
    nameImage: {
      type: String
    },
  },
  {
    timestamps: true,
  }
);
//metodo para asignar la url y el nombre a la imagen
productsSchema.methods.setImgUrl = function setImgUrl(filname){
    const url='https://unexpected-brainy-emmental.glitch.me/'
    this.img = url + 'public/' + filname
    this.nameImage = filname;
}

module.exports = model("Product", productsSchema);