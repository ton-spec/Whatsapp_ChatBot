const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

// Initialize client with local session storage
const client = new Client({
    authStrategy: new LocalAuth()
});

// Show QR code in terminal
client.on('qr', (qr) => {
    qrcode.generate(qr, { small: true });
});

// When ready
client.on('ready', () => {
    console.log('Client is ready!');
    const yourNumber = '254703426340@c.us';
    client.sendMessage(yourNumber, 'Hello from your WhatsApp bot!');
});

// Auto-reply to messages
client.on('message', message => {
    console.log(`Message from ${message.from}: ${message.body}`);
    message.reply('Hello! This is your bot.');
});

// Start the bot
client.initialize();
