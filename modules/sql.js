const sql = require("mssql");

const sqlConfig = {
  user: process.env.SQLUSER,
  password: process.env.SQLPASS,
  server: 'localhost',
  database: process.env.SQLDATABASE,
  options: {
    trustServerCertificate: true // change to true for local dev / self-signed certs
  }
}

// Repeat function as desired per currency
//use with coinbase product candle api, parameter is a models/Candlestick class
//NEED TO INSERT TAGBLE PARAMTERS INTO SQL QUERY
async function postETHCandleData(obj, table){
  try {
    await sql.connect(sqlConfig)
    const result = await sql.query`INSERT INTO [CryptoData].[dbo].[ETH_Candlestick_Data] (Timestamp, Time, Low, High, [Open], [Close], Volume) 
    VALUES (${obj.timeStamp}, ${obj.time}, ${obj.low}, ${obj.high}, ${obj.open},${obj.close}, ${obj.volume})`
    return result;
  }
  catch (err) {
    console.log(`There is an error pushing data in to the database: ${err.message}`);
  }
}

module.exports = {
  postETHCandleData
}