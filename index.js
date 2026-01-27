// index.js
const express = require('express');
const axios = require('axios');

const app = express();
app.use(express.json());

const PORT = 3000;

const PI_API_KEY = 'PUT_YOUR_API_KEY_HERE';

app.post('/create-payment', async (req, res) => {
  try {
    const paymentData = {
      amount: 0.1,
      currency: 'PI',
      description: 'Test payment for SkillSpark Hub'
    };

    const response = await axios.post(
      'https://sandbox.pipay.pi.network/v1/payments',
      paymentData,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${PI_API_KEY}`
        }
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).json({ error: 'Payment failed' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
