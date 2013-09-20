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
define([weswitClassPrefix+"StaticGrid","./HtmlTest","weswit/Inheritance","weswit/ASSERT"],
    function(StaticGrid,HtmlTest,Inheritance,ASSERT) {
  
  var testLogger = HtmlTest.testLogger;
  
  function countList(list) {
    var count = 0;
    for (var i in list) {
      for (var x in list[i]) {
        count++;
      }
    }
    return count;
  }
  function checkInternalMatrix(obtained, list) {
    if (countList(list) != countList(obtained)) {
      testLogger.logError("DIFFERENT NUMBER OF ELEMENTS!");
      return false;
    }
    
    for (var i in list) {
      
      if (!obtained[i]) {
        testLogger.logError("row ",i," not found!");
        return false;
      }
      
      for (var x in list[i]) {
        if (!obtained[i][x]) {
          testLogger.logError("row ",i," col ",x," not found!");
          return false;
        } else {
          
          if (obtained[i][x].isCell) {
            if (list[i][x] !== true) {
              testLogger.logError("Less cells than expercted @ ",i," ",x);
              return false;
            }
            
          } else {
            if (obtained[i][x].length == 1) {
              if (list[i][x] !== true) {
                testLogger.logError("Different number of cells than expercted @ ",i," ",x);
                return false;
              }

            } else {
              if (obtained[i][x].length !== list[i][x]) {
                testLogger.logError("More cells than expercted @ ",i," ",x);
                return false;
              }
            }
          }
          
        }
      }
    }
    
    return true;
  };
   
 
  
  var StaticGridTest = function() {
    this._callSuperConstructor(StaticGridTest);
  };
  
  StaticGridTest.getInstances = function() {
    return [new StaticGridTest()];
  };
  
  StaticGridTest.prototype = {
    toString: function() {
      return "[StaticGridTest-parse]";
    },
    
    start:function() {
      this._callSuperMethod(StaticGridTest,"start");
      
      
      testLogger.debug("1 extract schema + group");
      this.write(
          '<div data-source="lightstreamer" data-grid="foo1" data-item="item1" data-field="first" ></div>'+
          '<div data-source="lightstreamer" data-grid="foo1" data-item="item1" data-field="second" data-fieldtype="first-level"></div>'+
          '<div data-source="lightstreamer" data-grid="foo1" data-item="item1" data-field="second"></div>'+
          
          '<div data-source="lightstreamer" data-grid="foo1" data-item="item2" data-field="first" ></div>'+
          '<div data-source="lightstreamer" data-grid="foo1" data-item="item2" data-field="third" ></div>'+
          '<div data-source="lightstreamer" data-grid="foo1" data-item="item2" data-field="second"></div>'
      );
      var grid = new StaticGrid("foo1");
      ASSERT.verifySuccess(grid,"parseHtml",ASSERT.VOID,ASSERT.VOID);
      this.verifyExtractions(grid,["first","second","third"],[],["item1","item2"]);
      this.verifyInternals(grid,{
        item1: {
          first: true,
          second: 2,
        },
        
        item2: {
          first: true,
          second: true,
          third: true
        }
      });
      
      
      testLogger.debug("2 extract schema + extra fields + group");
      this.write(
          '<div data-source="lightstreamer" data-grid="foo2" data-item="item1" data-field="first" ></div>'+
          '<div data-source="lightstreamer" data-grid="foo2" data-item="item1" data-field="first" data-fieldtype="extra"></div>'+
          '<div data-source="lightstreamer" data-grid="foo2" data-item="item1" data-field="second"></div>'+
          
          '<div data-source="lightstreamer" data-grid="foo2" data-item="item2" data-field="first" ></div>'+
          '<div data-source="lightstreamer" data-grid="foo2" data-item="item2" data-field="third" ></div>'+
          '<div data-source="lightstreamer" data-grid="foo2" data-item="item2" data-field="second"></div>'
      );
      grid = new StaticGrid("foo2");
      ASSERT.verifySuccess(grid,"parseHtml",ASSERT.VOID,ASSERT.VOID);
      this.verifyExtractions(grid,["first","second","third"],[],["item1","item2"]);
      this.verifyInternals(grid,{
        item1: {
          first: 2,
          second: true,
        },
        
        item2: {
          first: true,
          second: true,
          third: true
        }
      });
   
      testLogger.debug("3 extract schema + sub fields + group");
      this.write(
          '<div data-source="lightstreamer" data-grid="foo3" data-item="item1" data-field="first" ></div>'+
          '<div data-source="lightstreamer" data-grid="foo3" data-item="item1" data-field="first" data-fieldtype="second-level"></div>'+
          '<div data-source="lightstreamer" data-grid="foo3" data-item="item1" data-field="first" data-fieldtype="second-level"></div>'+
          '<div data-source="lightstreamer" data-grid="foo3" data-item="item1" data-field="second"></div>'+
          
          '<div data-source="lightstreamer" data-grid="foo3" data-item="item2" data-field="first" ></div>'+
          '<div data-source="lightstreamer" data-grid="foo3" data-item="item2" data-field="third" ></div>'+
          '<div data-source="lightstreamer" data-grid="foo3" data-item="item2" data-field="second"></div>'
      );
      grid = new StaticGrid("foo3");
      ASSERT.verifySuccess(grid,"parseHtml",ASSERT.VOID,ASSERT.VOID);
      this.verifyExtractions(grid,["first","second","third"],["first"],["item1","item2"]);
      this.verifyInternals(grid,{
        item1: {
          first: 3,
          second: true,
        },
        
        item2: {
          first: true,
          second: true,
          third: true
        }
      });

      testLogger.debug("4 extract schema + extra + sub fields + group");
      this.write(
          '<div data-source="lightstreamer" data-grid="foo4" data-item="item1" data-field="first" ></div>'+
          '<div data-source="lightstreamer" data-grid="foo4" data-item="item3" data-field="first" data-fieldtype="second-level"></div>'+
          '<div data-source="lightstreamer" data-grid="foo4" data-item="item1" data-field="second" data-fieldtype="second-level"></div>'+
          
          '<div data-source="lightstreamer" data-grid="foo4" data-item="item2" data-field="first" ></div>'+
          '<div data-source="lightstreamer" data-grid="foo4" data-item="item3" data-field="first" data-fieldtype="extra"></div>'+
          '<div data-source="lightstreamer" data-grid="foo4" data-item="item2" data-field="second" data-fieldtype="extra"></div>'
      );
      grid = new StaticGrid("foo4");
      ASSERT.verifySuccess(grid,"parseHtml",ASSERT.VOID,ASSERT.VOID);
      this.verifyExtractions(grid,["first"],["first","second"],["item1","item2","item3"]);
      this.verifyInternals(grid,{
        item1: {
          first: true,
          second: true,
        },
        
        item2: {
          first: true,
          second: true,
        },
        
        item3: {
          first: 2
        }
      });
      
      
      testLogger.debug("5 extract no fields");
      this.write(
            '<div data-source="lightstreamer" data-grid="foo5" data-item="item1" data-field="first" data-fieldtype="extra"></div>' +
            '<div data-source="lightstreamer" data-grid="foo5" data-item="item2" data-field="first" data-fieldtype="extra"></div>' 
      );
      
      grid = new StaticGrid("foo5");
      ASSERT.verifySuccess(grid,"parseHtml",ASSERT.VOID,ASSERT.VOID);
      this.verifyExtractions(grid,[],[],["item1","item2"]);
      this.verifyInternals(grid,{
        item1: {
          first: true,
        },
        item2: {
          first: true,
        },
      });
      
      
      testLogger.debug("6 parse fails (no cells)");
      this.write(
          '<div data-source="lightstreamer" data-grid="foo6" data-item="item1"></div>'
      );
      grid = new StaticGrid("foo6");
      ASSERT.verifyException(grid,"parseHtml",ASSERT.VOID);
      this.verifyExtractions(grid,[],[],[]);
      
      
      testLogger.debug("7 parse custom types");
      this.write(
          '<code data-source="lightstreamer" data-grid="foo7" data-item="item1" data-field="first" ></code>'+
          '<code data-source="lightstreamer" data-grid="foo7" data-item="item1" data-field="third" data-fieldtype="first-level"></code>'+
          '<code data-source="lightstreamer" data-grid="foo7" data-item="item1" data-field="second"></code>'+
          
          '<code data-source="lightstreamer" data-grid="foo7" data-item="item2" data-field="first" ></code>'+
          '<code data-source="lightstreamer" data-grid="foo7" data-item="item2" data-field="third" ></code>'+
          '<code data-source="lightstreamer" data-grid="foo7" data-item="item2" data-field="second"></code>'
      );
      grid = new StaticGrid("foo7");
      ASSERT.verifySuccess(grid,"setNodeTypes",[["code"]],ASSERT.VOID);
      ASSERT.verifySuccess(grid,"parseHtml",ASSERT.VOID,ASSERT.VOID);
      this.verifyExtractions(grid,["first","second","third"],[],["item1","item2"]);
      this.verifyInternals(grid,{
        item1: {
          first: true,
          second: true,
          third: true
        },
        
        item2: {
          first: true,
          second: true,
          third: true
        },
      });
      
      testLogger.debug("8 parse fails (no source fields)");
      this.write(
          '<div data-grid="foo8" data-item="item1" data-field="first" ></div>'+
          '<div data-grid="foo8" data-item="item1" data-field="third" data-fieldtype="first-level"></div>'+
          '<div data-grid="foo8" data-item="item1" data-field="second"></div>'+
          
          '<div data-grid="foo8" data-item="item2" data-field="first" ></div>'+
          '<div data-grid="foo8" data-item="item2" data-field="third" ></div>'+
          '<div data-grid="foo8" data-item="item2" data-field="second"></div>'
        );
      grid = new StaticGrid("foo8");
      ASSERT.verifyException(grid,"parseHtml",ASSERT.VOID);
      this.verifyExtractions(grid,[],[],[]);
      this.verifyInternals(grid,{});
      
      
      testLogger.debug("9 row-based parse");
      this.write(
          '<div data-source="lightstreamer" data-grid="foo9" data-row="1" data-field="first" ></div>'+
          '<div data-source="lightstreamer" data-grid="foo9" data-row="1" data-field="second"></div>'+
          
          '<div data-source="lightstreamer" data-grid="foo9" data-row="2" data-field="first" ></div>'+
          '<div data-source="lightstreamer" data-grid="foo9" data-row="2" data-field="second"></div>'
        );
      grid = new StaticGrid("foo9");
      ASSERT.verifySuccess(grid,"parseHtml",ASSERT.VOID,ASSERT.VOID);
      this.verifyExtractions(grid,["first","second"],[],false);
      this.verifyInternals(grid,{
        1: {
          first: true,
          second: true
        },
        
        2: {
          first: true,
          second: true
        }
      });


      this.end();
    },
    
    verifyExtractions: function(grid,expectingFirst,expectingSecond,expectingItems) {
      this.verifyExtraction(grid,"extractFieldList",expectingFirst);
      this.verifyExtraction(grid,"extractCommandSecondLevelFieldList",expectingSecond);
      if (expectingItems === false) {
        ASSERT.verifyException(grid,"extractItemList",ASSERT.VOID);
      } else {
        this.verifyExtraction(grid,"extractItemList",expectingItems);
      }
      
    },
    verifyExtraction: function(grid,extractMethod,expecting) {
      var extracted = "not read";
      ASSERT.verifySuccess(grid,extractMethod,ASSERT.VOID,true,function(v1,v2) {
        extracted = v1;
        return true;
      });
      ASSERT.compareArrays(extracted,expecting);
    },
    verifyInternals: function(grid,expected) {
      //code that follows require non-minified code
      if (!grid.quickSort) {
        return;
      }
      
      ASSERT.verifyValue(grid.grid.getEntireMatrix(),expected,checkInternalMatrix);
    }
  };
  
  Inheritance(StaticGridTest,HtmlTest);
  return StaticGridTest;
  
});