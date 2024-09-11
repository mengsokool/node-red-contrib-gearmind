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
            var options = {
                url: 'https://gearmind.geworn.cloud/api/v1/chat',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + node.apiKey
                },
                body: JSON.stringify({ messages: msg.payload })
            };

            // Make the API request
            RED.util.httpRequest(options, function(err, res, body) {
                if (err) {
                    node.error("Error making API request: " + err);
                    return;
                }

                try {
                    var response = JSON.parse(body);
                    msg.payload = response.content;
                    node.send(msg);
                } catch (e) {
                    node.error("Error parsing API response: " + e);
                }
            });
        });
    }

    RED.nodes.registerType("gearmind", GearMindNode);
}