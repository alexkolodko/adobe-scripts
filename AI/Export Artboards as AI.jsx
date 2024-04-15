// 
// Export all artboards as AI files
// v.1.0
// 
// Author: Alex Kolodko with ChatGPT 3.5
// Contacts: alexkolodko.com
// Github: https://github.com/alexkolodko/adobe-scripts
// 

var document = app.activeDocument;
var boards = document.artboards;

// Extract the current document's filename
var currentFileName = document.name;
var defaultPrefix = currentFileName.substring(0, currentFileName.lastIndexOf('.'));

// Select folder to save
var saveFolder = Folder.selectDialog("Select folder to save artboard files");

if (saveFolder != null) { // Check if user selected a folder
    // Create a window with radio buttons and an input field for the filename prefix
    var dialog = new Window("dialog", "Save Options");
    dialog.alignChildren = "left";
    var prefixGroup = dialog.add("group");
    prefixGroup.orientation = "column";
    prefixGroup.alignChildren = "left";
    prefixGroup.add("statictext", undefined, "Enter filename prefix:");
    var prefixInput = prefixGroup.add("edittext", undefined, defaultPrefix); // Set default value to extracted filename
    prefixInput.characters = 20; // Set the maximum characters allowed
    prefixInput.active = true; // Make prefixInput active
    
    var divider1 = dialog.add("panel", undefined, undefined, {name: "divider1"}); 
    divider1.alignment = "fill"; 
    
    dialog.add("statictext", undefined, "Select save option:").alignment = "left";
    var radioGroup = dialog.add("group");
    radioGroup.orientation = "column"; // Set orientation to column
    radioGroup.spacing = 8; // Set spacing between radio buttons
    radioGroup.alignChildren = "left";
    var allRadio = radioGroup.add("radiobutton", undefined, "Save all artboards");
    allRadio.value = true; // Set Save all artboards as default value
    var selectedRadio = radioGroup.add("radiobutton", undefined, "Save selected artboard only");
    var fewRadio = radioGroup.add("radiobutton", undefined, "Export few artboards");
    var artboardGroup = dialog.add("group");
    artboardGroup.orientation = "column";
    artboardGroup.alignChildren = "left";
    artboardGroup.margins = [20, 0, 0, 0]; // Set left margin to 20 points
    var checkboxes = [];
    for (var i = 0; i < boards.length; i++) {
        var checkboxLabel = (i + 1) + ": " + boards[i].name;
        checkboxes[i] = artboardGroup.add("checkbox", undefined, checkboxLabel);
        checkboxes[i].enabled = false; // Disable checkboxes by default
    }
    var btnGroup = dialog.add("group");
    btnGroup.alignment = "right";
    btnGroup.add("button", undefined, "OK");
    btnGroup.add("button", undefined, "Cancel");

    // Event listener for radio buttons
    allRadio.onClick = selectedRadio.onClick = function() {
        for (var i = 0; i < checkboxes.length; i++) {
            checkboxes[i].enabled = false; // Disable checkboxes
            checkboxes[i].value = false; // Uncheck checkboxes
        }
    };

    fewRadio.onClick = function() {
        for (var i = 0; i < checkboxes.length; i++) {
            checkboxes[i].enabled = true; // Enable checkboxes
        }
    };

    // Event listener for OK button
    btnGroup.children[0].onClick = function() {
        dialog.close();
        var prefix = prefixInput.text || defaultPrefix; // Use defaultPrefix if prefixInput is empty

        // Loop through artboards based on user selection
        if (allRadio.value) {
            var start = 0;
            var end = boards.length;
        } else if (selectedRadio.value) {
            var selectedArtboardIndex = document.artboards.getActiveArtboardIndex();
            var start = selectedArtboardIndex;
            var end = selectedArtboardIndex + 1;
        } else if (fewRadio.value) {
            var selectedArtboards = [];
            for (var i = 0; i < checkboxes.length; i++) {
                if (checkboxes[i].value) {
                    selectedArtboards.push(i);
                }
            }
            var start = selectedArtboards[0];
            var end = selectedArtboards[selectedArtboards.length - 1] + 1;
        }

        // Loop through the selected artboards and save them with the specified prefix
        for (var i = start; i < end; i++) {
            document.artboards.setActiveArtboardIndex(i);
            var saveOptions = new IllustratorSaveOptions();
            var aiDoc = new File(saveFolder + "/" + prefix + (i + 1).toString() + ".ai"); // Save with .ai extension
            saveOptions.saveMultipleArtboards = true;
            saveOptions.artboardRange = (i + 1).toString();
            document.saveAs(aiDoc, saveOptions);
        }
    };

    // Event listener for Cancel button
    btnGroup.children[1].onClick = function() {
        dialog.close();
    };

    dialog.show();
} else {
    alert("No folder selected. Operation canceled.");
}
