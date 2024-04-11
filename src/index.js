const express = require('express');

const { ServerConfig } = require('./config');
const apiRoutes = require('./routes');

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/api', apiRoutes);

app.listen(ServerConfig.PORT,async () => {
    console.log(`Successfully started the server on PORT : ${ServerConfig.PORT}`);
    // bad code
    const {Airport,City}=require('./models');
    const city=await City.findByPk(1);
console.log(city);
const response=await city.createAirport({name:"keepa", code:'BLR'});
const getAirport=await city.getAirports();
console.log(getAirport);
await City.destroy({
    where:{
        id:1
    }
});

});


