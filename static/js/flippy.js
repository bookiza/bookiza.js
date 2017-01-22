// Copyright Notice: All rights reserved. © 2016 - 2017 Marvin Danig
// FLIPPY VERSION::0.0.1'

// import viewer from '../modules/mode.js'
// import '../modules/graph.js'
// import events from '../modules/events.js'

(((n, w, d, undefined) => {
    /***********************************
     ************* Public API **********
     ***********************************/

    class Book {

        // CONSTRUCTOR

        constructor() {
            this.mode = viewer.getMatch('(orientation: landscape)') ? 'landscape' : 'portrait'
        }

        // PROPERTIES

        // dimensions() {
        //     return _book.bounds = d.getElementById('viewer').getBoundingClientRect();
        // }

        view() {
            return _book.currentView
        }

        page() {
            return _book.currentPage
        }

        getLength() {
            return _book.pages.length
        }

        getMode() {
            return _book.mode
        }

        // METHODS
        flipPage(theArgs) {
            let index = parseInt(theArgs[0]) - 1
            if (index.between(0, _book.pages.length)) _flipPage(theArgs[0])
        }

        hasPage(theArgs) {
            let index = parseInt(theArgs[0]) - 1
            return index.between(0, _book.pages.length) ? true : false
        }

        removePage(theArgs) {
            let index = parseInt(theArgs[0]) - 1
            if (index.between(0, _book.pages.length)) _removePage(index)
        }


        addPage(theArgs) {
            let index = parseInt(theArgs[1]) - 1
            if (index.between(0, _book.pages.length)) _addPage(theArgs[0], index)
        }

        next() {
            _next(increment(_book.mode))
        }

        previous() {
            _previous(increment(_book.mode))
        }

        // EVENTS


    }

    /***********************************
     ********** Private Methods ********
     ***********************************/

    let viewer = {
        getMatch(query, usePolyfill) {
            return this.testMedia(query, usePolyfill).matches
        },

        onChange(query, cb, usePolyfill) {
            let res = this.testMedia(query, usePolyfill)

            res.addListener(changed => {
                cb.apply({}, [changed.matches, changed.media])
            })
        },

        testMedia(query, usePolyfill) {
            const isMatchMediaSupported = !!(w && w.matchMedia) && !usePolyfill

            if (isMatchMediaSupported) {
                const res = w.matchMedia(query)
                return res
            } else {
                // ... polyfill?
            }
        }
    }


    let _book = new Book()

    function _init(node, settings = { duration: 500, animation: true, curl: true, peel: true, zoom: true }) {
        _book.node = node

        _book.settings = settings

        let nodes = [...node.children]

        _book.buttons = nodes.splice(0, 2)

        _book.pages = nodes.map((page, currentIndex) => {
            return _addBaseClasses(page, currentIndex)
        })

        _removeChildren(node)

        _book.currentPage = (settings.start_page === undefined) ? 1 : (parseInt(settings.start_page) > 0 && parseInt(settings.start_page) < parseInt(_book.pages.length)) ? parseInt(settings.start_page) % parseInt(_book.pages.length) : (parseInt(settings.start_page) % parseInt(_book.pages.length) === 0) ? parseInt(_book.pages.length) : parseInt(settings.start_page) < 0 ? parseInt(_book.pages.length) + 1 + parseInt(settings.start_page) % parseInt(_book.pages.length) : parseInt(settings.start_page) % parseInt(_book.pages.length)

        _setView(_book.currentPage)

        _setRange(_book.currentPage)

        _printBook()

        return
    }

    viewer.onChange('(orientation: landscape)', match => {
        _book.mode = match ? 'landscape' : 'portrait'

        _setView(_book.currentPage)

        _setRange(_book.currentPage)

        _printBook()
    })

    function _removeChildren(node) {
        node.innerHTML = ''
    }

    function _removePage(index) {
        // WARNING: Remove eventListeners please. Avoid memory leakages.

        _book.pages.splice(index, 1);

        _setView(_book.currentPage)

        _setRange(_book.currentPage)

        _printBook()

    }

    function _addPage(pageObj, index) {

        let wrappedObj = _addBaseClasses(pageObj, index)

        _book.pages.splice(index, 0, wrappedObj);

        _setView(_book.currentPage)

        _setRange(_book.currentPage)

        _printBook()
    }

    function _addBaseClasses(pageObj, currentIndex) {

        pageObj.classList.add(`page-${parseInt(currentIndex) + 1}`)

        isEven(currentIndex) ? pageObj.classList.add('page-even') : pageObj.classList.add('page-odd')

        let wrappedHtml = _wrapHtml(pageObj, currentIndex)

        return wrappedHtml
            // return pageObj
    }

    function _wrapHtml(pageObj, currentIndex) {
        const newWrapper = document.createElement('div')

        let classes = 'wrapper'

        classes += isEven(currentIndex) ? ' red' : ' blue'

        addClasses(newWrapper, classes)

        newWrapper.setAttribute('page', parseInt(currentIndex) + 1)

        newWrapper.innerHTML = `<div class="gradient"><h1> ${parseInt(currentIndex) + 1}  </h1> </div>`

        // TODO: Attach clip & shadow element into the DOM.

        // newWrapper.appendChild(pageObj)

        return newWrapper
    }

    function _flipPage(pageNo) {

        _book.currentPage = pageNo

        _setView(_book.currentPage)

        _setRange(_book.currentPage)

        _printBook()

    }

    function _setView(currentPage = 1) {
        let currentIndex = parseInt(currentPage) - 1

        switch (_book.mode) {
            case 'portrait':
                _book.currentView = [`${currentPage}`]
                _book.viewablePages = [_book.pages[`${currentIndex}`]]
                break

            case 'landscape':
                if (isEven(parseInt(currentPage))) {
                    /***
                        @range = _book.pages.slice(P , Q) where:
                            P & Q are integers
                            P & Q may or may not lie in the range 0 < VALUES < 2N (_book.length)
                    ***/

                    let q = (parseInt(currentPage) + 1) > parseInt(_book.pages.length) ? 1 : (parseInt(currentPage) + 1) % parseInt(_book.pages.length)

                    _book.currentView = [`${currentPage}`, `${q}`]
                    _book.viewablePages = [_book.pages[`${currentIndex}`], _book.pages[`${q - 1}`]]
                } else {
                    let p = (parseInt(currentPage) - 1) < 1 ? _book.pages.length : (parseInt(currentPage) - 1) % parseInt(_book.pages.length)

                    _book.currentView = [`${p}`, `${currentPage}`]
                    _book.viewablePages = [_book.pages[`${p - 1}`], _book.pages[`${currentIndex}`]]
                }

                break
        }

        return
    }

    function _setRange(currentPage = 1) {
        let currentIndex = parseInt(currentPage) - 1

        /***
            @range = _book.pages.slice(P , Q) where:
                P, Q, R, S are integers
                P, Q, R, S may or may not lie in the range 0 < VALUES < 2N (_book.length)
        ***/

        switch (_book.mode) {
            case 'portrait':

                // let p = (currentIndex - 2 < 0) ? parseInt(_book.pages.length) + (currentIndex - 2) : (currentIndex - 2)
                // let q = (currentIndex - 1 < 0) ? parseInt(_book.pages.length) + (currentIndex - 1) : (currentIndex - 1)
                // let r = (currentIndex + 1 >= parseInt(_book.pages.length)) ? (currentIndex + 1) - parseInt(_book.pages.length) : (currentIndex + 1)
                // let s = (currentIndex + 2 >= parseInt(_book.pages.length)) ? (currentIndex + 2) - parseInt(_book.pages.length) : (currentIndex + 2)

                let p = _leftCircularIndex(currentIndex, 2)
                let q = _leftCircularIndex(currentIndex, 1)
                let r = _rightCircularIndex(currentIndex, 1)
                let s = _rightCircularIndex(currentIndex, 2)

                _book.sidePagesLeft = [_book.pages[`${p}`], _book.pages[`${q}`]]
                _book.sidePagesRight = [_book.pages[`${r}`], _book.pages[`${s}`]]

                break

            case 'landscape':
                if (isEven(parseInt(currentPage))) {

                    // let p = (currentIndex - 2 < 0) ? parseInt(_book.pages.length) + (currentIndex - 2) : (currentIndex - 2)
                    // let q = (currentIndex - 1 < 0) ? parseInt(_book.pages.length) + (currentIndex - 1) : (currentIndex - 1)
                    // let r = (currentIndex + 2 >= parseInt(_book.pages.length)) ? (currentIndex + 2) - parseInt(_book.pages.length) : (currentIndex + 2)
                    // let s = (currentIndex + 3 >= parseInt(_book.pages.length)) ? (currentIndex + 3) - parseInt(_book.pages.length) : (currentIndex + 3)


                    let p = _leftCircularIndex(currentIndex, 2)
                    let q = _leftCircularIndex(currentIndex, 1)
                    let r = _rightCircularIndex(currentIndex, 2)
                    let s = _rightCircularIndex(currentIndex, 3)

                    _book.sidePagesLeft = [_book.pages[`${p}`], _book.pages[`${q}`]]
                    _book.sidePagesRight = [_book.pages[`${r}`], _book.pages[`${s}`]]
                } else {

                    // let p = (currentIndex - 3 < 0) ? parseInt(_book.pages.length) + (currentIndex - 3) : (currentIndex - 3)
                    // let q = (currentIndex - 2 < 0) ? parseInt(_book.pages.length) + (currentIndex - 2) : (currentIndex - 2)
                    // let r = (currentIndex + 1 >= parseInt(_book.pages.length)) ? currentIndex + 1 - parseInt(_book.pages.length) + 1 : (currentIndex + 1)
                    // let s = (currentIndex + 2 >= parseInt(_book.pages.length)) ? currentIndex + 1 - parseInt(_book.pages.length) + 1 : (currentIndex + 2)

                    let p = _leftCircularIndex(currentIndex, 3)
                    let q = _leftCircularIndex(currentIndex, 2)
                    let r = _rightCircularIndex(currentIndex, 1)
                    let s = _rightCircularIndex(currentIndex, 2)

                    _book.sidePagesLeft = [_book.pages[`${p}`], _book.pages[`${q}`]]
                    _book.sidePagesRight = [_book.pages[`${r}`], _book.pages[`${s}`]]
                }

                break
        }

        return
    }

    /***********************************
     *********** DOM Printing **********
     ***********************************/

    function _printBook() {
        _printElements('buttons', _book.buttons)

        _printElements('view', _book.viewablePages)

        _printElements('rightPages', _book.sidePagesRight)

        _printElements('leftPages', _book.sidePagesLeft)

        return
    }

    function _printElements(type, elements) {
        const docfrag = document.createDocumentFragment()

        const node = _book.node

        switch (type) {
            case 'buttons':
                elements.forEach(elem => {
                    docfrag.appendChild(elem)
                })
                break
            case 'view':
                let pageList = elements.map((page, currentIndex) => {
                    return _applyStyles(page, currentIndex, type)
                })

                pageList.forEach(page => {
                    docfrag.appendChild(page)
                })

                break
            case 'rightPages':
                let rightPages = elements.map((page, currentIndex) => {
                    return _applyStyles(page, currentIndex, type)
                })

                rightPages.forEach(page => {
                    docfrag.appendChild(page)
                })

                break
            case 'leftPages':
                let leftPages = elements.map((page, currentIndex) => {
                    return _applyStyles(page, currentIndex, type)
                })

                leftPages.forEach(page => {
                    docfrag.appendChild(page)
                })

                break

        }

        node.appendChild(docfrag)

        return
    }

    function _applyStyles(pageObj, currentIndex, type) {
        let cssString = ''
        switch (_book.mode) {
            case 'portrait':
                switch (type) {
                    case 'view':
                        cssString = 'position: absolute; top: 0; z-index: 2; float: left; left: 0;'

                        pageObj.style.cssText = cssString

                        // cssString += isEven(currentIndex) ? 'float: left; left: 0;' : 'float: right; right: 0; '

                        pageObj.style.cssText = cssString

                        pageObj.id = promoted

                        break
                    case 'rightPages':

                        cssString = 'position: absolute; top: 0; float: left; left: 0; pointer-events:none;'

                        pageObj.style.cssText = cssString

                        cssString += isEven(currentIndex) ? 'z-index: 1; ' : 'z-index: 0;'

                        pageObj.style.cssText = cssString

                        break
                    case 'leftPages':
                        cssString = 'position: absolute; top: 0; float: left; left: 0; pointer-events:none;'

                        pageObj.style.cssText = cssString

                        cssString += isEven(currentIndex) ? 'z-index: 1; ' : 'z-index: 0;'

                        pageObj.style.cssText = cssString

                        break
                }

                break
            case 'landscape':
                switch (type) {
                    case 'view':
                        cssString = 'position: absolute; top: 0; z-index: 3;'

                        pageObj.style.cssText = cssString

                        cssString += isEven(currentIndex) ? 'float: left; left: 0;' : 'float: right; right: 0; '

                        pageObj.style.cssText = cssString

                        break
                    case 'rightPages':
                        cssString = 'float: right; position: absolute; top: 0; right: 0; pointer-events:none;'

                        pageObj.style.cssText = cssString

                        cssString += isEven(currentIndex) ? 'z-index: 2; ' : 'z-index: 1;'

                        pageObj.style.cssText = cssString

                        break
                    case 'leftPages':
                        cssString = 'float: left; position: absolute; top: 0; left: 0; pointer-events:none;'

                        pageObj.style.cssText = cssString

                        cssString += isEven(currentIndex) ? 'z-index: 1; ' : 'z-index: 2;'

                        pageObj.style.cssText = cssString

                        break

                }
        }
        return pageObj
    }


    /***********************************
     *********** DOM/Book flips **********
     ***********************************/


    function _next(increment) {
        // newCurrentPage = parseInt(_book.currentPage) + parseInt(increment)

        // console.log('newCurrentPage', newCurrentPage)
    }


    function _previous(increment) {
        // newCurrentPage = parseInt(_book.currentPage) + parseInt(increment)

        // console.log('newCurrentPage', newCurrentPage)
    }


    /**********************************/
    /********* Events / Touch *********/
    /**********************************/


    //  Window level listener.

    w.addEventListener('resize', _getDimensions)
    w.onload = _getDimensions

    function _getDimensions() {
        let book = {}

        book.bounds = d.getElementById('plotter').getBoundingClientRect(); // http://caniuse.com/#feat=getboundingclientrect

        d.getElementById('pwidth').textContent = book.bounds.width
        d.getElementById('pheight').textContent = book.bounds.height
        d.getElementById('ptop').textContent = book.bounds.top
        d.getElementById('pleft').textContent = book.bounds.left
        d.getElementById('pright').textContent = book.bounds.right
        d.getElementById('pbottom').textContent = book.bounds.bottom

        // origin = d.getElementById('origin').getBoundingClientRect()

        let origin = {}

        origin.bounds = d.getElementsByTagName('body')[0].getBoundingClientRect()

        // origin.bounds = d.getElementById('plotter').getBoundingClientRect()

        d.getElementById('originX').textContent = parseInt(origin.bounds.width) / 2
        d.getElementById('originY').textContent = parseInt(origin.bounds.height) / 2
    }

    //  Book level event listeners.

    let delegateElement = d.getElementById('plotter')

    let handler = (event) => {

        event.stopPropagation()

        event.preventDefault()

        switch (event.type) {
            case 'mousemove':
                handleMouseMove(event)
                break
            case 'wheel':
                handleWheelEvent(event)
                break
            case 'mouseover':
                handleMouseOver(event)
                break
            case 'click':
                handleMouseClicks(event)
                break
            case 'dblclick':
                handleMouseDoubleClicks(event)
                break
            case 'mousedown':
                handleMouseDown(event)
                break
            case 'mouseup':
                handleMouseUp(event)
                break
            case 'mouseout':
                handleMouseOut(event)
                break
            case 'touchstart':
                handleTouchStart(event)
                break
            case 'touchmove':
                handleTouchMove(event)
                break
            case 'touchend':
                handleTouchEnd(event)
                break
            default:
                console.log(event);
                break
        }
    }

    ['mousemove', 'wheel', 'mouseover', 'mousedown', 'mouseup', 'mouseout', 'click', 'dblclick', 'touchstart', 'touchend', 'touchmove'].forEach(event => {
        delegateElement.addEventListener(event, handler)
    })

    function handleWheelEvent(event) {
        // TODO: Determine forward / backward swipe.
    }

    function handleMouseMove(event) {
        let eventDoc
        let doc
        let body
        let pageX
        let pageY

        event = event || w.event

        if (event.pageX === null && event.clientX !== null) {
            eventDoc = (event.target && event.target.ownerDocument) || d

            doc = eventDoc.documentElement

            body = eventDoc.body

            event.pageX = event.clientX +
                (doc && doc.scrollLeft || body && body.scrollLeft || 0) -
                (doc && doc.clientLeft || body && body.clientLeft || 0)
            event.pageY = event.clientY +
                (doc && doc.scrollTop || body && body.scrollTop || 0) -
                (doc && doc.clientTop || body && body.clientTop || 0)
        }

        d.getElementById('xaxis').textContent = event.pageX
        d.getElementById('yaxis').textContent = event.pageY
    }


    function handleMouseClicks(event) {

        if (!event.target) return

        let currentIndex = parseInt(_book.currentPage) - 1

        switch (event.target.nodeName) {
            case 'A':
                switch (_book.mode) {
                    case 'portrait':

                        if (event.target.matches('a#next')) {
                            let increment = 1 // Forward
                            _book.currentPage = _rightCircularIndex(currentIndex, increment) + 1
                        }

                        if (event.target.matches('a#previous')) {
                            let decrement = 1 // Backward
                            _book.currentPage = _leftCircularIndex(currentIndex, decrement) + 1
                        }

                        break
                    case 'landscape':
                        if (event.target.matches('a#next')) {
                            let increment = isEven(_book.currentPage) ? 2 : 1 // Forward
                            _book.currentPage = _rightCircularIndex(currentIndex, increment) + 1
                        }

                        if (event.target.matches('a#previous')) {
                            let decrement = isOdd(_book.currentPage) ? 2 : 1 // Backward
                            _book.currentPage = _leftCircularIndex(currentIndex, decrement) + 1
                        }

                        break
                }

                console.log('new current', _book.currentPage)

                _setView(_book.currentPage)

                _setRange(_book.currentPage)

                // event.target.className += ' flip forward'

                // _printElements('rightPages', _book.sidePagesRight)

                _printBook()



                break
            case 'DIV':
                console.log("A page was clicked!", event);
                break
            default:
                console.log('WUT', event.target)
                return
        }


    }


    function handleMouseOver(event) {
        let currentIndex = parseInt(_book.currentPage) - 1

        if (!event.srcElement.getAttribute('page')) return

        // TODO Trigger a peel?

        switch (_book.mode) {
            case 'portrait':
                let previousPages = [_book.pages[`${ _leftCircularIndex(currentIndex, 3) }`]]
                let nextPages = _rightCircularIndex(currentIndex, 3)

                break
            case 'landscape':
                // console.log(event.srcElement.getAttribute('page'))

                // let leftAppendage = _leftCircularIndex
        }


    }


    function handleMouseDoubleClicks(event) {
        // console.log('Do you wanna make a snowman?')
    }

    function handleMouseDown(event) {
        // console.log('Down!')
    }

    function handleMouseUp(event) {
        // console.log('Up!')
    }

    function handleMouseOut(event) {
        // console.log('Out!')
    }

    function handleTouchStart(event) {
        // console.log('Touch started')
    }

    function handleTouchMove(event) {
        // console.log('Touch moving')
    }

    function handleTouchEnd(event) {
        // console.log('Touch moving')
    }


    /* Listen for CSS3 TransitionEnds */

    function whichTransitionEvent() {
        let t
        const el = d.createElement('fakeelement')
        const transitions = {
            'transition': 'transitionend',
            'OTransition': 'oTransitionEnd',
            'MozTransition': 'transitionend',
            'WebkitTransition': 'webkitTransitionEnd'
        }

        for (t in transitions) {
            if (el.style[t] !== undefined) {
                return transitions[t]
            }
        }
    }

    const transitionEvent = whichTransitionEvent()

    transitionEvent && d.addEventListener(transitionEvent, (event) => {
        console.log(event.propertyName)
    });


    /**********************************/
    /********* Helper methods *********/
    /**********************************/

    function isEven(n) {
        return n === parseFloat(n) ? !(n % 2) : void 0
    }

    function isOdd(n) {
        return Math.abs(n % 2) == 1
    }

    function isTouch() {
        return (('ontouchstart' in w) || (n.MaxTouchPoints > 0) || (n.msMaxTouchPoints > 0)) // TODO: Do we need this? Consider pointerEvents.
    }

    function _leftCircularIndex(currentIndex, indice) {
        return (parseInt(currentIndex) - parseInt(indice) < 0) ? parseInt(_book.pages.length) + (parseInt(currentIndex) - parseInt(indice)) : (parseInt(currentIndex) - parseInt(indice))
    }

    function _rightCircularIndex(currentIndex, indice) {
        return (parseInt(currentIndex) + parseInt(indice) >= parseInt(_book.pages.length)) ? (parseInt(currentIndex) + parseInt(indice)) - parseInt(_book.pages.length) : (parseInt(currentIndex) + parseInt(indice))
    }

    function increment(mode) {
        return (mode === 'portrait') ? 1 : 2
    }

    function direction(mode) {
        // return (mode === 'portrait') ? 'forward' : 'backward'
    }


    /********************************/
    /********* Cone geometry ********/
    /********************************/

    let π = Math.PI






    /**********************************/
    /************ Polyfills ***********/
    /**********************************/


    DOMTokenList.prototype.addmany = function(classes) {
        var classes = classes.split(' '),
            i = 0,
            ii = classes.length

        for (i; i < ii; i++) {
            this.add(classes[i])
        }
    }

    DOMTokenList.prototype.removemany = function(classes) {
        var classes = classes.split(' '),
            i = 0,
            ii = classes.length

        for (i; i < ii; i++) {
            this.remove(classes[i])
        }
    }

    let addClasses = function(elem, classes) {
        elem.classList.addmany(classes)
    }

    let removeClasses = function(elem, classes) {
        elem.classList.removemany(classes)
    }

    Number.prototype.between = function(min, max) {
        return this > min && this < max;
    };

    /**********************************/
    /*********** Exposed API **********/
    /**********************************/

    class Superbook {
        flippy(methodName, ...theArgs) {
            switch (methodName) {
                case 'length':
                    return _book['getLength']()
                    break
                case 'mode':
                    return _book['getMode']()
                    break
                case 'page':
                    if (theArgs.length === 0)
                        return _book['page']()
                    else
                        _book['flipPage'](theArgs)
                    break

                default:
                    return _book[methodName](theArgs)
                    break
            }
        }
    }

    // Putting superbook object in global namespace.
    if (typeof(w.Flippy) === 'undefined') {
        w.Flippy = {
            init(node, settings) {
                _init(node, settings)
                return new Superbook()
            }
        }
    }
}))(navigator, window, document)
