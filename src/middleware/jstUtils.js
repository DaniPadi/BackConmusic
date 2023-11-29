const jwt = require('jsonwebtoken');

function validarToken(req, res, next) {
    const token = req.headers.authorization.slice(7).trim();
    console.log(token)
    if (!token) {
        return res.status(401).json({
            mensaje: 'Token no proporcionado'
        });
    }
    jwt.verify(token, 'pepe', (error, usuario) => {
        if (error) {
            return res.status(401).json({
                mensaje: 'Token inválido'
            });
        }
        req.usuario = usuario;

        next();
    });
}

module.exports = validarToken;