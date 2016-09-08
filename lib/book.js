((window, document, undefined) => {
    'use strict';

    // This function will contain all our code
    function book() {


        const _self = {};

        // Configuration options.

        _self.settings = {
            duration: 500,
            animation: true,
            curl: true,
            allowZoom: false
        };

        _self.events = {
          end: function end(){ },
          start: function start(){ }
        };

        // We will add functions to our library here !
        _self.version = '0.0.0';

        _self.mode = 'double';

        _self.turning = 'true/false';

        _self.turned = 'true/false';

        _self.zooming = 'true/false';

        _self.zoomed = 'true/false';


        _self.page = function() {
          return 'page_number';
        };

        _self.view = function() {
          return 'view_array';
        };

        _self.size = function() {
          return '[height, width]';
        };

        _self.direction = 'forward';

        _self.next = function() {
          _self.direction = 'forward';

          return _self.direction;
        };

        _self.prev = function() {
          _self.direction = 'backward';

          return _self.direction;
        };


        _self.hasPage = function(pageNo) {
            console.log('Returns if page exist: ', pageNo);
        };

        _self.addPage = function(pageNo) {
            console.log('Adding page number: ', pageNo);
        };

        _self.removePage = function(pageNo) {
            console.log('Remove page number: ', pageNo);
        };


        let _registerEvents = function() {
            // Put listeners
            console.log('events are good!');
        };


        /* Cone math */

        _self.π = Math.PI;



        return _self;
    }

    // Put the book in global namespace.
    if (typeof(window.Book) === 'undefined') {
        window.Book = book();
    }

})(window, document);


import graph from '../modules/graph.js';

import viewer from '../modules/mode.js';


// ((w, d, undefined) => {

//     let node = d.getElementById('book');

//     let book = {};

//     book.mode = viewer.getMatch('all and (min-width: 870px)') ? 'double' : 'single';

//     viewer.onChange('all and (min-width: 870px)', function(match) {
//         book.mode = match ? 'double' : 'single';
//     });

//     // Scoop up pages and buttons here.
//     let nodes = [...node.children];

//     book.buttons = nodes.splice(0, 2);

//     book.pages = nodes.map(obj => {
//         return wrapPage(obj);
//     });

//     function wrapPage(pageObj) {
//         // Wrapper function here.
//         return pageObj;
//     }

//     removeChildren(node);

//     function removeChildren(node) {
//         while (node.hasChildNodes())
//             node.removeChild(node.lastChild);
//     }

//     book.length = book.pages.length;






//     // // Print to dom.
//     // book.range = [1, 6];


//     // function printRange(range) {
//     //     for (let i = range[0]; i <= range[1]; i++) {
//     //         let elem = book.pages[i - 1];
//     //         elem.id = i;
//     //         node.appendChild(elem);
//     //     }
//     // }

//     // function printButtons() {

//     //     for (let i = 0; i < 2; i++) {
//     //         node.appendChild(book.buttons[i]);
//     //     }


//     // }

//     // printButtons();



//     // printRange(book.range);





//     // d.getElementById('plotter').addEventListener('mouseenter', (event) => {

//     //     d.getElementById('next').addEventListener('click', () => {
//     //         turnPage('next');
//     //     });

//     //     d.getElementById('prev').addEventListener('click', () => {
//     //         turnPage('prev');
//     //     });

//     // });

//     // d.getElementById('plotter').addEventListener('mouseleave', (event) => {

//     //     d.getElementById('next').removeEventListener('click', () => {
//     //         turnPage('next');
//     //     });

//     //     d.getElementById('prev').removeEventListener('click', () => {
//     //         turnPage('prev');
//     //     });

//     // });


//     // function turnPage(direction) {

//     //     switch (direction) {
//     //         case 'next':

//     //             removePage(book.range[0]);
//     //             addPage(book.range[1] + 1);
//     //             book.range[0]++;
//     //             book.range[1]++;
//     //             break;

//     //         case 'prev':

//     //             removePage(book.range[1]);
//     //             addPage(book.range[0] - 1);
//     //             book.range[0]--;
//     //             book.range[1]--;

//     //             break;

//     //     }

//     //     // updateView
//     // }


//     // function removePage(pageNumber) {
//     //     console.log('Remove ' + pageNumber);
//     //     node.removeChild(d.getElementById(pageNumber));
//     // }

//     // function addPage(pageNumber) {
//     //     console.log('Add ' + pageNumber);
//     //     let elem = book.pages[pageNumber - 1];
//     //     elem.id = pageNumber;
//     //     node.appendChild(elem);
//     // }

//     // console.table(book);


// })(window, document);
