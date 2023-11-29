const express = require('express');
const {obtenerDatosDesdeBD,register,login} = require('../controladores/persona.js');
const validarToken = require('../middleware/jstUtils.js');
const router = express.Router();

router.get('/', (req, res) => {
    obtenerDatosDesdeBD();
    res.status(200).send("CheckSafe");
});

router.post('/persona', (req, res) => {
    if (req.body) {
        register(req.body);
        res.status(200).send('nothing');
    } else {
        res.status(404).send("Not found body");
    }
});
router.post('/Login', (req, res) => {
    if (req.body) {
        login(req.body, res);
    } else {
        res.status(404).send("Not found body");
    }
});
router.get('/token', validarToken, (req, res) => {
    res.json({
        mensaje: 'Acceso permitido',
        usuario: req.usuario
    });

});


module.exports = router;