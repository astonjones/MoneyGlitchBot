//mongodb connection config
const mongoose = require('mongoose');
const uri = process.env.MONGOURI;

async function connectMongoDB(){
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true});
    console.log("Connected to DB");
}

async function closeMongoDB(){
    await mongoose.connection.close();
    console.log("Client closed");
}

//insertCandlestickData according to currency
async function insertCandlestickData(obj, collection){
    const db = mongoose.connection;

    try{ await db.collection(collection).insertMany([obj]) }
    catch(e){ console.log(`Error occured inserting into monogdb: ${e}`)}
}

module.exports = {
    connectMongoDB,
    closeMongoDB,
    insertCandlestickData,
}
