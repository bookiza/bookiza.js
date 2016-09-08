+!~-((w, d, undefined) => {

    module.exports = graph;

    let graph = {};


    //  1.
    w.addEventListener('resize', getDimensions);
    w.onload = getDimensions;

    function getDimensions() {

        let book = {};


        book.bounds = d.getElementById('plotter').getBoundingClientRect(); // http://caniuse.com/#feat=getboundingclientrect

        d.getElementById("pwidth").textContent = book.bounds.width;
        d.getElementById("pheight").textContent = book.bounds.height;
        d.getElementById("ptop").textContent = book.bounds.top;
        d.getElementById("pleft").textContent = book.bounds.left;
        d.getElementById("pright").textContent = book.bounds.right;
        d.getElementById("pbottom").textContent = book.bounds.bottom;

        // origin = d.getElementById('origin').getBoundingClientRect();

        let origin = {};

        origin.bounds = d.getElementsByTagName('body')[0].getBoundingClientRect();

        d.getElementById("originX").textContent = parseInt(origin.bounds.width) / 2;
        d.getElementById("originY").textContent = parseInt(origin.bounds.height) / 2;

    }

    // 2.
    d.getElementById('plotter').onmousemove = handleMouseMove;

    function handleMouseMove(e) {
        var eventDoc, doc, body, pageX, pageY;

        e = e || w.e;

        if (e.pageX === null && e.clientX !== null) {

            eventDoc = (e.target && e.target.ownerDocument) || document;

            doc = eventDoc.documentElement;

            body = eventDoc.body;

            e.pageX = e.clientX +
                (doc && doc.scrollLeft || body && body.scrollLeft || 0) -
                (doc && doc.clientLeft || body && body.clientLeft || 0);
            e.pageY = e.clientY +
                (doc && doc.scrollTop || body && body.scrollTop || 0) -
                (doc && doc.clientTop || body && body.clientTop || 0);
        }

        d.getElementById("xaxis").textContent = e.pageX;
        d.getElementById("yaxis").textContent = e.pageY;
    }


    // 3.

    // (function() {
    //     var elem = d.getElementById('plotter');

    //     function updateLog(x, y) {
    //         console.log('X: ' + x + '; Y: ' + y);
    //     }

    //     d.addEventListener('touchstart', function(e) {
    //         updateLog(e.changedTouches[0].pageX, e.changedTouches[0].pageY);
    //     }, false);

    //     d.addEventListener('touchmove', function(e) {
    //         e.preventDefault();
    //         updateLog(e.targetTouches[0].pageX, e.targetTouches[0].pageY);
    //     }, false);
    // })(d);


})(window, document);