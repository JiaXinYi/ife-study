Promise.prototype = {  
  constructor: Promise,

  then: function (onFulfillment, onRejection) {
    var parent = this;
    var state = parent._state;

    if (state === FULFILLED && !onFulfillment
        || state === REJECTED && !onRejection) {
        return this;
    }

    var child = new Promise(noop);
    var result = parent._result;

    if (state) {
      var callback = arguments[state - 1];
      asap(function () {
        invokeCallback(state, child, callback, result);
      });
    } else {
      subscribe(parent, child, onFulfillment, onRejection);
    }

    return child;
  },

  'catch': function (onRejection) {
    return this.then(null, onRejection);
  }
};
var Promise = require(‘./promise’);
function func(){
                     return new Promise(function(resolve,reject){
                            setTimeout(function(){
                                   console.log("timeout_callback0);
                                   resolve();
                            },200);
                     });
              }
             
              func().then(function(){
                     console.log("then1");
                     return new Promise(function(resolve){
                            setTimeout(function(){
                                   console.log("timeout1callback1);
                                   resolve();
                            },200);
                     })
              })
              .then(function(){
                     console.log("then2");
              });
node promise_test.js;