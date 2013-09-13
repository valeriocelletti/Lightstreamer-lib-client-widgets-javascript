require({

    baseUrl: "../source",
    keepBuildDir: false,
    generateSourceMaps: true,
    optimize: "closure",
    closure: {
        CompilationLevel: 'ADVANCED_OPTIMIZATIONS',
        loggingLevel: 'SEVERE',
        externs: [
          "utility-logging-externs.js",
          "utility-test-externs.js",
          "utility-toolkit-externs.js"
        ],
        ignoreDefaultExterns: false,
        avoidGlobals: true
    },

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
    
    removeCombined: true,
    
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
          "VisualUpdate"
        ]
      }
    ],
        
    preserveLicenseComments: false

})