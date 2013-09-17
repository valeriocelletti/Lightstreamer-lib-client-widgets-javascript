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
define([weswitClassPrefix+"DynaGrid",weswitClassPrefix+"StaticGrid","AbstractTest","Inheritance","ASSERT"],
    function(DynaGrid,StaticGrid,AbstractTest,Inheritance,ASSERT) {
   
  var testLogger = AbstractTest.testLogger;
  var VOID = ASSERT.VOID;
  
  var GridsTest = function() {
    this._callSuperConstructor(GridsTest);
  };
  
  GridsTest.getInstances = function() {
    return [new GridsTest()];
  };
  
  GridsTest.prototype = {
    toString: function() {
      return "[Grids-get-set]";
    },
    
    start:function() {
      this._callSuperMethod(GridsTest,"start");
       
      testLogger.debug("Run tests on DynaGrid");
      var grid = new DynaGrid("foo");
      this.runAbstractWidgetTests(grid); 
      this.runAbstractGridTests(grid);
      this.runDynaGridTests(grid);
      
      testLogger.debug("Run tests on StaticGrid");
      grid = new StaticGrid("foo");
      this.runAbstractWidgetTests(grid);
      this.runAbstractGridTests(grid);
      this.runStaticGridTests(grid);

      this.end();
    },
    
    runAbstractWidgetTests: function(grid) {
      //setAutoCleanBehavior
      //getValue
      //updateRow
      //removeRow
      //clean
      //parseHtml
    },
    
    runAbstractGridTests: function(grid) {
      //setHtmlInterpretationEnabled - isHtmlInterpretationEnabled   
      testLogger.debug("Check PushedHtmlEnabled default");
      ASSERT.verifySuccess(grid,"isHtmlInterpretationEnabled",VOID,false);
      
      testLogger.debug("Check PushedHtmlEnabled true");
      ASSERT.verifySuccess(grid,"setHtmlInterpretationEnabled",[true],VOID);
      ASSERT.verifySuccess(grid,"isHtmlInterpretationEnabled",VOID,true);
      
      testLogger.debug("Check PushedHtmlEnabled false");
      ASSERT.verifySuccess(grid,"setHtmlInterpretationEnabled",[false],VOID);
      ASSERT.verifySuccess(grid,"isHtmlInterpretationEnabled",VOID,false);
      
      testLogger.debug("Check PushedHtmlEnabled null");
      ASSERT.verifyException(grid,"setHtmlInterpretationEnabled",[null]);
      
      //setAddOnTop - isAddOnTop
      testLogger.debug("Check isAddOnTop default");
      ASSERT.verifySuccess(grid,"isAddOnTop",VOID,false);
      
      testLogger.debug("Check isAddOnTop true");
      ASSERT.verifySuccess(grid,"setAddOnTop",[true],VOID);
      ASSERT.verifySuccess(grid,"isAddOnTop",VOID,true);

      testLogger.debug("Check isAddOnTop false");
      ASSERT.verifySuccess(grid,"setAddOnTop",[false],VOID);
      ASSERT.verifySuccess(grid,"isAddOnTop",VOID,false);

      testLogger.debug("Check isAddOnTop null");
      ASSERT.verifyException(grid,"setAddOnTop",[null]);

      //setSort - getSortField - isDescendingSort - isNumericSort - isCommaAsDecimalSeparator
      testLogger.debug("Check sort default");
      ASSERT.verifySuccess(grid,"getSortField",VOID,null);
      ASSERT.verifySuccess(grid,"isDescendingSort",VOID,null);
      ASSERT.verifySuccess(grid,"isNumericSort",VOID,null);
      ASSERT.verifySuccess(grid,"isCommaAsDecimalSeparator",VOID,null);
    
      testLogger.debug("Check sort FOO true false");
      ASSERT.verifySuccess(grid,"setSort",["FOO",true, false],VOID);
      ASSERT.verifySuccess(grid,"getSortField",VOID, "FOO");
      ASSERT.verifySuccess(grid,"isDescendingSort",VOID,true);
      ASSERT.verifySuccess(grid,"isNumericSort",VOID,false);
      ASSERT.verifySuccess(grid,"isCommaAsDecimalSeparator",VOID,null);
      
      testLogger.debug("Check sort 6 false true true");
      ASSERT.verifySuccess(grid,"setSort",[6,false, true, true],VOID);
      ASSERT.verifySuccess(grid,"getSortField",VOID, 6);
      ASSERT.verifySuccess(grid,"isDescendingSort",VOID,false);
      ASSERT.verifySuccess(grid,"isNumericSort",VOID,true);
      ASSERT.verifySuccess(grid,"isCommaAsDecimalSeparator",VOID,true);
     
      testLogger.debug("Check sort null");
      ASSERT.verifySuccess(grid,"setSort",[null],VOID);
      ASSERT.verifySuccess(grid,"getSortField",VOID,null);
      ASSERT.verifySuccess(grid,"isDescendingSort",VOID,null);
      ASSERT.verifySuccess(grid,"isNumericSort",VOID,null);
      ASSERT.verifySuccess(grid,"isCommaAsDecimalSeparator",VOID,null);
     
      testLogger.debug("Check sort wrong");
      ASSERT.verifyException(grid,"setSort",["FOO","BAR","BAR","BAR"]);
    
      //setNodeTypes - getNodeTypes
      //extractFieldList
      //extractCommandSecondLevelFieldList
      //forceSubscriptionInterpretation
    },
    
    runDynaGridTests: function(grid) {
      //setMaxDynaRows - getMaxDynaRows
      testLogger.debug("Check getMaxDynaRows default");
      ASSERT.verifySuccess(grid,"getMaxDynaRows",VOID,"unlimited");
      
      testLogger.debug("Check getMaxDynaRows 3");
      ASSERT.verifySuccess(grid,"setMaxDynaRows",[3],VOID);
      ASSERT.verifySuccess(grid,"getMaxDynaRows",VOID,3);
      
      testLogger.debug("Check getMaxDynaRows unlimited");
      ASSERT.verifySuccess(grid,"setMaxDynaRows",["unlimited"],VOID);
      ASSERT.verifySuccess(grid,"getMaxDynaRows",VOID,"unlimited");
       
      testLogger.debug("Check getMaxDynaRows 0");
      ASSERT.verifySuccess(grid,"setMaxDynaRows",[0],VOID);
      ASSERT.verifySuccess(grid,"getMaxDynaRows",VOID,"unlimited");
      
      
      //////getCurrentPages
      testLogger.debug("Check getCurrentPages default");
      ASSERT.verifySuccess(grid,"getCurrentPages",VOID,1);
      
      
      //////setAutoScroll
      testLogger.debug("Check setAutoScroll");
      ASSERT.verifySuccess(grid,"setAutoScroll",["PAGE"],VOID);
      ASSERT.verifySuccess(grid,"setAutoScroll",["OFF"],VOID);
      ASSERT.verifySuccess(grid,"setAutoScroll",["ELEMENT","FOO"],VOID);
      
      testLogger.debug("Check setAutoScroll ELEMENT-NO ELEMENT");
      ASSERT.verifyException(grid,"setAutoScroll",["ELEMENT"]);
     
      testLogger.debug("Check setAutoScroll FOO");
      ASSERT.verifyException(grid,"setAutoScroll",["FOO"]);
      
      //goToPage
      //getCurrentPages
    },
    
    runStaticGridTests: function(grid) {
      //extractItemList
      //addCell
      //setRootNode
    }
  };
  
  Inheritance(GridsTest,AbstractTest);
  return GridsTest;
  
});