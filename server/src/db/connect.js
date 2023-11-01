const mongoose = require('mongoose')

const connect = async () => {
    try {
        const res = await mongoose.connect('mongodb://127.0.0.1:27017/chatDB');
        if (res) console.log("Connected to mongoDB")
    } catch (err) {
        console.log(err)
    }
}

module.exports = connect