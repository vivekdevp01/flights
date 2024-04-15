const {StatusCodes}=require('http-status-codes');
const { FlightRepository }=require('../repositories');
const {Op}=require('sequelize');
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
async function getAllFlights(query){
    const endingTripTime='23:59:00';
    sortFilter=[];
    customFilter={};
    if(query.trips){
        [departureAirportId,arrivalAirportId]=query.trips.split("-")
customFilter.departureAirportId=departureAirportId;
customFilter.arrivalAirportId=arrivalAirportId;
    }
    if(query.price){
        [minPrice,maxPrice]=query.price.split("-");
        customFilter.price={
           [Op.between]:[minPrice,(maxPrice==undefined)? 20000:maxPrice] 
        }
    }
    if(query.travellers){
        customFilter.totalSeats={
            [Op.gte]:query.travellers
        }
    }
    if(query.tripDate){
        customFilter.departureTime={
            [Op.between]:[query.tripDate,query.tripDate+endingTripTime]
        }

    }
    if(query.sort){
        const params=query.sort.split(',');
        const sortFilters=params.map((param)=> param.split('_'));
        sortFilter=sortFilters;

    }
    // console.log(customFilter);
    try {
      const flights=await flightRepository.getAllFlights(customFilter,sortFilter);  
      return flights;
    } catch (error) {
        throw new AppError('Cannot create a new airplane object')
        
    }
}
async function getFlight(id){
    try{
        const flight=await flightRepository.get(id);
        return flight;
    }
    catch(error){
        if(error.statusCode==StatusCodes.NOT_FOUND){
            throw new AppError('the airplane is not present',error.StatusCode);
        }
    }
    throw new AppError('the airplane is not ptesnet',StatusCodes.INTERNAL_SERVER_ERROR);
}
async function updateSeats(data){
    try{
        const response=await flightRepository.updateRemainingSeats(data.flightId,data.seats,data.dec);
        return response;
    }
    catch(error){
        throw new AppError('cannot update the seats',StatusCodes.INTERNAL_SERVER_ERROR);
    }
}
module.exports={
    createFlight,
    getAllFlights,
    getFlight,
    updateSeats
}