/*
  Copyright 2013 Weswit Srl

  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at

      http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
*/
define([weswitClassPrefix+"StatusWidget","AbstractTest","Inheritance","ASSERT"],
    function(StatusWidget,AbstractTest,Inheritance,ASSERT) {
   
  var testLogger = AbstractTest.testLogger;
  
  var StatusWidgetTest = function() {
    this._callSuperConstructor(StatusWidgetTest);
  };
  
  StatusWidgetTest.getInstances = function() {
    return [new StatusWidgetTest()];
  };
  
  StatusWidgetTest.prototype = {
    toString: function() {
      return "[StatusWidgetTest]";
    },
    
    start:function() {
      this._callSuperMethod(StatusWidgetTest,"start");
      
      var obj = {};
      obj.StatusWidget = StatusWidget;
      ASSERT.verifyException(obj,StatusWidget,["top"]);
      ASSERT.verifyException(obj,StatusWidget,[1]);
      ASSERT.verifyException(obj,StatusWidget,["left","", "a"]);
      ASSERT.verifyException(obj,StatusWidget,["left","", 6]);
      ASSERT.verifyException(obj,StatusWidget,["left","", null]);
      ASSERT.verifyException(obj,StatusWidget,["left", "10px", false, "open"]);
      ASSERT.verifyException(obj,StatusWidget,["left", "10px", false, 66]);


      var bl = new StatusWidget("left", "10px", false, "open"); //bottom left
      var tl = new StatusWidget("left", "10px", true, "closed"); //top left
      var br = new StatusWidget("right", "10px", false, "dyna"); //bottom right
      var tr = new StatusWidget("right", "10px", true, "dyna"); //top right
      var sw = new StatusWidget("no"); //floating
      ASSERT.verifySuccess(sw,"getDomNode",ASSERT.VOID,true,function(v1,v2) {
        v1.style.left = "400px";
        return true;
      });
      
      setTimeout(function() {
        if (tr.toggle) {
          //requires non-minified code
          that.toggle(bl);
          that.toggle(tl);
          that.toggle(br);
          that.toggle(tr);
          that.toggle(sw);
        }
      },3000);
      
      var that = this;
      
      setTimeout(function() {
        that.changeStatus(bl,1);
        that.changeStatus(tl,1);
        that.changeStatus(br,1);
        that.changeStatus(tr,1);
        that.changeStatus(sw,1);
      },1000);
      
      setTimeout(function() {
        that.changeStatus(bl,2);
        that.changeStatus(tl,2);
        that.changeStatus(br,2);
        that.changeStatus(tr,2);
        that.changeStatus(sw,2);
      },3500);
        
      setTimeout(function() {
        that.changeStatus(bl,3);
        that.changeStatus(tl,3);
        that.changeStatus(br,3);
        that.changeStatus(tr,3);
        that.changeStatus(sw,3);
      },4500);
      
      
      setTimeout(function() {
        that.removeWidget(bl);
        that.removeWidget(tl);
        that.removeWidget(br);
        that.removeWidget(tr);
        that.removeWidget(sw);
        that.end();
      },5000);
      
    },
    
    changeStatus: function(widget,flag) {
      var status = flag == 1 ? "CONNECTING" : (flag == 2 ? "CONNECTED:WS-STREAMING" :"STALLED");
      ASSERT.verifySuccess(widget,"onStatusChange",[status],ASSERT.VOID);
    },
    
    removeWidget: function(widget) {
      ASSERT.verifySuccess(widget,"getDomNode",ASSERT.VOID,true,function(v1,v2) {
        v1.parentNode.removeChild(v1);
        return true;
      });
    }, 
    
    toggle: function(widget) {
      ASSERT.verifySuccess(widget,"toggle",ASSERT.VOID,ASSERT.VOID);
    } 
  };
  
  Inheritance(StatusWidgetTest,AbstractTest);
  return StatusWidgetTest;
  
});