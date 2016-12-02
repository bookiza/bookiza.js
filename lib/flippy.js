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
            this.mode = viewer.getMatch('(orientation: landscape)') ? 'landscape' : 'portrait'
        }

        getLength() {
            return _book.pages.length
        }

        flip(page_no) {
            _book.current_page = page_no
            console.log(_book.current_page)
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

        _book.pages = nodes.map((page, index) => {
            return _addBaseClasses(page, index)
        })

        _removeChildren(node)

        _printBook(settings.start_page)

        return

    }

    viewer.onChange('(orientation: landscape)', match => {
        _book.mode = match ? 'landscape' : 'portrait'
            // _applyMode(_book.node)
    })


    function _removeChildren(node) {
        node.innerHTML = ''
            // Which is performant?
            // while (node.hasChildNodes())         
            // node.removeChild(node.lastChild)
    }

    function _addBaseClasses(pageObj, index) {
        pageObj.classList.add(`page-${parseInt(index) + 1}`)
        if (isEven(index)) pageObj.classList.add('page-even')
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

    /***********************************
     *********** DOM Printing **********
     ***********************************/

    function _printBook(current_page = 1) {
        _printButtons(_book.node)

        _book.current_page = current_page



        _calculateViewAndRange(_book.current_page)

        // _printView(_book.node)

        return
    }

    function _calculateViewAndRange(current_page) {

        switch (_book.mode) {
            case 'portrait':
                _book.view = [parseInt(current_page)]
                _book.range = _book.pages.slice(parseInt(_book.view[0]) - 3, parseInt(_book.view[0]) + 3)

                break

            case 'landscape':
                if (isEven(parseInt(current_page))) { _book.view = [parseInt(current_page), parseInt(current_page + 1)] }
                if (isOdd(parseInt(current_page))) { _book.view = [parseInt(current_page - 1), parseInt(current_page)] }

                _book.range = _book.pages.slice(parseInt(_book.view[0]) - 3, parseInt(_book.view[1]) + 2)

                break
        }

        console.log('CURRENT PAGE', current_page)

        console.log('VIEW', _book.view)

        console.log('RANGE', _book.range)

        console.log('BOOK', _book.pages)

        return
    }

    function _printView(node) {

        const docfrag = document.createDocumentFragment()

        for (let i = 0; i < 2; i++) {
            docfrag.appendChild(_book.buttons[i]) // Add button objects to frag.
        }

        // const pageList = _book.range.map((page, index) => {
        //     return _applyStyles(page, index)
        // })

        _book.range.forEach(page => {
            docfrag.appendChild(page)
        })

        let newElem = node.cloneNode();
        newElem.innerHTML = '';
        newElem.appendChild(docfrag);

        node.parentNode.replaceChild(newElem, node)
            // node.appendChild(docfrag) 
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


    function _applyStyles(pageObj, index) {
        switch (_book.mode) {
            case 'portrait':
                if (pageObj.classList.contains('left')) pageObj.classList.remove('left') // Inline style?
                if (pageObj.classList.contains('right')) pageObj.classList.remove('right')

                break
            case 'landscape':
                let classes = isEven(index) ? 'left' : 'right'
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
