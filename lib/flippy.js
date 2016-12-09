// Copyright Notice: All rights reserved. © 2016 - 2017 Marvin Danig
// FLIPPY VERSION::0.0.1'

import viewer from '../modules/mode.js'
import '../modules/graph.js'
// import events from '../modules/events.js'

(((w, d, undefined) => {
    /***********************************
     ************* Public API **********
     ***********************************/

    class Book {
        constructor() {
            this.mode = viewer.getMatch('(orientation: landscape)') ? 'landscape' : 'landscape'
        }

        getLength() {
            return _book.pages.length
        }

        view() {
            return _book.currentView
        }

        flip(page_no) {
            _book.currentPage = page_no
            console.log(_book.currentPage)
                //TODO: Calculate pages and print the book
        }
    }

    /***********************************
     ********** Private Methods ********
     ***********************************/

    let _book = new Book();


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

    function _addBaseClasses(pageObj, currentIndex) {
        pageObj.classList.add(`page-${parseInt(currentIndex) + 1}`)
        if (isEven(currentIndex)) pageObj.classList.add('page-even')
        else pageObj.classList.add('page-odd')

        return pageObj

        // let wrappedHtml = wrapHtml(pageObj)
        // return wrappedHtml
    }

    function _wrapHtml(pageObj) {
        const newWrapper = document.createElement('div'); // May be required. May not be required.

        newWrapper.setAttribute('style', 'pointer-events: none; position:absolute; top: 0; left :0; overflow:none; height: 100%;')
        newWrapper.classList.add('page')
        newWrapper.appendChild(pageObj)

        return newWrapper
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

                    _book.currentView = [`${currentPage}`, `${ q }`]
                    _book.viewablePages = [_book.pages[`${currentIndex}`], _book.pages[`${ q - 1 }`]]
                } else {


                    let p = (parseInt(currentPage) - 1) < 1 ? _book.pages.length : (parseInt(currentPage) - 1) % parseInt(_book.pages.length)

                    _book.currentView = [`${ p }`, `${currentPage}`]
                    _book.viewablePages = [_book.pages[`${ p - 1 }`], _book.pages[`${currentIndex}`]]
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

                _book.sidePagesLeft = [_book.pages[`${ p }`], _book.pages[`${ q }`]]
                _book.sidePagesRight = [_book.pages[`${ r }`], _book.pages[`${ s }`]]

                break

            case 'landscape':
                if (isEven(parseInt(currentPage))) {

                    let p = (currentIndex - 2 < 0) ? parseInt(_book.pages.length) + (currentIndex - 2) : (currentIndex - 2)
                    let q = (currentIndex - 1 < 0) ? parseInt(_book.pages.length) + (currentIndex - 1) : (currentIndex - 1)


                    let r = (currentIndex + 2 >= parseInt(_book.pages.length)) ? (currentIndex + 2) - parseInt(_book.pages.length) : (currentIndex + 2)
                    let s = (currentIndex + 3 >= parseInt(_book.pages.length)) ? (currentIndex + 3) - parseInt(_book.pages.length) : (currentIndex + 3)

                    _book.sidePagesLeft = [_book.pages[`${ p }`], _book.pages[`${ q }`]]
                    _book.sidePagesRight = [_book.pages[`${ r }`], _book.pages[`${ s }`]]

                } else {

                    let p = (currentIndex - 3 < 0) ? parseInt(_book.pages.length) + (currentIndex - 3) : (currentIndex - 3)
                    let q = (currentIndex - 2 < 0) ? parseInt(_book.pages.length) + (currentIndex - 2) : (currentIndex - 2)


                    let r = (currentIndex + 1 >= parseInt(_book.pages.length)) ? currentIndex + 1 - parseInt(_book.pages.length) + 1 : (currentIndex + 1)
                    let s = (currentIndex + 2 >= parseInt(_book.pages.length)) ? currentIndex + 1 - parseInt(_book.pages.length) + 1 : (currentIndex + 2)


                    _book.sidePagesLeft = [_book.pages[`${ p }`], _book.pages[`${ q }`]]
                    _book.sidePagesRight = [_book.pages[`${ r }`], _book.pages[`${ s }`]]

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
        switch (_book.mode) {
            case 'portrait':
                // if (pageObj.classList.contains('left')) pageObj.classList.remove('left') // Inline style?
                // if (pageObj.classList.contains('right')) pageObj.classList.remove('right')

                break
            case 'landscape':
                switch (type) {
                    case 'view':
                        let classes = isEven(currentIndex) ? 'left' : 'right'
                        if (!pageObj.classList.contains(classes)) pageObj.classList.add(classes)

                        break
                    case 'rightPages':                        
                        if (!pageObj.classList.contains('right')) pageObj.classList.add('right')

                        break
                    case 'leftPages':
                        if (!pageObj.classList.contains('left')) pageObj.classList.add('left')

                        break

                }

        }
        return pageObj
    }



    /**********************************/
    /********* Helper methods *********/
    /**********************************/

    function isEven(n) {
        return n === parseFloat(n) ? !(n % 2) : void 0
    }

    function isOdd(n) {
        return Math.abs(n % 2) == 1
    }


    /**********************************/
    /*********** Exposed API **********/
    /**********************************/

    class Superbook {
        flippy(methodName, ...theArgs) {
            switch (methodName) {
                case 'length':
                    return _book['getLength'](...theArgs)
                    break
                default:
                    return _book[methodName](...theArgs)
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
