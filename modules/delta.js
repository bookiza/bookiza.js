!+-~((w, d, undefined) => {

    
    w.book = w.book || {};

    book.pause = function() {
        w.cancelAnimationFrame(book.core.animationFrame);
    };

    book.play = function() {
        book.core.then = Date.now();
        book.core.frame();
    };


    book.core = {

        frame: function() {
            book.core.setDelta();
            book.core.update();
            book.core.render();
            book.core.animationFrame = w.requestAnimationFrame(book.core.frame);
        },

        setDelta: function() {
            book.core.now = Date.now();
            book.core.delta = (book.core.now - book.core.then) / 1000; // seconds since last frame
            book.core.then = book.core.now;
        },

        update: function() {
            // Render updates to book (draw to canvas, update css, etc.)
        },

        render: function() {
            // Update values
            // var distance = 100 * book._delta;
            // book.thing.x += 100 * book._delta;
        }
    };

    book.play();

})(w, document);
