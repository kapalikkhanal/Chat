const User = require('../models/user')
const bcrypt = require('bcrypt');
const saltRounds = 10; //Generally its 10 to 12 and it shows how strong the hashing is.
const jwt = require('jsonwebtoken')
const path = require('path')
const SECRET_KEY = 'f09cc3916aa9f514d1dde03502b95291d2b3c1c6d7fbabaf889ff6a5ddea54c8e2bff629185279885f6ece994aa2ea149fa9c750a0c1c93809dee05a34d83ae5';
var token = jwt.sign({ foo: 'bar' }, SECRET_KEY);

const registerNewUser = async (req, res) => {
    console.log(req.body)
    const userExist = await User.exists({ email: req.body.email }) //To see if user exists already or not.
    let hashPassword = await bcrypt.hash(req.body.password, saltRounds); //Password Hashing.
    req.body.password = hashPassword; //Sending hashed password to Body
    if (userExist) {
        res.status(409).json({ msg: "User already exists." })
        console.log("User already exists.")
    }
    else {
        const data = await User.create(req.body)
        if (data) {
            res.status(200).json({ msg: "User registered successfully." })
            console.log("User registered successfully.")
        }
    }
}

const loginUser = async (req, res) => {
    const data = await User.findOne({ email: req.body.email }) //To see if user exists already or not.
    if (!data) {
        return res.status(404).json({ msg: "User doesnot exist." })
    }
    else {
        const isMatched = await bcrypt.compare(req.body.password, data.password)
        console.log(isMatched)
        if (isMatched) {
            const token = await jwt.sign({ email: req.body.email }, SECRET_KEY);
            // console.log("Data is:", req.body)
            // delete req.body.password
            // console.log("Data is:", req.body)
            const dataFromDatabase = Object.assign({}, data)
            console.log("Data is:", dataFromDatabase
            )

            res.status(200).json({ isLoggedIn: true, msg: "Login Successful.", token, userInfo: data })

        }
        else {
            res.status(404).json({ msg: "Invalid Credentials." })
        }
    }
}

const updateUserDetailsById = async (req, res) => {
    console.log(req.body)
    const data = await User.findByIdAndUpdate(req.params.id, req.body)
    if (data) {
        res.status(200).json({
            msg: "User details edited"
        })
    }
}

const getUserById = async (req, res) => {
    const data = await User.findById(req.params.id)
    if (data) {
        res.status(200).json({ userDetails: data })
    }
}

// const addFriend = async (req, res) => {
//     console.log(req.body)
// }

module.exports = { registerNewUser, loginUser, updateUserDetailsById, getUserById }