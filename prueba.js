const express = require('express');
const path = require('path');

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: false}));

/*          Hosting
Barato: namecheap, dreamhost
Manejado: Flywheel, wpengine
Multiples websites manejados: cloudways

Tenemos que tener hosting para 4 cosas: frontend, backend, bases de datos y ficheros de los usuarios(fotos, videos...)
Database hosting: DigitalOcean, vultr, dokku(alternativa de codigo libre gratuito) (estos es buena idea para proyectos pequeños almacenar servidor y bd aqui)
vpsbenchmarks
frontent: netlify para frontend estatico
ficheros de usuarios: imgix o cloudinary
*/

app.get('/', (req, res) => {
    //req.header('header-key')
    //req.rawHeaders
    //req.body
    //res.status(statusCode).send(response)
    //req.params.id
    //header x-auth-token key to token autentication
    res.json({mensaje: 'Mensaje de prueba'});
});

app.listen(5000, () => console.log('Servidor escuchando en puerto 5000'));