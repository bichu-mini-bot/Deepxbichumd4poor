const QRCode = require('qrcode');
const fs = require('fs-extra');
const path = require('path');

class PairingManager {
    constructor(client) {
        this.client = client;
        this.pairingCodes = new Map();
        this.qrCodes = new Map();
    }

    // Generate pairing code
    async generatePairingCode(number) {
        try {
            const code = await this.client.getPairingCode(number);
            const id = Date.now().toString();
            
            this.pairingCodes.set(id, {
                number,
                code,
                timestamp: Date.now(),
                expiresIn: 120000 // 2 minutes
            });
            
            // Auto expire
            setTimeout(() => {
                this.pairingCodes.delete(id);
            }, 120000);
            
            return { id, code };
        } catch (error) {
            throw new Error(`Failed to generate pairing code: ${error.message}`);
        }
    }

    // Get pairing code
    getPairingCode(id) {
        const data = this.pairingCodes.get(id);
        if (!data) {
            throw new Error('Pairing code expired or not found');
        }
        return data.code;
    }

    // Generate QR code
    async generateQR(qrData) {
        try {
            const qrImage = await QRCode.toDataURL(qrData);
            const qrPath = path.join(__dirname, '../public', 'qr.png');
            await QRCode.toFile(qrPath, qrData);
            return qrImage;
        } catch (error) {
            throw new Error(`Failed to generate QR: ${error.message}`);
        }
    }

    // Verify pairing status
    async verifyPairing() {
        try {
            const state = await this.client.getState();
            return state === 'CONNECTED';
        } catch (error) {
            return false;
        }
    }

    // Delete expired codes
    cleanExpired() {
        const now = Date.now();
        for (const [id, data] of this.pairingCodes) {
            if (now - data.timestamp > data.expiresIn) {
                this.pairingCodes.delete(id);
            }
        }
    }
}

module.exports = PairingManager;