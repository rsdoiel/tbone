/**
 * browser-tbone_test.js - basic functionality tests for tbone.js's functions.
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
/*jslint devel: true, node: true, maxerr: 50, indent: 4,  vars: true, sloppy: true */
/*global harness, TBone, assert */
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
	} catch (err1) {
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
	} catch (err2) {
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

	expected_s = "<p>";
	s = tb.p("");
	assert.strictEqual(s, expected_s, "\n" + s + "\n" + expected_s);

	expected_s = '<p>Hi there</p>';
	s = tb.p("Hi there");
	assert.strictEqual(s, expected_s, "\n" + s + "\n" + expected_s);

	expected_s = '<p id="me" class="content">';
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

	expected_s = "<p>";
	s = tb.p().attr();
	assert.equal(s, expected_s, "\n" + s + "\n" + expected_s);

	expected_s = '<p id="me">';
	s = tb.p().attr({id: "me"});
	assert.equal(s, expected_s, "\n" + s + "\n" + expected_s + "]");
	expected_s = '<p id="me">me</p>';
	s = tb.p("me").attr({id: "me"});
	assert.equal(s, expected_s, "\n" + s + "\n" + expected_s + "]");
	
	expected_s = "<div><!-- comment --><p></p></div>";
	s = tb.div("<!-- comment -->", "<p></p>").attr();
	assert.equal(s, expected_s, "\n" + s + "\n" + expected_s + "]");

	expected_s = "<div><!-- comment --><p></p><!-- closing comment --></div>";
	s = tb.div("<!-- comment -->", "<p></p>", "<!-- closing comment -->").attr();
	assert.equal(s, expected_s, "\n" + s + "\n" + expected_s + "]");
	
	expected_s = "<div><!-- comment --><p>Hi there.</p></div>";
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
	s = tb.html('');
	assert.equal(s, expected_s, "\n" + s + "\n" + expected_s);

	expected_s = '<!DOCTYPE html>' + "\n" + '<html lang="en"></html>';
	s = tb.html('').attr({lang: "en"});
	assert.equal(s, expected_s, "\n" + s + "\n" + expected_s);

	expected_s = '<head></head>';
	s = tb.head('');
	assert.equal(s, expected_s, "\n" + s + "\n" + expected_s);

	expected_s = '<title>hello world</title>';
	s = tb.title('hello world');
	assert.equal(s, expected_s, "\n" + s + "\n" + expected_s);

	expected_s = '<link>';
	s = tb.link('');
	assert.equal(s, expected_s, "\n" + s + "\n" + expected_s);

	expected_s = '<body></body>';
	s = tb.body('');
	assert.equal(s, expected_s, "\n" + s + "\n" + expected_s);

	expected_s = '<h1>hello world</h1>';
	s = tb.h1('hello world');
	assert.equal(s, expected_s, "\n" + s + "\n" + expected_s);

	expected_s = '<h2>hello world</h2>';
	s = tb.h2('hello world');
	assert.equal(s, expected_s, "\n" + s + "\n" + expected_s);

	expected_s = '<h3>hello world</h3>';
	s = tb.h3('hello world');
	assert.equal(s, expected_s, "\n" + s + "\n" + expected_s);

	expected_s = '<h4>hello world</h4>';
	s = tb.h4('hello world');
	assert.equal(s, expected_s, "\n" + s + "\n" + expected_s);

	expected_s = '<h5>hello world</h5>';
	s = tb.h5('hello world');
	assert.equal(s, expected_s, "\n" + s + "\n" + expected_s);

	expected_s = '<h6>hello world</h6>';
	s = tb.h6('hello world');
	assert.equal(s, expected_s, "\n" + s + "\n" + expected_s);

	expected_s = "<p>";
	s = tb.p();
	assert.equal(s, expected_s, "\n" + s + "\n" + expected_s);

	// If you have attributes, you' should have some sort of
	// inner content...
	expected_s = '<p id="me"> </p>';
	s = tb.p(" ").attr({id: "me"});
	assert.equal(s, expected_s, "\n" + s + "\n" + expected_s);

	expected_s = '<p>1</p>';
	s = tb.p("1");
	assert.equal(s, expected_s, "\n" + s + "\n" + expected_s);

	expected_s = "<p>hello world</p>";
	s = tb.p("hello world");
	assert.equal(s, expected_s, "\n" + s + "\n" + expected_s);

	expected_s = "<a></a>";
	s = tb.a("");
	assert.equal(s, expected_s, "\n" + s + "\n" + expected_s);

	expected_s = "<a href=\"http://example.com\">here</a>";
	s = tb.a("here").attr({href: "http://example.com"});
	assert.equal(s, expected_s, "\n" + s + "\n" + expected_s);

	expected_s = "<a href=\"http://example.com\" title=\"I'm here\">here</a>";
	s = tb.a("here").attr({
		"href": "http://example.com",
		title: "I'm here"
	});
	assert.equal(s, expected_s, "\n" + s + "\n" + expected_s);

	expected_s = "<ul></ul>";
	s = tb.ul('');
	assert.equal(s, expected_s, "\n" + s + "\n" + expected_s);

	expected_s = '<ol></ol>';
	s = tb.ol('');
	assert.equal(s, expected_s, "\n" + s + "\n" + expected_s);

	expected_s = '<li></li>';
	s = tb.li('');
	assert.equal(s, expected_s, "\n" + s + "\n" + expected_s);

	expected_s = '<dl></dl>';
	s = tb.dl('');
	assert.equal(s, expected_s, "\n" + s + "\n" + expected_s);

	expected_s = '<dt></dt>';
	s = tb.dt('');
	assert.equal(s, expected_s, "\n" + s + "\n" + expected_s);

	expected_s = '<dd></dd>';
	s = tb.dd('');
	assert.equal(s, expected_s, "\n" + s + "\n" + expected_s);

	expected_s = '<table></table>';
	s = tb.table('');
	assert.equal(s, expected_s, "\n" + s + "\n" + expected_s);

	expected_s = '<tr></tr>';
	s = tb.tr('');
	assert.equal(s, expected_s, "\n" + s + "\n" + expected_s);

	expected_s = '<td></td>';
	s = tb.td('');
	assert.equal(s, expected_s, "\n" + s + "\n" + expected_s);

	expected_s = '<form></form>';
	s = tb.form();
	assert.equal(s, expected_s, "\n" + s + "\n" + expected_s);

	expected_s = '<input>';
	s = tb.input();
	assert.equal(s, expected_s, "\n" + s + "\n" + expected_s);

	expected_s = '<input value="Something">';
	s = tb.input().attr({value: "Something"});
	assert.equal(s, expected_s, "\n" + s + "\n" + expected_s);

	expected_s = '<select></select>';
	s = tb.select();
	assert.equal(s, expected_s, "\n" + s + "\n" + expected_s);


	expected_s = '<option></option>';
	s = tb.option();
	assert.equal(s, expected_s, "\n" + s + "\n" + expected_s);

	expected_s = '<select name="location"></select>';
	s = tb.select().attr({name: "location"});
	assert.equal(s, expected_s, "\n" + s + "\n" + expected_s);

	expected_s = '<option value="Los Angeles"></option>';
	s = tb.option().attr({value: "Los Angeles"});
	assert.equal(s, expected_s, "\n" + s + "\n" + expected_s);

	expected_s = '<label></label>';
	s = tb.label();
	assert.equal(s, expected_s, "\n" + s + "\n" + expected_s);

	expected_s = '<header></header>';
	s = tb.header();
	assert.equal(s, expected_s, "\n" + s + "\n" + expected_s);

	expected_s = '<footer></footer>';
	s = tb.footer();
	assert.equal(s, expected_s, "\n" + s + "\n" + expected_s);
	harness.completed("Tests 0.0.0 - 0.0.3e");
}, label: "Tests 0.0.0 - 0.0.3e"});

harness.push({callback: function () {
	var s,
		expected_s,
		HTML = new TBone.HTML();

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
	
	harness.completed("Tests 0.1.0 - 0.1.2");
}, label: "Tests 0.1.0 - 0.1.2"});

harness.push({callback: function () {
	var expected_s,
		s,
		tb = new TBone.HTML();

	// Make sure all the tags expected are supported.
	// Source for elements: http://html5doctor.com/element-index/
	
	//
	// Elements starting with A
	//
	expected_s = "<a></a>";
	s = tb.a();
	assert.strictEqual(s, expected_s, "\n" + s + "\n" + expected_s);
	
	expected_s = "<abbr></abbr>";
	s = tb.abbr();
	assert.strictEqual(s, expected_s, "\n" + s + "\n" + expected_s);
	
	expected_s = "<address></address>";
	s = tb.address();
	assert.strictEqual(s, expected_s, "\n" + s + "\n" + expected_s);
	
	expected_s = "<area>";
	s = tb.area();
	assert.strictEqual(s, expected_s, "\n" + s + "\n" + expected_s);

	expected_s = "<article></article>";
	s = tb.article();
	assert.strictEqual(s, expected_s, "\n" + s + "\n" + expected_s);
	
	expected_s = "<aside></aside>";
	s = tb.aside();
	assert.strictEqual(s, expected_s, "\n" + s + "\n" + expected_s);
	
	expected_s = "<audio></audio>";
	s = tb.audio();
	assert.strictEqual(s, expected_s, "\n" + s + "\n" + expected_s);
	

	//
	// Elements starting with B
	//
	expected_s = "<b></b>";
	s = tb.b();
	assert.strictEqual(s, expected_s, "\n" + s + "\n" + expected_s);

	expected_s = "<base>";
	s = tb.base();
	assert.strictEqual(s, expected_s, "\n" + s + "\n" + expected_s);
	
	expected_s = "<bdi></bdi>";
	s = tb.bdi();
	assert.strictEqual(s, expected_s, "\n" + s + "\n" + expected_s);
	
	expected_s = "<bdo></bdo>";
	s = tb.bdo();
	assert.strictEqual(s, expected_s, "\n" + s + "\n" + expected_s);
	
	expected_s = "<blockquote></blockquote>";
	s = tb.blockquote();
	assert.strictEqual(s, expected_s, "\n" + s + "\n" + expected_s);

	expected_s = "<body></body>";
	s = tb.body();
	assert.strictEqual(s, expected_s, "\n" + s + "\n" + expected_s);
	
	expected_s = "<br />";
	s = tb.br();
	assert.strictEqual(s, expected_s, "\n" + s + "\n" + expected_s);
	
	expected_s = "<button></button>";
	s = tb.button();
	assert.strictEqual(s, expected_s, "\n" + s + "\n" + expected_s);
	
	//
	// Elements starting with C
	//
	expected_s = "<canvas></canvas>";
	s = tb.canvas();
	assert.strictEqual(s, expected_s, "\n" + s + "\n" + expected_s);

	expected_s = "<caption></caption>";
	s = tb.caption();
	assert.strictEqual(s, expected_s, "\n" + s + "\n" + expected_s);

	expected_s = "<cite></cite>";
	s = tb.cite();
	assert.strictEqual(s, expected_s, "\n" + s + "\n" + expected_s);
	
	expected_s = "<code></code>";
	s = tb.code();
	assert.strictEqual(s, expected_s, "\n" + s + "\n" + expected_s);

	expected_s = "<col></col>";
	s = tb.col();
	assert.strictEqual(s, expected_s, "\n" + s + "\n" + expected_s);

	expected_s = "<colgroup></colgroup>";
	s = tb.colgroup();
	assert.strictEqual(s, expected_s, "\n" + s + "\n" + expected_s);

	expected_s = "<command />";
	s = tb.command();
	assert.strictEqual(s, expected_s, "\n" + s + "\n" + expected_s);


	//
	// Elements starting with D
	//
	expected_s = "<datalist></datalist>";
	s = tb.datalist();
	assert.strictEqual(s, expected_s, "\n" + s + "\n" + expected_s);

	expected_s = "<dd></dd>";
	s = tb.dd();
	assert.strictEqual(s, expected_s, "\n" + s + "\n" + expected_s);
	
	expected_s = "<del></del>";
	s = tb.del();
	assert.strictEqual(s, expected_s, "\n" + s + "\n" + expected_s);
	
	expected_s = "<details></details>";
	s = tb.details();
	assert.strictEqual(s, expected_s, "\n" + s + "\n" + expected_s);
	
	expected_s = "<dfn></dfn>";
	s = tb.dfn();
	assert.strictEqual(s, expected_s, "\n" + s + "\n" + expected_s);
	
	expected_s = "<div></div>";
	s = tb.div();
	assert.strictEqual(s, expected_s, "\n" + s + "\n" + expected_s);
	
	expected_s = "<dl></dl>";
	s = tb.dl();
	assert.strictEqual(s, expected_s, "\n" + s + "\n" + expected_s);
	
	expected_s = "<dt></dt>";
	s = tb.dt();
	assert.strictEqual(s, expected_s, "\n" + s + "\n" + expected_s);
	

	//
	// Elements starting with E
	//
	expected_s = "<em></em>";
	s = tb.em();
	assert.strictEqual(s, expected_s, "\n" + s + "\n" + expected_s);
	
	expected_s = "<embed>";
	s = tb.embed();
	assert.strictEqual(s, expected_s, "\n" + s + "\n" + expected_s);
	

	//
	// Elements starting with F
	//
	expected_s = "<fieldset></fieldset>";
	s = tb.fieldset();
	assert.strictEqual(s, expected_s, "\n" + s + "\n" + expected_s);
	
	expected_s = "<figcaption></figcaption>";
	s = tb.figcaption();
	assert.strictEqual(s, expected_s, "\n" + s + "\n" + expected_s);
	
	expected_s = "<figure></figure>";
	s = tb.figure();
	assert.strictEqual(s, expected_s, "\n" + s + "\n" + expected_s);
	
	expected_s = "<footer></footer>";
	s = tb.footer();
	assert.strictEqual(s, expected_s, "\n" + s + "\n" + expected_s);
	
	expected_s = "<form></form>";
	s = tb.form();
	assert.strictEqual(s, expected_s, "\n" + s + "\n" + expected_s);
	

	//
	// Elements starting with G (None)
	//

	//
	// Elements starting with H
	//
	expected_s = "<h1></h1>";
	s = tb.h1();
	assert.strictEqual(s, expected_s, "\n" + s + "\n" + expected_s);

	expected_s = "<h2></h2>";
	s = tb.h2();
	assert.strictEqual(s, expected_s, "\n" + s + "\n" + expected_s);

	expected_s = "<h3></h3>";
	s = tb.h3();
	assert.strictEqual(s, expected_s, "\n" + s + "\n" + expected_s);

	expected_s = "<h4></h4>";
	s = tb.h4();
	assert.strictEqual(s, expected_s, "\n" + s + "\n" + expected_s);

	expected_s = "<h5></h5>";
	s = tb.h5();
	assert.strictEqual(s, expected_s, "\n" + s + "\n" + expected_s);

	expected_s = "<h6></h6>";
	s = tb.h6();
	assert.strictEqual(s, expected_s, "\n" + s + "\n" + expected_s);

	expected_s = "<head></head>";
	s = tb.head();
	assert.strictEqual(s, expected_s, "\n" + s + "\n" + expected_s);

	expected_s = "<header></header>";
	s = tb.header();
	assert.strictEqual(s, expected_s, "\n" + s + "\n" + expected_s);

	expected_s = "<hgroup></hgroup>";
	s = tb.hgroup();
	assert.strictEqual(s, expected_s, "\n" + s + "\n" + expected_s);

	expected_s = "<hr />";
	s = tb.hr();
	assert.strictEqual(s, expected_s, "\n" + s + "\n" + expected_s);

	expected_s = "<!DOCTYPE html>\n<html></html>";
	s = tb.html();
	assert.strictEqual(s, expected_s, "\n" + s + "\n" + expected_s);

	//
	// Elements starting with I
	//
	expected_s = "<i></i>";
	s = tb.i();
	assert.strictEqual(s, expected_s, "\n" + s + "\n" + expected_s);

	expected_s = "<iframe></iframe>";
	s = tb.iframe();
	assert.strictEqual(s, expected_s, "\n" + s + "\n" + expected_s);

	expected_s = "<img />";
	s = tb.img();
	assert.strictEqual(s, expected_s, "\n" + s + "\n" + expected_s);

	expected_s = "<input>";
	s = tb.input();
	assert.strictEqual(s, expected_s, "\n" + s + "\n" + expected_s);

	expected_s = "<ins></ins>";
	s = tb.ins();
	assert.strictEqual(s, expected_s, "\n" + s + "\n" + expected_s);


	//
	// Elements starting with J (None)
	//

	//
	// Elements starting with K
	//
	expected_s = "<kbd></kbd>";
	s = tb.kbd();
	assert.strictEqual(s, expected_s, "\n" + s + "\n" + expected_s);

	expected_s = "<keygen>";
	s = tb.keygen();
	assert.strictEqual(s, expected_s, "\n" + s + "\n" + expected_s);


	//
	// Elements starting with L
	//
	expected_s = "<label></label>";
	s = tb.label();
	assert.strictEqual(s, expected_s, "\n" + s + "\n" + expected_s);

	expected_s = "<legend></legend>";
	s = tb.legend();
	assert.strictEqual(s, expected_s, "\n" + s + "\n" + expected_s);

	expected_s = "<li></li>";
	s = tb.li();
	assert.strictEqual(s, expected_s, "\n" + s + "\n" + expected_s);

	expected_s = "<link>";
	s = tb.link();
	assert.strictEqual(s, expected_s, "\n" + s + "\n" + expected_s);


	//
	// Elements starting with M
	//
	expected_s = "<map></map>";
	s = tb.map();
	assert.strictEqual(s, expected_s, "\n" + s + "\n" + expected_s);

	expected_s = "<mark></mark>";
	s = tb.mark();
	assert.strictEqual(s, expected_s, "\n" + s + "\n" + expected_s);

	expected_s = "<menu></menu>";
	s = tb.menu();
	assert.strictEqual(s, expected_s, "\n" + s + "\n" + expected_s);

	expected_s = "<meta />";
	s = tb.meta();
	assert.strictEqual(s, expected_s, "\n" + s + "\n" + expected_s);

	expected_s = "<meter></meter>";
	s = tb.meter();
	assert.strictEqual(s, expected_s, "\n" + s + "\n" + expected_s);


	//
	// Elements starting with N
	//
	expected_s = "<nav></nav>";
	s = tb.nav();
	assert.strictEqual(s, expected_s, "\n" + s + "\n" + expected_s);
	
	expected_s = "<noscript></noscript>";
	s = tb.noscript();
	assert.strictEqual(s, expected_s, "\n" + s + "\n" + expected_s);
	

	//
	// Elements starting with O
	//
	expected_s = "<object></object>";
	s = tb.object();
	assert.strictEqual(s, expected_s, "\n" + s + "\n" + expected_s);
	
	expected_s = "<ol></ol>";
	s = tb.ol();
	assert.strictEqual(s, expected_s, "\n" + s + "\n" + expected_s);
	
	expected_s = "<optgroup></optgroup>";
	s = tb.optgroup();
	assert.strictEqual(s, expected_s, "\n" + s + "\n" + expected_s);
	
	expected_s = "<option></option>";
	s = tb.option();
	assert.strictEqual(s, expected_s, "\n" + s + "\n" + expected_s);
	
	expected_s = "<output></output>";
	s = tb.output();
	assert.strictEqual(s, expected_s, "\n" + s + "\n" + expected_s);
	

	//
	// Elements starting with P
	//
	expected_s = "<p>";
	s = tb.p();
	assert.strictEqual(s, expected_s, "\n" + s + "\n" + expected_s);
	
	expected_s = "<param></param>";
	s = tb.param();
	assert.strictEqual(s, expected_s, "\n" + s + "\n" + expected_s);
	
	expected_s = "<progress></progress>";
	s = tb.progress();
	assert.strictEqual(s, expected_s, "\n" + s + "\n" + expected_s);
	
	expected_s = "<pre></pre>";
	s = tb.pre();
	assert.strictEqual(s, expected_s, "\n" + s + "\n" + expected_s);
	

	//
	// Elements starting with Q
	//
	expected_s = "<q></q>";
	s = tb.q();
	assert.strictEqual(s, expected_s, "\n" + s + "\n" + expected_s);
	

	//
	// Elements starting with R
	//
	expected_s = "<rp></rp>";
	s = tb.rp();
	assert.strictEqual(s, expected_s, "\n" + s + "\n" + expected_s);
	
	expected_s = "<rt></rt>";
	s = tb.rt();
	assert.strictEqual(s, expected_s, "\n" + s + "\n" + expected_s);
	
	expected_s = "<ruby></ruby>";
	s = tb.ruby();
	assert.strictEqual(s, expected_s, "\n" + s + "\n" + expected_s);
	

	//
	// Elements starting with S
	//
	expected_s = "<s></s>";
	s = tb.s();
	assert.strictEqual(s, expected_s, "\n" + s + "\n" + expected_s);
	
	expected_s = "<samp></samp>";
	s = tb.samp();
	assert.strictEqual(s, expected_s, "\n" + s + "\n" + expected_s);

	expected_s = "<script></script>";
	s = tb.script();
	assert.strictEqual(s, expected_s, "\n" + s + "\n" + expected_s);
	
	expected_s = "<section></section>";
	s = tb.section();
	assert.strictEqual(s, expected_s, "\n" + s + "\n" + expected_s);
	
	expected_s = "<select></select>";
	s = tb.select();
	assert.strictEqual(s, expected_s, "\n" + s + "\n" + expected_s);
	
	expected_s = "<small></small>";
	s = tb.small();
	assert.strictEqual(s, expected_s, "\n" + s + "\n" + expected_s);
	
	expected_s = "<span></span>";
	s = tb.span();
	assert.strictEqual(s, expected_s, "\n" + s + "\n" + expected_s);

	expected_s = "<strong></strong>";
	s = tb.strong();
	assert.strictEqual(s, expected_s, "\n" + s + "\n" + expected_s);

	expected_s = "<style></style>";
	s = tb.style();
	assert.strictEqual(s, expected_s, "\n" + s + "\n" + expected_s);
	
	expected_s = "<sub></sub>";
	s = tb.sub();
	assert.strictEqual(s, expected_s, "\n" + s + "\n" + expected_s);

	expected_s = "<summary></summary>";
	s = tb.summary();
	assert.strictEqual(s, expected_s, "\n" + s + "\n" + expected_s);

	expected_s = "<sup></sup>";
	s = tb.sup();
	assert.strictEqual(s, expected_s, "\n" + s + "\n" + expected_s);


	//
	// Elements starting with T
	//
	expected_s = "<table></table>";
	s = tb.table();
	assert.strictEqual(s, expected_s, "\n" + s + "\n" + expected_s);

	expected_s = "<tbody></tbody>";
	s = tb.tbody();
	assert.strictEqual(s, expected_s, "\n" + s + "\n" + expected_s);

	expected_s = "<td></td>";
	s = tb.td();
	assert.strictEqual(s, expected_s, "\n" + s + "\n" + expected_s);

	expected_s = "<textarea></textarea>";
	s = tb.textarea();
	assert.strictEqual(s, expected_s, "\n" + s + "\n" + expected_s);

	expected_s = "<tfoot></tfoot>";
	s = tb.tfoot();
	assert.strictEqual(s, expected_s, "\n" + s + "\n" + expected_s);

	expected_s = "<thead></thead>";
	s = tb.thead();
	assert.strictEqual(s, expected_s, "\n" + s + "\n" + expected_s);

	expected_s = "<time></time>";
	s = tb.time();
	assert.strictEqual(s, expected_s, "\n" + s + "\n" + expected_s);

	expected_s = "<title></title>";
	s = tb.title();
	assert.strictEqual(s, expected_s, "\n" + s + "\n" + expected_s);

	expected_s = "<tr></tr>";
	s = tb.tr();
	assert.strictEqual(s, expected_s, "\n" + s + "\n" + expected_s);

	expected_s = "<track>";
	s = tb.track();
	assert.strictEqual(s, expected_s, "\n" + s + "\n" + expected_s);
	

	//
	// Elements starting with U
	//
	expected_s = "<u></u>";
	s = tb.u();
	assert.strictEqual(s, expected_s, "\n" + s + "\n" + expected_s);

	expected_s = "<ul></ul>";
	s = tb.ul();
	assert.strictEqual(s, expected_s, "\n" + s + "\n" + expected_s);


	//
	// Elements starting with V
	//
	/*
	expected_s = "<var></var>";
	s = tb.var();
	assert.strictEqual(s, expected_s, "\n" + s + "\n" + expected_s);
	*/

	expected_s = "<video></video>";
	s = tb.video();
	assert.strictEqual(s, expected_s, "\n" + s + "\n" + expected_s);
	
	//
	// Elements starting with W
	//
	expected_s = "<wbr>";
	s = tb.wbr();
	assert.strictEqual(s, expected_s, "\n" + s + "\n" + expected_s);
	

	//
	// Elements starting with X (None)
	//

	//
	// Elements starting with Y (None)
	//

	//
	// Elements starting with Z (None)
	//
	
	harness.completed("Check for HTML5 tags");
}, label: "Check for HTML5 tags"});

harness.RunIt("browser-tbone_test.js", 10);
