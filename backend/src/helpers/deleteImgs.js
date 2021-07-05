const deleteImg = {}
const path = require("path");
const fs = require("fs");
const {promisify} = require('util')

//Función que nos sirve para eliminar una imagen del backend generado por cualquier controlador
deleteImg.deleteImage = async (nameImage) => {
    try {
        promisify(fs.unlink)(
            path.resolve(__dirname, "../storage/galeria", nameImage)
        )
    } catch (error) {
        mensaje: `deleteImage ${error.message}`
    }
}

module.exports = deleteImg