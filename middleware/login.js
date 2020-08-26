//check que haya username y password || email y password para iniciar sesion
module.exports.validateEmptyInput = function (req, res, next) {
    console.log('middleware');
    const { username, email, password } = req.body
    if(username && password){
        return next()
    }
    if(email && password){
        return next()
    }
    return res.status(400).json({message:'Error al intentar iniciar sesión'})
};
// module.exports.validateEmptyInput = function (req, res, next) {
//     console.log("middleware");
//     console.log(req.body);
//     const { user, password } = req.body;
//     if (user && password) {
//         return next();
//     }else{

//         return res
//             .status(400)
//             .json({ message: "Error al intentar iniciar sesión" });
//     };
//     }

