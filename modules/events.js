var transitionsSupported = ('transition' in document.documentElement.style) || ('WebkitTransition' in document.documentElement.style)

console.log(transitionsSupported, 'SUPPORTED')

function whichTransitionEvent(){
    let t
    const el = document.createElement('fakeelement')
    const transitions = {
      'transition':'transitionend',
      'OTransition':'oTransitionEnd',
      'MozTransition':'transitionend',
      'WebkitTransition':'webkitTransitionEnd'
    }

    for(t in transitions){
        if( el.style[t] !== undefined ){
            return transitions[t]
        }
    }
}

/* Listen for a transition! */
const transitionEvent = whichTransitionEvent();
transitionEvent && document.addEventListener(transitionEvent, (e) => {
    console.log(e)
    // console.log('Transition complete!  This is the callback, no library needed!');
});




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

    on('.viewer', 'click', 'a.next-page', function() {

    });

    on('.viewer', 'click', 'a.previous-page', function() {
        alert('You clicked me!');
    });


}());



document.addEventListener('touchstart', handleTouchStart, false);
document.addEventListener('touchmove', handleTouchMove, false);

let xDown = null;
let yDown = null;

function handleTouchStart(evt) {
    xDown = evt.touches[0].clientX;
    yDown = evt.touches[0].clientY;
};

function handleTouchMove(evt) {
    if ( ! xDown || ! yDown ) {
        return;
    }

    const xUp = evt.touches[0].clientX;
    const yUp = evt.touches[0].clientY;

    const xDiff = xDown - xUp;
    const yDiff = yDown - yUp;

    if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {/*most significant*/
        if ( xDiff > 0 ) {
            /* left swipe */
        } else {
            /* right swipe */
        }
    } else {
        if ( yDiff > 0 ) {
            /* up swipe */
        } else {
            /* down swipe */
        }
    }
    /* reset values */
    xDown = null;
    yDown = null;
};



const object = document.getElementById('element');
let initX;
let initY;
let firstX;
let firstY;

object.addEventListener('mousedown', function(e) {

    e.preventDefault();
    initX = this.offsetLeft;
    initY = this.offsetTop;
    firstX = e.pageX;
    firstY = e.pageY;

    this.addEventListener('mousemove', dragIt, false);

    window.addEventListener('mouseup', () => {
        object.removeEventListener('mousemove', dragIt, false);
    }, false);

}, false);

object.addEventListener('touchstart', function(e) {

    e.preventDefault();
    initX = this.offsetLeft;
    initY = this.offsetTop;
    const touch = e.touches;
    firstX = touch[0].pageX;
    firstY = touch[0].pageY;

    this.addEventListener('touchmove', swipeIt, false);

    window.addEventListener('touchend', e => {
        e.preventDefault();
        object.removeEventListener('touchmove', swipeIt, false);
    }, false);

}, false);

function dragIt(e) {
    this.style.left = `${initX+e.pageX-firstX}px`;
    this.style.top = `${initY+e.pageY-firstY}px`;
}

function swipeIt(e) {
    const contact = e.touches;
    this.style.left = `${initX+contact[0].pageX-firstX}px`;
    this.style.top = `${initY+contact[0].pageY-firstY}px`;
}