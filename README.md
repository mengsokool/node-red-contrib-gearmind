# node-red-contrib-gearmind

A Node-RED node for interacting with the GearMind API for industrial evolution.

## Description

This Node-RED node allows you to easily integrate GearMind API capabilities into your Node-RED flows. It provides a simple interface to send requests to the GearMind API and receive responses, enabling you to leverage industrial evolution features in your automation projects.

## Installation

Run the following command in your Node-RED user directory (typically ~/.node-red):

```
npm install node-red-contrib-gearmind
```

## Usage

1. Drag the "GearMind" node from the palette to your flow.
2. Double-click on the node to configure it.
3. Enter your GearMind API Key in the configuration panel.
4. Connect the node to your flow.

### Input

The node expects an input message with a `payload` containing an array of message objects to send to the GearMind API. For example:

```javascript
msg.payload = [
    {"role": "system", "content": "You are an industrial expert."},
    {"role": "user", "content": "How can I optimize my manufacturing process?"}
];
```

### Output

The node will output a message with the `payload` containing the response content from the GearMind API as a string.

## Example Flow

Here's a simple example of how to use the GearMind node:

```json
[{"id":"f6f2187d.f17ca8","type":"inject","z":"b068e77.4ebfce8","name":"Trigger","topic":"","payload":"","payloadType":"date","repeat":"","crontab":"","once":false,"x":100,"y":80,"wires":[["2b1c54c4.79795c"]]},{"id":"2b1c54c4.79795c","type":"function","z":"b068e77.4ebfce8","name":"Prepare Request","func":"msg.payload = [\n    {\"role\": \"system\", \"content\": \"You are an industrial expert.\"},\n    {\"role\": \"user\", \"content\": \"How can I optimize my manufacturing process?\"}\n];\nreturn msg;","outputs":1,"noerr":0,"x":280,"y":80,"wires":[["3f7caa4.ec0c706"]]},{"id":"3f7caa4.ec0c706","type":"gearmind","z":"b068e77.4ebfce8","name":"","apiKey":"","x":460,"y":80,"wires":[["e6b3d73a.d02c18"]]},{"id":"e6b3d73a.d02c18","type":"debug","z":"b068e77.4ebfce8","name":"","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"payload","x":650,"y":80,"wires":[]}]
```

## Configuration

The node requires a GearMind API Key for authentication. You can obtain this key from your GearMind account settings.

## Security Note

Always keep your API Key confidential. Do not share it or commit it to public repositories.

## Contributing

Contributions to improve node-red-contrib-gearmind are welcome. Please feel free to submit pull requests or create issues on the GitHub repository.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

If you encounter any issues or have questions, please file an issue on the GitHub repository.