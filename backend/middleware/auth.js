const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    try {
        // Obtener el header completo
        const authHeader = req.headers.authorization || req.headers.Authorization;
        
        if (!authHeader) {
            return res.status(401).json({
                error: 'No se proporcionó header de autorización'
            });
        }
        
        // Verificar que empiece con Bearer
        if (!authHeader.startsWith('Bearer ')) {
            return res.status(401).json({
                error: 'Formato de token incorrecto'
            });
        }
        
        // Extraer token
        const token = authHeader.substring(7); // Quitar "Bearer "
        
        // Verificar token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Agregar usuario al request
        req.user = decoded;
        next();
        
    } catch (error) {
        return res.status(401).json({
            error: 'Token inválido o expirado',
            details: error.message
        });
    }
};

module.exports = authMiddleware;