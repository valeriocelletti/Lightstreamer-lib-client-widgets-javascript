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
define([weswitClassPrefix+"DynaGrid","./HtmlTest","weswit/Inheritance","weswit/ASSERT"],
    function(DynaGrid,HtmlTest,Inheritance,ASSERT) {
   
  var testLogger = HtmlTest.testLogger;
  
  var UPDATES = [{first:1,second:"a",third:"-"}, 
                 {first:2,second:"f",third:"-"}, //(if sorted) when added is second but the scrollbar can't go down enough
                 {first:3,second:"e",third:"-"}, //(if sorted) when added is second
                 {first:4,second:"c",third:"-"}, //(if sorted) when added is second
                 {first:5,second:"d",third:"-"},
                 {first:6,second:"b",third:"-"}  //(if sorted) when added is second
                 ];
  
  
  
  var DynaGridTest = function(updateIsKey,onTop,moveIt) {
    this._callSuperConstructor(DynaGridTest);
    
    this.updateIsKey = updateIsKey;
    this.onTop = onTop; //does not matter if !updateIsKey
    this.moveIt = moveIt; //after placing the update with this index we move the scrollbar
  };
  
  var ON_TOP = true;
  var ON_BOTTOM = false;
  var ON_ORDER = null;
  var DONT_MOVE = null;
  var UPDATE_IS_KEY = true;
  var KEY_IS_KEY = false;
  
  
  DynaGridTest.getInstances = function() {

    return [new DynaGridTest(UPDATE_IS_KEY,ON_BOTTOM,DONT_MOVE),
            new DynaGridTest(UPDATE_IS_KEY,ON_BOTTOM,4),
            
            new DynaGridTest(UPDATE_IS_KEY,ON_TOP,DONT_MOVE),
            new DynaGridTest(UPDATE_IS_KEY,ON_TOP,4),
            
            new DynaGridTest(KEY_IS_KEY,ON_ORDER,DONT_MOVE),
            new DynaGridTest(KEY_IS_KEY,ON_ORDER,4)];
  };
  
  DynaGridTest.prototype = {
    toString: function() {
      return "[DynaGridTest-scroll]";
    },
    
    start:function() {
      this._callSuperMethod(DynaGridTest,"start");
      this.write(
          '<div id="foo1container" style="overflow:auto;height:144px;padding:20px;border:20px;margin:20px">' +
            '<div style="padding:20px;border:20px;margin:20px">' +
              '<div data-source="lightstreamer" id="foo1" style="padding:2px;border:20px;margin:20px">' +
                '<div data-source="lightstreamer" data-field="first"></div>' +
                '<div data-source="lightstreamer" data-field="second"></div>' +
                '<div data-source="lightstreamer" data-field="third"></div>' +
              '</div>' +
            '</div>' +
         '</div>'
      );
      
      //first let's test that the setter works
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
      
      
      //then let's scroll
      ASSERT.verifySuccess(grid,"setAutoScroll",["ELEMENT","foo1container"],ASSERT.VOID);
      if (this.updateIsKey) {
        ASSERT.verifySuccess(grid,"forceSubscriptionInterpretation",["UPDATE_IS_KEY"],ASSERT.VOID);
        ASSERT.verifySuccess(grid,"setAddOnTop",[this.onTop],ASSERT.VOID);
        
      } else {
        ASSERT.verifySuccess(grid,"setSort",["second", false, false, false],ASSERT.VOID);
        
      }
      
      
      var el = document.getElementById("foo1container");
      
      for (var i=0; i<UPDATES.length; i++) {
        var k = i+1;
        testLogger.debug("Testing movement " +k);
        ASSERT.verifySuccess(grid,"updateRow",[k,UPDATES[i]],ASSERT.VOID);
        
        if (i == this.moveIt) {
          var moveTo = this.onTop ? el.scrollHeight : 0;
          
          testLogger.debug("Manually move scrollbar to " +moveTo);
          el.scrollTop = moveTo;
          this.movedTo = el.scrollTop;
        }
        
        var expectedPosition = null;
        
        if (this.updateIsKey) {
          if (this.moveIt !== null && i >= this.moveIt) {
            expectedPosition = this.movedTo;
          } else if (this.onTop) {
            expectedPosition = 0;
          } else {
            expectedPosition = el.scrollHeight-el.clientHeight;
          }
          
        } else {
          if (i === this.moveIt) {
            expectedPosition = this.movedTo;
          } else {
            expectedPosition = el.scrollTop; //calculate this here?
          }
        }
        
        
        testLogger.debug("Verifiyng position " + el.scrollTop + " expecting " + expectedPosition);
        ASSERT.verifyValue(el.scrollTop,expectedPosition,function(v1,v2) {
          return Math.abs(v1-v2) <= 1;
        });
        
      }

      this.end();
    }
  };
  
  Inheritance(DynaGridTest,HtmlTest);
  return DynaGridTest;
  
});             