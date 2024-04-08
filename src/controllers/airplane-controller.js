const {AirplaneService}=require('../services');
const {StatusCodes}=require("http-status-codes");

async function createAirplane(req,res){
      try{
        const airplane=await AirplaneService.createAirplane({
            modelNumber:req.body.modelNumber,
            capacity:req.body.capacity
        });
        return res
        .status(StatusCodes.CREATED)
        .json({
            success:true,
            message:"Successful",
            data:airplane,
            error:{}
        });
      }
      catch(error){
       return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({
            success:false,
            messsage:"Not",
            data:{},
            error:error
        });
      }
} 
module.exports={
    createAirplane
}