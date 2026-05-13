const validateConversion = (req, res, next) => {
  const { amount, currency } = req.query;

  if (!amount) {
    return res.status(400).json({ error: 'Missing amount' });
  }

  if (!currency) {
    return res.status(400).json({ error: 'Missing currency' });
  }

  const numericAmount = parseFloat(amount);
  if (isNaN(numericAmount)) {
    return res.status(400).json({ error: 'Invalid number for amount' });
  }

  const supportedCurrencies = ['usd', 'eur', 'cny'];
  if (!supportedCurrencies.includes(currency.toLowerCase())) {
    return res.status(400).json({ error: 'Unsupported currency' });
  }

  // Attach numeric amount and lowercased currency for later use
  req.validatedData = {
    amount: numericAmount,
    currency: currency.toLowerCase(),
  };

  next();
};

module.exports = validateConversion;
