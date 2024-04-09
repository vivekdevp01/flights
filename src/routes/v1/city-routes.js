const express=require("express");
const {CityController}=require('../../controllers');
// const {AirplaneMiddlewares}=require('../../middlewares');
const router=express.Router();
router.delete('/:id',CityController.destroyCity);
router.post('/',CityController.createCity);
router.patch('/:id',CityController.updateCity);

module.exports=router;
