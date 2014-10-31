var tabs = require("sdk/tabs");
var self = require("sdk/self");
var button = require("sdk/ui/button/action").ActionButton({
    id: "show-panel",
    label: "Show Panel",
    icon: {
        "16": "./icon-16.png",
        "32": "./icon-32.png",
        "64": "./icon-64.png"
    },
    onClick: handleClick
});

var panel = require("sdk/panel").Panel({
    contentURL: self.data.url("panel.html"),
    contentScriptFile: [self.data.url("jquery-2.1.1.min.js"), self.data.url("panel.js"), self.data.url("img-worker.js")],
    position: button
});
function handleClick() {
    panel.show();
}
tabs.on("ready", function() {
    var worker = tabs.activeTab.attach({
        contentScriptFile: [self.data.url("jquery-2.1.1.min.js"), self.data.url("page.js")]
    });
    panel.port.on("from-panel", function(pic) {
        var abs_url = self.data.url(pic);
        worker.port.emit("to-page", abs_url);
    });
});