const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler= require('express-async-handler')
const User = require('../moduls/useModul')



const registerUser = asyncHandler(async(req, res )=> {
    const { name  ,email , password}= req.body
    if(!name || !email || !password){
        res.status(400)
        throw new Error('please1234 add all fields')
    }
    const userExists= await User.findOne({email})
    if(userExists){
        res.status(400)
        throw new Error('this email already exist')
    }
    // hash password
    const salt =await bcrypt.genSalt (10)
    const hashedpassword= await bcrypt.hash(password, salt )
    //creat user 
    const user = await User.create({
        name,
        email,
        password: hashedpassword,
    }) 
    if(user){
        res.status(201).json({
            id:user.id,
            name:user.name,
            email:user.email,
            token:generateToken(user.id),
        })
    }
    else {
        res.status(400)
        throw new Error('unvalid user data ')
    }
})

const loginUser = asyncHandler(async(req, res )=> {
    const {email,password}=req.body
    const user = await User.findOne({email})
    if (user&&(await bcrypt.compare(password, user.password))){
        res.json({
            id:user.id,
            name:user.name,
            email:user.email,
            token:generateToken(user.id),
        }
        )
    }
    else {
        res.status(400)
        throw new Error('unvalid user data 2')
    }
})
const getMe = asyncHandler(async(req, res )=> {
    const {_id, name , email }= await User.findById(req.user.id)
    res.status(200).json({
        id : _id,
        name,
        email,
    })
})
//genarte JWT
const generateToken=(id) => {
    return jwt.sign({id},process.env.JWT_SECRUTE,{
        expiresIn:'10D',   
    })
}

module.exports={
    
    registerUser,
    loginUser,
    getMe,
}