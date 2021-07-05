const jwt = require("jsonwebtoken");
const UsuerModel = require('../models/user.models')

const protegida = async (req, res, next) => {
    //revisamos si si nos estan enviando el encabezado
 if(!req.headers.authorization){
    return res.json({
        mensaje: "No estas autorizado 1",
      });
 }

 //extraemos el token
 const token = req.headers.authorization.split(" ")[1];
 if(token === null){
    return res.json({
        mensaje: "No estas autorizado 2",
      });
 }
 jwt.verify(token, 'onegroup', async ( error, payload)=>{
    if(error){
      return res.json({
          mensaje: "No estas autorizado 3",
          error
      });
   }
  
  
  const decoded = payload;
  req.user = await UsuerModel.findById({_id: decoded._id});
  next()
})
 
}

module.exports = protegida;