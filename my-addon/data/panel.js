$('body').on('click', '.layout', function(){
    pic = $(this).children('img');
    
    if (!$(this).hasClass('checked')) {
        $('.layout').removeClass('checked');
        self.port.emit('remove-layout');
        $(this).addClass('checked');
        self.port.emit('get-layout', pic.attr('src'));
    } else {
        self.port.emit('remove-layout');
        $(this).removeClass('checked');
    }
});
self.port.on("position", function(offset) {
   console.log(offset);
});