$('body').on('click', '.layout', function(){
    pic = $(this).children('img');
    if (!$(this).hasClass('checked')) {
        $(this).addClass('checked');
        self.port.emit('get-layout', pic.attr('src'));
    } else {
        self.port.emit('remove-layout');
        $(this).removeClass('checked');
    }
});