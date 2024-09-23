let express = require('express');
let router = express.Router(); 
 

const libro = require('../controllers/libros.js');

router.post('/api/libros/create', libro.create);
router.get('/api/libros/getAll', libro.getAll);
router.get('/api/libros/getById/:id', libro.getById);
router.put('/api/libros/updatePut/:id', libro.updatePut); 
router.delete('/api/libros/delete/:id', libro.delete);



module.exports = router;
