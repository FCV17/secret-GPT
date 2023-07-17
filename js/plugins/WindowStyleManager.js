// Plugin Name: Window Style Manager
// Description: Customize the style of speech and system notification windows
// Author: FCV17
// Version: 0.1

// Define the plugin class
function WindowStyleManager() {
    // Plugin initialization code
}

// Modify the Window_Base class to change the window style
Window_Base.prototype.standardPadding = function() {
    return 18;
};

Window_Base.prototype.standardFontFace = function() {
    return $gameSystem.mainFontFace();
};

Window_Base.prototype.standardFontSize = function() {
    return $gameSystem.mainFontSize();
};

Window_Base.prototype.updateTone = function() {
    this.setTone(0, 0, 0);
};

Window_Base.prototype.updateBackgroundOpacity = function() {
    this.backgroundOpacity = 192;
};

// Create an instance of the plugin
var windowStyleManager = new WindowStyleManager();
