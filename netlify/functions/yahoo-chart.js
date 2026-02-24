/**
 * Proxy para Yahoo Finance Chart API (evita CORS en producción).
 * Uso: /.netlify/functions/yahoo-chart?symbol=AAPL&interval=1d&range=5d
 */
exports.handler = async function (event) {
  const symbol = event.queryStringParameters?.symbol;
  const interval = event.queryStringParameters?.interval || '1d';
  const range = event.queryStringParameters?.range || '5d';
  if (!symbol) {
    return { statusCode: 400, body: JSON.stringify({ error: 'symbol required' }) };
  }
  const url = `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(symbol)}?interval=${encodeURIComponent(interval)}&range=${encodeURIComponent(range)}`;
  try {
    const res = await fetch(url);
    const data = await res.json();
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
