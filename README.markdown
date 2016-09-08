# flippy.JS

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