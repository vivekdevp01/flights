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
    const{Airport,City}=require('./models');
    const cities=await City.findByPk(4);
    // console.log(cities);
    // const create=await cities.createAirport({name:'keepa',code:'BLR'});
    // const airport=await cities.getAirports();
    // console.log(airport);
    await City.destroy({
        where:{
            id:4
        }
    })
});


