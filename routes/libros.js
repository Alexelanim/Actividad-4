const express = require('express');
const Joi = require('joi');
const libros = require('../data');
const router = express.Router();

const libroSchema = Joi.object({
    titulo: Joi.string().required().label('Título'),
    autor: Joi.string().required().label('Autor')
});

// Obtener libros
router.get('/', (req, res, next) => {
    try {
        res.json(libros);
    } catch (err) {
        next(err);
    }
});

// Obtener libros por ID
router.get('/:id', (req, res, next) => {
    try {
        const id = parseInt(req.params.id);
        const libro = libros.find((l) => l.id === id);
        if (!libro) {
            const error = new Error('Libro no encontrado');
            error.status = 404;
            throw error;
        }
        res.json(libro);
    } catch (err) {
        next(err);
    }
});

// Crear libros
router.post('/', (req, res, next) => {
    try {
        const { error, value } = libroSchema.validate(req.body);
        if (error) {
            const validationError = new Error('Error de validación');
            validationError.status = 400;
            validationError.details = error.details.map(detail => detail.message);
            throw validationError;
        }
        const { titulo, autor } = value;
        const nuevoLibro = {
            id: libros.length + 1,
            titulo,
            autor
        };
        libros.push(nuevoLibro);
        res.status(201).json(nuevoLibro);
    } catch (err) {
        next(err);
    }
});

// Actualizar libros
router.put('/:id', (req, res, next) => {
    try {
        const id = parseInt(req.params.id);
        const { error, value } = libroSchema.validate(req.body);
        if (error) {
            const validationError = new Error('Error de validación');
            validationError.status = 400;
            validationError.details = error.details.map(detail => detail.message);
            throw validationError;
        }
        const { titulo, autor } = value;
        const libro = libros.find((l) => l.id === id);
        if (!libro) {
            const error = new Error('Libro no encontrado');
            error.status = 404;
            throw error;
        }
        libro.titulo = titulo || libro.titulo;
        libro.autor = autor || libro.autor;
        res.json(libro);
    } catch (err) {
        next(err);
    }
});

// Eliminar libros
router.delete('/:id', (req, res, next) => {
    try {
        const id = parseInt(req.params.id);
        const index = libros.findIndex((l) => l.id === id);
        if (index === -1) {
            const error = new Error('Libro no encontrado');
            error.status = 404;
            throw error;
        }
        const libroEliminado = libros.splice(index, 1);
        res.json(libroEliminado[0]);
    } catch (err) {
        next(err);
    }
});

module.exports = router;