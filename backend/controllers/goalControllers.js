const asyncHandler= require('express-async-handler')
const Goal   = require('../moduls/goalModul')
const User   = require('../moduls/useModul')



const getGoals = asyncHandler(async(req, res ) =>{
    const goals = await Goal.find ({user : req.user.id})
    res.json(goals)

})
const setGoals = asyncHandler(async(req, res ) =>{
   if(!req.body.text){
    res.status(400)
    throw new Error("please add text fiald")
   } 
   const goal = await Goal.create({
    text : req.body.text,
    user:req.user.id,
   })
    res.json(goal)

})
const UpdateGoals = asyncHandler(async(req,res)=>{
    const goal= await Goal.findById(req.params.id)

    if(!goal){
        res.status(400)
        throw new Error('Goal not found ')
    }

    //check for users
    if (!req.user ){
        res.status(401)
        throw new Error('not found')
    }
    //make sure the logged in user matches the goal user
    if (goal.user.toString()!= req.user.id){
        res.status(401)
        throw new Error('user no authorized')
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

    //check for users
    if (!req.user ){
        res.status(401)
        throw new Error('not found')
    }
    //make sure the logged in user matches the goal user
    if (goal.user.toString()!= req.user.id){
        res.status(401)
        throw new Error('user no authorized')
    }
   await goal.deleteOne();
    res.json({id : req.params.id})
})
module.exports = {getGoals,setGoals,UpdateGoals,deleteGoals}