const express = require('express');
const bodyParser = require('body-parser');
const Rpersona = require('./rutas/persona');
const Rmusica = require('./rutas/musica');
const path = require('path');
const app = express();
const port = 3000;
const cors = require('cors');
const validarToken = require('./middleware/jstUtils');
const mongoose = require('mongoose');

const mongoUri = 'mongodb://localhost:27017/nueva';
mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Error de conexión a MongoDB:'));
db.once('open', () => {
  console.log('Conexión a MongoDB establecida con éxito');
});


app.use(cors());
app.use(bodyParser.json());
app.use('/music', validarToken, (req, res, next) => {
  console.log('Middleware específico para la ruta /music');
  res.set('Content-Type', 'audio/mpeg');
  next();
})
app.use('/', Rpersona);
app.use('/musica',Rmusica)
app.use('/music', express.static(path.join(__dirname, 'Musica')));

app.listen(port, () => {
  console.log(`El servidor está escuchando en el puerto ${port}`);
});
