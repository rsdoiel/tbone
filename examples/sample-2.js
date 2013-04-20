/**
 * simple-2.js - this generates a simple "Hello World" page.
 *
 * author R. S. Doiel, <rsdoiel@gmail.com>
 *
 * copyright (c) 2012 all rights reserved
 *
 * Released under the Simplified BSD License.
 * See: http://opensource.org/licenses/bsd-license.php
 *
 * Notes: runs under NodeJS and web browsers
 */
/*jslint devel: true, node: true, maxerr: 25, indent: 4,  vars: true, sloppy: true */
var YUI = require("yui").YUI;

YUI().use("tbone", function (Y) {
    var TBone = Y.TBone,
	    markup = new TBone.HTML(),
	    page_source;

    //
    // Generate a simple HTML page.
    //
    page_source = markup.html(
	    markup.head(
	    	markup.title("Sample 2")
	    ),
	    markup.body(
	    	markup.h1("Sample 2").attr({"class": "banner"}),
		    markup.p("Hello Again World").attr({"class": "content"})
	    )
    );

    // Display it
    Y.log(page_source);
});
