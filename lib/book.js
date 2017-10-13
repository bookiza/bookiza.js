// function flippy() {
//     const _book = {} // Expose book to DOM.

//     /********* *************** ********/
//     /*********** Public API ***********/
//     /********* *************** ********/

//     _book.flippy = 'VERSION::0.0.1' // Pick up from SEMVER?

//     // One time initialization.
//     _book.init = (settings = { duration: 500, animation: true, curl: true, allowZoom: false }) => oneTimeInit(settings)

//     viewer.onChange('(orientation: landscape)', match => {
//         _book.mode = match ? 'double' : 'single'

//         printBook(_book.settings, _book.settings.start_page)
//     })

//     /********* *************** ********/
//     /********* Private methods ********/
//     /********* *************** ********/

//     function oneTimeInit(settings) {
//         const node = d.getElementById('book')

//         // observer.observe(node, observerConfig);

//         let nodes = [...node.children] // Scoop up pages and buttons here. Yay!

//         _book.buttons = nodes.splice(0, 2)

//         _book.pages = nodes.map((page, index) => {
//             return addBaseClasses(page, index)
//         })

//         _book.size = _book.pages.length // Check if _book.length is even

//         removeChildren(node)

//         _book.mode = viewer.getMatch('(orientation: landscape)') ? 'double' : 'single'

//         _book.settings = settings

//         printBook(_book.settings, _book.settings.start_page)

//         return _book
//     }

//     function printBook(settings, current_page = 1) {
//         const node = d.getElementById('book')

//         estimateViewAndRange(current_page)

//         printPages(node)
//     }

//     function removeChildren(node) {
//         node.innerHTML = '' // performant?
//             // while (node.hasChildNodes())
//             // node.removeChild(node.lastChild)
//     }

//     function printButtons(node) {
//         for (let i = 0; i < 2; i++) {
//             node.appendChild(_book.buttons[i])
//         }
//     }

//     function estimateViewAndRange(current_page) {
//         switch (_book.mode) {
//             case 'single':
//                 _book.view = [parseInt(current_page - 1)]
//                 _book.range = _book.pages.slice(parseInt(_book.view[0]) - 3, parseInt(_book.view[0]) + 3) // Array indices start at 0.

//                 break

//             case 'double':
//                 if (isEven(parseInt(current_page))) { _book.view = [parseInt(current_page), parseInt(current_page + 1)] }
//                 if (isOdd(parseInt(current_page))) { _book.view = [parseInt(current_page - 1), parseInt(current_page)] }

//                 _book.range = _book.pages.slice(parseInt(_book.view[0]) - 3, parseInt(_book.view[1]) + 2) // Array indices start at 0.

//                 break

//         }
//     }

//     function printPages(node) {

//         const docfrag = document.createDocumentFragment()

//         for (let i = 0; i < 2; i++) {
//             docfrag.appendChild(_book.buttons[i]) // Add button objects to frag.
//         }

//         const pageList = _book.range.map((page, index) => {
//             return applyStyles(page, index)
//         })

//         // console.log('Number of pages in renderTree', _book.range.length)

//         pageList.forEach(page => {
//             docfrag.appendChild(page)
//         })

//         let newElem = node.cloneNode();
//         newElem.innerHTML = '';
//         newElem.appendChild(docfrag);

//         node.parentNode.replaceChild(newElem, node)
//         // node.appendChild(docfrag) // To DOM. Use insertBefore?
//     }

//     /********* *************** ********/
//     /********* Book observer **********/
//     /********* *************** ********/

//     const observer = new MutationObserver(mutations => {
//         // For the sake of...observation...let's output the mutation to console to see how this all works
//         mutations.forEach(mutation => {
//             // console.log(mutation.type)
//         })
//     })

//     // Notify me of everything!
//     const observerConfig = {
//         attributes: true,
//         childList: true,
//         characterData: true
//     };

//     /********* *************** ********/
//     /********* Helper methods *********/
//     /********* *************** ********/

//     function addBaseClasses(pageObj, index) {
//         pageObj.classList.add(`page-${parseInt(index) + 1}`)
//         if (isEven(index)) pageObj.classList.add('page-even')
//             else pageObj.classList.add('page-odd')

//         // let wrappedHtml = wrapHtml(pageObj)

//         return pageObj
//             // return wrappedHtml
//     }

//     function wrapHtml(pageObj) {
//         const newWrapper = document.createElement('div'); // May be required. May not be required.

//         // Do whatever.
//         newWrapper.setAttribute('style', 'pointer-events: none; position:absolute; top: 0; left :0; overflow:none; height: 100%;')
//         newWrapper.classList.add('page')
//         newWrapper.appendChild(pageObj)

//         // console.log(newWrapper)

//         return newWrapper
//     }

//     function applyStyles(pageObj, index) {
//         switch (_book.mode) {
//             case 'single':
//                 if (pageObj.classList.contains('left')) pageObj.classList.remove('left') // Inline style?
//                 if (pageObj.classList.contains('right')) pageObj.classList.remove('right')

//                 break
//             case 'double':
//                 let classes = isEven(index) ? 'left' : 'right'
//                 if (!pageObj.classList.contains(classes)) pageObj.classList.add(classes)
//                 break
//         }
//         pageObj.setAttribute('style', 'background: rgba(0, 100, 200, 0.4);');
//         return pageObj
//     }

//     // insertBefore?
//     function insertAfter(newNode, referenceNode) {
//         referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling)
//     }

//     function isEven(n) {
//         return n === parseFloat(n) ? !(n % 2) : void 0
//     }

//     function isOdd(n) {
//         return Math.abs(n % 2) == 1
//     }

//     /********* *************** ********/
//     /************ Cone Maths **********/
//     /********* *************** ********/

//     let π = Math.PI

//     return _book
// }

// ;((window, document, undefined) => {
//   'use strict'

//   // This function will contain all our code
//   function book () {
//     const _self = {}

//     // Configuration options
//     _self.settings = {
//       duration: 500,
//       animation: true,
//       curl: true,
//       allowZoom: false
//     }

//     _self.events = {
//       end: function end () {},
//       start: function start () {}
//     }

//     // We will add functions to our library here !
//     _self.version = '0.0.0'

//     _self.mode = 'double'

//     _self.turning = 'true/false'

//     _self.turned = 'true/false' //

//     _self.zooming = 'true/false' // boolean state

//     _self.zoomed = 'true/false' // boolean state

//     _self.page_number = 1

//     _self.page = function () {
//       return 'page_number'
//     }

//     _self.view = function () {
//       return 'view_array'
//     }

//     _self.size = function () {
//       return '[height, width]'
//     }

//     _self.direction = 'forward'

//     _self.next = function () {
//       _self.direction = 'forward'
//       return _self.direction
//     }

//     _self.prev = function () {
//       _self.direction = 'backward'
//       return _self.direction
//     }

//     _self.hasPage = function (pageNo) {
//       console.log('Returns if page exist: ', pageNo)
//     }

//     _self.addPage = function (pageNo, content) {
//       console.log('Adding page number: ', content, 'at', pageNo)
//     }

//     _self.removePage = function (pageNo) {
//       console.log('Remove page number: ', pageNo)
//     }

//     let _registerEvents = function () {
//       console.log('events are good!')
//     }

//     /* Cone math */
//     _self.π = Math.PI

//     return _self
//   }

//   // Put the book object in global namespace.
//   if (typeof (window.Book) === 'undefined') {
//     window.Book = book()
//   }
// })(window, document)

// import graph from '../modules/graph.js'

// import viewer from '../modules/mode.js'

// ;((w, d, undefined) => {

//   // // Print to dom.
//   // book.range = [1, 6]

//   // function printRange(range) {
//   //     for (let i = range[0]; i <= range[1]; i++) {
//   //         let elem = book.pages[i - 1]
//   //         elem.id = i
//   //         node.appendChild(elem)
//   //     }
//   // }

//   // function printButtons() {

//   //     for (let i = 0; i < 2; i++) {
//   //         node.appendChild(book.buttons[i])
//   //     }

//   // }

//   // printButtons()

//   // printRange(book.range)

//   // d.getElementById('plotter').addEventListener('mouseenter', (event) => {

//   //     d.getElementById('next').addEventListener('click', () => {
//   //         turnPage('next')
//   //     })

//   //     d.getElementById('prev').addEventListener('click', () => {
//   //         turnPage('prev')
//   //     })

//   // })

//   // d.getElementById('plotter').addEventListener('mouseleave', (event) => {

//   //     d.getElementById('next').removeEventListener('click', () => {
//   //         turnPage('next')
//   //     })

//   //     d.getElementById('prev').removeEventListener('click', () => {
//   //         turnPage('prev')
//   //     })

//   // })

//   // function turnPage(direction) {

//   //     switch (direction) {
//   //         case 'next':

//   //             removePage(book.range[0])
//   //             addPage(book.range[1] + 1)
//   //             book.range[0]++
//   //             book.range[1]++
//   //             break

//   //         case 'prev':

//   //             removePage(book.range[1])
//   //             addPage(book.range[0] - 1)
//   //             book.range[0]--
//   //             book.range[1]--

//   //             break

//   //     }

//   //     // updateView
//   // }

//   // function removePage(pageNumber) {
//   //     console.log('Remove ' + pageNumber)
//   //     node.removeChild(d.getElementById(pageNumber))
//   // }

//   // function addPage(pageNumber) {
//   //     console.log('Add ' + pageNumber)
//   //     let elem = book.pages[pageNumber - 1]
//   //     elem.id = pageNumber
//   //     node.appendChild(elem)
//   // }

//   // console.table(book)

// })(window, document)

// // λ('book').on('click', function (event) {
// //   console.log(event)
// // })

// // λ('prev').on('click', Book.prev)
// // λ('next').on('click', Book.next)

// console.log(Flip.)

// console.log(Book.settings)

// let content = '<div> hello world </div>'

// Book.addPage(4, content)

// Book.removePage(3)

// console.log(Book.page())

// console.log(Book.view())

// console.log(Book.next())

// console.log(Book.prev())

// console.log(Book.π)

/*************************
******* what? ***********
*************************/

// function λ (selector) {
//   let self = {}

//   self.selector = selector

//   self.element = document.getElementById(self.selector)

//   self.html = function () {
//     return self.element
//   }

//   self.on = function (type, callback) {
//     self.element['on' + type] = callback
//   }

//   return self
// }

// console.log(λ('book'))

// ;((w, d, undefined) => {

//   let _book = {

//   }

//   // Step-1 Receive:

//   // Page stacker and handler.

//   function flippy (method, cb) {
//     return _book.publicMethods[method].call(null, cb)
//   }

//   if (typeof (w.Flippy) === 'undefined') {
//     w.Flippy = flippy
//   }
// })(window, document)
