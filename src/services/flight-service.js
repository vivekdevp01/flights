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
module.exports={
    createFlight,
    getAllFlights
}