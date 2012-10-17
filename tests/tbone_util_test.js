/**
 * tbone_util.js - a set of utility methods left over from re-writing tbone.js.
 * These will probably be abandoned sometime in the future.
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
/*jslint devel: true, node: true, maxerr: 25, indent: 4,  vars: true, sloppy: true */

var path = require("path"),
	assert = require("assert"),
	harness = require("harness"),
	tb = require("../tbone_util"),
	test_name = "tbone_util_test.js";

try {
	test_name = path.basename(module.filename);
} catch (err) {
}

harness.push({callback: function (test_label) {
	//
	// fromHTML5Entities(), toHTML5Entities() are content normalization
	// methods to improve the quality of the tbone output
	//
	// References notes were:
	// See: http://www.w3.org/TR/html4/sgml/entities.html
	// See: http://theorem.ca/~mvcorks/code/charsets/latin1.html
	// See: http://en.wikipedia.org/wiki/List_of_XML_and_HTML_UTIL_character_entity_reference
	
	
	// test for toHtml5Entities()
	var test_strings = [
			"Hello World!",
			"“Hello World!”",
			"Fred" + String.fromCharCode(180) + "s Car",
			"Fred" + String.fromCharCode(8217) + "s Car",
			"this is\nanother line.",
			"&\nthat was it."
		],
		expected_strings = [
			"Hello World!",
			"&ldquo;Hello World!&rdquo;",
			"Fred&acute;s Car",
			"Fred&rsquo;s Car",
			"this is&NewLine;another line.",
			"&&NewLine;that was it."
		],
		result_string,
		i = 0;

	for (i = 0; i < test_strings.length && i < expected_strings.length; i += 1) {
		result_string = tb.toHTML5Entities(test_strings[i]);
		assert.equal(result_string, expected_strings[i], ['to Expected [', expected_strings[i], '] found [', result_string, ']'].join(""));
	}

	for (i = 0; i < test_strings.length && i < expected_strings.length; i += 1) {
		result_string = tb.fromHTML5Entities(expected_strings[i]);
		assert.equal(result_string, test_strings[i], ['from Expected [', test_strings[i], '] found [', result_string, ']'].join(""));
	}

	test_strings = [
		'big <font>red</font>',
		'big <font color=red>red</font> bus',
		'big <font color="red">red</font> bus',
		'big <font class=\'red-bus\' id="test" style="margin: 30px;">red</font> bus'
	];
	expected_strings = [
		"big red",
		"big red bus",
		"big red bus",
		"big red bus"
	];

	for (i = 0; i < test_strings.length && i < expected_strings.length; i += 1) {
		result_string = tb.stripFontTags(test_strings[i]);
		assert.equal(result_string, expected_strings[i], ["No. ", (i + 1), ' to Expected [', expected_strings[i], '] found [', result_string, ']'].join(""));
	}
			  
	harness.completed(test_label);
}, label: "prototype"});

harness.RunIt(test_name, 10);