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
var fs = require("fs"),
	path = require("path"),
	TBone = require("../tbone");

//
// Generate a simple HTML page.
//
var HTML = new TBone.HTML(),
	page_source = HTML.html(
		HTML.head(
			HTML.title("Simple 0")
		),
		HTML.body(
			HTML.h1("Sample 0"),
			HTML.p("Hello World")
		)
	).toString();

// Display it
console.log(page_source);
// Render it to disc as sample-0.html
fs.writeFile("sample-0.html", page_source);
