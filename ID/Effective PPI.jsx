// 
// Effective PPI
// v.1.1.2
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
                var page = null;

                // Try to get the parent page of the link
                try {
                    page = parent.parentPage.name;
                } catch (e) {
                    page = "N/A"; // For links not directly placed on a page (e.g., on the pasteboard)
                }

                lowResLinks.push({
                    name: link.name,
                    fullPath: link.filePath,
                    ppi: effectivePpi,
                    page: page
                });
            }
        }
    }

    // Create a window to display the low-res links
    var win = new Window("dialog", "Low Resolution Links");
    win.orientation = "column";

    // Add a group for the checkboxes
    var checkboxGroup = win.add("group");
    checkboxGroup.orientation = "row";

    // Add a checkbox to toggle full path display
    var showFullPathCheckbox = checkboxGroup.add("checkbox", undefined, "Show full paths");
    showFullPathCheckbox.value = false;

    // Add a checkbox to toggle details display
    var showDetailsCheckbox = checkboxGroup.add("checkbox", undefined, "Show PPI and pagenum");
    showDetailsCheckbox.value = true;

    // Add a checkbox to filter out links with page "N/A"
    var filterNACheckbox = checkboxGroup.add("checkbox", undefined, "Hide links out of page");
    filterNACheckbox.value = false;

    // Add a label to the dialog
    var label = win.add("statictext", undefined, "Linked files with resolution below " + resolutionPpi + " PPI:");
    label.alignment = "left";
    
    // Add a textarea to the window
    var textArea = win.add("edittext", undefined, "", {
        multiline: true,
        scrolling: true
    });
    textArea.minimumSize.width = 600;
    textArea.minimumSize.height = 450;
    textArea.maximumSize.height = 600;



    // Function to update the textarea content
    function updateTextArea(showFullPath, showDetails, filterNA) {
        var message = "";
        for (var j = 0; j < lowResLinks.length; j++) {
            var linkInfo = lowResLinks[j];
            if (filterNA && linkInfo.page === "N/A") {
                continue;
            }
            message += (showFullPath ? linkInfo.fullPath : linkInfo.name);
            if (showDetails) {
                message += " - Effective PPI: " + linkInfo.ppi.join(" x ") + " - Page: " + linkInfo.page;
            }
            message += "\n";
        }

        if (lowResLinks.length == 0 || (filterNA && message === "")) {
            message += "No linked files with a resolution below " + resolutionPpi + " PPI found.";
        }

        textArea.text = message;
    }

    // Initially populate the textarea with the list of low-res links (names only)
    updateTextArea(false, true, false);

    // Update the textarea when checkboxes are clicked
    showFullPathCheckbox.onClick = function() {
        updateTextArea(showFullPathCheckbox.value, showDetailsCheckbox.value, filterNACheckbox.value);
    };

    showDetailsCheckbox.onClick = function() {
        updateTextArea(showFullPathCheckbox.value, showDetailsCheckbox.value, filterNACheckbox.value);
    };

    filterNACheckbox.onClick = function() {
        updateTextArea(showFullPathCheckbox.value, showDetailsCheckbox.value, filterNACheckbox.value);
    };
    
    // Add a group for the buttons
    var buttonGroup = win.add("group");
    buttonGroup.orientation = "row";
    
    // Add a button to copy text to clipboard
    // var copyButton = buttonGroup.add("button", undefined, "Copy to Clipboard");
    // copyButton.onClick = function() {
    //     if (app.documents.length > 0) {
    //         var tempTextFrame = app.activeDocument.pages[0].textFrames.add();
    //         tempTextFrame.contents = textArea.text;
    //         tempTextFrame.texts[0].select();
    //         app.copy();
    //         tempTextFrame.remove();
    //         alert("Text copied to clipboard.");
    //         win.close();
    //     } else {
    //         alert("No active document found.");
    //     }
    // };
    
    // Add a close button to the window
    var closeButton = buttonGroup.add("button", undefined, "Close");
    closeButton.onClick = function() {
        win.close();
    };

    // Show the window
    win.show();
} else {
    alert("No active document found.");
}
