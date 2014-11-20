self.port.on("set-layout", function(pic) {
    $('body').append('<img id="pixel-on-pixel-layout" src="' + pic + '">');
    layout = $('#pixel-on-pixel-layout');

    layout.draggable({
        drag: function(){
            offset = layout.offset();
            xPos = offset.left;
            yPos = offset.top;
            self.port.emit("position", xPos, yPos);
        }
    });
});

self.port.on("remove-layout", function() {
    $('#pixel-on-pixel-layout').remove();
});

$(document).on('keydown', function(e) {
    switch (e.which) {
        case 37:
            layout.stop().css({
                left: '-=1'
            }); //left arrow key
        break;
        case 38:
            layout.stop().css({
                top: '-=1'
            }); //up arrow key
        break;
        case 39:
            layout.stop().css({
                left: '+=1'
            }); //right arrow key
        break;
        case 40:
            layout.stop().css({
                top: '+=1'
            }); //bottom arrow key
        break;
    }
    offset = layout.offset();
    xPos = offset.left;
    yPos = offset.top;
    self.port.emit("position", xPos, yPos);
    console.log("position", xPos, yPos);
});