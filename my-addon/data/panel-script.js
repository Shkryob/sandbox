var pic = $('.add-img');
$('button.click').on('click', function(){
    self.port.emit("from-panel", pic.attr('src'));
});
