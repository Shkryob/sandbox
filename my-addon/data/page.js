self.port.on("to-page", function(pic) {
    alert('!!!!!');
    $('body').append('<img src="' + pic + '">');
});
