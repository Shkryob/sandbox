self.port.on("to-page", function(pic) {
    $('body').append('<img src="' + pic + '">');
});
