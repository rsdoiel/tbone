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
 * Notes: runs under NodeJS and web browsers
 */
/*jslint devel: true, node: true, maxerr: 25, indent: 4,  vars: true, sloppy: true */
var TBone = require("../tbone"),
	markup = new TBone.HTML();

// Displaying an HTML 5 valid HTML page.
console.log(markup.html(
	markup.head(
		markup.title("Hello World")
	),
	markup.body(
		markup.h1("Hello World")
	)
));
