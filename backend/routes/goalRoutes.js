const express = require('express')
const router = express.Router()
const { getGoals, setGoals,UpdateGoals,deleteGoals } = require('../controllers/goalControllers')

const {protect} = require('../middleware/authMiddleware')


router.get('/',protect,getGoals)

router.post('/',protect,setGoals)

router.put('/:id',protect,UpdateGoals)

router.delete('/:id',protect,deleteGoals)

module.exports = router 


