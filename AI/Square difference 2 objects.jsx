// 
// Calculate the difference between the areas of two objects and show in a dialog
// v.1.1
// 
// Author: Alex Kolodko with ChatGPT & Cursor app
// Contacts: alexkolodko.com
// Github: https://github.com/alexkolodko/adobe-scripts
// 

// Check if at least two objects are selected

var PTtoMM = 0.352777778;

var selectedObjects = app.selection;
var selectedPaths = [];
for (var i = 0; i < selectedObjects.length; i++) {
    if (selectedObjects[i].typename == "PathItem" || selectedObjects[i].typename == "CompoundPathItem" || selectedObjects[i].typename == "GroupItem") {
        selectedPaths.push(selectedObjects[i]);
    }
}
if (selectedPaths.length < 1 || selectedPaths.length > 2) {
    alert("Please select at least two paths, compound paths, or group items.");
} else if (selectedPaths.length == 1) {
    // Calculate the area for the single selected object
    var area = getArea(selectedPaths[0]);

    // Create a dialog to display the message for one object
    var dialog = new Window("dialog", "Area Calculator");
    dialog.orientation = "column";
    dialog.alignChildren = "fill";

    dialog.add("statictext", undefined, "The area of the selected object is:");
    dialog.add("statictext", undefined, area + " mm²");
    dialog.add("statictext", undefined, "Bounding box square:");
    dialog.add("statictext", undefined, calculateBoundingBoxArea(selectedPaths[0]) + " mm²");

    // Button to paste results as point text
    var pasteButton = dialog.add("button", undefined, "Paste Result");
    pasteButton.onClick = function() {
        pasteResultAboveObject(area);
        dialog.close(); // Close the dialog after pasting the result
    };

    var closeButton = dialog.add("button", undefined, "Close", {name: "close"});
    closeButton.onClick = function() {
        dialog.close();
    };

    dialog.show();
} else if (selectedPaths.length == 2) {
    var area1 = getArea(selectedPaths[0]);
    var area2 = getArea(selectedPaths[1]);

    var difference = Math.abs(area1 - area2).toFixed(3); // Absolute difference between the areas of the two objects

    var percentDifference = (Math.abs(difference / Math.max(area1, area2)) * 100).toFixed(2);
    var smallerPercentage = (100 - percentDifference).toFixed(2);

    // Create a dialog to display the message with redesigned layout
    var dialog = new Window("dialog", "Area Difference Calculator");
    dialog.orientation = "column"; // Keep dialog orientation as column for overall structure
    dialog.alignChildren = "fill";

    // Container for both groups
    var container = dialog.add("group");
    container.orientation = "row"; // Set to row to place groups side by side

    // Group for area difference
    var areaGroup = container.add("panel");
    areaGroup.text = "Area difference"; 
    areaGroup.orientation = "column";
    areaGroup.alignChildren = "fill";
    areaGroup.margins = [10,10,10,10]; 
    areaGroup.spacing = 8;

    areaGroup.add("statictext", undefined, "S1 = " + area1 + " mm²");
    areaGroup.add("statictext", undefined, "S2 = " + area2 + " mm²");
    areaGroup.add("statictext", undefined, "Difference = " + difference + " mm² (" + percentDifference + "%)");
    areaGroup.add("statictext", undefined, "Smaller square = " + smallerPercentage + "% of bigger");
    // Group for bounding box difference
    var bboxGroup = container.add("panel");
    bboxGroup.text = "Bounding box square difference"; 
    bboxGroup.orientation = "column";
    bboxGroup.alignChildren = "fill";
    bboxGroup.margins = [10,10,10,10]; 
    bboxGroup.spacing = 8;

    var bboxArea1 = calculateBoundingBoxArea(selectedPaths[0]);
    var bboxArea2 = calculateBoundingBoxArea(selectedPaths[1]);

    var bboxDifference = Math.abs(bboxArea1 - bboxArea2).toFixed(3);

    var bboxPercentDifference = (Math.abs(bboxDifference / Math.max(bboxArea1, bboxArea2)) * 100).toFixed(2);
    var bboxSmallerPercentage = (100 - bboxPercentDifference).toFixed(2);

    bboxGroup.add("statictext", undefined, "B1 = " + bboxArea1 + " mm²");
    bboxGroup.add("statictext", undefined, "B2 = " + bboxArea2 + " mm²");
    bboxGroup.add("statictext", undefined, "Difference = " + bboxDifference + " mm² (" + bboxPercentDifference + "%)");
    bboxGroup.add("statictext", undefined, "Smaller bounding box = " + bboxSmallerPercentage + "% of bigger");

    // Buttons below both groups
    var buttonGroup = dialog.add("group");
    buttonGroup.orientation = "row";
    var pasteButton = buttonGroup.add("button", undefined, "Paste Results");
    pasteButton.onClick = function() {
        pasteResultsAboveObjects(area1, area2, difference, percentDifference, smallerPercentage);
        dialog.close(); // Close the dialog after pasting the results
    };

    var closeButton = buttonGroup.add("button", undefined, "Close", {name: "close"});
    closeButton.onClick = function() {
        dialog.close();
    };

    dialog.show();
}


function getArea(item) {
    var area = 0; // Initialize area as a number
    if (item.typename == "PathItem") {
        area += Math.abs(item.area) * PTtoMM * PTtoMM; // Convert area from square points to square millimeters
    } else if (item.typename == "CompoundPathItem") {
        for (var i = 0; i < item.pathItems.length; i++) {
            area += Math.abs(item.pathItems[i].area) * PTtoMM * PTtoMM;
        }
    } else if (item.typename == "GroupItem") {
        for (var i = 0; i < item.pageItems.length; i++) {
            // Ensure that getArea returns a number by parsing it with parseFloat
            area += parseFloat(getArea(item.pageItems[i])); // Recursively calculate the area of items within the group
        }
    }
    // Ensure area is treated as a number and use toFixed
    return parseFloat(area).toFixed(3);
}

function pasteResultsAboveObjects(area1, area2, difference, percentDifference, smallerPercentage) {
    // Calculate the position to place the text based on the selected objects
    var xPosition = Math.min(app.selection[0].visibleBounds[0], app.selection[1].visibleBounds[0]);
    var yPosition = Math.max(app.selection[0].visibleBounds[1], app.selection[1].visibleBounds[1]) + (10*14+7); // Adjust as needed
    
    // Calculate the visible bounding box area for each object in square millimeters
    var bboxArea1 = calculateBoundingBoxArea(app.selection[0]);
    var bboxArea2 = calculateBoundingBoxArea(app.selection[1]);
    var bboxDifference = Math.abs(bboxArea1 - bboxArea2).toFixed(3);
    var bboxPercentDifference = (Math.abs(bboxDifference / Math.max(bboxArea1, bboxArea2)) * 100).toFixed(2);
    var bboxSmallerPercentage = (100 - bboxPercentDifference).toFixed(2);

    var textFrame = app.activeDocument.textFrames.add();
    textFrame.contents = "Area difference:\n" +
                         "S1 = " + area1 + " mm²\n" +
                         "S2 = " + area2 + " mm²\n" +
                         "Difference = " + difference + " mm² (" + percentDifference + "%)\n" +
                         "Smaller square = " + smallerPercentage + "% of bigger\n" +
                         "Bounding Box Difference:\n" +
                         "BBox S1 = " + bboxArea1 + " mm²\n" +
                         "BBox S2 = " + bboxArea2 + " mm²\n" +
                         "Difference = " + bboxDifference + " mm² (" + bboxPercentDifference + "%)\n" +
                         "Smaller BBox = " + bboxSmallerPercentage + "% of bigger";
    textFrame.position = [xPosition, yPosition];
    textFrame.selected = true; // Optionally select the text frame
}

function calculateBoundingBoxArea(selection) {
    var bounds = selection.visibleBounds; // [left, top, right, bottom]
    var widthMM = (bounds[2] - bounds[0]) * PTtoMM;
    var heightMM = (bounds[1] - bounds[3]) * PTtoMM;
    return (widthMM * heightMM).toFixed(3);
}

function pasteResultAboveObject(area) {
    // Calculate the position to place the text based on the selected object
    var bounds = app.selection[0].visibleBounds; // [left, top, right, bottom]
    var xPosition = bounds[0];
    var yPosition = bounds[1] + 20; // Adjust as needed

    // Calculate the visible bounding box area in square millimeters
    var widthMM = (bounds[2] - bounds[0]) * PTtoMM;
    var heightMM = (bounds[1] - bounds[3]) * PTtoMM;
    var bboxArea = (widthMM * heightMM).toFixed(3);

    var textFrame = app.activeDocument.textFrames.add();
    textFrame.contents = "S = " + area + " mm²\n" +
                         "Bounding Box S = " + bboxArea + " mm²";
    textFrame.position = [xPosition, yPosition];
    textFrame.selected = true; // Optionally select the text frame
}