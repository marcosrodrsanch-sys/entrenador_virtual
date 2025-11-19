//Importamos la libreria Express
const express = require('express');
const app = express();

//Mensaje que se envía en mi página principal
app.get('/', (req, res) => {
    res.send('¡Servidor funcionando correctamente!');
});

//Num puerto
const PORT = 5000;

//Enciende el servidor y avisa
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});