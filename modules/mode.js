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






// 1.
// const mq = (query, cb, usePolyfill) => {
//     const host = {}
//     const isMatchMediaSupported = !!(w && w.matchMedia) && !usePolyfill

//     if (isMatchMediaSupported) {
//         const res = w.matchMedia(query)

//         cb.apply(host, [res.matches, res.media])

//         res.addListener(changed => {
//             cb.apply(host, [changed.matches, changed.media])
//         })
//     } else {
//         // ... polyfill
//     }
// }

// mq('all and (min-width: 870px)', function(match) {
//     mode = match ? 'double' : 'single'
//     console.log(mode); 
// })
