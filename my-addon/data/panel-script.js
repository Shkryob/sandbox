    var pic = $('.add-img');
    console.log('!!!!!');
    $('button.click').on('click', function(){
        self.port.emit("from-panel", pic.attr('src'));
    });