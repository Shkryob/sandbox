$('body').on('click', 'img', function(){
    pic = $(this);
    self.port.emit("from-panel", pic.attr('src'));
});
