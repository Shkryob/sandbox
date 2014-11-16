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
var pageMod = require("sdk/page-mod").PageMod({
    include: ["*"],
    contentStyleFile: self.data.url("page-style.css")
});

var worker;

function handleClick() {
    panel.show();
    worker = tabs.activeTab.attach({
        contentScriptFile: [self.data.url("jquery-2.1.1.min.js"), self.data.url("jquery-ui.min.js"), self.data.url("page.js")]
    });
    worker.port.on("position", function(xPos, yPos){
        panel.port.emit("position", xPos, yPos);
    });
}
panel.port.on("get-layout", function(pic) {;
    var abs_url = self.data.url(pic);
    worker.port.emit("set-layout", abs_url);
});
panel.port.on("remove-layout", function() {
    worker.port.emit("remove-layout");
});
