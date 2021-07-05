const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");
const userSchema = new Schema(
  {
    nombre: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    img: {
        type: String
      },
    nameImage: {
      type: String
    },
    password: {
      type: String,
      required: true,
    },
    rol: {
      type: String,
      required: true,
    }
  },
  {
    timestamps: true,
  }
);


//metodo para encryptar la contraseña
userSchema.methods.matchPassword = async function (enteredPassword) {
  try {
    return await bcrypt.compare(enteredPassword, this.password);
  } catch (error) {
    console.log("error en matchPassword", error.message);
  }
};
 
//metodo para asignar la url y el nombre a la imagen
userSchema.methods.setImgUrl = function setImgUrl(filname){
    const url='https://unexpected-brainy-emmental.glitch.me/'
    this.img = url + 'public/' + filname
    this.nameImage = filname;
}

//si el usuario se actualiza y la contraseña cambia (isModified), 
//entonces se encrypta la contraseña nueva, utlizamos el metodo pre, 
//que significa previo al evento (save) en mongodb, es decir, antes de 
//guarda hagame lo que tiene la funcion, que es encryptar la nueva contraseña
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

module.exports = model("User", userSchema);