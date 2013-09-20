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
define([weswitClassPrefix+"DynaGrid",weswitClassPrefix+"StaticGrid","./HtmlTest","weswit/Inheritance","weswit/ASSERT",
        "Lightstreamer/LightstreamerClient","Lightstreamer/Subscription","weswit/Executor"],
    function(DynaGrid,StaticGrid,HtmlTest,Inheritance,ASSERT,
        LightstreamerClient,Subscription,Executor) {
   
  var testLogger = HtmlTest.testLogger;
  
  function checkEmpty(obj,name) {
    if (typeof obj.length != "undefined") {
      if (obj.length > 0) {
        testLogger.error("Expecting empty list",name);
        ASSERT.fail();
      }
      
    } else for (var i in obj) {
      testLogger.error("Expecting empty collection",name);
      ASSERT.fail();
    }
  }
  
  var GridListener = function(test,expecting) {
    this.test = test;
    this.expecting = expecting;
  };
  GridListener.prototype = {
    onVisualUpdate: function(key,obj) {
      if (this.test.status == RUNNING) {
        testLogger.debug(this.expecting.length + ") Grid onVisualUpdate check");
        if (obj == null) {
          //should be the DELETE
          toCheck = this.expecting.shift();
          if (toCheck) {
            ASSERT.verifyValue("DELETE",toCheck.command);  
          }
        } else {
          this.test.checkMex(obj,"getCellValue",this.expecting);  
        }
      }
    }
  };
  
   
  var portfolio = "portfolio1";
  
  var WAITING_SNAPSHOT = 1;
  var WAITING_DELETES = 2;
  var RUNNING = 3;
  var END = 4;
  
  
  var GridsTest = function() {
    this._callSuperConstructor(GridsTest);
    
    this.snapshotState = {};
    this.deleteSent = 0;
    
    var key = "item1";
    
    this.status = WAITING_SNAPSHOT;
    
    this.mexes = [
      "BUY|"+portfolio+"|"+key+"|1",
      "SELL|"+portfolio+"|"+key+"|1",
      "BUY|"+portfolio+"|"+key+"|1",
      "BUY|"+portfolio+"|"+key+"|1",
      "SELL|"+portfolio+"|"+key+"|2"
    ];
    
    this.expected = [
      {key:"item1",command:"ADD",qty:1}, 
      {key:"item1",command:"DELETE"},
      {key:"item1",command:"ADD",qty:1},
      {key:"item1",command:"UPDATE",qty:2},
      {key:"item1",command:"DELETE"}
    ];
    
    this.expectedDynaGrid = [
      {key:"item1",command:"ADD",qty:1},
      {key:"item1",command:"DELETE"},
      {key:"item1",command:"ADD",qty:1},
      {key:"item1",command:"UPDATE",qty:2},
      {key:"item1",command:"DELETE"}
    ];
     
    this.expectedStaticGrid = [
      {key:"item1",command:"ADD",qty:1}, 
      {key:"item1",command:"DELETE"},
      {key:"item1",command:"ADD",qty:1},
      {key:"item1",command:"UPDATE",qty:2},
      {key:"item1",command:"DELETE"}
    ];
                    
  };
  
  GridsTest.getInstances = function() {
    return [new GridsTest()];
  };
  
  GridsTest.prototype = {
    toString: function() {
      return "[GridsTest-command-sub]";
    },
    
    start:function() {
      testLogger.debug("preparing");
      this._callSuperMethod(GridsTest,"start");
      
      if (TEST_SERVER == "http://push.lightstreamer.com" || !TEST_SERVER) {
        testLogger.warn("Configure a custom server or the test may fail");
        ASSERT.fail();
      }
      
      this.write(
        '<h3>DynaGrid</h3>'+
        '<div data-source="lightstreamer" id="grid">'+
           '<span data-source="lightstreamer" data-field="key"></span>'+
           '<span data-source="lightstreamer" data-field="command"></span>'+
           '<span data-source="lightstreamer" data-field="qty>'+
           '<hr/>'+
        '</div>'+
        
        '<h3>StaticGrid</h3>'+
        '<div>'+
           '<span data-source="lightstreamer" data-grid="grid2" data-field="key" data-row="1"></span>'+
           '<span data-source="lightstreamer" data-grid="grid2" data-field="command" data-row="1"></span>'+
           '<span data-source="lightstreamer" data-grid="grid2" data-field="qty" data-row="1"></span>'+
         '</div>'+
         
         '<h3>StaticGrid dup</h3>'+
         '<div>'+
           '<span data-source="lightstreamer" data-grid="grid2" data-field="key" data-row="1"></span>'+
           '<span data-source="lightstreamer" data-grid="grid2" data-field="command" data-row="1"></span>'+
           '<span data-source="lightstreamer" data-grid="grid2" data-field="qty" data-row="1"></span>'+
         '</div>'
      );
      
      
      var that = this;
      
      this.client = new LightstreamerClient(TEST_SERVER,"DEMO");
      this.client.connect();
      
      var sub = new Subscription("COMMAND",portfolio,["key","command","qty"]);
      sub.setDataAdapter("PORTFOLIO_ADAPTER");
      sub.setRequestedSnapshot("yes");
      sub.addListener({
        onItemUpdate: function(obj) {
          ASSERT.verifyValue(that.status,END,function(v1,v2) {
            return v1 !== v2;
          });
          
          if (that.status == RUNNING) {
            testLogger.debug(that.expected.length + ") onItemUpdate check");
            
            if (that.expected.length > 0) {
              that.checkMex(obj,"getValue",that.expected);
              that.sendMex();  
            } 
          } else if (that.status == WAITING_DELETES) {
            that.deleteSent--;
            if (that.deleteSent <= 0) {
              Executor.addTimedTask(that.startMex,100,that);
            }
          }
          
          if (obj.getValue("command") != "DELETE") {
            that.snapshotState[obj.getValue("key")] = obj.getValue("qty");
          } else {
            delete(that.snapshotState[obj.getValue("key")]);
          }
          
          if (that.expected.length <= 0) {
            Executor.addTimedTask(that.close,100,that);
          }
        },
        
        onEndOfSnapshot: function() {
          ASSERT.verifyValue(that.status,WAITING_SNAPSHOT);
          that.status = WAITING_DELETES;
          if (!that.sellEverything()) {
            that.startMex();
          }
        }
      });
      this.client.subscribe(sub);
      
      var dynaGrid = new DynaGrid("grid",true);
      dynaGrid.addListener(new GridListener(this,this.expectedDynaGrid));
      sub.addListener(dynaGrid);
      this.dynaGrid = dynaGrid;
      
      var staticGrid = new StaticGrid("grid2",true);
      staticGrid.setSort("key");
      dynaGrid.addListener(new GridListener(this,this.expectedStaticGrid));
      sub.addListener(staticGrid);
      this.staticGrid = staticGrid;
      
    },
    
    startMex: function() {
      testLogger.debug("starting");
      
      ASSERT.verifyValue(this.status,WAITING_DELETES);
      this.checkStructureLeaks();
      this.status = RUNNING;
      this.sendMex();
    },
    
    close: function() {
      testLogger.debug("closing");
      
      ASSERT.verifyValue(this.status,RUNNING);
      ASSERT.verifySuccess(this,"sellEverything",ASSERT.VOID,false,false);
      
      this.checkStructureLeaks();
      this.status = END;
      
      this.client.disconnect();
      this.end();
    },
    
    checkMex: function(obj,method,toCheck) {
      var check = toCheck.shift();
      
      testLogger.debug("Checking");
      
      for (var i in check) {
        ASSERT.verifySuccess(obj,method,[i],check[i]);
      }
    },
    
    sendMex: function() {
      if (this.mexes.length > 0) {
        this.client.sendMessage(this.mexes.shift());
      }
    },
    
    sellEverything: function() {
      this.deleteSent = 0
      for (var i in this.snapshotState) {
        this.client.sendMessage("SELL|"+portfolio+"|"+i+"|"+this.snapshotState[i]);
        this.deleteSent++;
      }
      if (this.deleteSent == 0) {
        return false;
      }
      return true;
    },
    
    checkStructureLeaks: function() {
      testLogger.debug("Check for subscribption and grids leaks");
      
      if (this.staticGrid.grid) {
        testLogger.debug("Check internal structures");
        //checkEmpty(sub.oldValuesByKey.matrix,"oldValuesByKey");
        
        checkEmpty(this.dynaGrid.fifoKeys,"dgrid fifoKeys");
        checkEmpty(this.dynaGrid.fifoMap,"dgrid fifoMap");
        checkEmpty(this.dynaGrid.grid.getEntireMatrix(),"dgrid grid");
        checkEmpty(this.dynaGrid.suspendedUpdates,"dgrid suspendedUpdates");
        checkEmpty(this.dynaGrid.values.getEntireMatrix(),"dgrid values");
        
        checkEmpty(this.staticGrid.fifoKeys,"sgrid fifoKeys");
        checkEmpty(this.staticGrid.fifoMap,"sgrid fifoMap");
        checkEmpty(this.staticGrid.suspendedUpdates,"sgrid suspendedUpdates");
        checkEmpty(this.staticGrid.values.getEntireMatrix(),"sgrid values");
        this.staticGrid.keyRowMap.forEach(function() {
          ASSERT.fail();
        });
        this.staticGrid.keyRowMap.forEachReverse(function() {
          ASSERT.fail();
        });
      }
    }
    
    
  };
  
  Inheritance(GridsTest,HtmlTest);
  return GridsTest;
  
});
