/**
 * Proxy para Finnhub Technical Indicator (RSI semanal para Weiss).
 * Uso: /.netlify/functions/finnhub-indicator?symbol=JNJ&resolution=W&indicator=RSI
 * Requiere FINNHUB_API_KEY en variables de entorno de Netlify.
 */
exports.handler = async function (event) {
  const symbol = event.queryStringParameters?.symbol;
  const resolution = event.queryStringParameters?.resolution || 'W';
  const indicator = event.queryStringParameters?.indicator || 'RSI';
  const token = process.env.FINNHUB_API_KEY;

  if (!symbol) {
    return {
      statusCode: 400,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ error: 'symbol required' }),
    };
  }
  if (!token) {
    return {
      statusCode: 502,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ error: 'FINNHUB_API_KEY not configured' }),
    };
  }

  const to = Math.floor(Date.now() / 1000);
  const from = to - 2 * 365 * 24 * 3600; // ~2 años para RSI semanal

  const url = `https://finnhub.io/api/v1/technical-indicator?symbol=${encodeURIComponent(symbol)}&resolution=${encodeURIComponent(resolution)}&indicator=${encodeURIComponent(indicator)}&from=${from}&to=${to}&token=${encodeURIComponent(token)}`;

  try {
    const res = await fetch(url);
    const data = await res.json();
    if (!res.ok) {
      return {
        statusCode: res.status,
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
        body: JSON.stringify({ error: data.message || res.statusText }),
      };
    }
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify(data),
    };
  } catch (e) {
    return {
      statusCode: 502,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ error: String(e.message) }),
    };
  }
};
