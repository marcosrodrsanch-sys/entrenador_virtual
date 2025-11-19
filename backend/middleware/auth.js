const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) =>{
    try{
        //obtenemos el token del header
        const token = req.headers.authorization?.split(' ')[1];

        if(!token){
            return res.status(401).json({
                error: 'No se ha proporcionado token de autenticación'
            });
        }

        //Verificar token
        const decode = jwt.verify(token, process.env.JWT_SECRET);

        //Agregar informacion del usuario al request
        req.user = decoded;
        
        next();
    }catch(error){
        return res.status(401).json({
            error:'Token inválido o expirado'
        });
    }
};

module.exports = authMiddleware;