const mongoose = require('mongoose');

const playlistChema = new mongoose.Schema({
  id_usuario: { type: String, required: true },
  canciones: { type: Array, required: true },
});

module.exports = mongoose.model('playlist', playlistChema);
