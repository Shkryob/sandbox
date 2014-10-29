self.port.on("to-page", function(pic) {
    console.log('?????');
    $('body').append('<img src="' + pic + '">');
});