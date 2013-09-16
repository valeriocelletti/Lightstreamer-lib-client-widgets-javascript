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
define([weswitClassPrefix+"Chart",weswitClassPrefix+"SimpleChartListener","./HtmlTest","Inheritance","ASSERT"],
    function(Chart,SimpleChartListener,HtmlTest,Inheritance,ASSERT) {
   
  var testLogger = HtmlTest.testLogger;
  
  HtmlTest.createCSS("Chart");
   
  var ChartTest = function(forceDiv) {
    this._callSuperConstructor(ChartTest,["Chart"]);
    this.forceDiv = forceDiv;
  };
  
  ChartTest.getInstances = function() {
    return [new ChartTest(false),new ChartTest(true)];
  };
  
  ChartTest.prototype = {
    toString: function() {
      return "[ChartTest]";
    },
    
    start:function() {
      this._callSuperMethod(ChartTest,"start");
      this.write('<div data-source="lightstreamer" id="container"></div>');
   
      
      myChart = new Chart("container");
      if (myChart.forceDivPainting) {
        //not available on minified version
        ASSERT.verifySuccess(myChart,"forceDivPainting",[this.forceDiv],ASSERT.VOID);
      }
      

      
      var labels = false;
      myChart.addListener({
          onNewLine: function(key,newChartLine,nowX,nowY) {
            if (!labels) {
              ASSERT.verifySuccess(newChartLine,"setYLabels",[5,"lbl"],ASSERT.VOID);
              labels = true;
            }
            ASSERT.verifySuccess(newChartLine,"positionYAxis",[70,130],ASSERT.VOID);
          }
        
      });
      
      
      var autoZoom = new SimpleChartListener();
      autoZoom.onNewLine = null;
      myChart.addListener(autoZoom);
      
      ASSERT.verifySuccess(myChart,"configureArea",["chartStyle",500,1000,200,200],ASSERT.VOID);

      ASSERT.verifySuccess(myChart,"setXAxis",["X"],ASSERT.VOID);
      ASSERT.verifySuccess(myChart,"addYAxis",["Y1"],ASSERT.VOID);
      ASSERT.verifySuccess(myChart,"addYAxis",["Y2"],ASSERT.VOID);
      
      ASSERT.verifySuccess(myChart,"positionXAxis",[100,160],ASSERT.VOID);
      ASSERT.verifySuccess(myChart,"setXLabels",["5","lbl"],ASSERT.VOID);
      
      ASSERT.verifySuccess(myChart,"updateRow",["k1",{"X":100,"Y1":100,"Y2":90}],ASSERT.VOID);
      ASSERT.verifySuccess(myChart,"updateRow",["k1",{"X":120,"Y1":110,"Y2":100}],ASSERT.VOID);
      ASSERT.verifySuccess(myChart,"updateRow",["k1",{"X":135,"Y1":110,"Y2":100}],ASSERT.VOID);
      
      ASSERT.verifySuccess(myChart,"updateRow",["k2",{"X":100,"Y1":80,"Y2":70}],ASSERT.VOID);
      ASSERT.verifySuccess(myChart,"updateRow",["k2",{"X":120,"Y1":90,"Y2":80}],ASSERT.VOID);
      ASSERT.verifySuccess(myChart,"updateRow",["k2",{"X":135,"Y1":90,"Y2":80}],ASSERT.VOID);
     
      /*
      myChart.updateRow("k2",{"X":170,"Y1":100,"Y2":90}); 
      myChart.configureArea("chartStyle",250,500,200,200);
      myChart.updateRow("k1",{"X":170,"Y1":120,"Y2":110});
      myChart.updateRow("k2",{"X":170,"Y1":100,"Y2":90});
      myChart.configureArea("chartStyle",300,700,200,200)
     */
      
      //removeYAxis
      //parseHtml
      //myChart.clean();
      
      setTimeout(function() {
        ASSERT.verifySuccess(myChart,"configureArea",["chartStyle",250,500,200,200],ASSERT.VOID);
      },1000);
      
      setTimeout(function() {
        ASSERT.verifySuccess(myChart,"updateRow",["k1",{"X":170,"Y1":120,"Y2":110}],ASSERT.VOID);
        ASSERT.verifySuccess(myChart,"updateRow",["k2",{"X":170,"Y1":100,"Y2":90}],ASSERT.VOID);
      },2000);
      
      setTimeout(function() {
        ASSERT.verifySuccess(myChart,"configureArea",["chartStyle",300,700,200,200],ASSERT.VOID);
      },3000);

      var that = this;
      setTimeout(function() {
        ASSERT.verifySuccess(myChart,"clean",ASSERT.VOID,ASSERT.VOID);
        
        that.end();
      },4000);
    }
  };
  
  Inheritance(ChartTest,HtmlTest);
  return ChartTest;
  
});