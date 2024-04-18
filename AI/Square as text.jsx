// 
// Square of objects as text
// v.1.0
// 
// Author: Alex Kolodko with ChatGPT 3.5
// Contacts: alexkolodko.com
// Github: https://github.com/alexkolodko/adobe-scripts
// 

// Font size
var fontSize = 8;


// Calculate and log area and length
var areaCM = Math.abs(app.selection[0].area * 0.0012445).toFixed(3);
var areaM = (Math.abs((app.selection[0].area * 0.0012445) / 10000)).toFixed(3);
var lengthCM = (app.selection[0].length * 0.03528).toFixed(3);

var message = "S = " + areaCM + " см² = " + areaM + " м²" + "\nL = " + lengthCM + " см";

// Get position of selected element
var sel = app.selection[0];
var posX = sel.left; // X position
var posY = sel.top + ((2 * fontSize) + (fontSize/2) ); // Y position

// Create a text frame below the selected element
var doc = app.activeDocument;
var textFrame = doc.textFrames.add();
textFrame.contents = message; // Modify this with your desired text
textFrame.position = [posX, posY]; // Set position

// Set font size
textFrame.textRange.characterAttributes.size = fontSize;