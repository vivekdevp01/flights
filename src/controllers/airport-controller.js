const {AirportService}=require('../services');
const {StatusCodes}=require("http-status-codes");
const {SuccessResponse, ErrorResponse}=require('../utils/common');

async function createAirport(req,res){
      try{
        const airport=await AirportService.createAirport({
           name:req.body.name,
           code:req.body.code,
           cityId:req.body.cityId,
           address:req.body.address
        });
        SuccessResponse.data=airport;
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
async function getAirports(req,res){
  try{
    const airports=await AirportService.getAirports();
    SuccessResponse.data=airports;
    return res
       .status(StatusCodes.OK)
       .json(SuccessResponse);
  }
  catch(error){
     ErrorResponse.error=error;
     return res
     .status(error.StatusCode)
     .json(ErrorResponse);
  }
}
async function getAirport(req,res){
  try{
    const airport=await AirportService.getAirport(req.params.id);
    SuccessResponse.data=airport;
    console.log(airport);
    return res
       .status(StatusCodes.OK)
       .json(SuccessResponse);
  }
  catch(error){
     ErrorResponse.error=error;
     console.log(ErrorResponse);
     return res
     .status(error.StatusCode)
     .json(ErrorResponse);
  }
}
async function destroyAirport(req,res){
  try{
    const airport=await AirportService.destroyAirport(req.params.id);
    SuccessResponse.data=airport;
    console.log(airport);
    return res
       .status(StatusCodes.OK)
       .json(SuccessResponse);
  }
  catch(error){
     ErrorResponse.error=error;
     console.log(ErrorResponse);
     return res
     .status(error.statusCode)
     .json(ErrorResponse);
  }
}
async function updateAirport(req, res) {
  try {
      const airport = await AirportService.updateAirport(req.params.id, {
        name:req.body.name,
        code:req.body.code,
        cityId:req.body.cityId
      });
      SuccessResponse.data = airport;
      return res
              .status(StatusCodes.ACCEPTED)
              .json(SuccessResponse);
  }   catch(error){
      ErrorResponse.error = error;
      return res
              .status(error.StatusCode)
              .json(ErrorResponse);
  }
}

module.exports={
    createAirport,
    getAirports,
    getAirport,
    destroyAirport,
    updateAirport
}