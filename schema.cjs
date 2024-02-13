const mongoose = require('mongoose')

const restaurantsSchema = new mongoose.Schema({
    areaName : {
        type : String
    },
    avgRating : {
        type : Number
    },
    costForTwo : {
        type : String
    },
    cuisines : {
        type : Array
    },
    name : {
        type : String
    }
})
const Restaurant = mongoose.model('restaurantList', restaurantsSchema)

//importing mongoose package
//const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    contact :  {
        type : String
    },
    email : {
        type : String
    },
    password : {
        type : String
    },
    userName :  {
        type : String
    }
},{versionKey : false})

//model
const Users = mongoose.model('userDetail', userSchema)

module.exports = {Restaurant, Users}

