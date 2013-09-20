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
define([weswitClassPrefix+"DynaGrid","./HtmlTest","weswit/Inheritance","weswit/ASSERT","weswit/Helpers"],
    function(DynaGrid,HtmlTest,Inheritance,ASSERT,Helpers) {
   
  var testLogger = HtmlTest.testLogger;
  
  function readData(el,name) {
    if (el.dataset) {
      return el.dataset[name];
    } else if (el.getAttribute) {
      return el.getAttribute("data-"+name);
    } else {
      return null;
    }
  }
  
  
  function checkSort(res) {
     var nodes = document.getElementById("results").childNodes;
     var c = 0;
     for (var i = 0; i < nodes.length; i++) {
       if (nodes[i].id != "foo1" && res.length > c) {
         var subNodes = nodes[i].childNodes;
         for (var x = 0; x < subNodes.length; x++) {
           if(readData(subNodes[x],"source") == "lightstreamer") {
             var txt = Helpers.trim(subNodes[x].innerHTML);
             ASSERT.verifyValue(txt,res[c]);
             c++;
           }
         }
       }
     }
     ASSERT.verifyValue(c,res.length);
  }
  
  
  
  var DynaGridTest = function() {
    this._callSuperConstructor(DynaGridTest);
  };
  
  DynaGridTest.getInstances = function() {
    return [new DynaGridTest()];
  };
  
  DynaGridTest.prototype = {
    toString: function() {
      return "[DynaGridTest-sort]";
    },
    
    start:function() {
      this._callSuperMethod(DynaGridTest,"start");
      this.write(
        '<div id="results">' +
          '<div data-source="lightstreamer" id="foo1">' +
            '<div data-source="lightstreamer" data-field="f" ></div>' +
          '</div>' +
        '</div>' 
      );
      
      var grid = new DynaGrid("foo1",true);
      ASSERT.verifySuccess(grid,"updateRow",[3,{f:3}],ASSERT.VOID);
      ASSERT.verifySuccess(grid,"updateRow",[4,{f:4}],ASSERT.VOID);
      ASSERT.verifySuccess(grid,"updateRow",[1,{f:1}],ASSERT.VOID);
      ASSERT.verifySuccess(grid,"updateRow",[6,{f:6}],ASSERT.VOID);
 
      
      ASSERT.verifySuccess(grid,"setSort",["f",true],ASSERT.VOID); //false ascending -> 1,2,3
      
      checkSort([6,4,3,1]);
      
      ASSERT.verifySuccess(grid,"updateRow",[2,{f:2}],ASSERT.VOID);
      ASSERT.verifySuccess(grid,"updateRow",[5,{f:5}],ASSERT.VOID);
      ASSERT.verifySuccess(grid,"updateRow",["a",{f:0}],ASSERT.VOID);
      ASSERT.verifySuccess(grid,"updateRow",[7,{f:7}],ASSERT.VOID);
      
      checkSort([7,6,5,4,3,2,1,0]);
      
      ASSERT.verifySuccess(grid,"setSort",["f",false],ASSERT.VOID); 
      
      checkSort([0,1,2,3,4,5,6,7]);
      
      ASSERT.verifySuccess(grid,"updateRow",["n1",{f:2.2}],ASSERT.VOID);
      ASSERT.verifySuccess(grid,"updateRow",["n2",{f:5.5}],ASSERT.VOID);
      
      checkSort([0,1,2,2.2,3,4,5,5.5,6,7]);
    
      ASSERT.verifySuccess(grid,"setSort",["f",true],ASSERT.VOID); 
      
      checkSort([7,6,5.5,5,4,3,2.2,2,1,0]);
      
      this.end();
    }
  };
  
  Inheritance(DynaGridTest,HtmlTest);
  return DynaGridTest;
  
});