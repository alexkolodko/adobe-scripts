// 
// Effective PPI
// v.1.0
//
// Description: This script displays all the linked files in the active document that have a resolution below the specified threshold.
// 
// Author: Alex Kolodko with ChatGPT
// Contacts: alexkolodko.com
// Github: https://github.com/alexkolodko/adobe-scripts
// 


// Define the resolution threshold
var resolutionPpi = 300;

// Check if there is an active document
if (app.documents.length > 0) {
    var doc = app.activeDocument;
    var links = doc.links;
    var lowResLinks = [];

    // Loop through all the links in the document
    for (var i = 0; i < links.length; i++) {
        var link = links[i];

        // Get the link's parent object (the graphic)
        var parent = link.parent;

        if (parent.hasOwnProperty("effectivePpi")) {
            var effectivePpi = parent.effectivePpi;

            // Check if the effective PPI is less than the threshold
            if (effectivePpi[0] < resolutionPpi || effectivePpi[1] < resolutionPpi) {
                lowResLinks.push({
                    name: link.name,
                    fullPath: link.filePath,
                    ppi: effectivePpi
                });
            }
        }
    }

    // Create a window to display the low-res links
    var win = new Window("dialog", "Low Resolution Links");
    win.orientation = "column";

    // Add a textarea to the window
    var textArea = win.add("edittext", undefined, "", {
        multiline: true,
        scrolling: true
    });
    textArea.minimumSize.width = 600;
    textArea.minimumSize.height = 450;

    // Function to update the textarea content
    function updateTextArea(showFullPath) {
        var message = "The following linked files have a resolution below " + resolutionPpi + " PPI:\n\n";
        for (var j = 0; j < lowResLinks.length; j++) {
            var linkInfo = lowResLinks[j];
            message += "" + (showFullPath ? linkInfo.fullPath : linkInfo.name) + " - Effective PPI: " + linkInfo.ppi.join(" x ") + "\n";
        }

        if (lowResLinks.length == 0) {
            message += "No linked files with a resolution below " + resolutionPpi + " PPI found.";
        }

        textArea.text = message;
    }

    // Initially populate the textarea with the list of low-res links (names only)
    updateTextArea(false);

    // Add a checkbox to toggle full path display
    var showFullPathCheckbox = win.add("checkbox", undefined, "Show full file paths");
    showFullPathCheckbox.onClick = function() {
        updateTextArea(this.value);
    };

    // Add a close button to the window
    var closeButton = win.add("button", undefined, "Close");
    closeButton.onClick = function() {
        win.close();
    };

    // Show the window
    win.show();
} else {
    alert("No active document found.");
}
