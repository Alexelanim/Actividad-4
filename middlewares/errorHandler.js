const errorHandler = (err, req, res, next) => {
    console.error(err);
    res.status(err.status || 500).json({ ERROR: err.message || 'Error en el servidor' });
};

module.exports = errorHandler;