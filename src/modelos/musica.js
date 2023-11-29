const mongoose = require('mongoose');

const musicaSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  autor: { type: String, required: true },
  
});

module.exports = mongoose.model('musica', musicaSchema);
