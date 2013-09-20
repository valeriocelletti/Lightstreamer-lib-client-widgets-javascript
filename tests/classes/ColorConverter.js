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
define([weswitClassPrefix+"ColorConverter","./HtmlTest","weswit/Inheritance","weswit/ASSERT"],
    function(ColorConverter,HtmlTest,Inheritance,ASSERT) {
   
  var testLogger = HtmlTest.testLogger;
  
  var ColorConverterTest = function() {
    this._callSuperConstructor(ColorConverterTest);
  };
  
  ColorConverterTest.getInstances = function() {
    return [new ColorConverterTest()];
  };
  
  ColorConverterTest.prototype = {
    toString: function() {
      return "[ColorConverterTest]";
    },
    
    start:function() {
      this._callSuperMethod(ColorConverterTest,"start");
      this.write('<div id="foo" style="color:lightblue">color converting</div>');
      if (!ColorConverter.translateToRGBArray) {
        //currently can't work on the minified version
        this.end();
        return;
      }
      
            
      var expecting = [173,216,230];
     
      var res=[];
      var doPush = function(v1,v2) {
        res.push(v1);
        return true;
      };
      ASSERT.verifySuccess(ColorConverter,"translateToRGBArray",["rgb(173,216,230)"],true,doPush);
      ASSERT.verifySuccess(ColorConverter,"translateToRGBArray",["#ADD8E6"],true,doPush);
      ASSERT.verifySuccess(ColorConverter,"translateToRGBArray",["lightblue"],true,doPush);
      ASSERT.verifySuccess(ColorConverter,"getStyle",[document.getElementById("foo"),"color"],true,doPush);
    
      for (var i=0; i<res.length; i++) {
        testLogger.debug("Verifiying " + i); 
        ASSERT.compareArrays(res[i],expecting,true);
      }      
      
          
      this.end();
    }
  };
  
  Inheritance(ColorConverterTest,HtmlTest);
  return ColorConverterTest;
  
});

/*<!DOCTYPE html>
<html>
<head>
  <script src="require.js"></script>
  <script src="library.js"></script>
</head>  
<body>  
  
  
  
  <script>
    
    require(["DOM/ColorConverter","debug/ASSERT","testLogger"], 
        function(ColorConverter,ASSERT,testLogger) {
     
      
      
     
    });
    
    
  </script>
</body>
</html>*/