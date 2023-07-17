(function() {
    // Override the window.prompt function
    window.prompt = function(text, defaultText) {
        // Create a custom input element
        var input = document.createElement("input");
        input.type = "text";
        input.value = defaultText || "";

        // Apply custom styles to the input element
        input.style.width = "200px";
        input.style.height = "30px";
        input.style.padding = "5px";
        input.style.border = "1px solid #000";
        input.style.borderRadius = "5px";
        input.style.fontSize = "16px";

        // Show the custom input element in a dialog box
        var result = dialogBox(text, input);

        // Return the value entered by the user
        return result;
    };

    // Custom function to display the dialog box
    function dialogBox(text, input) {
        // Create a container div for the dialog box
        var container = document.createElement("div");
        container.style.position = "fixed";
        container.style.top = "50%";
        container.style.left = "50%";
        container.style.transform = "translate(-50%, -50%)";
        container.style.padding = "20px";
        container.style.backgroundColor = "#fff";
        container.style.boxShadow = "0 2px 4px rgba(0, 0, 0, 0.3)";
        container.style.zIndex = "9999";

        // Create a text element for the prompt message
        var message = document.createElement("p");
        message.textContent = text;

        // Create a button to submit the input value
        var submitButton = document.createElement("button");
        submitButton.textContent = "OK";
        submitButton.addEventListener("click", function() {
            // Close the dialog box when OK is clicked
            closeDialog();
        });

        // Append the elements to the container
        container.appendChild(message);
        container.appendChild(input);
        container.appendChild(submitButton);

        // Append the container to the document body
        document.body.appendChild(container);

        // Function to close the dialog box
        function closeDialog() {
            document.body.removeChild(container);
        }

        // Return the value entered by the user
        return input.value;
    }
})();
