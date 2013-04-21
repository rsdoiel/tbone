
/**
 * tbone is a simple library for assembling valid HTML.
 *
 * Inspiration "Behind the Code: Avoiding Spaghetti" by Jason Grosman
 * http://www.npr.org/blogs/inside/2011/02/02/126312263/behind-the-code-avoiding-spaghetti-html
 *
 * HTML markup reference was http://en.wikipedia.org/wiki/HTML_element#HTML401
 *
 * author R. S. Doiel, <rsdoiel@gmail.com>
 *
 * copyright (c) 2011 all rights reserved
 *
 * Released under the Simplified BSD License.
 * See: http://opensource.org/licenses/bsd-license.php
 *
 * Notes: runs under NodeJS and web browsers
 */

/*jslint devel: true, maxerr: 25, indent: 4,  vars: true, sloppy: true */
/*global YUI */
var YUI = require("yui").YUI;

YUI({
    useSync: true,
    modules: {
        "tbone": {
            fullpath: "./src/gallery-tbone/tbone.js"
        }
    }
}).use("tbone", function (Y) {
    exports.HTML = Y.TBone.HTML;
});

