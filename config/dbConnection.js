const mongoose = require("mongoose");


const DB_URL = 'mongodb://localhost:27017/bms'


const dbConnection = () => {

    try {
        mongoose.connect(DB_URL).then(() => console.log("database connection successfully connected"))
            .catch((error) => console.log(`issue with db connection ${error}`))

    } catch (error) {
        console.log(`issue with db connection ${error}`)

    }
}

module.exports = dbConnection;