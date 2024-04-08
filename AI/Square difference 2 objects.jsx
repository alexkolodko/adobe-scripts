// Check if at least two objects are selected
if (app.selection.length < 2) {
    alert("Please select at least two objects.");
} else {
    var area1 = Math.abs(app.selection[0].area * 0.0012445).toFixed(3); // Area of the first selected object in square centimeters
    var area2 = Math.abs(app.selection[1].area * 0.0012445).toFixed(3); // Area of the second selected object in square centimeters

    var difference = Math.abs(area1 - area2).toFixed(3); // Absolute difference between the areas of the two objects

    var percentDifference = Math.abs(difference / Math.max(area1, area2)).toFixed(2) * 100;

    var message = "Area difference:\n" +
                  "S1: " + area1 + " cm²\n" +
                  "S2: " + area2 + " cm²\n" +
                  "Difference: " + difference + " cm² (" + percentDifference + "%)";

    alert(message);
}
