((w, d, undefined) => {

    let _self = {

    };


    // Step-1 Receive:

    // Page stacker and handler.

    





    function flippy(method, cb) {
        return _self.publicMethods[method].call(null, cb);
    }


    if (typeof(w.Flippy) === 'undefined') {
        w.Flippy = flippy;
    }



})(window, document);
