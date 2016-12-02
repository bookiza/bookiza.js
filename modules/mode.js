((w, d, undefined) => {
    module.exports = {
        getMatch(query, usePolyfill) {
            // TODO: Consider d.addEventListener('DOMContentLoaded', function(event) { }

            return testMedia(query, usePolyfill).matches
        },

        onChange(query, cb, usePolyfill) {
            let res = testMedia(query, usePolyfill)

            res.addListener(changed => {
                cb.apply({}, [changed.matches, changed.media])
            })
        }

    }

    // Private
    function testMedia(query, usePolyfill) {
        const isMatchMediaSupported = !!(w && w.matchMedia) && !usePolyfill

        if (isMatchMediaSupported) {
            const res = w.matchMedia(query)

            return res
        } else {
            // ... polyfill
        }
    }

})(window, document)



// let mode = (window.innerWidth > window.innerHeight) ? 'landscape' : 'portrait'

// console.log('FIRSTMODE', mode, 'innerWidth=', window.innerWidth, 'innerHeight=', window.innerHeight)

// window.addEventListener('resize', e => { 

//     let newMode = (window.innerWidth > window.innerHeight) ? 'landscape' : 'portrait'

//     if(newMode !== mode) {
//         console.log('RESIZEDMODE', mode, 'innerWidth=', window.innerWidth, 'innerHeight=', window.innerHeight)
//     }
// }, true);


