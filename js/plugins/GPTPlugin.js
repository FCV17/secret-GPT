/*:
 * @plugindesc [RPG Maker MZ] [Version 1.0] [FCV17]
 * 
 * @author FCV17
 *
 * @help GPTPlugin.js
 *
 * This plugin allows you to send a user input to a server using an API endpoint,
 * and display the server's response in a wrapped format in RPG Maker MZ.
 *
 * @command sendGptRequest
 * @text Send GPT Request
 * @desc Sends the user input to the server and displays the wrapped response.
 *
 * @arg userInput
 * @text User Input
 * @desc The text input provided by the player.
 * @type multiline_string
 *
 * @arg maxLength
 * @text Max Length
 * @desc The maximum length for wrapping the server response (default: 40).
 * @type number
 * @default 40
 *
 * @arg eventId
 * @text Event ID
 * @desc The ID of the event to continue after displaying the response (default: 0).
 * @type number
 * @default 0
 *
 * @arg eventPageId
 * @text Event Page ID
 * @desc The ID of the event page to continue after displaying the response (default: 0).
 * @type number
 * @default 0
 *
 * @param param1
 * @text Parameter 1
 * @desc Description for Parameter 1.
 * @default Hello World
 * @type string
 *
 * @param param2
 * @text Parameter 2
 * @desc Description for Parameter 2.
 * @default 42
 * @type number
 */

function wrapText(text, maxLength) {
  const words = text.split(' ');
  let wrappedText = '';
  let currentLine = '';

  for (const word of words) {
    if (currentLine.length + word.length <= maxLength) {
      currentLine += (currentLine ? ' ' : '') + word;
    } else {
      wrappedText += (wrappedText ? '\n' : '') + currentLine;
      currentLine = word;
    }
  }

  wrappedText += (wrappedText ? '\n' : '') + currentLine;
  return wrappedText;
}

(() => {
  const pluginName = "GPTPlugin";
  const pluginParams = PluginManager.parameters(pluginName);
  const param1Value = String(pluginParams['param1']);
  const param2Value = Number(pluginParams['param2']);

  PluginManager.registerCommand(pluginName, "sendGptRequest", function (args) {
    const userInput = args.userInput;
    const maxLength = parseInt(args.maxLength, 10) || 40;
    const eventId = parseInt(args.eventId, 10) || 0;
    const eventPageId = parseInt(args.eventPageId, 10) || 0;

    const url = "http://localhost:3000/api/send-message"; // Adjust the URL as needed

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: userInput }),
    };

    console.log("Sending request to server...");

    fetch(url, requestOptions)
      .then(function (response) {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("HTTP request failed");
        }
      })
      .then(function (data) {
        console.log("Received response from server:", data);
        const wrappedResponse = wrapText(data.response, maxLength);

        $gameMessage.clear();
        $gameMessage.setFaceImage("Actor1", 5);
        $gameMessage.setSpeakerName("GPT Wizard");
        $gameMessage.add(wrappedResponse);
        $gameVariables.setValue(5, 1);

        $gameMap.event(eventId).start(eventPageId);
      })
      .catch(function (error) {
        console.error("Error:", error);
      });
  });
})();
