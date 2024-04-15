// 
// Scale Objects
// v.1.0
// 
// Author: Alex Kolodko with ChatGPT 3.5
// Contacts: alexkolodko.com
// Github: https://github.com/alexkolodko/adobe-scripts
// 

#target illustrator

// Function to convert points to the document's rulers units
function pointsToUnits(points) {
    // Get the current units of the document
    var rulerUnits = app.activeDocument.rulerUnits;
    var unitValue;

    // Convert points to units based on the current ruler units
    switch (rulerUnits) {
        case RulerUnits.Inches:
            unitValue = points / 72; // 1 inch = 72 points
            break;
        case RulerUnits.Centimeters:
            unitValue = points / 28.3464567; // 1 centimeter = 28.3464567 points
            break;
        case RulerUnits.Millimeters:
            unitValue = points / 2.83464567; // 1 millimeter = 2.83464567 points
            break;
        case RulerUnits.Points:
        default:
            unitValue = points;
            break;
    }

    return unitValue;
}

// Function to create and show dialog
function showDialog() {
    var dialog = new Window("dialog", "Scale Objects");
    dialog.orientation = "column";
    dialog.spacing = 10; 
    dialog.margins = 16; 

    var group1 = dialog.add("group", undefined, {name: "group1"}); 
        group1.orientation = "row"; 
        group1.alignChildren = ["left","center"]; 
        group1.spacing = 10; 
        group1.margins = 0; 
        
    // Get height button
    var getHeightBtn = group1.add("button", undefined, "Use Height");
    getHeightBtn.onClick = function() {
        var selectionHeight = getSelectionHeight();
        if (selectionHeight !== null) {
            currentSizeInput.text = pointsToUnits(selectionHeight).toFixed(4); // Convert to document units
            futureSizeInput.active = true;
        }
    };

    // Get width button
    var getWidthBtn = group1.add("button", undefined, "Use Width");
    getWidthBtn.onClick = function() {
        var selectionWidth = getSelectionWidth();
        if (selectionWidth !== null) {
            currentSizeInput.text = pointsToUnits(selectionWidth).toFixed(4); // Convert to document units
            futureSizeInput.active = true;
        }
    };

    // Current size input
    var currentGroup = dialog.add("group");
    var label1 = currentGroup.add("statictext", undefined, "Current Size:");
    label1.preferredSize.width = 80; 
    var currentSizeInput = currentGroup.add("edittext", undefined, "");
    currentSizeInput.characters = 10;
    currentSizeInput.preferredSize.width = 100; 
    currentSizeInput.active = true;

    // Future size input
    var futureGroup = dialog.add("group");
    var label2 = futureGroup.add("statictext", undefined, "Future Size:");
    label2.preferredSize.width = 80; 
    var futureSizeInput = futureGroup.add("edittext", undefined, "");
    futureSizeInput.characters = 10;
    futureSizeInput.preferredSize.width = 100; 

    // Buttons
    var btnGroup = dialog.add("group");
    var okBtn = btnGroup.add("button", undefined, "OK");
    var cancelBtn = btnGroup.add("button", undefined, "Cancel");

    // Event listener for OK button
    okBtn.onClick = function() {
        var currentSize = parseFloat(currentSizeInput.text);
        var futureSize = parseFloat(futureSizeInput.text);

        if (isNaN(currentSize) || isNaN(futureSize)) {
            alert("Please enter valid numeric values.");
            return;
        }

        var scaleFactor = futureSize / currentSize;
        scaleSelectedObjects(scaleFactor);
        dialog.close();
    };

    // Event listener for Cancel button
    cancelBtn.onClick = function() {
        dialog.close();
    };

    dialog.show();
}

// Function to get the height of the selection
function getSelectionHeight() {
    var selection = app.activeDocument.selection;
    if (selection.length === 0) {
        alert("No objects selected.");
        return null;
    }

    var maxY = -Infinity;
    var minY = Infinity;

    for (var i = 0; i < selection.length; i++) {
        var bounds = selection[i].geometricBounds;
        maxY = Math.max(maxY, bounds[1]);
        minY = Math.min(minY, bounds[3]);
    }

    var selectionHeight = maxY - minY;
    return selectionHeight;
}

// Function to get the width of the selection
function getSelectionWidth() {
    var selection = app.activeDocument.selection;
    if (selection.length === 0) {
        alert("No objects selected.");
        return null;
    }

    var maxX = -Infinity;
    var minX = Infinity;

    for (var i = 0; i < selection.length; i++) {
        var bounds = selection[i].geometricBounds;
        maxX = Math.max(maxX, bounds[2]);
        minX = Math.min(minX, bounds[0]);
    }

    var selectionWidth = maxX - minX;
    return selectionWidth;
}

// Function to scale selected objects
function scaleSelectedObjects(scaleFactor) {
    var selection = app.activeDocument.selection;

    // Calculate the average center of the selection
    var centerX = 0;
    var centerY = 0;
    for (var i = 0; i < selection.length; i++) {
        centerX += selection[i].position[0];
        centerY += selection[i].position[1];
    }
    centerX /= selection.length;
    centerY /= selection.length;

    // Scale each object relative to the average center
    for (var i = 0; i < selection.length; i++) {
        var obj = selection[i];
        var deltaX = obj.position[0] - centerX;
        var deltaY = obj.position[1] - centerY;
        obj.resize(scaleFactor * 100, scaleFactor * 100, true, true, true, true, scaleFactor * 100, Transformation.CENTER);
        obj.position = [centerX + (deltaX * scaleFactor), centerY + (deltaY * scaleFactor)];
    }
}

// Run the dialog
showDialog();
