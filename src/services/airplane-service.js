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
module.exports={
    createAirplane,
    getAirplanes
}