const errorHandler = (req, res, next, err) => {
    console.error(err.message);
    const status = err.status || 500;
    res.status(status).json({error: err.message})
};

module.exports = errorHandler