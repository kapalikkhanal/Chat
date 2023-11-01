const express = require('express')
const router = express.Router()
const UserController = require('../controllers/user')

router.post('/register', UserController.registerNewUser)
router.post('/login', UserController.loginUser)
// router.post('/addFriend', UserController.addFriend)
router.put('/accountDetails/:id', UserController.updateUserDetailsById)
router.get('/user/:id', UserController.getUserById)

module.exports = router