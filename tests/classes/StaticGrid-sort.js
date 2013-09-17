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
define([weswitClassPrefix+"StaticGrid","./HtmlTest","Inheritance","ASSERT","Helpers"],
    function(StaticGrid,HtmlTest,Inheritance,ASSERT,Helpers) {
   
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
       if (readData(nodes[i],"grid")=="test" && res.length > c) {
         c++;
         var txt = Helpers.trim(nodes[i].innerHTML);
         var row = readData(nodes[i],"row");
         ASSERT.verifyValue(c,row);
         ASSERT.verifyValue(txt,res[c-1]);
       } 
     }
     ASSERT.verifyValue(c,res.length);
  }
  
  var StaticGridTest = function() {
    this._callSuperConstructor(StaticGridTest);
  };
  
  StaticGridTest.getInstances = function() {
    return [new StaticGridTest()];
  };
  
  StaticGridTest.prototype = {
    toString: function() {
      return "[StaticGridTest-sort]";
    },
    
    start:function() {
      this._callSuperMethod(StaticGridTest,"start");
      
      this.write(
        '<div id="results">'+
          '<div data-grid="test" data-source="lightstreamer" data-row="1" data-field="f" ></div>'+
          '<div data-grid="test" data-source="lightstreamer" data-row="2" data-field="f" ></div>'+
          '<div data-grid="test" data-source="lightstreamer" data-row="3" data-field="f" ></div>'+
          '<div data-grid="test" data-source="lightstreamer" data-row="4" data-field="f" ></div>'+
          '<div data-grid="test" data-source="lightstreamer" data-row="5" data-field="f" ></div>'+
          '<div data-grid="test" data-source="lightstreamer" data-row="6" data-field="f" ></div>'+
          '<div data-grid="test" data-source="lightstreamer" data-row="7" data-field="f" ></div>'+
          '<div data-grid="test" data-source="lightstreamer" data-row="8" data-field="f" ></div>'+
          '<div data-grid="test" data-source="lightstreamer" data-row="9" data-field="f" ></div>'+
          '<div data-grid="test" data-source="lightstreamer" data-row="10" data-field="f" ></div>'+
        '</div>'    
      );
      
      var grid = new StaticGrid("test",true);
      
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
  
  Inheritance(StaticGridTest,HtmlTest);
  return StaticGridTest;
  
});


/*<!DOCTYPE html>
<html>
  <head>
    <script src="require.js"></script>
    <script src="library.js"></script>
  </head>
  <body>
  

  
  <div id="dup">
    <div data-grid="test" data-source="lightstreamer" data-row="1" data-field="f" ></div>
    <div data-grid="test" data-source="lightstreamer" data-row="2" data-field="f" ></div>
    <div data-grid="test" data-source="lightstreamer" data-row="3" data-field="f" ></div>
    <div data-grid="test" data-source="lightstreamer" data-row="4" data-field="f" ></div>
    <div data-grid="test" data-source="lightstreamer" data-row="6" data-field="f" ></div>
    <div data-grid="test" data-source="lightstreamer" data-row="7" data-field="f" ></div>
    <div data-grid="test" data-source="lightstreamer" data-row="8" data-field="f" ></div>
    <div data-grid="test" data-source="lightstreamer" data-row="8" data-field="f" ></div>
    <div data-grid="test" data-source="lightstreamer" data-row="10" data-field="f" ></div>
  </div>
    
    <script>
    
    
    
    
     require(["testLogger","grids/StaticGrid","debug/ASSERT","Utils"], 
          function(testLogger,StaticGrid,ASSERT,Utils) {
    
       
       
       
       
       
       
       grid.updateRow(3,{f:3});
       grid.updateRow(4,{f:4});
       grid.updateRow(1,{f:1});
       grid.updateRow(6,{f:6});
       
       grid.setSort("f",true); //false ascending -> 1,2,3
       
       checkSort([6,4,3,1]);
      
       grid.updateRow(2,{f:2});
       grid.updateRow(5,{f:5});
       grid.updateRow("a",{f:0});
       grid.updateRow(7,{f:7});
       
       checkSort([7,6,5,4,3,2,1,0]);
       
       grid.setSort("f",false);
       
       checkSort([0,1,2,3,4,5,6,7]);
       
       grid.updateRow("n1",{f:2.2});
       grid.updateRow("n2",{f:5.5});
       
       checkSort([0,1,2,2.2,3,4,5,5.5,6,7]);
       
       grid.setSort("f",true); 
       
       checkSort([7,6,5.5,5,4,3,2.2,2,1,0]);
       
       loadNextTest();
     
     
     });
     
     
    </script>
  </body>
</html>
  */ 