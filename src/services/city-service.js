const {StatusCodes}=require('http-status-codes');
const { CityRepository }=require('../repositories');
const AppError=require('../utils/errors/app-error')
const cityRepository=new CityRepository();
async function createCity(data){
    try{

        const city=await cityRepository.create(data);
        return city;
    }
    catch(error){
        if(error.name=='SequelizeUniqueConstraintError'){
            throw new AppError("please dont give city name")
        }
        if(error.name== 'TypeError'){
            throw new AppError('Cannot create a new airplane object')
        }
        throw error;
    }
}
async function destroyCity(id){
    try{
const city=await cityRepository.destroy(id);
return city;
    }
    catch(error){
        if(error.statusCode==StatusCodes.NOT_FOUND){
            throw new AppError('the airplane is not present',error.StatusCode);
        }
        throw new AppError('cannot fetch details of the airplane',StatusCodes.INTERNAL_SERVER_ERROR)
    }

}
async function updateCity(id,data){
    try{
        const city=await cityRepository.update(id,data);
        return city;
    }
    catch(error){
        if(error.statusCode==StatusCodes.NOT_FOUND){

            throw new AppError("given data is not avialable",error.statusCode);
        }
        throw new AppError('cannot fetch the details',StatusCodes.INTERNAL_SERVER_ERROR);
    }
}
module.exports={
    createCity,
    destroyCity,
    updateCity
}
