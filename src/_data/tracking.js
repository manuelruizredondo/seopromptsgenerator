// Clave en .env (FINNHUB_API_KEY) o variable de entorno. Gratuita en https://finnhub.io/register
require("dotenv").config();
module.exports = {
  finnhub_api_key: process.env.FINNHUB_API_KEY || "",
};
