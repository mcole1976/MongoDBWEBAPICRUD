const express = require('express'); 
const axios = require('axios'); 
const https = require('https');
const path = require('path'); 
const cors = require('cors');
const app = express(); 
const port = 3000; 
app.use(express.json());
app.use(express.static('public')); 
app.timeout = 300000;
// Use CORS middleware 
app.use(cors());

const makeRequestWithRetry = 
async (url, method, data = {}, maxRetries = 7) => 
    { let retries = 0; const httpsAgent = new https.Agent({ rejectUnauthorized: false }); 
// Ignore self-signed certificates 
while (retries < maxRetries) { try { const response = await axios({ url: url, method: method, data: data, httpsAgent: httpsAgent }); return response.data; } catch (error) { if (error.code === 'ECONNRESET' || error.response?.status === 500) { console.log(`Retry attempt ${retries + 1} due to ${error.code || '500 Internal Server Error'}`); retries++; continue; } throw error; } } throw new Error(`Failed to complete request after ${maxRetries} retries.`); }; 
// POST endpoint to add data 
app.post('/add-data', async (req, res) => 
    { 
        const newData = req.body; const url = 'https://localhost:44377/api/Logs'; 
            try 
            { const response = await makeRequestWithRetry(url, 'POST', newData); 
                console.log('Data added:', response); res.status(201).send('Data added successfully'); 
            } 
            catch (error) { console.error('Error adding data:', error); res.status(500).json({ error: error.message }); } 
    });

// PUT endpoint to update data 
// app.put('/update-data', async (req, res) => { const updateData = req.body; try { const httpsAgent = new https.Agent({ rejectUnauthorized: false }); 
// // Ignore self-signed certificates 
// const response = await axios.put('https://localhost:44377/api/LogsB', updateData, { httpsAgent }); 
// // Send updated data to external API 
// console.log('Data updated:', response.data); res.send('Data updated successfully'); } catch (error) { console.error('Error updating data:', error); res.status(500).send('Internal Server Error');
// } });





app.get('/api/data', async (req, res) => 
    { 
        try 
        { 
            const httpsAgent = new https.Agent({ rejectUnauthorized: false }); 
            // Ignore self-signed certificates 
            const response = await axios.get('https://localhost:44377/api/LogsB', { httpsAgent }); 
            // Replace with your actual API endpoint 
            console.log('Marcus Cole');
            res.json(response.data); 
            console.log(response.data);
        } 
        catch (error) 
        { 
            console.error('Error fetching data:', error); res.status(500).send('Internal Server Error');
         }
        
    }); 


// Serve the entry HTML file 
app.get('/entry', (req, res) => { res.sendFile(path.join(__dirname, 'public', 'entry.html')); });



app.get('/', (req, res) => { res.sendFile(path.join(__dirname, 'public', 'index.html')); }); 





app.listen(port, () => { console.log(`Server is running at http://localhost:${port}`); });
