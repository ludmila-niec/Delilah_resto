module.exports.validateRegisterInput = function (req, res, next){
     const {
         username,
         password,
         firstName,
         lastName,
         email,
         phone,
         adress,
     } = req.body;
     if (
         username &&
         password &&
         firstName &&
         lastName &&
         email &&
         phone &&
         adress
     ) {
         return next();
     } else {
         return res.status(400).json({success:false, message:"Faltan completar datos"})
     }
}
///aca podria hacer uso de alguna libreria para validar los inputs