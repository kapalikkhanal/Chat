const mongoose = require('mongoose')
const { Schema } = mongoose;

const SignupSchema = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    userName: String,
});

// const friendSchema = new Schema({
//     userName: String,
// });


// const Friend = mongoose.model('Friend', friendSchema)
const User = mongoose.model('User', SignupSchema);

module.exports = User