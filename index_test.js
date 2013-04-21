/**
 * tbone is a simple library for assembling valid HTML. It is available in
 * three languages - Go, JavaScript and PHP.
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
 * Notes: runs under NodeJS, Mongo 2.2 shell and web browsers
 */

/*jslint devel: true, maxerr: 25, indent: 4,  vars: true, sloppy: true */
/*global YUI */

var assert = require("assert"),
    TBone = require("./index"),
    markup = new TBone.HTML();

//console.log(YUITest);
[{
    name: "Test tbone as a stand-alone NodeJS module",
    "Check the types of the object created": function () {
        assert.strictEqual(typeof markup, "object");
    },
    "Should create a paragraph tag": function () {
        assert.strictEqual(
            markup.p("This is a test").attr({class: "lots-of-words"}),
            '<p class="lots-of-words">This is a test</p>');
    }
}].forEach(function(test) {
    console.log("Running as Node Module:", test.name);
    Object.keys(test).forEach(function (ky) {
        if (ky.match(/should|\s+/g)) {
            console.log("\tStarting -", ky);
            test[ky]();
            console.log("\tSuccess!!", ky);
        }
    });
});

