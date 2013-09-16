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
define([weswitClassPrefix+"DynaGrid","./HtmlTest","Inheritance","ASSERT"],
    function(DynaGrid,HtmlTest,Inheritance,ASSERT) {
   
  var testLogger = HtmlTest.testLogger;
  
  var DynaGridTest = function() {
    this._callSuperConstructor(DynaGridTest);
  };
  
  DynaGridTest.getInstances = function() {
    return [new DynaGridTest()];
  };
  
  DynaGridTest.prototype = {
    toString: function() {
      return "[DynaGridTest-scroll]";
    },
    
    start:function() {
      this._callSuperMethod(DynaGridTest,"start");
      this.write(
          '<div id="foo1container">' +
            '<div data-source="lightstreamer" id="foo1">' +
              '<div data-source="lightstreamer" data-field="first"></div>' +
              '<div data-source="lightstreamer" data-field="second"></div>' +
              '<div data-source="lightstreamer" data-field="third"></div>' +
            '</div>' +
         '</div>'
      );
      
      
      var grid = new DynaGrid("foo1");
      ASSERT.verifySuccess(grid,"parseHtml",ASSERT.VOID,ASSERT.VOID);
      var src = grid.autoScrollType;
      
      
      testLogger.debug("setAutoScroll OFF");
      ASSERT.verifySuccess(grid,"setAutoScroll",["OFF"],ASSERT.VOID);
      if (src) {
        ASSERT.verifyValue(grid.autoScrollType,"OFF");
      }
      
      testLogger.debug("setAutoScroll ELEMENT");
      ASSERT.verifySuccess(grid,"setAutoScroll",["ELEMENT","foo1container"],ASSERT.VOID);
      if (src) {
        ASSERT.verifyValue(grid.autoScrollType,"ELEMENT");
        ASSERT.verifyValue(grid.autoScrollElement, document.getElementById("foo1container"), true);
      }
      
      testLogger.debug("setAutoScroll wrong ELEMENT");
      ASSERT.verifySuccess(grid,"setAutoScroll",["ELEMENT","false1container"],ASSERT.VOID); //does not throw any exception
      if (src) {
        ASSERT.verifyValue(grid.autoScrollType,"OFF");
      }

      testLogger.debug("setAutoScroll PAGE");
      ASSERT.verifySuccess(grid,"setAutoScroll",["PAGE"],ASSERT.VOID);
      if (src) {
        ASSERT.verifyValue(grid.autoScrollType,"PAGE");
      }
      
      
      this.end();
    }
  };
  
  Inheritance(DynaGridTest,HtmlTest);
  return DynaGridTest;
  
});             