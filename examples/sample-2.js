/**
 * simple-0.js - this generates a simple "Hello World" page.
 *
 * author R. S. Doiel, <rsdoiel@gmail.com>
 *
 * copyright (c) 2012 all rights reserved
 *
 * Released under the Simplified BSD License.
 * See: http://opensource.org/licenses/bsd-license.php
 *
 * Notes: runs under NodeJS, Mongo 2.2 shell and web browsers
 */
/*jslint devel: true, node: true, maxerr: 25, indent: 4,  vars: true, sloppy: true */
var TBone = require("../tbone"),
	markup = new TBone.HTML(),
	page_source;

//
// Generate a simple HTML page.
//
page_source = markup.html(
	markup.head(
		markup.title("Simple 1")
	),
	markup.body(
		markup.h1("Sample 1").attr({"class": "banner"}),
		markup.p("Hello Again World").attr({"class": "content"})
	)
);

// Display it
console.log(page_source);
