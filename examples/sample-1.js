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
		"<!-- Test comment -->",
		markup.title("Simple 0")
	),
	markup.body(
		markup.h1("Sample 0"),
		markup.p("Hello World")
	)
);

// Display it
console.log(page_source);
