// Copyright Notice: All rights reserved. © 2016 - 2017 Marvin Danig
// FLIPPY VERSION::0.0.1'

// import viewer from '../modules/mode.js'
// import '../modules/graph.js'
// import events from '../modules/events.js'

(((w, d, undefined) => {
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
                // ... polyfill
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

        let classes = 'wrapper promoted'

        classes += isEven(currentIndex) ? ' red' : ' blue'

        addClasses(newWrapper, classes)

        newWrapper.setAttribute('page', parseInt(currentIndex) + 1)

        newWrapper.innerHTML = `<h1> ${parseInt(currentIndex) + 1}  </h1>`

        //TODO: Attach clip & shadow element into the DOM.

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

                let p = (currentIndex - 2 < 0) ? parseInt(_book.pages.length) + (currentIndex - 2) : (currentIndex - 2)
                let q = (currentIndex - 1 < 0) ? parseInt(_book.pages.length) + (currentIndex - 1) : (currentIndex - 1)

                let r = (currentIndex + 1 >= parseInt(_book.pages.length)) ? (currentIndex + 1) - parseInt(_book.pages.length) : (currentIndex + 1)
                let s = (currentIndex + 2 >= parseInt(_book.pages.length)) ? (currentIndex + 2) - parseInt(_book.pages.length) : (currentIndex + 2)

                _book.sidePagesLeft = [_book.pages[`${p}`], _book.pages[`${q}`]]
                _book.sidePagesRight = [_book.pages[`${r}`], _book.pages[`${s}`]]

                break

            case 'landscape':
                if (isEven(parseInt(currentPage))) {
                    let p = (currentIndex - 2 < 0) ? parseInt(_book.pages.length) + (currentIndex - 2) : (currentIndex - 2)
                    let q = (currentIndex - 1 < 0) ? parseInt(_book.pages.length) + (currentIndex - 1) : (currentIndex - 1)

                    let r = (currentIndex + 2 >= parseInt(_book.pages.length)) ? (currentIndex + 2) - parseInt(_book.pages.length) : (currentIndex + 2)
                    let s = (currentIndex + 3 >= parseInt(_book.pages.length)) ? (currentIndex + 3) - parseInt(_book.pages.length) : (currentIndex + 3)

                    _book.sidePagesLeft = [_book.pages[`${p}`], _book.pages[`${q}`]]
                    _book.sidePagesRight = [_book.pages[`${r}`], _book.pages[`${s}`]]
                } else {
                    let p = (currentIndex - 3 < 0) ? parseInt(_book.pages.length) + (currentIndex - 3) : (currentIndex - 3)
                    let q = (currentIndex - 2 < 0) ? parseInt(_book.pages.length) + (currentIndex - 2) : (currentIndex - 2)

                    let r = (currentIndex + 1 >= parseInt(_book.pages.length)) ? currentIndex + 1 - parseInt(_book.pages.length) + 1 : (currentIndex + 1)
                    let s = (currentIndex + 2 >= parseInt(_book.pages.length)) ? currentIndex + 1 - parseInt(_book.pages.length) + 1 : (currentIndex + 2)

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


    /**********************************/
    /********* Events / Touch *********/
    /**********************************/


    //  Window level listener.

    w.addEventListener('resize', getDimensions)
    w.onload = getDimensions

    function getDimensions() {
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

        event.cancelBubble = true;

        switch (event.type) {
            case 'mousemove':
                handleMouseMove(event)
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
            default:
                console.log(event);
                break
        }
    }

    ['mousemove', 'mouseover', 'click'].forEach(event => {
        delegateElement.addEventListener(event, handler)

    })

    function handleMouseMove(e) {
        let eventDoc
        let doc
        let body
        let pageX
        let pageY

        e = e || w.e

        if (e.pageX === null && e.clientX !== null) {
            eventDoc = (e.target && e.target.ownerDocument) || document

            doc = eventDoc.documentElement

            body = eventDoc.body

            e.pageX = e.clientX +
                (doc && doc.scrollLeft || body && body.scrollLeft || 0) -
                (doc && doc.clientLeft || body && body.clientLeft || 0)
            e.pageY = e.clientY +
                (doc && doc.scrollTop || body && body.scrollTop || 0) -
                (doc && doc.clientTop || body && body.clientTop || 0)
        }

        d.getElementById('xaxis').textContent = e.pageX
        d.getElementById('yaxis').textContent = e.pageY
    }


    function handleMouseClicks(event) {

        if (!event.target) return

        switch (event.target.nodeName) {
            case 'A':
                console.log("Button", event.target.id, " was clicked!");
                break
            case 'DIV':
                console.log("A page was clicked!");
                break
            default:
                console.log('WUT')
                return
        }
        // if (event.target && event.target.matches('a#next')) {
        //     console.log("Anchor next was clicked!");
        // }


    }


    function handleMouseOver(event) {
        console.log('Prepare docFrags for left and right')
    }


    function handleMouseDoubleClicks(event) {
        console.log('Do you wanna make a snowman?')
    }


    function whichTransitionEvent() {
        let t
        const el = document.createElement('fakeelement')
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

    /* Listen for a transitionEnd */

    const transitionEvent = whichTransitionEvent();

    transitionEvent && document.addEventListener(transitionEvent, (e) => {
        console.log(e)
        console.log('Transition complete!  This is the callback, no library needed!');
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
}))(window, document)
