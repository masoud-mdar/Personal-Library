const express = require("express")
const cors = require("cors")
require("dotenv").config()

const myDB = require("./database/connection")
const apiRoutes = require("./routes/api")

const  PORT = process.env.PORT || 5000

const app = express()
app.use(express.json())
app.use(cors())

app.get("/", (req, res) => {
    res.send("Hello !")
})

myDB(async (client) => {

    const myDataBase = await client.db("library").collection("mycollection")

    apiRoutes(app, myDataBase)

    app.use((req, res, next) => {
        res.status(404)
        .type("text")
        .send("Not Found")
    })

}).catch(e => {
    console.log("Unable to connect to Data Base " + e)
})

app.listen(PORT, () => {
    console.log(`server started on port ${PORT}`)
})