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
define([weswitClassPrefix+"FadersHandler",weswitClassPrefix+"ColorConverter",weswitClassPrefix+"Cell",
        "./HtmlTest","Inheritance","ASSERT","Executor"],
    function(FadersHandler,ColorConverter,Cell,
        HtmlTest,Inheritance,ASSERT,Executor) {
   
  var testLogger = HtmlTest.testLogger;
  
  
  function compare(id,type,expected) {
    var color;
    ASSERT.verifySuccess(ColorConverter,"getStyle",[document.getElementById(id),type],true,function(v1,v2) {
      color = v1;
      return true;
    });
    ASSERT.compareArrays(color,expected,true);
  }
 
  
  HtmlTest.createCSS("FadersHandler");
  
  var FadersHandlerTest = function(id) {
    this._callSuperConstructor(FadersHandlerTest,["FadersHandler"]);
    this.id = id;
  };
  
  FadersHandlerTest.getInstances = function() {
    return [new FadersHandlerTest(1),new FadersHandlerTest(2),new FadersHandlerTest(3),new FadersHandlerTest(4)];
  };
  
  FadersHandlerTest.prototype = {
    toString: function() {
      return "[FadersHandlerTest]";
    },
    
    check: function(expectedBG,expectedText) {
      compare("foo"+this.id,"backgroundColor",expectedBG);
      compare("foo"+this.id,"color",expectedText);
      
      this.end();
    },
    
    start:function() {
      this._callSuperMethod(FadersHandlerTest,"start");
      var fh = new FadersHandler(50);
      if (!fh.fadeCell) {
        //can't work on minifed code
        this.end();
        return;
      }
      
      if (this.id == 1) {
        this.write('<div id="foo1" style="background-color:red">White on Lime</div>');
        var that = this;
        fh.fadeCell(document.getElementById("foo1"), "lime", "white", 1000, function(){that.check([0,255,0],[255,255,255]);});
        
      } else if (this.id == 2) {
        this.write('<div id="foo2" style="background-color:lime">Lime on Black</div>');
        var c2 = new Cell(document.getElementById("foo2"));
        var c2id = fh.getNewFaderId(c2, false, "black", "lime", 1000, Executor.packTask(this.check,this,[[0,0,0],[0,255,0]]));
        fh.launchFader(c2id);
        
      } else if (this.id == 3) {
        this.write('<div id="foo3" style="background-color:blue">Black on Blue</div>');
        var c3 = new Cell(document.getElementById("foo3"));
        var c3id = fh.getNewFaderId(c3, false, "white", "white", 1000, Executor.packTask(ASSERT.fail,ASSERT));
        fh.launchFader(c3id);
        fh.stopFader(c3);
       
        Executor.addTimedTask(this.check,1000,this,[[0,0,255],[0,0,0]]);
        
      } else if (this.id == 4) {
        this.write('<div id="foo4" style="background-color:black;color:blue">Blue on Black</div>');
        var c4 = new Cell(document.getElementById("foo4"));
        var c4id = fh.getNewFaderId(c4, false, "red", "green", 1000, Executor.packTask(ASSERT.fail,ASSERT));
        fh.launchFader(c4id);
        
        var that = this;
        Executor.addTimedTask(function() {
          var expBG = "not read";
          var expFO = "not read";
          
          fh.stopFader(c4);
          
          ASSERT.verifySuccess(ColorConverter,"getStyle",[document.getElementById("foo4"),"backgroundColor"],true,function(v1,v2) {
            expBG = v1;
            return true;
          });
          ASSERT.verifySuccess(ColorConverter,"getStyle",[document.getElementById("foo4"),"color"],true,function(v1,v2) {
            expFO = v1;
            return true;
          });
          
          Executor.addTimedTask(that.check,700,that,[expBG,expFO]);
          
        },500);
      }
    }
  };
  
  Inheritance(FadersHandlerTest,HtmlTest);
  return FadersHandlerTest;
  
});