const express = require('express');
const router = express.Router();
const multer = require('multer');
const csv = require('csv-parser');
const fs = require('fs');

const upload = multer({ dest: 'uploads/' });

router.post('/debug-csv', upload.single('csvFile'), (req, res) => {
  if (!req.file) {
    return res.send('No file uploaded');
  }

  const results = [];
  
  fs.createReadStream(req.file.path)
    .pipe(csv())
    .on('data', (row) => {
      results.push(row);
    })
    .on('end', () => {
      fs.unlinkSync(req.file.path);
      
      res.send(`
        <html>
          <head>
            <title>CSV Debug</title>
            <style>
              body { font-family: monospace; padding: 20px; }
              pre { background: #f5f5f5; padding: 15px; border-radius: 5px; overflow-x: auto; }
              h2 { color: #2563eb; }
            </style>
          </head>
          <body>
            <h1>CSV Debug Output</h1>
            <h2>Total Rows: ${results.length}</h2>
            
            <h2>First Row Keys:</h2>
            <pre>${JSON.stringify(Object.keys(results[0] || {}), null, 2)}</pre>
            
            <h2>First 3 Rows:</h2>
            <pre>${JSON.stringify(results.slice(0, 3), null, 2)}</pre>
            
            <br>
            <a href="/upload">← Back to Upload</a>
          </body>
        </html>
      `);
    });
});

module.exports = router;