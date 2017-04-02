if (window.PointerEvent) {
  console.log('hello')
} else {
  console.log('no hello')
}


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