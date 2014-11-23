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
var pageJS = [self.data.url("jquery-2.1.1.min.js"),
              self.data.url("jquery-ui.min.js"),
              self.data.url("page.js")];

var panel = require("sdk/panel").Panel({
    contentURL: self.data.url("panel.html"),
    contentScriptFile: [self.data.url("jquery-2.1.1.min.js"),
                        self.data.url("panel.js"),
                        self.data.url("img-worker.js")],
    position: button
});
var pageMod = require("sdk/page-mod").PageMod({
    include: ["*"],
    contentStyleFile: self.data.url("page-style.css")
});

function handleClick() {
    panel.show();

    if (!tabs.activeTab.worker) {
        
        attachJSToPage(tabs.activeTab);
        
        tabs.activeTab.on('ready', function(tab) {
            attachJSToPage(tab);
            if (tab.layoutActive) {
                setLayout(tab, tab.picURL);
            }
        });
    }
}

function attachJSToPage(tab) {
    var worker = tab.attach({
        contentScriptFile: pageJS
    });

    worker.port.on("position", function(xPos, yPos){
        panel.port.emit("position", xPos, yPos);
    });
    
    tab.worker = worker;
}

function setLayout(tab, pic) {
    var absURL = self.data.url(pic);
    var worker = tab.worker;
    worker.port.emit("set-layout", absURL);
    tab.layoutActive = true;
    tab.absPicURL = absURL;
    tab.picURL = pic;
}

panel.port.on("get-layout", function(pic) {
    setLayout(tabs.activeTab, pic)
});

panel.port.on("remove-layout", function() {
    var worker = tabs.activeTab.worker;
    worker.port.emit("remove-layout");
    tabs.activeTab.layoutActive = false;
});
