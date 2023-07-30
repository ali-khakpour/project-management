async function notFound(req, res , next) {
    return await res.status(404).json({
        statusCode : res.statusCode,
        message : `the rout ${req.path} not found`
    })
}

async function errorHandler(err ,req, res , next) {
    return await res.json({
        statusCode : res.statusCode || 500,
        message : err.message || "error is hear",
    })
}


module.exports = {
    notFound,
    errorHandler
}
