const axios = require('axios');

class AIFraudService {
  constructor() {
    this.apiUrl = process.env.AI_API_URL || 'https://api.example.com/fraud-detection';
    this.apiKey = process.env.AI_API_KEY;
  }

  async detectFraud(transactionData) {
    try {
      // Prepare data for AI API
      const payload = {
        amount: parseFloat(transactionData.amount),
        timestamp: new Date(transactionData.transaction_time).toISOString(),
        device: transactionData.device_type,
        location: transactionData.location
      };

      // Call external AI API
      const response = await axios.post(this.apiUrl, payload, {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json'
        },
        timeout: 10000
      });

      // Parse AI response
      return {
        prediction: response.data.prediction || 'unknown',
        fraud_probability: response.data.probability || 0
      };

    } catch (error) {
      console.error('AI API Error:', error.message);
      
      // Fallback: Simple rule-based detection for demo
      return this.fallbackDetection(transactionData);
    }
  }

  // Fallback detection logic (for demo/testing)
  fallbackDetection(transactionData) {
    const amount = parseFloat(transactionData.amount);
    let probability = 0;

    // Simple rules
    if (amount > 10000) probability += 0.4;
    if (amount > 50000) probability += 0.3;
    if (transactionData.device_type.toLowerCase().includes('mobile')) probability += 0.1;
    if (new Date(transactionData.transaction_time).getHours() < 6) probability += 0.2;

    const prediction = probability > 0.5 ? 'fraud' : 'legitimate';
    
    return {
      prediction,
      fraud_probability: Math.min(probability, 0.99)
    };
  }
}

module.exports = new AIFraudService();