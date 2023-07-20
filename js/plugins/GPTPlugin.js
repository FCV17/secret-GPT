

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
 * @default 
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
 * @arg actorImage
 * @text Actor Image
 * @desc The default actor image to be displayed in the response window.
 * @type file
 * @dir img/faces
 * @default Actor1
 *
 * @arg actorName
 * @text Actor Name
 * @desc The default actor name to be displayed in the response window.
 * @type string
 * @default GPT Wizard
 */

var defaultActorImage = "Actor1"; // Default actor image
var defaultActorName = "GPT Wizard"; // Default actor name

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

function showGptResponse(response, actorImage, actorName) {
  $gameMessage.clear();
  $gameMessage.setFaceImage(actorImage, 5);
  $gameMessage.setSpeakerName(actorName);
  $gameMessage.add(response);
  $gameVariables.setValue(5, 1);
}

(() => {
  const pluginName = "GPTPlugin";

  PluginManager.registerCommand(pluginName, "sendGptRequest", function (args) {
    const maxLength = parseInt(args.maxLength, 10) || 40;
    const eventId = parseInt(args.eventId, 10) || 0;
    const eventPageId = parseInt(args.eventPageId, 10) || 0;
    const userInput = args.userInput || window.prompt("Please enter your response:");
    const actorImage = String(args.actorImage || defaultActorImage);
    const actorName = String(args.actorName || defaultActorName);

	  const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: userInput }),
    };

    console.log("Sending request to server...");

    fetch("http://localhost:3000/api/send-message", requestOptions)
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

        showGptResponse(wrappedResponse, actorImage, actorName);

        $gameMap.event(eventId).start(eventPageId);
      })
      .catch(function (error) {
        console.error("Error:", error);
      });
  });
})();
