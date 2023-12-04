const asyncHandler= require('express-async-handler')



const getGoals = asyncHandler(async(req, res ) =>{
    
    res.json({message :'Get goals'})

})
const setGoals = asyncHandler(async(req, res ) =>{
   if(!req.body.text){
    res.status(400)
    throw new Error("please add text fiald")
   } 
    res.json({message :'Set goals'})

})
const UpdateGoals = asyncHandler(async(req,res)=>{
    res.json({message :`Update goals ${req.params.id}`})
})
const deleteGoals = asyncHandler(async(req,res)=>{
    res.json({message :`Delete goals ${req.params.id}`})
})
module.exports = {getGoals,setGoals,UpdateGoals,deleteGoals}