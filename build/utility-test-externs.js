AbstractTest = function() {};
AbstractTest.prototype.start = function() {};
AbstractTest.prototype.end = function() {};
AbstractTest.testLogger = {}; 

ASSERT = {};
ASSERT.getFailures = function() {};
ASSERT.fail = function() {};
ASSERT.verifyNotOk = function() {};
ASSERT.verifyOk = function() {};
ASSERT.verifyDiffValue = function() {};
ASSERT.verifyNotNull = function() {};
ASSERT.verifyValue = function() {};
ASSERT.verifyException = function() {};
ASSERT.verifySuccess = function() {};
ASSERT.compareArrays = function() {}; 

TestRunner = function() {};
TestRunner.prototype.onTestCompleted = function() {};
TestRunner.prototype.start = function() {};
TestRunner.prototype.pushTest = function() {};
TestRunner.prototype.size = function() {};