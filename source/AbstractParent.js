define([],function() {
  
  /**
   * Not to be used directly
   */
  var AbstractParent = function(){};
  
  AbstractParent.prototype = {
    /**
     * common ancestor for VisibleParent (oneMap = true) and 
     * invisibleParent (oneMap = false)
     */
    init: function() {
     
      this.length = 0;
      this.hashMap = {};
      if (!this.oneMap) {
        this.map = {};
      }
    }    
  };
  
  return AbstractParent;
  
});