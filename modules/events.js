var transitionsSupported = ('transition' in document.documentElement.style) || ('WebkitTransition' in document.documentElement.style);

console.log(transitionsSupported, 'SUPPORTED')


if (window.PointerEvent) {
  console.log('hello')
} else {
  console.log('no hello')
}

// This will not bind the event like jquery.
(function() {
    function on(elSelector, eventName, selector, fn) {
        var element = document.querySelector(elSelector);

        element.addEventListener(eventName, function(event) {
            var possibleTargets = element.querySelectorAll(selector);
            var target = event.target;

            for (var i = 0, l = possibleTargets.length; i < l; i++) {
                var el = target;
                var p = possibleTargets[i];

                while(el && el !== element) {
                    if (el === p) {
                        return fn.call(p, event);
                    }

                    el = el.parentNode;
                }
            }
        });
    }

    on('#plotter', 'click', 'a.next', function() {
        alert('You clicked me!');
    });
}());



