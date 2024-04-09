const {StatusCodes}=require('http-status-codes');
const { AirplaneRepository }=require('../repositories');
const AppError=require('../utils/errors/app-error')
const airplaneRepository=new AirplaneRepository();

async function createAirplane(data){
    try{

        const airplane=await airplaneRepository.create(data);
        return airplane;
    }
    catch(error){
        if(error.name== 'TypeError'){
            throw new AppError('Cannot create a new airplane object')
        }
        throw error;
    }
}
async function getAirplanes(){
    try{
        const airplanes=await airplaneRepository.getAll();
        return airplanes;
    }
    catch(error){
        throw new error('cant get the IRPLANE ',StatusCodes.INTERNAL_SERVER_ERROR)
    }
}
async function getAirplane(id){
    try{
        const airplane=await airplaneRepository.get(id);
        return airplane;
    }
    catch(error){
        if(error.statusCode==StatusCodes.NOT_FOUND){
            throw new AppError('the airplane is not present',error.StatusCode);
        }
    }
    throw new AppError('the airplane is not ptesnet',StatusCodes.INTERNAL_SERVER_ERROR);
}
async function destroyAirplane(id){
    try{
        const response=await airplaneRepository.destroy(id);
        return response; 
    }
    catch(error){
        if(error.statusCode==StatusCodes.NOT_FOUND){
            throw new AppError('the airplane is not present',error.StatusCode);
        }
        throw new AppError('cannot fetch details of the airplane',StatusCodes.INTERNAL_SERVER_ERROR)
    }
}
module.exports={
    createAirplane,
    getAirplanes,
    getAirplane,
    destroyAirplane
}