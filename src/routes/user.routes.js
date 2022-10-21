const express = require('express')
const {
    registerUser,
    verifyUser

} = require('../controllers/user.controller')

const router = express.Router()

router.post('/register', registerUser)
router.get('/verify/:verificationToken', verifyUser)




module.exports = router
