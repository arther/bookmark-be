import {MongoClient} from "mongodb"

const mongoClient = new MongoClient(process.env.MONGO_CONN_STRING || "mongodb://localhost:27017/")

export const connectToMongo = async () => {
    await mongoClient.connect()
    console.log("Connected to mongo")
}

export const getMongoClient = () => {
    return mongoClient
}