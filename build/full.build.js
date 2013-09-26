{
    dir: "../built/",
    baseUrl: "../source",
    keepBuildDir: false,
    generateSourceMaps: true,
    optimize: "closure",
    closure: {
        CompilationLevel: 'ADVANCED_OPTIMIZATIONS',
        loggingLevel: 'SEVERE',
        externs: [
          "ls-externs.js",
          "utility-logging-externs.js",
          "utility-test-externs.js",
          "utility-toolkit-externs.js"
        ],
        ignoreDefaultExterns: false,
        avoidGlobals: true
    },

    //this will prevent the initial module search from searching the
    //required imported modules*
    paths: {
      "ASSERT": "empty:",
      "BrowserDetection": "empty:",
      "DoubleKeyMap": "empty:",
      "DoubleKeyMatrix": "empty:",
      "Environment": "empty:",
      "EventDispatcher": "empty:",
      "Executor": "empty:",
      "Helpers": "empty:",
      "IFrameHandler": "empty:",
      "IllegalArgumentException": "empty:",
      "IllegalStateException": "empty:",
      "Inheritance": "empty:",
      "List": "empty:",
      "LoggerManager": "empty:",
      "Matrix": "empty:",
      "Setter": "empty:"
    },
    
    //we could remove the ASSERT calls
    /*pragmas: {
      debugExclude: true
    },*/

    modules: [
      {
        name: "lightstreamer-widgets",
        include: [
          "AbstractGrid",
          "AbstractWidget",
          "Cell",
          "CellMatrix",
          "Chart",
          "ColorConverter",
          "DynaGrid",
          "FadersHandler",
          "LightstreamerConstants",
          "SimpleChartListener",
          "StaticGrid",
          "StatusBarProgressIndicator",
          "StatusImageWidget",
          "StatusWidget",
          "VisualUpdate",
          //import all from sub-libs
          "../libs/utility-test/source/AbstractTest",
          "../libs/utility-test/source/ASSERT",
          "../libs/utility-test/source/TestRunner",
          
          "../libs/utility-toolkit/source/BrowserDetection",
          "../libs/utility-toolkit/source/CookieManager",
          "../libs/utility-toolkit/source/Dismissable",
          "../libs/utility-toolkit/source/DoubleKeyMap",
          "../libs/utility-toolkit/source/DoubleKeyMatrix",
          "../libs/utility-toolkit/source/Environment",
          "../libs/utility-toolkit/source/EnvironmentStatus",
          "../libs/utility-toolkit/source/EventDispatcher",
          "../libs/utility-toolkit/source/Executor",
          "../libs/utility-toolkit/source/Helpers",
          "../libs/utility-toolkit/source/IFrameHandler",
          "../libs/utility-toolkit/source/IllegalArgumentException",
          "../libs/utility-toolkit/source/IllegalStateException",
          "../libs/utility-toolkit/source/Inheritance",
          "../libs/utility-toolkit/source/List",
          "../libs/utility-toolkit/source/Matrix",
          "../libs/utility-toolkit/source/Setter",
          
          "../libs/utility-logging/source/AlertAppender",
          "../libs/utility-logging/source/BufferAppender",
          "../libs/utility-logging/source/ConsoleAppender",
          "../libs/utility-logging/source/DOMAppender",
          "../libs/utility-logging/source/FunctionAppender",
          "../libs/utility-logging/source/LoggerManager",
          "../libs/utility-logging/source/LoggerProxy",
          "../libs/utility-logging/source/SimpleLogAppender",
          "../libs/utility-logging/source/SimpleLogger",
          "../libs/utility-logging/source/SimpleLoggerProvider",
          "../libs/utility-logging/source/SimpleLogLevels"
        ]
      }
    ],
    
    // *and we transform them to make them "local" (in our sources they're referenced by name ie without path.
    onBuildWrite: function (moduleName, path, contents) {
      return contents.replace("../libs/utility-toolkit/source/","").replace("../libs/utility-test/source/","").replace("../libs/utility-logging/source/","");
    },
        
    preserveLicenseComments: false
}