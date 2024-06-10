// 
// List of CMYK Colors
// v.1.0
//
// Script to extract unique CMYK colors from selected or all objects in an Illustrator document and display color information.
// 
// Author: Alex Kolodko with ChatGPT
// Contacts: alexkolodko.com
// Github: https://github.com/alexkolodko/adobe-scripts
// 



#target illustrator

function getCMYKColorOfSelectedOrAllObjects() {
    var doc = app.activeDocument;
    var selectedObjects = doc.selection;
    var objectsToProcess = selectedObjects.length > 0 ? selectedObjects : doc.pageItems;
    var colorInfo = "";
    var uniqueColors = {};

    function processItem(item) {
        if (item.typename === "PathItem") {
            if (item.filled) {
                var fillColor = item.fillColor;
                if (fillColor.typename === "SpotColor" || fillColor.typename === "CMYKColor") {
                    var cmykColor = fillColor.typename === "SpotColor" ? fillColor.spot.color : fillColor;
                    if (cmykColor.typename === "CMYKColor") {
                        var colorKey = cmykColor.cyan.toFixed(0) + "," + cmykColor.magenta.toFixed(0) + "," + cmykColor.yellow.toFixed(0) + "," + cmykColor.black.toFixed(0);
                        if (!uniqueColors[colorKey]) {
                            uniqueColors[colorKey] = { type: "fill", color: cmykColor, text: "Fill:\t" + colorKey + "\n" };
                        }
                    }
                }
            }
            if (item.stroked) {
                var strokeColor = item.strokeColor;
                if (strokeColor.typename === "SpotColor" || strokeColor.typename === "CMYKColor") {
                    var cmykStrokeColor = strokeColor.typename === "SpotColor" ? strokeColor.spot.color : strokeColor;
                    if (cmykStrokeColor.typename === "CMYKColor") {
                        var strokeColorKey = cmykStrokeColor.cyan.toFixed(0) + "," + cmykStrokeColor.magenta.toFixed(0) + "," + cmykStrokeColor.yellow.toFixed(0) + "," + cmykStrokeColor.black.toFixed(0);
                        if (!uniqueColors[strokeColorKey]) {
                            uniqueColors[strokeColorKey] = { type: "stroke", color: cmykStrokeColor, text: "Stroke:\t" + strokeColorKey + "\n" };
                        }
                    }
                }
            }
        } else if (item.typename === "GroupItem") {
            for (var j = 0; j < item.pageItems.length; j++) {
                processItem(item.pageItems[j]);
            }
        }
    }

    for (var i = 0; i < objectsToProcess.length; i++) {
        processItem(objectsToProcess[i]);
    }

    for (var key in uniqueColors) {
        colorInfo += uniqueColors[key].text;
    }

    var win = new Window("dialog", "CMYK Colors");
    var textArea = win.add("edittext", undefined, colorInfo, {multiline: true, scrolling: true});
    textArea.size = [600, 400];
    win.add("button", undefined, "OK");

    var createRectanglesButton = win.add("button", undefined, "Create Rectangles with Colors");
    createRectanglesButton.onClick = function() {
        var padding = 10;
        var rowHeight = 20;
        var currentX = doc.width / 2; // Center of the document
        var currentY = doc.height / 2; // Center of the document

        for (var key in uniqueColors) {
            var colorData = uniqueColors[key];
            
            var rect = doc.pathItems.rectangle(currentY, currentX, rowHeight, rowHeight); 
            var text = doc.textFrames.add();
            text.contents = key; // Color value text
            text.top = currentY - (rowHeight / 4);
            text.left = currentX + rowHeight + padding; // Position text to the right of the rectangle

            currentY += (rowHeight + padding) * -1;
            rect.filled = true;
            rect.fillColor = colorData.color;
            rect.stroked = false;
        }
        
        win.close();
    };

    win.show();
}

// Start Generation Here
getCMYKColorOfSelectedOrAllObjects();
