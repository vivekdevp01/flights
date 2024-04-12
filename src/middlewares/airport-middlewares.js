const {StatusCodes}=require('http-status-codes');
const {ErrorResponse}=require('../utils/common');
function validateCreateRequest(req,res,next){
    if(!req.body.name){
        ErrorResponse.message="Something went wrong";
        ErrorResponse.error={explanation:"something wrong with name"}
        return res
        .status(StatusCodes.BAD_REQUEST)
        .json(ErrorResponse);
    }
    if(!req.body.code){
        ErrorResponse.message="Something went wrong";
        ErrorResponse.error={explanation:"something wrong with code"}
        return res
        .status(StatusCodes.BAD_REQUEST)
        .json(ErrorResponse);
    }
    if(!req.body.cityId){
        ErrorResponse.message="Something went wrong";
        ErrorResponse.error={explanation:"something wrong with cityId"}
        return res
        .status(StatusCodes.BAD_REQUEST)
        .json(ErrorResponse);
    }

    next();
}
module.exports={
    validateCreateRequest
}