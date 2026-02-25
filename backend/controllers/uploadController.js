const Transaction = require('../models/Transaction');
const aiFraudService = require('../services/aiFraudService');
const csv = require('csv-parser');
const fs = require('fs');

exports.showUploadPage = (req, res) => {
  res.render('upload', { error: null, success: null, results: null });
};

exports.uploadCSV = async (req, res) => {
  try {
    if (!req.file) {
      return res.render('upload', { 
        error: 'Please select a CSV file', 
        success: null, 
        results: null 
      });
    }

    const results = [];
    const errors = [];
    let successCount = 0;

    console.log('📁 Processing CSV file:', req.file.path);

    // Parse CSV
    fs.createReadStream(req.file.path)
      .pipe(csv())
      .on('data', (row) => {
        console.log('📊 Raw row data:', row);
        results.push(row);
      })
      .on('end', async () => {
        console.log(`✅ CSV parsed. Total rows: ${results.length}`);

        // Process each transaction
        for (let i = 0; i < results.length; i++) {
          try {
            const row = results[i];
            
            // Trim whitespace from keys and values
            const cleanRow = {};
            Object.keys(row).forEach(key => {
              const cleanKey = key.trim().toLowerCase();
              cleanRow[cleanKey] = row[key] ? row[key].trim() : '';
            });

            console.log(`Processing row ${i + 1}:`, cleanRow);

            // Map possible field names
            const amount = cleanRow.amount || cleanRow.Amount || cleanRow.AMOUNT;
            const transaction_time = cleanRow.transaction_time || cleanRow['transaction time'] || 
                                    cleanRow.transactiontime || cleanRow.time || cleanRow.timestamp;
            const device_type = cleanRow.device_type || cleanRow['device type'] || 
                              cleanRow.devicetype || cleanRow.device;
            const location = cleanRow.location || cleanRow.Location || cleanRow.LOCATION;

            // Validate required fields
            if (!amount || !transaction_time || !device_type || !location) {
              const missing = [];
              if (!amount) missing.push('amount');
              if (!transaction_time) missing.push('transaction_time');
              if (!device_type) missing.push('device_type');
              if (!location) missing.push('location');
              
              errors.push(`Row ${i + 1}: Missing fields: ${missing.join(', ')}`);
              console.log(`❌ Row ${i + 1} validation failed:`, { amount, transaction_time, device_type, location });
              continue;
            }

            // Validate amount is a number
            const parsedAmount = parseFloat(amount);
            if (isNaN(parsedAmount) || parsedAmount <= 0) {
              errors.push(`Row ${i + 1}: Invalid amount "${amount}"`);
              continue;
            }

            // Parse transaction time
            let parsedTime;
            try {
              parsedTime = new Date(transaction_time);
              if (isNaN(parsedTime.getTime())) {
                throw new Error('Invalid date');
              }
            } catch (err) {
              errors.push(`Row ${i + 1}: Invalid date format "${transaction_time}"`);
              continue;
            }

            // Get AI prediction
            const aiResult = await aiFraudService.detectFraud({
              amount: parsedAmount,
              transaction_time: parsedTime.toISOString(),
              device_type: device_type,
              location: location
            });

            // Save to database
            await Transaction.create({
              amount: parsedAmount,
              transaction_time: parsedTime,
              device_type: device_type,
              location: location,
              prediction: aiResult.prediction,
              fraud_probability: aiResult.fraud_probability
            });

            successCount++;
            console.log(`✅ Row ${i + 1} processed successfully`);

          } catch (error) {
            console.error(`❌ Error processing row ${i + 1}:`, error);
            errors.push(`Row ${i + 1}: ${error.message}`);
          }
        }

        // Delete uploaded file
        try {
          fs.unlinkSync(req.file.path);
        } catch (err) {
          console.error('Error deleting file:', err);
        }

        // Render results
        const hasErrors = errors.length > 0;
        const errorMessage = hasErrors ? errors.slice(0, 5).join(', ') + (errors.length > 5 ? '...' : '') : null;

        res.render('upload', {
          error: errorMessage,
          success: `Successfully uploaded ${successCount} out of ${results.length} transactions!`,
          results: {
            total: results.length,
            success: successCount,
            failed: errors.length
          }
        });
      })
      .on('error', (error) => {
        console.error('CSV parsing error:', error);
        
        // Delete uploaded file
        try {
          if (req.file && req.file.path) {
            fs.unlinkSync(req.file.path);
          }
        } catch (err) {
          console.error('Error deleting file:', err);
        }

        res.render('upload', { 
          error: `CSV parsing failed: ${error.message}`, 
          success: null, 
          results: null 
        });
      });

  } catch (error) {
    console.error('Upload error:', error);
    res.render('upload', { 
      error: 'Failed to process upload', 
      success: null, 
      results: null 
    });
  }
};

exports.downloadSampleCSV = (req, res) => {
  const sampleCSV = `amount,transaction_time,device_type,location
150.00,2026-02-25T10:30:00,Mobile,New York
5000.00,2026-02-25T02:15:00,Desktop,Nigeria
75.50,2026-02-25T14:20:00,Tablet,London
12000.00,2026-02-25T03:00:00,POS,Unknown
89.99,2026-02-25T11:00:00,Mobile,Los Angeles
250.00,2026-02-25T16:30:00,Desktop,Toronto
450.00,2026-02-25T09:45:00,POS,Sydney
15000.00,2026-02-25T01:00:00,Mobile,Russia
199.99,2026-02-25T13:15:00,Tablet,Berlin
350.00,2026-02-25T18:00:00,Desktop,Chicago`;

  res.setHeader('Content-Type', 'text/csv');
  res.setHeader('Content-Disposition', 'attachment; filename=sample-transactions.csv');
  res.send(sampleCSV);
};