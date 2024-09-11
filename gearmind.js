const http = require('http');
const https = require('https');

module.exports = function(RED) {
    function GearMindNode(config) {
        RED.nodes.createNode(this, config);
        var node = this;
        
        // Store the API key from the node configuration
        this.apiKey = config.apiKey;

        node.on('input', function(msg) {
            // Check if messages array is provided in the input
            if (!Array.isArray(msg.payload)) {
                node.error("Input must be an array of message objects");
                return;
            }

            // Prepare the request options
            const postData = JSON.stringify({ messages: msg.payload });
            const options = {
                hostname: 'gearmind.geworn.cloud',
                port: 443,
                path: '/api/v1/chat',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + node.apiKey,
                    'Content-Length': Buffer.byteLength(postData)
                }
            };

            // Make the API request
            const req = https.request(options, (res) => {
                let body = '';
                res.on('data', (chunk) => {
                    body += chunk;
                });
                res.on('end', () => {
                    try {
                        const response = JSON.parse(body);
                        msg.payload = response.content;
                        node.send(msg);
                    } catch (e) {
                        node.error("Error parsing API response: " + e);
                    }
                });
            });

            req.on('error', (e) => {
                node.error("Error making API request: " + e);
            });

            // Write data to request body
            req.write(postData);
            req.end();
        });
    }

    RED.nodes.registerType("gearmind", GearMindNode);
}