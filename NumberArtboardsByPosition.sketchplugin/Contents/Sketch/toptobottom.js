var onRun = function(context) {
    // reference the sketch document
    var doc = context.document;
    var selection = context.selection;
    var numArtboard;

    // check if user selected something
    if (selection.count() == 0) {
        doc.showMessage("Please select artboards.");
    }

    // check if every layer selected is an Artboard
    var selectedArtboards = selection.every(function(layer){
        return layer.isMemberOfClass(MSArtboardGroup)
    });

    if (!selectedArtboards) {
        doc.showMessage("Only artboards allowed. Please only select artboards!");
    } else {
        var _selection = [];
        selection.forEach(function (artboard, i) {
            _selection.push(artboard);
        });
        _selection.sort(function(a, b) {
            var value = a.rect().origin.x - b.rect().origin.x;
            return value;
        });
        _selection.sort(function(a, b) {
            var value = a.rect().origin.y - b.rect().origin.y;
            return value;
        });
        numArtboard = _selection.length;
        // loop through the selected artboards
        for (var i = 0; i < numArtboard; i++) {
            // reference the selection
            var artboard = _selection[i];
            
            // remove last number from string
            var nameParts = artboard.name().split(" ");
            if( Number.isInteger(nameParts[nameParts.length-1] * 1) ) {
                nameParts.splice(nameParts.length-1, 1);
            }
            var artboardName = nameParts.join(" ");

            var newArtboardName = artboardName + " " + (i+1);
            artboard.setName(newArtboardName);
        }
    }
}
