[![Build Status](https://travis-ci.org/marvindanig/flippy.JS.svg?branch=master)](https://travis-ci.org/marvindanig/flippy.JS) 
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![npm](https://img.shields.io/npm/dt/flippy.JS.svg?maxAge=2592000)](https://www.npmjs.com/package/flippy)

# flippy.JS

A leafy responsive alternative to Turnjs. No jQuery dependency. No javascript fallback.

## API

In your HTML:

```
  <div id = "book"> 
      <div class = "page"> Page-1 content here…</div>
      <div class = "page"> Page-2 content here…</div>
      <div class = "page"> Page-3 content here…</div>
      …
      …
      <div class = "page"> Page-2N content here…</div>
  </div>

```

Invocation with `script.js`:

```
  let superbook = document.getElementById('book');
  

  superbook.flippy({
      boolean: true,
      iframeSupport: true
  });

```