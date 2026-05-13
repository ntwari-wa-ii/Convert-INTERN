const express = require('express');
const router = express.Router();
const validateConversion = require('../middleware/validateConversion');

const conversionRates = {
  usd: 1500,
  eur: 1700,
  cny: 2000,
};

router.get('/convert', validateConversion, (req, res) => {
  const { amount, currency } = req.validatedData;

  const convertedAmount = amount * conversionRates[currency];

  res.json({
    input: {
      amount: amount,
      currency: currency,
    },
    convertedAmount: convertedAmount,
    unit: 'RWF',
  });
});

module.exports = router;
