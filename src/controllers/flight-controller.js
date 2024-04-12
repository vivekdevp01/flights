const {FlightService}=require('../services');
const {StatusCodes}=require("http-status-codes");
const {SuccessResponse, ErrorResponse}=require('../utils/common');

async function createFlight(req,res){
      try{
        const flight=await FlightService.createFlight({
          flightNumber:req.body.flightNumber,
          airplaneId:req.body.airplaneId,
          departureAirportId:req.body.departureAirportId,
          arrivalAirportId:req.body.arrivalAirportId,
          departureTime:req.body.departureTime,
          arrivalTime:req.body.arrivalTime,
          price:req.body.price,
          boardingGate:req.body.boardingGate,
          totalSeats:req.body.totalSeats

        });
        SuccessResponse.data=flight;
        return res
        .status(StatusCodes.CREATED)
        .json(SuccessResponse);
      }
      catch(error){
        ErrorResponse.error=error;
       return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json(ErrorResponse);
      }
} 
module.exports={
    createFlight
}