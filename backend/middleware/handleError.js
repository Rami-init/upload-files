import ErrorResponse from '../utils/ErrorResponse.js'

const handleError = async (err, req, res, next)=>{
    let error;
    error = {...err}
    error.message = err.message
    if(err.code === 11000) {
        const message = 'doplicated fieled value enter'
        error = new ErrorResponse(message, 401)
    }
    if(err.name === 'CastError'){
        const message = 'Resource Not Found'
        error = new ErrorResponse(message, 404)
    }
    if(err.name === 'ValidationError'){
        const message = Object.values(err.errors).map((error)=> error.message).join(',')
        error = new ErrorResponse(message, 401)
    }
    res.status(error.statusCode || 500).json({
        success: false,
        message: error.message || 'Server Error'
    })
}

export default handleError