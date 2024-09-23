const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const cors = require('cors');

// Configuración de la base de datos (si es necesario)
const db = require('./app/config/db.config.js');

// Importa el router de usuarios correctamente
let usuario = require('./app/routers/usuario.js');

// Configura el middleware de CORS
const corsOptions = {
  origin: 'http://localhost:4200',
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

// Configura el middleware para manejar JSON
app.use(bodyParser.json());

// Usa el enrutador de usuarios
app.use('/', usuario);

// Ruta de bienvenida
app.get("/", (req, res) => {
  res.json({ message: "Bienvenido a la API de Libros" });
});

// Crea y configura el servidor
const server = app.listen(8080, function () {
  let host = server.address().address;
  let port = server.address().port;
  console.log("App listening at http://%s:%s", host, port); 
});
