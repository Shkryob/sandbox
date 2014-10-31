$('body').on('click', 'img', function(){
    pic = $(this);в
    self.port.emit("from-panel", pic.attr('src'));
});
