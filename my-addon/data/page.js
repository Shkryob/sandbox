self.port.on("set-layout", function(pic) {
    $('body').append('<img id="pixie-layout" src="' + pic + '">');
});
self.port.on("remove-layout1", function() {
    $('#pixie-layout').remove();
});