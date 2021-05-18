require("dotenv").config()
const {MongoClient} = require("mongodb")

async function main (callback) {
    const URI = process.env.DB
    const client = new MongoClient(URI, {useNewUrlParser: true, useUnifiedTopology: true})

    try {

        await client.connect()
        await callback(client)

    } catch (e) {
        console.error(e)
        throw new Error("Unable to connect to Data Base")
    }
}

module.exports = main