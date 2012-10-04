/**
 * tbone_test.js - basic functionality tests for tbone.js's functions.
 *
 * author R. S. Doiel, <rsdoiel@gmail.com>
 *
 * copyright (c) 2011 all rights reserved
 *
 * Released under New the BSD License.
 * See: http://opensource.org/licenses/bsd-license.php
 *
 * Notes: runs under NodeJS, Mongo 2.2 shell and web browsers
 */
/*jslint devel: true, node: true, maxerr: 50, indent: 4,  vars: true, sloppy: true */

var	assert = require('assert'),
	harness = require("../lib/harness.js"),
	tbone = require("../tbone");

var	assert = require('assert'),
	harness = require("../lib/harness.js"),
	TBone = require('../tbone');

harness.push({callback: function () {
	var s,
		expected_s,
		threw_error = false,
		tb = new TBone.HTML();
	
	// assembleAttributes() tests
	expected_s = "";
	s = tb.assembleAttributes();
	assert.strictEqual(s, expected_s, "\n" + s + "\n" + expected_s);
	
	expected_s = 'class="content"';
	s = tb.assembleAttributes({"class": "content"});
	assert.strictEqual(s, expected_s, "\n" + s + "\n" + expected_s);

	expected_s = 'id="me" class="content"';
	s = tb.assembleAttributes({id: "me", "class": "content"});
	assert.strictEqual(s, expected_s, "\n" + s + "\n" + expected_s);
	
	try {
		s = tb.assembleAttributes(1);
	} catch (err) {
		threw_error = true;
	}
	assert.strictEqual(threw_error, true, "Should throw an error when passed a number");
	
	// disassembleAttributes() tests
	expected_s = {id: "me"};
	s = tb.disassembleAttributes('id="me"');
	assert.strictEqual(s.id, expected_s.id, "\n" + s.id + "\n" + expected_s.id);
	
	// disassembleAttributes() tests
	expected_s = {id: "me", "class": "content"};
	s = tb.disassembleAttributes('id="me" class="content"');
	assert.strictEqual(s.id, expected_s.id, "\n" + s.id + "\n" + expected_s.id);
	assert.strictEqual(s["class"], expected_s["class"], "\n" + s["class"] + "\n" + expected_s["class"]);

	threw_error = false;
	try {
		s = tb.disassembleAttributes(1);
	} catch (err) {
		threw_error = true;
	}
	assert.strictEqual(threw_error, true, "Should throw an error when passed a non-string");
	harness.completed("attributes");
}, label: "attributes"});

harness.push({callback: function () {
	var s,
		expected_s,
		tb = new TBone.HTML();
	
	tb.label = "p";
	expected_s = "<p></p>";
	s = tb.toString();
	assert.strictEqual(s, expected_s, "\n" + s + "\n" + expected_s);

	tb.label = "p";
	tb.attributes = tb.assembleAttributes({id: "me", "class": "content"});
	tb.content = "";
	expected_s = '<p id="me" class="content"></p>';
	s = tb.toString();
	assert.strictEqual(s, expected_s, "\n" + s + "\n" + expected_s);

	tb.label = "p";
	tb.attributes = tb.assembleAttributes({id: "me", "class": "content"});
	tb.content = "Hello World";
	expected_s = '<p id="me" class="content">Hello World</p>';
	s = tb.toString();
	assert.strictEqual(s, expected_s, "\n" + s + "\n" + expected_s);

	tb.label = "";
	tb.attributes = "";
	tb.content = "Hello World";
	expected_s = 'Hello World';
	s = tb.toString();
	assert.strictEqual(s, expected_s, "\n" + s + "\n" + expected_s);
	

	tb.label = "br";
	tb.attributes = "";
	tb.content = "";
	expected_s = "<br />";
	s = tb.toString();
	assert.strictEqual(s, expected_s, "\n" + s + "\n" + expected_s);

	tb.label = "br";
	tb.attributes = tb.assembleAttributes({id: "me", "class": "content"});
	tb.content = "";
	expected_s = '<br id="me" class="content" />';
	s = tb.toString();
	assert.strictEqual(s, expected_s, "\n" + s + "\n" + expected_s);

	harness.completed("simple toString()");
}, label: "simple toString()"});

harness.push({callback: function () {
	var s, expected_s, tb = new TBone.HTML();
	
	assert.ok(tb, "Should have an object created by new TBone.HTML()");
	expected_s = "<div></div>";
	s = tb.div().toString();
	assert.equal(s, expected_s, "\n[" + s + "]\n[" + expected_s + "]");

	tb.label = 'div';
	tb.attributes = tb.assembleAttributes({id: "me"});
	expected_s = '<div id="me"></div>';
	s = tb.div().attr({id: "me"}).toString();
	assert.equal(s, expected_s, "\n[" + s + "]\n[" + expected_s + "]");
	harness.completed("prototype div");
    
    tb.label = '';
    tb.attributes = '';
    tb.content = '';
    expected_s = '<div>Hello World</div>';
    s = tb.div("Hello World").toString();
    assert.strictEqual(s, expected_s, "\n" + s + "\n" + expected_s);

    tb.label = '';
    tb.attributes = '';
    tb.content = '';
    tb.label = 'div';
	tb.attributes = tb.assembleAttributes({id: "me"});
	expected_s = '<div id="me">Hello World</div>';
	s = tb.div("Hello World").attr({id: "me"}).toString();
	assert.strictEqual(s, expected_s, "\n" + s + "\n" + expected_s);

    // Now try nesting
    tb.label = '';
    tb.attributes = '';
    tb.content = '';
	expected_s = '<div><div>Hello World</div></div>';
	s = tb.div(tb.div("Hello World")).toString();
	assert.strictEqual(s, expected_s, "\n" + s + "\n" + expected_s);

    tb.label = '';
    tb.attributes = '';
    tb.content = '';
    expected_s = '<div id="outer"><div id="inner">Hello World</div></div>';
	s = tb.div(tb.div("Hello World").attr({id: "inner"})).attr({id: "outer"}).toString();
	assert.strictEqual(s, expected_s, "\n" + s + "\n" + expected_s);

    harness.completed("prototype div");
}, label: "prototype div"});

harness.push({callback: function () {
	var s, expected_s, tb = new tbone.HTML();
	
	assert.ok(tb, "Should have an object created by new tbone.HTML()");
	expected_s = "<p></p>";
	s = tb.p();
	assert.equal(s, expected_s, "\n[" + s + "]\n[" + expected_s + "]");

	expected_s = '<p id="me"></p>';
	s = tb.p().attr({id: "me"});
	assert.equal(s, expected_s, "\n[" + s + "]\n[" + expected_s + "]");
}, label: "prototype"});

/*
harness.push({callback: function () {
	// Test the factory method
	var s, expected_s, i, tb;

    tb = new tbone.HTML();

    expected_s = '<!DOCTYPE html>' + "\n" + '<html></html>';
	s = tb.html('').toString();
	assert.equal(s, expected_s, "\n" + s + "\n" + expected_s);

    expected_s = '<!DOCTYPE html>' + "\n" + '<html lang="en"></html>';
    s = tb.html('').attr({lang: "en"}).toString();
    assert.equal(s, expected_s, "\n" + s + "\n" + expected_s);

    expected_s = '<head></head>';
	s = tb.head('').toString();
    assert.equal(s, expected_s, "\n" + s + "\n" + expected_s);

    expected_s = '<title>hello world</title>';
	s = tb.title('hello world').toString();
    assert.equal(s, expected_s, "\n" + s + "\n" + expected_s);

    expected_s = '<link />';
	s = tb.link('').toString();
    assert.equal(s, expected_s, "\n" + s + "\n" + expected_s);

    expected_s = '<body></body>';
	s = tb.body('').toString();
    assert.equal(s, expected_s, "\n" + s + "\n" + expected_s);

    expected_s = '<h1>hello world</h1>';
	s = tb.h1('hello world').toString();
    assert.equal(s, expected_s, "\n" + s + "\n" + expected_s);

    expected_s = '<h2>hello world</h2>';
	s = tb.h2('hello world').toString();
    assert.equal(s, expected_s, "\n" + s + "\n" + expected_s);

    expected_s = '<h3>hello world</h3>';
	s = tb.h3('hello world').toString();
    assert.equal(s, expected_s, "\n" + s + "\n" + expected_s);

    expected_s = '<h4>hello world</h4>';
	s = tb.h4('hello world').toString();
    assert.equal(s, expected_s, "\n" + s + "\n" + expected_s);

	expected_s = '<h5>hello world</h5>';
	s = tb.h5('hello world').toString();
    assert.equal(s, expected_s, "\n" + s + "\n" + expected_s);

    expected_s = '<h6>hello world</h6>';
	s = tb.h6('hello world').toString();
    assert.equal(s, expected_s, "\n" + s + "\n" + expected_s);

    expected_s = "<p>";
	s = tb.p().toString();
    assert.equal(s, expected_s, "\n" + s + "\n" + expected_s);

    expected_s = "<p>hello world</p>";
	s = tb.p("hello world").toString();
    assert.equal(s, expected_s, "\n" + s + "\n" + expected_s);

    expected_s = "<a></a>";
	s = tb.a("").toString();
    assert.equal(s, expected_s, "\n" + s + "\n" + expected_s);

    expected_s = "<a href=\"http://example.com\">here</a>";
	s = tb.a("here").attr({href: "http://example.com"}).toString();
    assert.equal(s, expected_s, "\n" + s + "\n" + expected_s);

    expected_s = "<a href=\"http://example.com\" title=\"I'm here\">here</a>";
	s = tb.a("here").attr({
        "href": "http://example.com",
        title: "I'm here"
    }).toString();
    assert.equal(s, expected_s, "\n" + s + "\n" + expected_s);

    expected_s = "<ul></ul>";
	s = tb.ul('').toString();
    assert.equal(s, expected_s, "\n" + s + "\n" + expected_s);

    expected_s = '<ol></ol>';
    s = tb.ol('').toString();
    assert.equal(s, expected_s, "\n" + s + "\n" + expected_s);

    expected_s = '<li></li>';
	s = tb.li('').toString();
    assert.equal(s, expected_s, "\n" + s + "\n" + expected_s);

    expected_s = '<dl></dl>';
	s = tb.dl('').toString();
    assert.equal(s, expected_s, "\n" + s + "\n" + expected_s);

    expected_s = '<dt></dt>';
	s = tb.dt('').toString();
    assert.equal(s, expected_s, "\n" + s + "\n" + expected_s);

    expected_s = '<dd></dd>';
	s = tb.dd('').toString();
    assert.equal(s, expected_s, "\n" + s + "\n" + expected_s);

    expected_s = '<table></table>';
	s = tb.table('').toString();
    assert.equal(s, expected_s, "\n" + s + "\n" + expected_s);

    expected_s = '<tr></tr>';
	s = tb.tr('').toString();
    assert.equal(s, expected_s, "\n" + s + "\n" + expected_s);

    expected_s = '<td></td>';
	s = tb.td('').toString();
    assert.equal(s, expected_s, "\n" + s + "\n" + expected_s);

    expected_s = '<form></form>';
	s = tb.form().toString();
    assert.equal(s, expected_s, "\n" + s + "\n" + expected_s);

    expected_s = '<input />';
	s = tb.input().toString();
    assert.equal(s, expected_s, "\n" + s + "\n" + expected_s);

    expected_s = '<input value="Something" />';
    s = tb.input().attr({value: "Something"}).toString();
    assert.equal(s, expected_s, "\n" + s + "\n" + expected_s);

    expected_s = '<select></select>';
	s = tb.select().toString();
    assert.equal(s, expected_s, "\n" + s + "\n" + expected_s);


    expected_s = '<option></option>';
	s = tb.option().toString();
    assert.equal(s, expected_s, "\n" + s + "\n" + expected_s);

    expected_s = '<select name="location"></select>';
	s = tb.select().attr({name: "location"}).toString();
    assert.equal(s, expected_s, "\n" + s + "\n" + expected_s);

    expected_s = '<option value="Los Angeles"></option>';
	s = tb.option().attr({value: "Los Angeles"}).toString();
    assert.equal(s, expected_s, "\n" + s + "\n" + expected_s);

    expected_s = '<label></label>';
	s = tb.label().toString();
    assert.equal(s, expected_s, "\n" + s + "\n" + expected_s);

    expected_s = '<header></header>';
	s = tb.header().toString();
    assert.equal(s, expected_s, "\n" + s + "\n" + expected_s);

    expected_s = '<footer></footer>';
	s = tb.footer().toString();
    assert.equal(s, expected_s, "\n" + s + "\n" + expected_s);

	// test for toHtml5Entities()
	var test_strings = [
		"Hello World!",
        "“Hello World!”",
        "Fred" + String.fromCharCode(180) + "s Car",
        "Fred" + String.fromCharCode(8217) + "s Car",
        "this is\nanother line.",
        "&\nthat was it."
	];
	var expected_strings = [
		"Hello World!",
        "&ldquo;Hello World!&rdquo;",
        "Fred&acute;s Car",
        "Fred&rsquo;s Car",
        "this is&NewLine;another line.",
        "&&NewLine;that was it."
	];
	var result_string;

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
}, label: "Tests 0.0.0 - 0.0.3e"});

harness.push({callback: function () {
	var s,
		expected_s,
		HTML = new tbone.HTML(),
		CSS = new tbone.CSS(),
		JS = new tbone.JS();

	s = HTML.html(
		HTML.head(
			HTML.title("Simple 0")
		),
		HTML.body(
			HTML.h1("Sample 0"),
			HTML.p("Hello World")
		)
	).toString();
	expected_s = '<!DOCTYPE html>\n<html><head><title>Simple 0</title></head><body><h1>Simple 0</h1><p>Hellow World</p></body></html>';
	assert.equal(s, expected_s, "\n" + s + "\n" + expected_s);
}, label: "Tests 0.1.0 - 0.1.1"});

*/

if (require.main === module) {
	harness.RunIt("tbone_test.js", 10, true);
} else {
	exports.RunIt = harness.RunIt;
}
