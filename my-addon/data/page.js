self.port.on("set-layout", function(pic) {
    $('body').append('<img id="pixel-on-pixel-layout" src="' + pic + '">');
    
    $(document).keydown(function(e) {
    switch (e.which) {
        case 37:
            $('#pixel-on-pixel-layout').stop().css({
                left: '-=1'
            }); //left arrow key
            break;
        case 38:
            $('#pixel-on-pixel-layout').stop().css({
                top: '-=1'
            }); //up arrow key
            break;
        case 39:
            $('#pixel-on-pixel-layout').stop().css({
                left: '+=1'
            }); //right arrow key
            break;
        case 40:
            $('#pixel-on-pixel-layout').stop().css({
                top: '+=1'
            }); //bottom arrow key
            break;
        }
    });
    $('#pixel-on-pixel-layout').draggable({
        drag: function(){
            offset = $(this).offset();
            xPos = offset.left;
            yPos = offset.top;
            self.port.emit("position", xPos, yPos);
        }
    });
});

self.port.on("remove-layout", function() {
    $('#pixel-on-pixel-layout').remove();
});