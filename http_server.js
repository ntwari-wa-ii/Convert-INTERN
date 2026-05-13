const http = require('http');
const url = require('url');

const PORT = 2000;

const conversionRates = {
  usd: 1500,
  eur: 1700,
  cny: 2000,
};

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const { pathname, query } = parsedUrl;

  if (pathname === '/convert' && req.method === 'GET') {
    const { amount, currency } = query;

    if (!amount) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({ error: 'Missing amount' }));
    }

    if (!currency) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({ error: 'Missing currency' }));
    }

    const numericAmount = parseFloat(amount);
    if (isNaN(numericAmount)) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({ error: 'Invalid number for amount' }));
    }

    const lowerCurrency = currency.toLowerCase();
    if (!conversionRates[lowerCurrency]) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({ error: 'Unsupported currency' }));
    }


    const convertedAmount = numericAmount * conversionRates[lowerCurrency];

    const response = {
      input: {
        amount: numericAmount,
        currency: lowerCurrency,
      },
      convertedAmount: convertedAmount,
      unit: 'RWF',
    };

    res.writeHead(200, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify(response));
  }

  // Not Found
  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ error: 'Not Found' }));
});

server.listen(PORT, () => {
  console.log(`HTTP Server running at http://localhost:${PORT}/`);
});
