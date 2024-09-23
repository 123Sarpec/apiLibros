module.exports = (sequelize, Sequelize) => {
    const Libros = sequelize.define('libro', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        titulo: {
            type: Sequelize.STRING,
            allowNull: false
        },
        id_autor: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        isbn: {
            type: Sequelize.STRING,
            unique: true,
            allowNull: false
        },
        editorial: { 
            type: Sequelize.STRING,
            allowNull: false
        },
        anioPublicacion: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        categoria: {
            type: Sequelize.STRING,
            allowNull: false
        },
        cantidadDisponible: {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        ubicacion: {
            type: Sequelize.STRING,
            allowNull: true
        },
        createdAt: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW,
        },
        updatedAt: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW,
        },
        copyrightby: {
            type: Sequelize.STRING,
            defaultValue: 'Registro de Libros'
        }
    });

    return Libros;
};
