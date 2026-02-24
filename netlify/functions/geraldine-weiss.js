/**
 * Proxy a geraldineweiss.onrender.com (análisis Weiss 12 años + fundamental).
 * Uso: /.netlify/functions/geraldine-weiss?ticker=JNJ
 * Parámetros: ticker (obligatorio), years (default 12), fundamental (default on).
 */
exports.handler = async function (event) {
  const ticker = event.queryStringParameters?.ticker;
  const years = event.queryStringParameters?.years || '12';
  const fundamental = event.queryStringParameters?.fundamental || 'on';

  if (!ticker) {
    return {
      statusCode: 400,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ error: 'ticker required' }),
    };
  }

  const url = `https://geraldineweiss.onrender.com/?ticker=${encodeURIComponent(ticker)}&years=${encodeURIComponent(years)}&fundamental=${encodeURIComponent(fundamental)}`;

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 60000);
    const res = await fetch(url, { signal: controller.signal });
    clearTimeout(timeout);
    const contentType = res.headers.get('content-type') || 'text/html';
    const body = await res.text();
    return {
      statusCode: res.ok ? 200 : res.status,
      headers: {
        'Content-Type': contentType,
        'Access-Control-Allow-Origin': '*',
      },
      body: res.ok ? body : JSON.stringify({ error: res.statusText }),
    };
  } catch (e) {
    return {
      statusCode: 502,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ error: String(e.message) }),
    };
  }
};
