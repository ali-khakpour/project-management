const express = require("express")
const { notFound, errorHandler } = require("./middlewares/errHandlers")
const allRouter = require("./routers/index.routes")

const app = express()
require('./configs/mongo.config')
app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.use(allRouter)
 




app.use(notFound)
app.use(errorHandler)
app.listen(3005, ()=>{console.log("server is run on http://localhost:3005");})