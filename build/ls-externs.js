LightstreamerClient = function() {};
LightstreamerClient.prototype.getStatus = function() {};

Subscription = function() {};
Subscription.prototype.isSubscribed = function() {};
Subscription.prototype.getKeyPosition = function() {};
Subscription.prototype.getCommandPosition = function() {};
Subscription.prototype.getMode = function() {};
Subscription.prototype.getFields = function() {};

ItemUpdate = function() {};
ItemUpdate.prototype.forEachChangedField = function() {};
ItemUpdate.prototype.forEachField = function() {};
ItemUpdate.prototype.getItemName = function() {};
ItemUpdate.prototype.getItemPos = function() {};
ItemUpdate.prototype.getValue = function() {};
ItemUpdate.prototype.isSnapshot = function() {};
ItemUpdate.prototype.isValueChanged = function() {};