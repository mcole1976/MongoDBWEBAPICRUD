const express = require('express'); 
const axios = require('axios'); 
const https = require('https');
const path = require('path'); 
const cors = require('cors');
const app = express(); 
require('dotenv').config({ path: './e.env' });
const dataRoutes = require('./routes/dataRoutes');




const API_BASE_URL = process.env.API_BASE_URL;
const port = process.env.PORT || 3000; // Fallback to 3000 if not set
console.log(port);

console.log(`API Base URL: ${API_BASE_URL}`);
console.log(`Server running on port: ${port}`);




app.use(express.json());
app.use(express.static('public')); 
app.timeout = 300000;
// Use CORS middleware 
app.use(cors());
// Serve static files from the "node_modules/bootstrap" directory 
app.use('/bootstrap', express.static(path.join(__dirname, 'node_modules/bootstrap')));


app.use('/', dataRoutes); 
    // Server Code
    const makeRequestWithRetry = 
    async (url, method, data = {}, maxRetries = 7) => 
        { let retries = 0; const httpsAgent = new https.Agent({ rejectUnauthorized: false }); 
    // Ignore self-signed certificates 
        while (retries < maxRetries) 
            { 
                try 
                { 
                    const response = await axios({ url: url, method: method, data: data, httpsAgent: httpsAgent }); 
                    return response.data; 
                } 
                catch (error) 
                { if (error.code === 'ECONNRESET' || error.response?.status === 500) 
                    { 
                        console.log(`Retry attempt ${retries + 1} due to ${error.code || '500 Internal Server Error'}`); 
                        retries++; 
                        continue; 
                    } 
                    throw error; 
                } 
            } 
            throw new Error(`Failed to complete request after ${maxRetries} retries.`); 
        }; 
    // POST endpoint to add data 
    // app.post('/add-data', async (req, res) => 
    //     { 
    //         const newData = req.body; const url = 'https://192.168.0.166:44305/api/Logs'; 
    //             try 
    //             { const response = await makeRequestWithRetry(url, 'POST', newData); 
    //                 console.log('Data added:', response); res.status(201).send('Data added successfully'); 
    //             } 
    //             catch (error) { console.error('Error adding data:', error); res.status(500).json({ error: error.message }); } 
    //     });

    // app.post('/add-ex', async (req, res) => 
    //     { 
    //         const newData = req.body; const url = 'https://192.168.0.166:44305/api/LogsB'; 
    //             try 
    //             { const response = await makeRequestWithRetry(url, 'POST', newData); 
    //                 console.log('Data added:', response); res.status(201).send('Data added successfully'); 
    //             } 
    //             catch (error) { console.error('Error adding data:', error); res.status(500).json({ error: error.message }); } 
    //     });

// PUT endpoint to update data 
// app.put('/update-data', async (req, res) => { const updateData = req.body; try { const httpsAgent = new https.Agent({ rejectUnauthorized: false }); 
// // Ignore self-signed certificates 
// const response = await axios.put('https://localhost:44377/api/LogsB', updateData, { httpsAgent }); 
// // Send updated data to external API 
// console.log('Data updated:', response.data); res.send('Data updated successfully'); } catch (error) { console.error('Error updating data:', error); res.status(500).send('Internal Server Error');
// } });

    // app.get('/api/oneday', async (req, res) => 
    //     { 
    //         try 
    //         { 
    //             const httpsAgent = new https.Agent({ rejectUnauthorized: false }); 
    //             // Ignore self-signed certificates 
    //             const response = await axios.get('https://192.168.0.166:44305/api/GenData', { httpsAgent }); 
    //             // Replace with your actual API endpoint 
    //             res.json(response.data); 

    //         } 
    //         catch (error) 
    //         { 
    //             console.error('Error fetching data:', error); res.status(500).send('Internal Server Error');
    //         }
            
    //     }); 
        //grid for update food
        app.get('/api/getfooddetails', async (req, res) => 
            {
                try 
                { 
                    const httpsAgent = new https.Agent({ rejectUnauthorized: false }); 
                    // Ignore self-signed certificates 
                    const response = await axios.get('https://192.168.0.166:44305/api/food', { httpsAgent }); 
                    // Replace with your actual API endpoint 
                    res.json(response.data); 

                } 
                catch (error) 
                { 
                    console.error('Error fetching data:', error); res.status(500).send('Internal Server Error');
                }
            });

    //grid for update exercise
    app.get('/api/getexercisedetails', async (req, res) => 
        {
            try 
            { 
                const httpsAgent = new https.Agent({ rejectUnauthorized: false }); 
                // Ignore self-signed certificates 
                //const response = await axios.get('https://192.168.0.166:44305/api/exercise', { httpsAgent }); 
                const token = req.headers.authorization;
                console.log(token);
                const response = await axios.get('https://localhost:44377/api/Exercise', {
                    httpsAgent, // Use the httpsAgent
                    headers: {
                        Authorization: token, // Pass the token to the API
                    },
                });
        

                // Replace with your actual API endpoint 
                res.json(response.data); 
    
            } 
            catch (error) 
            { 
                console.error('Error fetching data:', error); res.status(500).send('Internal Server Error');
             }
        });



     // Food Update   
    app.post('/api/updateF', async (req, res) => 
        { 
             const newData = req.body; const url = 'https://192.168.0.166:44305/api/Food/Update'; 
            try 
            { const response = await makeRequestWithRetry(url, 'POST', newData); 
                console.log('Data added:', response); res.status(201).send('Data added successfully'); 
            } 
            catch (error) { console.error('Error adding data:', error); res.status(500).json({ error: error.message }); } 

        });

    // Exercise Update
    app.post('/api/updateE', async (req, res) => 
        { 
                const newData = req.body; const url = 'https://192.168.0.166:44305/api/Exercise/Update'; 
            try 
            { const response = await makeRequestWithRetry(url, 'POST', newData); 
                console.log('Data added:', response); res.status(201).send('Data added successfully'); 
            } 
            catch (error) { console.error('Error adding data:', error); res.status(500).json({ error: error.message }); } 

        });




    // app.get('/api/data', async (req, res) => 
    //     { 
    //         try 
    //         { 
    //             const httpsAgent = new https.Agent({ rejectUnauthorized: false }); 
    //             // Ignore self-signed certificates 
    //             const response = await axios.get('https://192.168.0.166:44305/api/LogsB', { httpsAgent }); 
    //             // Replace with your actual API endpoint 
    //             res.json(response.data); 

    //         } 
    //         catch (error) 
    //         { 
    //             console.error('Error fetching data:', error); res.status(500).send('Internal Server Error');
    //         }
            
    //     }); 


// Serve the entry HTML file 
app.get('/entry', (req, res) => { res.sendFile(path.join(__dirname, 'public', 'entry.html')); });

app.get('/FoodUpdate', (req, res) => { res.sendFile(path.join(__dirname, 'public', 'FoodUpdate.html')); })

app.get('/', (req, res) => { res.sendFile(path.join(__dirname, 'public', 'index.html')); }); 

app.get('/exercise', (req, res) => { res.sendFile(path.join(__dirname, 'public', 'exercise.html')); });

app.get('/graph', (req, res) => { res.sendFile(path.join(__dirname, 'public', 'graph.html')); });

app.listen(port, () => { console.log(`Server is running at http://192.168.0.166:${port}`); });
