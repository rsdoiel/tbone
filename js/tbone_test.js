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
 * Notes: runs under NodeJS
 */

var	sys = require('sys'),
	assert = require('assert'),
	tb = require('./tbone');

console.log("[tbone_test.js] start ...");

// Test the factory method
(function () {
	var ky, o1 = {}, o2;
	o2 = tb.Mixin(o1);
	for (ky in tb) {
		if (ky !== 'Mixin' && typeof tb[ky] === "function") {
			assert.ok(typeof o1[ky] === "function", "Should have o1 w/function " + ky);
			assert.ok(typeof o2[ky] === "function", "Should have o2 w/function " + ky);
		}
	}
})();



attr = tb.AssembleAttributes();
assert.equal(attr, '', 'Should have an empty attribute string.');

attr = tb.AssembleAttributes('class="myclass"');
assert.equal(attr, ' class="myclass"', 'Should have class="myclass" [' + attr + '] from string');

attr = tb.AssembleAttributes({'class' : 'myclass'});
assert.equal(attr, ' class="myclass"', 'Should have class="myclass" [' + attr + '] from assoc. array');

attr = tb.AssembleAttributes({'checked' : null, 'id' : 'mything'});
assert.equal(attr, ' checked id="mything"', 'Should have checked id="mything" [' + attr + '] from assoc. array');

src = tb.Html('');
assert.equal(tb.Trim(src), tb.Trim('<!DOCTYPE html>' + "\n" + '<html lang="en">' + "\n" + '</html>' + "\n"), "Should have an html wrapper:" + src);

src = tb.Head('');
assert.equal(tb.Trim(src), tb.Trim('<head>' + "\n" + '</head>' + "\n"), "Should have a head elments:" + src);

src = tb.Title('hello world');
assert.equal(tb.Trim(src), tb.Trim('<title>hello world</title>'), "Should have hello world title:" + src);

src = tb.Link('');
assert.equal(tb.Trim(src), tb.Trim('<link />'), "Should have <link />:" + src);

src = tb.Body('');
assert.equal(tb.Trim(src), tb.Trim('<body>' + "\n" + '</body>' + "\n"), "Should have body block.:" + src);

src = tb.H1('hello world');
assert.equal(src, '<h1>hello world</h1>', "Should have h1:" + src);

src = tb.H2('hello world');
assert.equal(src, '<h2>hello world</h2>', "Should have h2:" + src);

src = tb.H3('hello world');
assert.equal(src, '<h3>hello world</h3>', "Should have h3:" + src);

src = tb.H4('hello world');
assert.equal(src, '<h4>hello world</h4>', "Should have h4:" + src);

src = tb.H5('hello world');
assert.equal(src, '<h5>hello world</h5>', "Should have h5:" + src);

src = tb.H6('hello world');
assert.equal(src, '<h6>hello world</h6>', "Should have h6:" + src);

src = tb.P();
assert.equal(src, '<p>', "Should have a simple p tag.:" + src);

src = tb.P("hello world");
assert.equal(src, '<p>hello world</p>', "Should have a wrapping p tag.:" + src);

src = tb.A("", null);
assert.equal(src, '<a></a>', "Should have an empty wrapping anchor tag:" + src);

src = tb.A("here", "http://example.com");
assert.equal(src, '<a href="http://example.com">here</a>', "Should have a basic link to example.com:" + src);

src = tb.A("here", {"href" : "http://example.com"});
assert.equal(src, '<a href="http://example.com">here</a>', "Should have a basic link to example.com:" + src);

src = tb.Ul('');
assert.equal(src, '<ul></ul>', "Should have a ul wrapper:" + src);

src = tb.Ol('');
assert.equal(src, '<ol></ol>', "Should have a ol wrapper:" + src);

src = tb.Li('');
assert.equal(src, '<li></li>', "Should have a li wrapper:" + src);

src = tb.Dl('');
assert.equal(src, '<dl></dl>', "Should have a dl wrapper:" + src);

src = tb.Dt('');
assert.equal(src, '<dt></dt>', "Should have a dt wrapper:" + src);

src = tb.Dd('');
assert.equal(src, '<dd></dd>', "Should have a dd wrapper:" + src);

src = tb.Table('');
assert.equal(src, '<table></table>', "Should have a table wrapper:" + src);

src = tb.Tr('');
assert.equal(src, '<tr></tr>', "Should have a tr wrapper:" + src);

src = tb.Td('');
assert.equal(src, '<td></td>', "Should have a td wrapper:" + src);

src = tb.Form();
assert.equal(src, '<form></form>', "Should have a form wrapper:" + src);

src = tb.Input();
assert.equal(src, '<input name="" value="" />', "Should have a simple input tag:" + src);

src = tb.Select();
assert.equal(src, '<select name=""></select>', "Should have a simple select wrapper:" + src);

src = tb.Option();
assert.equal(src, '<option value=""></option>', "Should have a simple select wrapper:" + src);

src = tb.Label();
assert.equal(src, '<label></label>', "Should have a simple label wrapper:" + src);

console.log("Success!");
