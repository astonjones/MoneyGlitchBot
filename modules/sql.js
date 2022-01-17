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

//This posts to the eth candlestick data table
async function postETHCandleData(obj){
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

//This posts to the eth candlestick data table
async function postDogeCandleData(obj){
  try {
    await sql.connect(sqlConfig)
    const result = await sql.query`INSERT INTO [CryptoData].[dbo].[DOGE_Candlestick_Data] (Timestamp, Time, Low, High, [Open], [Close], Volume)
    VALUES (${obj.timeStamp}, ${obj.time}, ${obj.low}, ${obj.high}, ${obj.open},${obj.close}, ${obj.volume})`
    return result;
  }
  catch (err) {
    console.log(`There is an error pushing data in to the database: ${err.message}`);
  }
}

module.exports = {
  postETHCandleData,
  postDogeCandleData
}