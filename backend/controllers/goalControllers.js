const asyncHandler= require('express-async-handler')
const Goal   = require('../moduls/goalModul')



const getGoals = asyncHandler(async(req, res ) =>{
    const goals = await Goal.find ()
    res.json(goals)

})
const setGoals = asyncHandler(async(req, res ) =>{
   if(!req.body.text){
    res.status(400)
    throw new Error("please add text fiald")
   } 
   const goal = await Goal.create({
    text : req.body.text
   })
    res.json(goal)

})
const UpdateGoals = asyncHandler(async(req,res)=>{
    const goal= await Goal.findById(req.params.id)

    if(!goal){
        res.status(400)
        throw new Error('Goal not found ')
    }
    const updatedGoal= await Goal.findByIdAndUpdate(req.params.id ,req.body ,{new : true})
    res.json(updatedGoal)
})

const deleteGoals = asyncHandler(async(req,res)=>{
    const goal= await Goal.findById(req.params.id)
    if(!goal){
        res.status(400)
        throw new Error('Goal not found ')
    }
   await goal.deleteOne();
    res.json({id : req.params.id})
})
module.exports = {getGoals,setGoals,UpdateGoals,deleteGoals}