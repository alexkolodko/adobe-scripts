#target illustrator

// Global variables for text attributes
var textSize = 12; // Adjust text size as needed
var textColor = new CMYKColor();// Adjust text color as needed (CMYK values)
    textColor.cyan      = 0;    
    textColor.magenta   = 0;  
    textColor.yellow    = 0;  
    textColor.black     = 100;
var textFont = "Arial"; // Adjust text font as needed
var textStyle = "Regular"; // Adjust text style as needed
var addMm = true; // Set to true to add " mm", false otherwise

// Main function to get object size and create text
function main() {
    var doc = app.activeDocument;
    var selection = doc.selection;

    if (selection.length == 0) {
        alert("Please select at least one object.");
        return;
    }

    var selectedLayer = selection[0].layer;

    for (var i = 0; i < selection.length; i++) {
        var obj = selection[i];

        // Check if the object is inside a clipping group
        if (!isInsideClippingGroup(obj)) {
            var width = convertUnitsToMillimeters(obj.width);
            var height = convertUnitsToMillimeters(obj.height);
            var position = [obj.left, obj.top + 20]; // Adjust the vertical position as needed

            var sizeText = createText(doc, formatSize(width) + "x" + formatSize(height), position, selectedLayer);
        }
    }
}

// Function to check if the object is inside a clipping group
function isInsideClippingGroup(obj) {
    var parent = obj.parent;
    while (parent != null) {
        if (parent.typename == "GroupItem" && parent.clipped) {
            return true;
        }
        parent = parent.parent;
    }
    return false;
}

// Function to create text on the document
function createText(doc, text, position, layer) {
    var textFrame = layer.textFrames.add();
    textFrame.position = position;
    textFrame.contents = addMm ? text + " mm" : text;
    var textRange = textFrame.textRange;
    textRange.characterAttributes.size = textSize;
    // textRange.characterAttributes.textFont = textFont;
    // textRange.characterAttributes.textFontStyle = textStyle;
    textRange.characterAttributes.fillColor = textColor;
    return textFrame;
}

// Function to convert units to millimeters
function convertUnitsToMillimeters(units) {
    var conversionFactor = 0.352778; // 1 point = 0.352778 millimeters
    return units * conversionFactor;
}

// Function to format size text
function formatSize(size) {
    var formatted = size.toFixed(2); // Limiting to two decimal places
    formatted = formatted.replace(/\.00$/, ""); // Remove .00 if present
    formatted = formatted.replace(/\.0$/, ""); // Remove .0 if present
    return formatted;
}

// Run the main function
main();
