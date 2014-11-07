self.port.on("set-layout", function(pic) {
    $('body').append('<img id="pixel-on-pixel-layout" src="' + pic + '">');
    $('#pixel-on-pixel-layout').draggable({
        drag: function(){
            var offset = $(this).offset();
            var xPos = offset.left;
            var yPos = offset.top;
            self.port.emit("position", offset);
        }
    });
});
self.port.on("remove-layout", function() {
    $('#pixel-on-pixel-layout').remove();
});