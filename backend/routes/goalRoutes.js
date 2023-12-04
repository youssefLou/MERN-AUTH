const express = require('express')
const router = express.Router()
const { getGoals, setGoals,UpdateGoals,deleteGoals } = require('../controllers/goalControllers')

router.get('/',getGoals)

router.post('/',setGoals)

router.put('/:id',UpdateGoals)

router.delete('/:id',deleteGoals)

module.exports = router 


