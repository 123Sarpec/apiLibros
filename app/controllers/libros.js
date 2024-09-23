const db = require('../config/db.config.js');
db.sequelize.sync();

const Libros = db.Libros;

// Crear un nuevo libro
exports.create = async (req, res) => {
    try {
        // Construir el objeto de libro a partir del cuerpo de la solicitud
        let libro = {
            titulo: req.body.titulo,
            id_autor: req.body.id_autor,
            isbn: req.body.isbn,
            editorial: req.body.editorial, // Corrección: Cambiado de "editoria" a "editorial"
            anioPublicacion: req.body.anioPublicacion,
            categoria: req.body.categoria,
            cantidadDisponible: req.body.cantidadDisponible,
            ubicacion: req.body.ubicacion,
        };

        // Guardar en la base de datos MySQL
        let result = await Libros.create(libro);

        // Enviar mensaje de éxito al cliente
        res.status(200).json({
            message: "Libro creado con éxito, ID = " + result.id,
            libro: result
        });
    } catch (error) {
        res.status(500).json({
            message: "Error, no se puede crear el libro!",
            error: error.message
        });
    }
}

// Obtener todos los libros
exports.getAll = async (req, res) => {
    try {
        let todosLibros = await Libros.findAll();
        res.status(200).json({
            message: "Lista de todos los libros!",
            libros: todosLibros
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error al obtener la lista de libros!",
            error: error.message
        });
    }
}

// Obtener libro por ID
exports.getById = async (req, res) => {
    try {
        let libroId = req.params.id;
        let libro = await Libros.findByPk(libroId);

        if (!libro) {
            return res.status(404).json({
                message: "No se encontró libro con el ID = " + libroId
            });
        }

        res.status(200).json({
            message: "Libro encontrado con el ID = " + libroId,
            libro: libro
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error al obtener el libro!",
            error: error.message
        });
    }
}

// Actualizar libro
exports.updatePut = async (req, res) => {
    try {
        let libroId = req.params.id;
        let libro = await Libros.findByPk(libroId);

        if (!libro) {
            return res.status(404).json({
                message: "No se encontró el libro con ID = " + libroId
            });
        }

        let updatedObject = {
            titulo: req.body.titulo,
            id_autor: req.body.id_autor,
            isbn: req.body.isbn,
            editorial: req.body.editorial,
            anioPublicacion: req.body.anioPublicacion,
            categoria: req.body.categoria,
            cantidadDisponible: req.body.cantidadDisponible,
            ubicacion: req.body.ubicacion,
        };

        await Libros.update(updatedObject, { where: { id: libroId } });

        res.status(200).json({
            message: "Libro actualizado con éxito, ID = " + libroId,
            libro: updatedObject
        });
    } catch (error) {
        res.status(500).json({
            message: "No se puede actualizar el libro, ID = " + req.params.id,
            error: error.message
        });
    }
}

// Eliminar libro
exports.delete = async (req, res) => {
    try {
        let libroId = req.params.id;
        let libro = await Libros.findByPk(libroId);

        if (!libro) {
            return res.status(404).json({
                message: "No existe el libro con el ID = " + libroId
            });
        }

        await libro.destroy();

        res.status(200).json({
            message: "Libro eliminado con éxito, ID = " + libroId,
            libro: libro
        });
    } catch (error) {
        res.status(500).json({
            message: "Error al eliminar el libro, ID = " + req.params.id,
            error: error.message
        });
    }
}
