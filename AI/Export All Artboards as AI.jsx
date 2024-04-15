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

// Select folder to save
var saveFolder = Folder.selectDialog("Select folder to save artboard files");

if (saveFolder != null) { // Check if user selected a folder
    // loop through all artboards, make each one active and render before moving onto the next
    for (var i = 0; i < boards.length; i++) {
        document.artboards.setActiveArtboardIndex(i);
        // var artboardName = boards[i].name.replace(/\W+/g, "_"); // Remove special characters from artboard name
        var saveOptions = new IllustratorSaveOptions();
        var filename = document.name.replace(/\.[^\.]+$/, "") + " - " + i + ".ai"; // Use document name as prefix and artboard name as suffix
        var aiDoc = new File(saveFolder + "/" + filename);
        saveOptions.saveMultipleArtboards = true;
        saveOptions.artboardRange = (i + 1).toString();
        document.saveAs(aiDoc, saveOptions);
    }
} else {
    alert("No folder selected. Operation canceled.");
}
