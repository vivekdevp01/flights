const {StatusCodes}=require('http-status-codes');
const {ErrorResponse}=require('../utils/common');
function validateCreateRequest(req,res,next){
    if(!req.body.flightNumber){
        ErrorResponse.message="Something went wrong";
        ErrorResponse.error={explanation:"something wrong with flightNumber"}
        return res
        .status(StatusCodes.BAD_REQUEST)
        .json(ErrorResponse);
    }
    if(!req.body.airplaneId){
        ErrorResponse.message="Something went wrong";
        ErrorResponse.error={explanation:"something wrong with airplaneId"}
        return res
        .status(StatusCodes.BAD_REQUEST)
        .json(ErrorResponse);
    }
    if(!req.body.departureAirportId){
        ErrorResponse.message="Something went wrong";
        ErrorResponse.error={explanation:"something wrong with departureAirportId"}
        return res
        .status(StatusCodes.BAD_REQUEST)
        .json(ErrorResponse);
    }
    if(!req.body.arrivalAirportId){
        ErrorResponse.message="Something went wrong";
        ErrorResponse.error={explanation:"something wrong with arrivalAirportId"}
        return res
        .status(StatusCodes.BAD_REQUEST)
        .json(ErrorResponse);
    }
    if(!req.body.departureTime){
        ErrorResponse.message="Something went wrong";
        ErrorResponse.error={explanation:"something wrong with departureTime"}
        return res
        .status(StatusCodes.BAD_REQUEST)
        .json(ErrorResponse);
    }
    if(!req.body.arrivalTime){
        ErrorResponse.message="Something went wrong";
        ErrorResponse.error={explanation:"something wrong with arrivalTime"}
        return res
        .status(StatusCodes.BAD_REQUEST)
        .json(ErrorResponse);
    }
    if(!req.body.price){
        ErrorResponse.message="Something went wrong";
        ErrorResponse.error={explanation:"something wrong with price"}
        return res
        .status(StatusCodes.BAD_REQUEST)
        .json(ErrorResponse);
    }
    if(!req.body.totalSeats){
        ErrorResponse.message="Something went wrong";
        ErrorResponse.error={explanation:"something wrong with totalSeats"}
        return res
        .status(StatusCodes.BAD_REQUEST)
        .json(ErrorResponse);
    }


    next();
}
module.exports={
    validateCreateRequest
}