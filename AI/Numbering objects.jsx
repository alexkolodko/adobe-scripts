// 
// Numerate selected objects from top to bottom, left to right
// v.1.0
// 
// Author: Alex Kolodko with ChatGPT 3.5 & Cursor App
// Contacts: alexkolodko.com
// Github: https://github.com/alexkolodko/adobe-scripts
// 

#target illustrator

function enumerateSelectedObjectsWithLabels() {
    var doc = app.activeDocument;
    var selectedItems = doc.selection;
    if (selectedItems.length == 0) {
        alert('No objects selected.');
        return;
    }

    // Create and display a dialog window for starting number input
    var dialog = new Window('dialog', 'Numerate selected objects');
    dialog.orientation = 'column';
    dialog.alignChildren = ['fill', 'top']; // Align children to fill the width
    dialog.spacing = 10;
    dialog.margins = 10;

    dialog.add('statictext', undefined, 'Start from:');
    var startNumberInput = dialog.add('edittext', undefined, '1');
    startNumberInput.characters = 20; // Adjust as needed
    startNumberInput.active = true;

    // Add a section in the dialog for choosing the numeration direction
    var directionGroup = dialog.add('panel', undefined, 'Direction');
    directionGroup.orientation = 'column';
    directionGroup.alignChildren = 'left';
    directionGroup.spacing = 8;

    var topFirstRadio = directionGroup.add('radiobutton', undefined, 'From top');
    var leftFirstRadio = directionGroup.add('radiobutton', undefined, 'From left');
    topFirstRadio.value = true; // Set 'From top first, then from left' as the default selection

    // Button group to fill the width
    var buttonGroup = dialog.add('group');
    buttonGroup.alignment = 'fill'; // Make the group fill the dialog width
    buttonGroup.alignChildren = ['fill', 'top']; // Make the buttons fill the group width

    var okButton = buttonGroup.add('button', undefined, 'OK', {name: 'ok'});
    var cancelButton = buttonGroup.add('button', undefined, 'Cancel', {name: 'cancel'});

    // No need to set size for individual buttons; they fill the group width

    if (dialog.show() !== 1) return; // User pressed Cancel
    var startNumber = parseInt(startNumberInput.text, 10);
    if (isNaN(startNumber)) {
        alert('Invalid number.');
        return;
    }

    // Determine the selected numeration direction
    var numerationDirection = topFirstRadio.value ? 'topFirst' : 'leftFirst';

    // Convert selection to array to sort
    var itemsArray = [];
    for (var i = 0; i < selectedItems.length; i++) {
        var item = selectedItems[i];
        var position = item.position; // Top-left corner of the object
        var height = item.height ? item.height : 0; // Some items might not have height property
        itemsArray.push({item: item, x: position[0], y: -position[1], height: height}); // Y is inverted in Illustrator
    }

    // Sort items based on the selected numeration direction
    itemsArray.sort(function(a, b) {
        if (numerationDirection === 'topFirst') {
            return a.y == b.y ? a.x - b.x : a.y - b.y;
        } else { // 'leftFirst'
            return a.x == b.x ? a.y - b.y : a.x - b.x;
        }
    });

    // Create point text above each object starting from the input number
    for (var i = 0; i < itemsArray.length; i++) {
        var item = itemsArray[i].item;
        var x = itemsArray[i].x;
        var y = itemsArray[i].y;
        var height = itemsArray[i].height;

        // Create text frame for enumeration
        var textFrame = doc.textFrames.add();
        textFrame.contents = '' + (startNumber + i);
        textFrame.position = [x, -(y - 20)]; // Position above the object, adjust as needed
        textFrame.textRange.characterAttributes.size = 10; // Adjust text size as needed
    }
}

enumerateSelectedObjectsWithLabels();

