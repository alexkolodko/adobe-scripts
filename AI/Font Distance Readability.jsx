// 
// Font distance readabilty calculator
// v.1.0
// 3.4 mm Cap height = 1 m distance 
// 
// Author: Alex Kolodko with ChatGPT 3.5
// Contacts: alexkolodko.com
// Github: https://github.com/alexkolodko/adobe-scripts
// 

#target illustrator

// Function to calculate the cap height, x-height, and reading distance
function getTextMetrics(textSize, scaleMultiplier) {
    // Conversion factor from points to millimeters
    var pointsToMillimeters = 0.352778;

    // Calculate scaled text size
    var scaledTextSize = textSize * scaleMultiplier;

    // Assuming 70% of the font size is x-height and 70-80% is the typical range for cap height
    var capHeightPoints = scaledTextSize * 0.7; // Adjust this ratio if necessary
    var xHeightPoints = scaledTextSize * 0.5;

    // Convert points to millimeters
    var capHeightMM = capHeightPoints * pointsToMillimeters;
    var xHeightMM = xHeightPoints * pointsToMillimeters;

    // Calculate reading distance (e.g., 3.4 times the cap height)
    var readingDistance = capHeightMM / 3.4;

    return { textSize: scaledTextSize, xHeight: xHeightMM, capHeight: capHeightMM, readingDistance: readingDistance };
}

// Function to write metrics as text frames near selection
function writeMetricsAsTextFrames(metrics) {
    var sel = app.activeDocument.selection;

    if (sel.length > 0) {
        var textFrames = [];
        for (var i = 0; i < sel.length; i++) {
            var textFrame = app.activeDocument.textFrames.add();
            textFrame.contents = "Text Size:\t" + metrics.textSize + " pt\n" + // (" + (metrics.textSize * 0.352778).toFixed(2) + " mm)
                                 "Cap height:\t" + metrics.capHeight.toFixed(2) + " mm\n" +
                                 "x-height:\t" + metrics.xHeight.toFixed(2) + " mm\n" +
                                 "Distance:\t~" + metrics.readingDistance.toFixed(2) + " m";
            textFrame.top = sel[i].top - sel[i].height - 10;
            textFrame.left = sel[i].left;
            textFrames.push(textFrame);
        }
        app.activeDocument.selection = textFrames;
    } else {
        alert("Please make a selection.");
    }
}

// Main function
function main() {
    var doc = app.activeDocument;
    var sel = doc.selection;

    if (sel.length > 0 && sel[0].typename == 'TextFrame') {
        var textFrame = sel[0];
        var textSize = textFrame.textRange.characterAttributes.size;

        // Initial scale multiplier
        var scaleMultiplier = 1;

        // Calculate initial metrics
        var metrics = getTextMetrics(textSize, scaleMultiplier);

        // Create a dialog box to display results
        var dialog = new Window("dialog", "Font Distance Readability");
        dialog.orientation = "column";
        dialog.alignChildren = ["fill", "fill"];

        // Row group for Text Size
        var textSizeGroup = dialog.add("group");
        textSizeGroup.orientation = "row";
        var textSizeLabel = textSizeGroup.add("statictext", undefined, "Font Size:");
        textSizeLabel.preferredSize.width = 75; 
        var textSizeInput = textSizeGroup.add("edittext", undefined, metrics.textSize + " pt");  //  (" + (metrics.textSize * 0.352778).toFixed(2) + " mm)
        textSizeInput.preferredSize.width = 150; 
        textSizeInput.enabled = true;

        // Row group for Cap Height
        var capHeightGroup = dialog.add("group");
        capHeightGroup.orientation = "row";
        var capHeightLabel = capHeightGroup.add("statictext", undefined, "Cap height:");
        capHeightLabel.preferredSize.width = 75; 
        var capHeightInput = capHeightGroup.add("edittext", undefined, metrics.capHeight.toFixed(2) + " mm");
        capHeightInput.preferredSize.width = 150; 
        capHeightInput.enabled = true;

        // Row group for X-height
        var xHeightGroup = dialog.add("group");
        xHeightGroup.orientation = "row";
        var xHeightLabel = xHeightGroup.add("statictext", undefined, "x-height:");
        xHeightLabel.preferredSize.width = 75; 
        var xHeightInput = xHeightGroup.add("edittext", undefined, metrics.xHeight.toFixed(2) + " mm");
        xHeightInput.preferredSize.width = 150; 
        xHeightInput.enabled = true;

        // Row group for Reading Distance
        var readingDistanceGroup = dialog.add("group");
        readingDistanceGroup.orientation = "row";
        var readingDistanceLabel = readingDistanceGroup.add("statictext", undefined, "Distance:");
        readingDistanceLabel.preferredSize.width = 75; 
        var readingDistanceInput = readingDistanceGroup.add("edittext", undefined, "~" + metrics.readingDistance.toFixed(2) + " m");
        readingDistanceInput.preferredSize.width = 150; 
        readingDistanceInput.enabled = true;
        readingDistanceInput.active = true;

       // Radio buttons group for scale multiplier
        var scaleMultiplierGroup = dialog.add("group");
        scaleMultiplierGroup.orientation = "row";
        var scaleLabel = scaleMultiplierGroup.add("statictext", undefined, "Scale 1:");
        var scaleRadios = [];
        var scaleValues = [1, 10, 100];
        for (var i = 0; i < scaleValues.length; i++) {
            var scaleRadio = scaleMultiplierGroup.add("radiobutton", undefined, scaleValues[i].toString());
            scaleRadio.value = i == 0; // Select the first option by default
            scaleRadios.push(scaleRadio);
        }

        // Event listener for scale radio buttons
        for (var i = 0; i < scaleRadios.length; i++) {
            scaleRadios[i].onClick = function() {
                var selectedScale = parseInt(this.text);
                updateMetrics(selectedScale);
            };
        }

        // Function to update metrics based on the selected scale
        function updateMetrics(selectedScale) {
            scaleMultiplier = selectedScale;
            metrics = getTextMetrics(textSize, scaleMultiplier);
            textSizeInput.text = metrics.textSize.toFixed(2) + " pt"; // (" + (metrics.textSize * 0.352778).toFixed(2) + " mm)
            capHeightInput.text = metrics.capHeight.toFixed(2) + " mm";
            xHeightInput.text = metrics.xHeight.toFixed(2) + " mm";
            readingDistanceInput.text = "~" + metrics.readingDistance.toFixed(2) + " m";
        }

        // Button to write metrics as text frames near selection
        var writeButton = dialog.add("button", undefined, "Paste as Text");
        writeButton.onClick = function () {
            writeMetricsAsTextFrames(metrics);
            dialog.close();
        };

        // Button to close the dialog
        var closeButton = dialog.add("button", undefined, "Close");
        closeButton.onClick = function () {
            dialog.close();
        };

        // Show the dialog
        dialog.show();
    } else {
        alert("Please select a text frame.");
    }
}

// Execute the main function
main();
