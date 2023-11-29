const express = require('express');
const validarToken = require('../middleware/jstUtils');
const router = express.Router();
const musica = require('../modelos/musica');
const playlist = require('../modelos/playlist');

router.get('/', async (req, res) => {
    const result = await musica.find();
    const result2 = await playlist.find();
    res.status(200).send(result);
});
router.post('/', async (req, res) => {
    try {
        const nuevacancion = new musica(req.body);
        await nuevacancion.save();
        res.status(200).send('finalizo');
    } catch (exception) {
        res.status(500).send(exception);
    }
});

router.posr
module.exports = router;