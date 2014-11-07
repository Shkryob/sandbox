function handleFileSelect(evt) {
    var files = evt.target.files; // FileList object
    // Loop through the FileList and render image files as thumbnails.
    for (var i = 0, f; f = files[i]; i++) {
        // Only process image files.
        if (!f.type.match('image.*')) {
          continue;
        }
        var reader = new FileReader();
        // Closure to capture the file information.
        reader.onload = (function(theFile) {
            return function(e) {
                // Render thumbnail.
                var span = document.createElement('div');
                span.className = 'layout';
                span.innerHTML = ['<div class="remove"></div><img src="', e.target.result,
                                  '" title="', escape(theFile.name), '"/>'].join('');
                document.getElementById('layouts-list').insertBefore(span, null);
                saveCurrentSession();
            };
        })(f);
        // Read in the image file as a data URL.
        reader.readAsDataURL(f);
    }
}

function loadLastSession() {
    if (localStorage["session"] != null) {
        var lastSession = JSON.parse(localStorage["session"]);    
        $("#layouts-list").html(lastSession);
    }
}
function saveCurrentSession() {
    localStorage["session"] = JSON.stringify($("#layouts-list").html());
}
function deleteLayout() {
    $('#layouts-list').on('click', '.remove', function() {
        $(this).parent().remove();
        localStorage.clear();
        saveCurrentSession();
    });
}

$(document).ready(function() {
    $('#files').on('change', handleFileSelect);

    loadLastSession();
    deleteLayout();
});