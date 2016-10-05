import '../css/style.css';

import 'babel-polyfill';


import book from '../lib/book.js';


console.log(Book.settings);

Book.addPage(4);

Book.removePage(3);

console.log(Book.page());

console.log(Book.view());

console.log(Book.next());

console.log(Book.prev());

console.log(Book.π);


function λ(selector) {

  let self = {};

  self.selector = selector;

  self.element = document.getElementById(self.selector);

  self.html = function(){
    return self.element;
  };

  self.on = function(type, callback) {
    self.element['on' + type] = callback;
  };

  return self;
}

λ('book').on('click', function(event){
  console.log(event);
});

λ('prev').on('click', Book.prev);
λ('next').on('click', Book.next);
Book.load(0);