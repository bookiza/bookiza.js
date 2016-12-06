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

        _book.currentPage = (settings.start_page === undefined) ? 1 : parseInt(settings.start_page) > 0 ? parseInt(settings.start_page) % parseInt(_book.pages.length) : (parseInt(settings.start_page) % parseInt(_book.pages.length) !== 0) ? parseInt(_book.pages.length) + 1 + parseInt(settings.start_page) % parseInt(_book.pages.length) : 1 

        _setView(_book.currentPage) 

        _setRange(_book.currentPage) 

        _printBook()

        return
    }

    viewer.onChange('(orientation: landscape)', match => {
        _book.mode = match ? 'landscape' : 'portrait'

        // _setViewAndRange(_book.currentPage)

        // _printBook()
        // _applyMode(_book.node)
    })


    function _removeChildren(node) {
        node.innerHTML = ''
            // Which is performant?
            // while (node.hasChildNodes())         
            // node.removeChild(node.lastChild)
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
                _book.currentView = [ currentPage ]
                _book.viewablePages = [ _book.pages[`${currentIndex}`] ]
                break

            case 'landscape':
                if (isEven(parseInt(currentPage))) { 
                    /*** 
                        @range = _book.pages.slice(P , Q) where:
                            P & Q are integers 
                            P & Q may or may not lie in the range 0 < VALUES < 2N (_book.length) 
                    ***/

                    // parseInt(settings.start_page) > 0 ? parseInt(settings.start_page) % parseInt(_book.pages.length) : (parseInt(settings.start_page) % parseInt(_book.pages.length) !== 0) ? parseInt(_book.pages.length) + 1 + parseInt(settings.start_page) % parseInt(_book.pages.length) : 1 

                    // let q = (parseInt(currentPage) + 1) < 0 ? (parseInt(currentPage) + 1) % parseInt(_book.pages.length) : 

                    _book.currentView = [`${currentIndex}`, `${currentIndex + 1}` ] 
                    _book.viewablePages = [ _book.pages[ `${currentIndex}` ], _book.pages[`${currentIndex + 1}`] ]
                } else {
                    _book.currentView = [`${currentIndex - 1}`, `${currentIndex}`] 
                    _book.viewablePages = [ _book.pages[`${currentIndex - 1}`], _book.pages[ `${currentIndex}` ] ]
                }
                
                break
        }

        return

    }

    function _setRange(currentPage = 1) {

        /*** 
            @range = _book.pages.slice(P , Q) where:
                P & Q are integers 
                P & Q may or may not lie in the range 0 < VALUES < 2N (_book.length) 
        ***/

        switch (_book.mode) {
            case 'portrait':
                _book.range = _book.pages.slice(parseInt(_book.currentView[0]) - 3, parseInt(_book.currentView[0]) + 3)
                break

            case 'landscape':
                _book.range = _book.pages.slice(parseInt(_book.currentView[0]) - 3, parseInt(_book.currentView[1]) + 2)
                break
        }

        return
    }



    /***********************************
     *********** DOM Printing **********
     ***********************************/

    function _printBook() {
        
        _printButtons(_book.node)

        _printViewablePages(_book.node)

        // console.log('CURRENT PAGE', _book.currentPage)

        // console.log('VIEW', _book.currentView)

        // console.log('RANGE', _book.range)

        // console.log('BOOK', _book.pages)        

        return
    }

    function _printViewablePages(node) {

        const docfrag = document.createDocumentFragment()

        const pageList = _book.viewablePages.map((page, currentIndex) => {
            return _applyStyles(page, currentIndex)
        })

        pageList.forEach(page => {
            docfrag.appendChild(page)
        })

        // let newElem = node.cloneNode();
        // newElem.innerHTML = '';
        // newElem.appendChild(docfrag);

        // node.parentNode.replaceChild(newElem, node)
        node.appendChild(docfrag) 
        return
    }

    function _printButtons(node) {
        for (let i = 0; i < 2; i++) {
            node.appendChild(_book.buttons[i])
        }
    }

    function _applyMode() {
        switch (_book.mode) {
            case 'portrait':
                break
            case 'landscape':
                break
        }
    }


    function _applyStyles(pageObj, currentIndex) {
        switch (_book.mode) {
            case 'portrait':
                if (pageObj.classList.contains('left')) pageObj.classList.remove('left') // Inline style?
                if (pageObj.classList.contains('right')) pageObj.classList.remove('right')

                break
            case 'landscape':
                let classes = isEven(currentIndex) ? 'left' : 'right'
                if (!pageObj.classList.contains(classes)) pageObj.classList.add(classes)
                break
        }
        pageObj.setAttribute('style', 'background: rgba(0, 100, 200, 0.4);');
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
