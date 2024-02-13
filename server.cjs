const bodyParser = require('body-parser')
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const {Restaurant, Users} = require('./schema.cjs')

const app = express()
app.use(bodyParser.json())
app.use((cors))

async function connectToDb(){
    try{
        await mongoose.connect('mongodb+srv://sushmitha:Sushmitha10@cluster1.qpnekjy.mongodb.net/Swiggy?retryWrites=true&w=majority')
        console.log('connection established')
        const port =process.env.PORT || 8000
        app.listen(port,function() {
        console.log(`Listening on port ${port}...`)
})
    }catch(error){
        console.log(error)
        console.log('Could not establish connection')
    }
}
connectToDb()

app.post('/add-restaurant', async function (request, response){
    try {
        await Restaurant.create({
            "areaName" : request.body.areaName,
            "avgRating" : request.body.avgRating,
            "costForTwo" : request.body.costForTwo,
            "cuisines" : request.body.cuisines,
            "name" : request.body.name
    })
    response.status(201).json({
        "status" : "success",
        "message" : "restaurant entry successful"
    })}
    catch(error){
        response.status(500).json({
            "status" : "failure",
            "message" : "restaurant entry not successful"
        })
    }
})

app.get('/get-restaurant-details', async function(request,response){
    try{
        const restaurantDetails =await Restaurant.find()
        response.status(200).json(restaurantDetails)
    }
    catch(error)
    {
        response.status(500).json({
        "status" : "failure",
        "message" : "restaurant entry not successful",
        "error" : "error"
    })
}
})

app.post('/create-new-user',async function(request,response){
    try{
          await Users.create({
            "userName" : request.body.userName,
            "email"  :  request.body.email,
            "password" : request.body.password,
            "contact" : request.body.contact
          })
          console.log("user created")
          response.status(201).json({
            "status" :"succesfully entered"
          })
        }
        catch(error){
            response.status(500).json({
                "status" :"user not created",
                "error" :error
            })
        }
})

//login the existing user
app.post('/validate-user',async function(request,response){
    try{
        const user = await Users.findOne({
            "email" : request.body.email,
            "password" :request.body.password
        })  
        if(user){
            response.json({
                "status" :"valid"
            })
            console.log("ok ")
        }
        else{
            console.log("Please enter the fields ")
            response.json({
                "status" :"In valid"
            })
        }
    }
    catch(error){
         response.status(200).json({
            "status" : "user not created"
         })
         console.log('user not created')
    }
})
