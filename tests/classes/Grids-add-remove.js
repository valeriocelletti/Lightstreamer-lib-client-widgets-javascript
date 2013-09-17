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
define([weswitClassPrefix+"DynaGrid",weswitClassPrefix+"StaticGrid","./HtmlTest","Inheritance","ASSERT","Helpers"],
    function(DynaGrid,StaticGrid,HtmlTest,Inheritance,ASSERT,Helpers) {
   
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
  
  function checkDyna(res) {
    testLogger.logDebug("Expecting ",res,document.getElementById("dynares").innerHTML);
     var nodes = document.getElementById("dynares").childNodes;
     var c = 0;
     for (var i = 0; i < nodes.length; i++) {
       if (nodes[i].id != "foo1" && res.length > c) {
         var subNodes = nodes[i].childNodes;
         for (var x = 0; x < subNodes.length; x++) {
           if(readData(subNodes[x],"source") == "lightstreamer") {
             c++;
             var txt = Helpers.trim(subNodes[x].innerHTML);
             ASSERT.verifyValue(txt,res[c-1]);
           }
         }
       }
     }
     ASSERT.verifyValue(c,res.length);
  }
  
  function checkStatic(res,emptyOnTop) {
    testLogger.logDebug("Expecting ",res,document.getElementById("staticres").innerHTML);
    if (emptyOnTop) {
      res = [""].concat(res);
    }
    
    var nodes = document.getElementById("staticres").childNodes;
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
  
  
  var GridsTest = function(isDyna) {
    this._callSuperConstructor(GridsTest);
    this.isDyna = isDyna;
    if (isDyna) {
      this.check = checkDyna;
    } else {
      this.check = checkStatic; 
    }
  };
  
  GridsTest.getInstances = function() {
    return [new GridsTest(true),new GridsTest(false)];
  };
  
  GridsTest.prototype = {
    toString: function() {
      return "[GridsTest-add-remove]";
    },
    
    add: function(val) {
      testLogger.logDebug("ADD",val);
      ASSERT.verifySuccess(this.grid,"updateRow",[val,{f:val}],ASSERT.VOID);
    },
    
    remove: function(val) {
      testLogger.logDebug("REMOVE",val);
      ASSERT.verifySuccess(this.grid,"removeRow",[val],ASSERT.VOID);
    },
    
    start:function() {
      this._callSuperMethod(GridsTest,"start");
      
      
      if (this.isDyna) {
        this.write(
          '<div id="dynares">'+
            '<div data-source="lightstreamer" id="foo1">'+
              '<div data-source="lightstreamer" data-field="f" ></div>'+
            '</div>'+
          '</div>'
        );
        this.grid = new DynaGrid("foo1",true);
      } else {
        this.write(
            
        '<div id="staticres_dup">'+
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
          '</div>'+
            
          '<div id="staticres">'+
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
        this.grid = new StaticGrid("test",true);
      }
      try {
      //run twice on the same grid
      for (var i=0; i<2; i++) {
        
        this.simpleTest(false);
        this.simpleTest(true);
        
        
        this.sortedTest(false);
        this.sortedTest(true);
        
        this.reentrantTest(false);
        this.reentrantTest(true);
        
        this.sortedHiddenTest(false);
        this.sortedHiddenTest(true);
        
        this.sortedOverflowTest(false);
        this.sortedOverflowTest(true);
        
        ASSERT.verifySuccess(this.grid,"clean",ASSERT.VOID,ASSERT.VOID);
      }
      
      this.end();
      } catch(e) {
        console.log(e.message)
      }
    },
    
    simpleTest: function(onTop) {
      
      var _2_1 = onTop ? [1,2] : [2,1];
      var _2_1_3 = onTop ? [3,1,2] : [2,1,3];
      var _2_1_3_4 = onTop ? [4,3,1,2] : [2,1,3,4];
      var _1_3_4 = onTop ? [4,3,1] : [1,3,4];
      var _3_4 = onTop ? [4,3] : [3,4];
      var _3_4_5 = onTop ? [5,4,3] : [3,4,5];
      var _3_4_5_6 = onTop ? [6,5,4,3] : [3,4,5,6];
      var _3_4_5_6_7 = onTop ? [7,6,5,4,3] : [3,4,5,6,7];
      var _3_4_5_6_7_8 = onTop ? [8,7,6,5,4,3] : [3,4,5,6,7,8];
      var _3_4_5_6_7_8_9 = onTop ? [9,8,7,6,5,4,3] : [3,4,5,6,7,8,9];
      var _3_4_5_6_7_8_9_10 = onTop ? [10,9,8,7,6,5,4,3] : [3,4,5,6,7,8,9,10];
      var _3_4_5_6_7_8_9_10_11 = onTop ? [11,10,9,8,7,6,5,4,3] : [3,4,5,6,7,8,9,10,11];
      var _3_4_5_6_7_8_9_10_11_12 = onTop ? [12,11,10,9,8,7,6,5,4,3] : [3,4,5,6,7,8,9,10,11,12];
      var _4_5_6_7_8_9_10_11_12_13 = onTop ? [13,12,11,10,9,8,7,6,5,4] : [4,5,6,7,8,9,10,11,12,13];
      var _5_6_7_8_9_10_11_12_13_14 = onTop ? [14,13,12,11,10,9,8,7,6,5] : [5,6,7,8,9,10,11,12,13,14];
      
      ASSERT.verifySuccess(this.grid,"clean",ASSERT.VOID,ASSERT.VOID);
      this.check([]);
      
      ASSERT.verifySuccess(this.grid,"setSort",[null],ASSERT.VOID);
      ASSERT.verifySuccess(this.grid,"setAddOnTop",[onTop],ASSERT.VOID);
      ASSERT.verifySuccess(this.grid,"forceSubscriptionInterpretation",["UPDATE_IS_KEY"],ASSERT.VOID);

      if (this.isDyna) {
        //to test scrolling on dyna
        ASSERT.verifySuccess(this.grid,"setMaxDynaRows",[10],ASSERT.VOID);
      }
      
      this.add(2);
      this.check([2]);
      
      this.add(1);
      this.check(_2_1);
      
      this.add(3);
      this.check(_2_1_3);
      
      this.add(4);
      this.check(_2_1_3_4);
      
      this.remove(2);
      this.check(_1_3_4);
      
      this.remove(1);
      this.check(_3_4);
      
      this.add(5);
      this.check(_3_4_5);
      this.add(6);
      this.check(_3_4_5_6);
      this.add(7);
      this.check(_3_4_5_6_7);
      this.add(8);
      this.check(_3_4_5_6_7_8);
      this.add(9);
      this.check(_3_4_5_6_7_8_9);
      this.add(10);
      this.check(_3_4_5_6_7_8_9_10);
      this.add(11);
      this.check(_3_4_5_6_7_8_9_10_11);
      this.add(12);
      this.check(_3_4_5_6_7_8_9_10_11_12);
      this.add(13);
      this.check(_4_5_6_7_8_9_10_11_12_13);
      this.add(14);
      this.check(_5_6_7_8_9_10_11_12_13_14);
      
      ASSERT.verifySuccess(this.grid,"clean",ASSERT.VOID,ASSERT.VOID);
      this.check([]);
      
    },
    
    sortedTest: function(descending) {
      
      var _1_2 = descending ? [2,1] : [1,2];
      var _1_2_4 = descending ? [4,2,1] : [1,2,4];
      var _1_2_3_4 = descending ? [4,3,2,1] : [1,2,3,4];
      var _2_4 = descending ? [4,2] : [2,4];
      var _2_3_4 = descending ? [4,3,2] : [2,3,4];
      var _2_3 = descending ? [3,2] : [2,3];
      
      ASSERT.verifySuccess(this.grid,"clean",ASSERT.VOID,ASSERT.VOID);
      this.check([]);
      
      ASSERT.verifySuccess(this.grid,"forceSubscriptionInterpretation",[null],ASSERT.VOID);
      ASSERT.verifySuccess(this.grid,"setSort",["f",descending,true,false],ASSERT.VOID);
     
      this.add(2);
      this.check([2]);
      
      this.add(1);
      this.check(_1_2);
      
      this.add(4);
      this.check(_1_2_4);
      
      this.add(3);
      this.check(_1_2_3_4);
      
      this.remove(3);
      this.check(_1_2_4);
      
      this.remove(1);
      this.check(_2_4);
      
      this.add(3);
      this.check(_2_3_4);
      
      this.remove(4);
      this.check(_2_3);
      
      ASSERT.verifySuccess(this.grid,"clean",ASSERT.VOID,ASSERT.VOID);
      this.check([]);
      
    },
    
    reentrantTest: function(onTop) {
      
      var _3 = [3];
      var _3_4 = onTop ? [4,3] : [3,4]; 
      var _3_5 = onTop ? [5,3] : [3,5];
      var _3_6 = onTop ? [6,3] : [3,6];
      var _3_5_6 = onTop ? [6,5,3] : [3,5,6];
      var _3_6_7 = onTop ? [7,6,3] : [3,6,7];
      
      ASSERT.verifySuccess(this.grid,"clean",ASSERT.VOID,ASSERT.VOID);
      this.check([]);
      
      ASSERT.verifySuccess(this.grid,"setSort",[null],ASSERT.VOID);
      ASSERT.verifySuccess(this.grid,"forceSubscriptionInterpretation",[null],ASSERT.VOID);
      
      var withExtraOnTop = !this.isDyna && onTop;
      
      ASSERT.verifySuccess(this.grid,"setAddOnTop",[onTop],ASSERT.VOID);
      
      var that = this;
      var tester = {
        vu:0,
        
        onVisualUpdate: function(k,obj) {
          this.vu++;
          testLogger.debug("UPDATE EVENT",this.vu);
          
          if(this.vu == 1) { //adding 3

            that.check([]);
            that.add(4);
            that.check([]);
            
          } else if(this.vu == 2) { //adding 4

            that.check(_3,withExtraOnTop);
            that.remove(4);
            that.check(_3,withExtraOnTop);

          } else if(this.vu == 3) { //removing 4
            
            ASSERT.verifyNotOk(obj); //delete carries no obj
            that.check(_3_4);
            that.add(5);
            that.check(_3_4);
          
          } else if(this.vu == 4) { //adding 5
            
            that.check(_3,withExtraOnTop);
            that.add(6);
            that.check(_3,withExtraOnTop);
            
            
          } else if(this.vu == 5) { //adding 6
            
            that.check(_3_5,withExtraOnTop);
            that.remove(5);
            that.check(_3_5,withExtraOnTop);
            that.add(7);
            that.check(_3_5,withExtraOnTop);
            
          } else if(this.vu == 6) { //removing 5
            
            ASSERT.verifyNotOk(obj); //delete carries no obj
            that.check(_3_5_6);
            
            
          } else if(this.vu == 7) { //adding 7
            that.check(_3_6,withExtraOnTop);
            
          }
         
        }
      };
      
      ASSERT.verifySuccess(this.grid,"addListener",[tester],ASSERT.VOID);
      this.add(3);
      this.check(_3_6_7);
      
      if (this.grid.grid) {
        //only on sources
        testLogger.logDebug("Check for leaks");
        ASSERT.verifyValue(this.grid.suspendedUpdates.length,0);
      }
      ASSERT.verifySuccess(this.grid,"removeListener",[tester],ASSERT.VOID);
      
      
      ASSERT.verifySuccess(this.grid,"clean",ASSERT.VOID,ASSERT.VOID);
      this.check([]);
    },
    
    sortedOverflowTest: function(descending) {
      
      
      var _1to11_no5 = descending ? [11,10,9,8,7,6,4,3,2,1] : [1,2,3,4,6,7,8,9,10,11];
      var _1to11_no7 = descending ? [11,10,9,8,6,5,4,3,2,1] : [1,2,3,4,5,6,8,9,10,11];
      var _1to12 = descending ?     [12,11,10,9,8,5,4,3,2,1] : [1,2,3,4,5,8,9,10,11,12];
      
      var _1to11_no2 = descending ? [12,11,10,9,8,5,4,3,1] : [1,3,4,5,8,9,10,11,12];
      var _1to105 = descending ? [12,11,10.5,10,9,8,5,4,3,1] : [1,3,4,5,8,9,10,10.5,11,12];
      
      
      ASSERT.verifySuccess(this.grid,"clean",ASSERT.VOID,ASSERT.VOID);
      this.check([]);
       
      ASSERT.verifySuccess(this.grid,"forceSubscriptionInterpretation",["UPDATE_IS_KEY"],ASSERT.VOID);
      ASSERT.verifySuccess(this.grid,"setSort",["f",descending,true,false],ASSERT.VOID);
      
      if (this.isDyna) {
        ASSERT.verifySuccess(this.grid,"setMaxDynaRows",[10],ASSERT.VOID);
      }
      
      this.add(7);
      this.add(6);
      
      for (var i=1; i<=11; i++) {
        
        //skip the 5, 6 and 7 are already in
        if (i==5 || i==7 || i == 6) {
          continue;
        }
        
        this.add(i);
        
      }
      
      this.check(_1to11_no5);
      
      this.add(5);
      this.check(_1to11_no7);
      
      this.add(12);
      this.check(_1to12);
      
      this.remove(2);
      this.check(_1to11_no2);
      
      this.add(10.5);
      this.check(_1to105);
      
      ASSERT.verifySuccess(this.grid,"clean",ASSERT.VOID,ASSERT.VOID);
      this.check([]);
    },
    
    sortedHiddenTest: function(descending) {
      
      var results = [];
      
      var compareFun = descending ? function(a,b){return b - a;} : function(a,b){return a - b;} ;
      
      var that = this;
      
      function fillResult(v) {
        results.push(v);
        results.sort(compareFun);
        
        that.add(v);
        checkResult();
      }
      function remResult(v) {
        for (var i=0; i<results.length; i++) {
          if (results[i] == v) {
            results.splice(i,1);
          }
        }
        
        that.remove(v);
        checkResult();
      }
      
      function checkResult() {
        return that.check(results.slice(0,10));
      }
 
      ASSERT.verifySuccess(this.grid,"clean",ASSERT.VOID,ASSERT.VOID);
      this.check([]);
      
      var gcListener = {
        onVisualUpdate: function(k,o,p) {
          if (o) {
            try {
              var r = o.getCellValue("f");
            } catch(_e) {
              testLogger.logError("Cell not found!!",k);
              ASSERT.fail();
            }
          }
        }
      };
      ASSERT.verifySuccess(this.grid,"addListener",[gcListener],ASSERT.VOID);
      
      ASSERT.verifySuccess(this.grid,"forceSubscriptionInterpretation",[null],ASSERT.VOID);
      ASSERT.verifySuccess(this.grid,"setSort",["f",descending,true,false],ASSERT.VOID);

      if (this.isDyna) {
        ASSERT.verifySuccess(this.grid,"setMaxDynaRows",[10],ASSERT.VOID);
      }
      
      for (var i=1; i<=11; i++) {
        //skip the 5
        if (i==5) {
          continue;
        }
       
        fillResult(i);
      }
      
      fillResult(20);
      
      fillResult(5);
      
      remResult(2);
      
      //adding hidden stuff (when descending)
      
      fillResult(0.5);
      
      fillResult(0.3);
      
      fillResult(0.4);
      
      //move hidden stuff in the view (when descending)

      remResult(4);
      
      remResult(3);
      
      remResult(5);
      
      //adding hidden stuff (when ascending)
    
      fillResult(15);
      
      fillResult(13);
      
      fillResult(14);
      
      //move hidden stuff in the view (when ascending)
    
      remResult(7);
      
      remResult(6);
      
      remResult(8);
      
      ASSERT.verifySuccess(this.grid,"removeListener",[gcListener],ASSERT.VOID);
      
      ASSERT.verifySuccess(this.grid,"clean",ASSERT.VOID,ASSERT.VOID);
      this.check([]);
    }
  };
  
  Inheritance(GridsTest,HtmlTest);
  return GridsTest;
  
});