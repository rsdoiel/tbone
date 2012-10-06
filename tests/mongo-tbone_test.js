/**
 * mongo-tbone_test.js - basic functionality tests for tbone.js's 
 * under the Mongo DB Shell 2.2 functions.
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
	harness = require("harness"),
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
	
	expected_s = "<p>";
	s = tb.p();
	assert.strictEqual(s, expected_s, "\n" + s + "\n" + expected_s);

	expected_s = "<p></p>";
	s = tb.p("");
	assert.strictEqual(s, expected_s, "\n" + s + "\n" + expected_s);

	expected_s = '<p>Hi there</p>';
	s = tb.p("Hi there");
	assert.strictEqual(s, expected_s, "\n" + s + "\n" + expected_s);

	expected_s = '<p id="me" class="content"></p>';
	s = tb.p().attr({id: "me", "class": "content"});
	assert.strictEqual(s, expected_s, "\n" + s + "\n" + expected_s);

	expected_s = '<p id="me" class="content">Hello World</p>';
	s = tb.p("Hello World").attr({id: "me", "class": "content"});
	assert.strictEqual(s, expected_s, "\n" + s + "\n" + expected_s);

	expected_s = 'Hello World';
	s = tb.assembleTag(null, "Hello World", null);
	assert.strictEqual(s, expected_s, "\n" + s + "\n" + expected_s);

	expected_s = "<br />";
	s = tb.br();
	assert.strictEqual(s, expected_s, "\n" + s + "\n" + expected_s);

	expected_s = '<br id="me" class="content" />';
	s = tb.br().attr({id: "me", "class": "content"});
	assert.strictEqual(s, expected_s, "\n" + s + "\n" + expected_s);

	harness.completed("simple toString()");
}, label: "simple toString()"});

harness.push({callback: function () {
	var s, expected_s, tb = new TBone.HTML();
	
	assert.ok(tb, "Should have an object created by new TBone.HTML()");
	expected_s = "<div></div>";
	s = tb.div();
	assert.equal(s, expected_s, "\n[" + s + "]\n[" + expected_s + "]");

	tb.label = 'div';
	tb.attributes = tb.assembleAttributes({id: "me"});
	expected_s = '<div id="me"></div>';
	s = tb.div().attr({id: "me"});
	assert.equal(s, expected_s, "\n[" + s + "]\n[" + expected_s + "]");
	harness.completed("prototype div");
    
    tb.label = '';
    tb.attributes = '';
    tb.content = '';
    expected_s = '<div>Hello World</div>';
    s = tb.div("Hello World");
    assert.strictEqual(s, expected_s, "\n" + s + "\n" + expected_s);

    tb.label = '';
    tb.attributes = '';
    tb.content = '';
    tb.label = 'div';
	tb.attributes = tb.assembleAttributes({id: "me"});
	expected_s = '<div id="me">Hello World</div>';
	s = tb.div("Hello World").attr({id: "me"});
	assert.strictEqual(s, expected_s, "\n" + s + "\n" + expected_s);

    // Now try nesting
    tb.label = '';
    tb.attributes = '';
    tb.content = '';
	expected_s = '<div><div>Hello World</div></div>';
	s = tb.div(tb.div("Hello World"));
	assert.strictEqual(s, expected_s, "\n" + s + "\n" + expected_s);

    tb.label = '';
    tb.attributes = '';
    tb.content = '';
    expected_s = '<div id="outer"><div id="inner">Hello World</div></div>';
	s = tb.div(tb.div("Hello World").attr({id: "inner"})).attr({id: "outer"});
	assert.strictEqual(s, expected_s, "\n" + s + "\n" + expected_s);

	expected_s = "<p></p>";
	s = tb.p().attr();
	assert.equal(s, expected_s, "\n" + s + "\n" + expected_s);

	expected_s = '<p id="me"></p>';
	s = tb.p().attr({id: "me"});
	assert.equal(s, expected_s, "\n" + s + "\n" + expected_s + "]");
	
    harness.completed("simple tags");
    
    expected_s = "<div><!-- comment --><p></p></div>"
    s = tb.div("<!-- comment -->", "<p></p>").attr();
	assert.equal(s, expected_s, "\n" + s + "\n" + expected_s + "]");

    expected_s = "<div><!-- comment --><p></p><!-- closing comment --></div>"
    s = tb.div("<!-- comment -->", "<p></p>", "<!-- closing comment -->").attr();
	assert.equal(s, expected_s, "\n" + s + "\n" + expected_s + "]");
    
    expected_s = "<div><!-- comment --><p>Hi there.</p></div>"
    s = tb.div("<!-- comment -->", tb.p("Hi there.")).attr();
	assert.equal(s, expected_s, "\n" + s + "\n" + expected_s + "]");
	
	harness.completed("simple tags");
}, label: "simple tags"});

harness.push({callback: function () {
	var s, expected_s, tb = new TBone.HTML();
	
	expected_s = '<!DOCTYPE html>\n<html lang="en"><head><title>Hello World</title></head><body><div class="content"><p>Hi there</p></div></body></html>';
	s = tb.html(
			tb.head(
				tb.title("Hello World")
			),
			tb.body(
				tb.div(
					tb.p("Hi there")
				).attr({"class": "content"})
			)
		).attr({lang: "en"});
	assert.equal(s, expected_s, "\n[" + s + "]\n[" + expected_s + "]");	
	
    harness.completed("a simple document");
}, label: "a simple document"});


harness.push({callback: function () {
	// Test the factory method
	var s, expected_s, i, tb;

	tb = new TBone.HTML();

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

	harness.completed("Tests 0.0.0 - 0.0.3e");
}, label: "Tests 0.0.0 - 0.0.3e"});


harness.push({callback: function () {
	var s,
		expected_s,
		HTML = new TBone.HTML(),
		CSS = new TBone.CSS(),
		JS = new TBone.JS();

	s = HTML.html(
			HTML.head(
				"<!-- Comment example -->",
				HTML.title("Simple 0")
			),
			HTML.body(
				HTML.h1("Sample 0"),
				HTML.p("Hello World")
			)
		).trim();

	expected_s =
		"<!DOCTYPE html>\n<html><head><!-- Comment example --><title>Simple 0</title></head><body><h1>Simple 0</h1><p>Hello World</p></body></html>".trim();

	assert.strictEqual(s.length, expected_s.length, "Should be same length: " + s.length + " ~ " + expected_s.length);
	assert.strictEqual(s, expected_s, "\n" + s + "\n" + expected_s);
	
	harness.completed("Tests 0.1.0 - 0.1.3");
}, label: "Tests 0.1.0 - 0.1.3"});

harness.RunIt("tbone_test.js", 10);
