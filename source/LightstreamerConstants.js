define([],function() {
  
  /**
   * @private
   */
  var LightstreamerConstants = {

    // connecting to the server
    CONNECTING: "CONNECTING",
    // connected prefix
    CONNECTED: "CONNECTED:",
    // create_session response received, trying to setup a streaming connection
    SENSE: "STREAM-SENSING",
    // receiving pushed data
    WS_STREAMING: "WS-STREAMING",
    HTTP_STREAMING: "HTTP-STREAMING",
    // connected but doesn't receive data
    STALLED: "STALLED",
    // polling for data
    WS_POLLING: "WS-POLLING",
    HTTP_POLLING: "HTTP-POLLING",
    // disconnected
    DISCONNECTED: "DISCONNECTED",
    WILL_RETRY: "DISCONNECTED:WILL-RETRY",

    WS_ALL: "WS",
    HTTP_ALL: "HTTP",
    
    RAW: "RAW",
    DISTINCT: "DISTINCT",
    COMMAND: "COMMAND",
    MERGE: "MERGE"
    
  };
    
  return LightstreamerConstants;
  
});