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
define(["weswit/AbstractTest","weswit/Inheritance","weswit/ASSERT","weswit/Dismissable"],
    function(AbstractTest,Inheritance,ASSERT,Dismissable) {
  
  var css = {};
  
  var HtmlTest = function(cssName) {
    this._callSuperConstructor(HtmlTest);
    this.html = document.createElement("div");
    
    if (cssName) {
      this.cssName = cssName;
      css[cssName].touch();
    }
  };
  
  HtmlTest.testLogger = AbstractTest.testLogger;
  
  HtmlTest.createCSS = function(cssName) {
    css[cssName] = new CSS(cssName);
  };
  
  HtmlTest.prototype = {
      
      write: function(htmlSnippet) {
        this.html.innerHTML += htmlSnippet;
      },
      
      start: function() {
        document.body.appendChild(this.html);
      },
      
      end: function() {
        document.body.removeChild(this.html);
        if (this.cssName) {
          css[this.cssName].dismiss();
        }
        this._callSuperMethod(HtmlTest,"end");
      },
      
     
      
  };
  
  
  var CSS = function(css) {
    this.initTouches(10);
    var link = document.createElement("link");
    link.type = "text/css";
    link.rel = "stylesheet";
    link.href = "classes/"+css+".css";
    document.getElementsByTagName("head")[0].appendChild(link);
    this.link = link;
  };
  CSS.prototype = {
    clean: function() {
      document.getElementsByTagName("head")[0].removeChild(this.link);
    }
  };
  
  
  Inheritance(CSS,Dismissable,true,true);
  
  Inheritance(HtmlTest,AbstractTest,false,true);
  return HtmlTest;
  
});