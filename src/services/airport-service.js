const {StatusCodes}=require('http-status-codes');
const { AirportRepository }=require('../repositories');
const AppError=require('../utils/errors/app-error')
const airportRepository=new AirportRepository();

async function createAirport(data){
    try{

        const airport=await airportRepository.create(data);
        return airport;
    }
    catch(error){
        if(error.name== 'TypeError'){
            throw new AppError('Cannot create a new airplane object')
        }
        throw error;
    }
}
async function getAirports(){
    try{
        const airports=await airportRepository.getAll();
        return airports;
    }
    catch(error){
        throw new error('cant get the IRPLANE ',StatusCodes.INTERNAL_SERVER_ERROR)
    }
}
async function getAirport(id){
    try{
        const airport=await airportRepository.get(id);
        return airport;
    }
    catch(error){
        if(error.statusCode==StatusCodes.NOT_FOUND){
            throw new AppError('the airplane is not present',error.StatusCode);
        }
    }
    throw new AppError('the airplane is not ptesnet',StatusCodes.INTERNAL_SERVER_ERROR);
}
async function destroyAirport(id){
    try{
        const response=await airportRepository.destroy(id);
        return response; 
    }
    catch(error){
        if(error.statusCode==StatusCodes.NOT_FOUND){
            throw new AppError('the airplane is not present',error.StatusCode);
        }
        throw new AppError('cannot fetch details of the airplane',StatusCodes.INTERNAL_SERVER_ERROR)
    }
}
async function updateAirport(id, data) 
{ try 
    { const response = await airportRepository.update(id, data); 
        return response; 
    } 
    catch (error) 
    { 
        if(error.StatusCode==StatusCodes.NOT_FOUND){
            throw new AppError("the airplane not found",error.StatusCode)
        }
        throw new AppError("Cant update", StatusCodes.INTERNAL_SERVER_ERROR); } 
    }

module.exports={
    createAirport,
    getAirports,
    getAirport,
    destroyAirport,
    updateAirport
}