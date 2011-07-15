/**
 * test-bones.js - basic functionality tests for bones.js's functions.
 *
 * author R. S. Doiel, <rsdoiel@gmail.com>
 *
 * copyright (c) 2011 all rights reserved
 *
 * Released under New the BSD License.
 * See: http://opensource.org/licenses/bsd-license.php
 *
 * Notes: runs under NodeJS
 */

var	sys = require('sys'),
	assert = require('assert'),
	b = require('./bones');

console.log("[bones_test.js] start ...");

// Test the factory method
(function () {
	var ky, o1 = {}, o2;
	o2 = b.Factory(o1);
	for (ky in b) {
		if (ky !== 'Factory' && typeof b[ky] === "function") {
			assert.ok(typeof o1[ky] === "function", "Should have o1 w/function " + ky);
			assert.ok(typeof o2[ky] === "function", "Should have o2 w/function " + ky);
		}
	}
})();



attr = b.assemble_attributes();
assert.equal(attr, '', 'Should have an empty attribute string.');

attr = b.assemble_attributes('class="myclass"');
assert.equal(attr, ' class="myclass"', 'Should have class="myclass" [' + attr + '] from string');

attr = b.assemble_attributes({'class' : 'myclass'});
assert.equal(attr, ' class="myclass"', 'Should have class="myclass" [' + attr + '] from assoc. array');

attr = b.assemble_attributes({'checked' : null, 'id' : 'mything'});
assert.equal(attr, ' checked id="mything"', 'Should have checked id="mything" [' + attr + '] from assoc. array');

src = b.Html('');
assert.equal(b.trim(src), b.trim('<!DOCTYPE html>' + "\n" + '<html lang="en">' + "\n" + '</html>' + "\n"), "Should have an html wrapper:" + src);

src = b.Head('');
assert.equal(b.trim(src), b.trim('<head>' + "\n" + '</head>' + "\n"), "Should have a head elments:" + src);

src = b.Title('hello world');
assert.equal(b.trim(src), b.trim('<title>hello world</title>'), "Should have hello world title:" + src);

src = b.Link('');
assert.equal(b.trim(src), b.trim('<link />'), "Should have <link />:" + src);

src = b.Body('');
assert.equal(b.trim(src), b.trim('<body>' + "\n" + '</body>' + "\n"), "Should have body block.:" + src);

src = b.H1('hello world');
assert.equal(src, '<h1>hello world</h1>', "Should have h1:" + src);

src = b.H2('hello world');
assert.equal(src, '<h2>hello world</h2>', "Should have h2:" + src);

src = b.H3('hello world');
assert.equal(src, '<h3>hello world</h3>', "Should have h3:" + src);

src = b.H4('hello world');
assert.equal(src, '<h4>hello world</h4>', "Should have h4:" + src);

src = b.H5('hello world');
assert.equal(src, '<h5>hello world</h5>', "Should have h5:" + src);

src = b.H6('hello world');
assert.equal(src, '<h6>hello world</h6>', "Should have h6:" + src);

src = b.P();
assert.equal(src, '<p>', "Should have a simple p tag.:" + src);

src = b.P("hello world");
assert.equal(src, '<p>hello world</p>', "Should have a wrapping p tag.:" + src);

src = b.A("", null);
assert.equal(src, '<a></a>', "Should have an empty wrapping anchor tag:" + src);

src = b.A("here", "http://example.com");
assert.equal(src, '<a href="http://example.com">here</a>', "Should have a basic link to example.com:" + src);

src = b.A("here", {"href" : "http://example.com"});
assert.equal(src, '<a href="http://example.com">here</a>', "Should have a basic link to example.com:" + src);

src = b.Ul('');
assert.equal(src, '<ul></ul>', "Should have a ul wrapper:" + src);

src = b.Ol('');
assert.equal(src, '<ol></ol>', "Should have a ol wrapper:" + src);

src = b.Li('');
assert.equal(src, '<li></li>', "Should have a li wrapper:" + src);

src = b.Dl('');
assert.equal(src, '<dl></dl>', "Should have a dl wrapper:" + src);

src = b.Dt('');
assert.equal(src, '<dt></dt>', "Should have a dt wrapper:" + src);

src = b.Dd('');
assert.equal(src, '<dd></dd>', "Should have a dd wrapper:" + src);

src = b.Table('');
assert.equal(src, '<table></table>', "Should have a table wrapper:" + src);

src = b.Tr('');
assert.equal(src, '<tr></tr>', "Should have a tr wrapper:" + src);

src = b.Td('');
assert.equal(src, '<td></td>', "Should have a td wrapper:" + src);

src = b.Form();
assert.equal(src, '<form></form>', "Should have a form wrapper:" + src);

src = b.Input();
assert.equal(src, '<input name="" value="" />', "Should have a simple input tag:" + src);

src = b.Select();
assert.equal(src, '<select name=""></select>', "Should have a simple select wrapper:" + src);

src = b.Option();
assert.equal(src, '<option value=""></option>', "Should have a simple select wrapper:" + src);

src = b.Label();
assert.equal(src, '<label></label>', "Should have a simple label wrapper:" + src);

console.log("Success!");
