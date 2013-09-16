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
      return "[DynaGridTest-parse]";
    },
    
    start:function() {
      this._callSuperMethod(DynaGridTest,"start");
      
      testLogger.debug("1 extract schema");
      this.write(
          '<div data-source="lightstreamer" id="foo1">' +
            '<div data-source="lightstreamer" data-field="first"></div>' +
            '<div data-source="lightstreamer" data-field="third" data-fieldtype="first-level"></div>' +
            '<div data-source="lightstreamer" data-field="second"></div>' +
            '<div data-source="lightstreamer" data-field="second"></div>' +
          '</div>'
        );
      var grid = new DynaGrid("foo1");
      ASSERT.verifySuccess(grid,"parseHtml",ASSERT.VOID,ASSERT.VOID);
      this.verifyExtractions(grid,["first","second","third"],[]);
      
      
      testLogger.debug("2 extract schema + extra fields");
      this.write(
          '<div data-source="lightstreamer" id="foo2">' +
            '<div data-source="lightstreamer" data-field="first" data-fieldtype="extra"></div>'+
            '<div data-source="lightstreamer" data-field="second"></div>'+
            '<div data-source="lightstreamer" data-field="third" ></div>'+
          '</div>'
        );
      grid = new DynaGrid("foo2");
      ASSERT.verifySuccess(grid,"parseHtml",ASSERT.VOID,ASSERT.VOID);
      this.verifyExtractions(grid,["second","third"],[]);

      
      testLogger.debug("3 extract schema + sub fields");
      this.write(
          '<div data-source="lightstreamer" id="foo3">' +
            '<div data-source="lightstreamer" data-field="first" ></div>'+
            '<div data-source="lightstreamer" data-field="first" data-fieldtype="second-level"></div>'+
            '<div data-source="lightstreamer" data-field="second"></div>'+
            '<div data-source="lightstreamer" data-field="third" ></div>'+
          '</div>'
        );
      grid = new DynaGrid("foo3");
      ASSERT.verifySuccess(grid,"parseHtml",ASSERT.VOID,ASSERT.VOID);
      this.verifyExtractions(grid,["first","second","third"],["first"]);
      
      
      testLogger.debug("4 extract schema + extra and sub fields");
      this.write(
          '<div data-source="lightstreamer" id="foo4">' +
            '<div data-source="lightstreamer" data-field="first" ></div>' +
            '<div data-source="lightstreamer" data-field="first" data-fieldtype="second-level"></div>' +
            '<div data-source="lightstreamer" data-field="second" data-fieldtype="second-level"></div>' +
            '<div data-source="lightstreamer" data-field="first" ></div>' +
            '<div data-source="lightstreamer" data-field="first" data-fieldtype="extra"></div>' +
            '<div data-source="lightstreamer" data-field="second" data-fieldtype="extra"></div>' +
          '</div>'
        );
      grid = new DynaGrid("foo4");
      ASSERT.verifySuccess(grid,"parseHtml",ASSERT.VOID,ASSERT.VOID);
      this.verifyExtractions(grid,["first"],["first","second"]);
      
      
      testLogger.debug("5 extract nothing");
      this.write(
          '<div data-source="lightstreamer" id="foo5">' +
            '<div data-source="lightstreamer" data-field="first" data-fieldtype="extra"></div>' +
            '<div data-source="lightstreamer" data-field="first" data-fieldtype="extra"></div>' +
          '</div>'
        );
      grid = new DynaGrid("foo5");
      ASSERT.verifySuccess(grid,"parseHtml",ASSERT.VOID,ASSERT.VOID);
      this.verifyExtractions(grid,[],[]);
      
      
      testLogger.debug("6 parse fails (no cells)");
      this.write(
          '<div data-source="lightstreamer" id="foo6">' +
          '</div>'
        );
      grid = new DynaGrid("foo6");
      ASSERT.verifyException(grid,"parseHtml",ASSERT.VOID);
      ASSERT.verifyException(grid,"extractFieldList",ASSERT.VOID);
      ASSERT.verifyException(grid,"extractCommandSecondLevelFieldList",ASSERT.VOID);
     
      
      testLogger.debug("7 parse fails (no template)");
      grid = new DynaGrid("foo7");
      ASSERT.verifyException(grid,"parseHtml",ASSERT.VOID);
      
      
      testLogger.debug("8 parse custom types");
      this.write(
          '<div data-source="lightstreamer" id="foo8">' +
            '<code data-source="lightstreamer" data-field="first"></code>' +
            '<code data-source="lightstreamer" data-field="second">?</code>' +
            '<code data-source="lightstreamer" data-field="third"></code>' +
          '</div>'
        );
      grid = new DynaGrid("foo8");
      ASSERT.verifySuccess(grid,"setNodeTypes",[["code"]],ASSERT.VOID);
      ASSERT.verifySuccess(grid,"parseHtml",ASSERT.VOID,ASSERT.VOID);
      this.verifyExtraction(grid,"extractFieldList",["first","second","third"]);
      this.verifyExtraction(grid,"extractCommandSecondLevelFieldList",[]);


      testLogger.debug("9 parse fails (no source template)");
      this.write(
          '<div id="foo9">' +
            '<div data-source="lightstreamer" data-field="first"></div>' +
            '<div data-source="lightstreamer" data-field="second"></div>' +
            '<div data-source="lightstreamer" data-field="second"></div>' +
          '</div>'
        );
      grid = new DynaGrid("foo9");
      ASSERT.verifyException(grid,"parseHtml",ASSERT.VOID);
      ASSERT.verifyException(grid,"extractFieldList",ASSERT.VOID);
      ASSERT.verifyException(grid,"extractCommandSecondLevelFieldList",ASSERT.VOID);
      
      
      testLogger.debug("10 parse fails (no source fields)");
      this.write(
          '<div data-source="lightstreamer" id="foo10">' +
            '<div data-field="first" ></div>'+
            '<div data-field="second"></div>'+
            '<div data-field="third" ></div>'+
          '</div>'
        );
      grid = new DynaGrid("foo10");
      ASSERT.verifyException(grid,"parseHtml",ASSERT.VOID);
      ASSERT.verifyException(grid,"extractFieldList",ASSERT.VOID);
      ASSERT.verifyException(grid,"extractCommandSecondLevelFieldList",ASSERT.VOID);

      
      this.end();
    },
    
    verifyExtractions: function(grid,expectingFirst,expectingSecond) {
      this.verifyExtraction(grid,"extractFieldList",expectingFirst);
      this.verifyExtraction(grid,"extractCommandSecondLevelFieldList",expectingSecond);
    },
    verifyExtraction: function(grid,extractMethod,expecting) {
      var extracted = "not read";
      ASSERT.verifySuccess(grid,extractMethod,ASSERT.VOID,true,function(v1,v2) {
        extracted = v1;
        return true;
      });
      ASSERT.compareArrays(extracted,expecting);
    }
    
  };
  
  Inheritance(DynaGridTest,HtmlTest);
  return DynaGridTest;
  
});