const express = require('express');
const path = require('path');

function setupWebServer(client) {
    const app = express();
    const router = express.Router();

    // Serve static files
    app.use(express.static(path.join(__dirname, '../public')));
    
    // Web pairing endpoint
    router.post('/api/pair', async (req, res) => {
        const { number, password } = req.body;
        
        if (password !== process.env.WEB_PAIRING_PASSWORD) {
            return res.status(401).json({ 
                success: false, 
                message: 'Invalid password' 
            });
        }

        try {
            const formattedNumber = number.replace(/\D/g, '');
            const code = await client.getPairingCode(formattedNumber);
            
            res.json({
                success: true,
                message: 'Pairing code generated!',
                data: {
                    code: code,
                    number: formattedNumber,
                    instructions: 'Open WhatsApp > Linked Devices > Link with Phone Number'
                }
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    });

    // Get pairing status
    router.get('/api/status', async (req, res) => {
        try {
            const state = await client.getState();
            res.json({
                status: 'connected',
                authenticated: state === 'CONNECTED',
                state: state
            });
        } catch (error) {
            res.json({
                status: 'disconnected',
                authenticated: false,
                error: error.message
            });
        }
    });

    // Health check
    router.get('/health', (req, res) => {
        res.json({
            status: 'ok',
            timestamp: new Date().toISOString(),
            uptime: process.uptime()
        });
    });

    app.use('/api', router);
    
    return app;
}

module.exports = setupWebServer;