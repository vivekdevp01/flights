const {StatusCodes}=require('http-status-codes');
const { FlightRepository }=require('../repositories');
const AppError=require('../utils/errors/app-error')
const flightRepository=new FlightRepository();

async function createFlight(data){
    try{

        const flight=await flightRepository.create(data);
        return flight;
    }
    catch(error){
        if(error.name== 'TypeError'){
            throw new AppError('Cannot create a new airplane object')
        }
        throw error;
    }
}
module.exports={
    createFlight
}