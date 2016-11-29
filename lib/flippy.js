// Copyright Notice: All rights reserved. © 2016 - 2017 Marvin Danig
// FLIPPY VERSION::0.0.1' 


import viewer from '../modules/mode.js'
import graph from '../modules/graph.js'
//import events from '../modules/events.js'

(((w, d, undefined) => {

    /**********************************/
    /************ Public API **********/
    /**********************************/

    class Book {
        constructor(node, settings = {duration: 500, animation: true, curl: true, peel: true, zoom: true}) {
            this.node = node
            this.settings = settings
            this.mode = viewer.getMatch('(orientation: landscape)') ? 'double' : 'single'
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

    /**********************************/
    /*********** Private API **********/
    /**********************************/

    let _book = new Book();

    function _init(node, settings) {

        let nodes = [...node.children]

        _book.buttons = nodes.splice(0, 2)

        _book.pages = nodes.map((page, index) => {
            return _addBaseClasses(page, index)
        })

        _removeChildren(node)

        console.log(settings.start_page)

        // _printBook(settings.start_page) 

        console.log(_book.mode)      

        return

    }

    viewer.onChange('(orientation: landscape)', match => {
        _book.mode = match ? 'double' : 'single'

        console.log(_book.mode)

        //_init(_book.node, _book.settings)
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

    /**********************************/
    /********** DOM Printing **********/
    /**********************************/

    function _printBook(current_page = 1){
        // _calculateView()
        // _applyStyles()
        // _docFrag

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



