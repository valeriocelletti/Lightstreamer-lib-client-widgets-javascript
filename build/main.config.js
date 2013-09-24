require({

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
          // *then we import them from the import folder*
          "../libs/utility-test/source/ASSERT",
          "../libs/utility-toolkit/source/BrowserDetection",
          "../libs/utility-toolkit/source/DoubleKeyMap",
          "../libs/utility-toolkit/source/DoubleKeyMatrix",
          "../libs/utility-toolkit/source/Environment",
          "../libs/utility-toolkit/source/EventDispatcher",
          "../libs/utility-toolkit/source/Executor",
          "../libs/utility-toolkit/source/Helpers",
          "../libs/utility-toolkit/source/IFrameHandler",
          "../libs/utility-toolkit/source/IllegalArgumentException",
          "../libs/utility-toolkit/source/IllegalStateException",
          "../libs/utility-toolkit/source/Inheritance",
          "../libs/utility-toolkit/source/List",
          "../libs/utility-logging/source/LoggerManager",
          "../libs/utility-toolkit/source/Matrix",
          "../libs/utility-toolkit/source/Setter"
        ]
      }
    ],
    
    // *and we transform them to make them "local" (in our sources they're referenced by name ie without path.
    onBuildWrite: function (moduleName, path, contents) {
      return contents.replace("../libs/utility-toolkit/source/","").replace("../libs/utility-test/source/","").replace("../libs/utility-logging/source/","");
    },
        
    preserveLicenseComments: false
})