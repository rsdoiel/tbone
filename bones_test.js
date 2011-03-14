/**
 * test-bones.js - basic functionality tests for bones.js's functions.
 *
 * author R. S. Doiel, <rsdoiel@gmail.com>
 *
 * copyright (c) 2011 all rights reserved
 *
 * Notes: runs under NodeJS
 */

var assert = require('assert'),
    web = require('./bones');

console.log("[bones_test.js] start ...");

attr = web.assemble_attributes();
assert.equal(attr, '', 'Should have an empty attribute string.');

attr = web.assemble_attributes('class="myclass"');
assert.equal(attr, ' class="myclass"', 'Should have class="myclass" [' + attr + '] from string');

attr = web.assemble_attributes({'class' : 'myclass'});
assert.equal(attr, ' class="myclass"', 'Should have class="myclass" [' + attr + '] from assoc. array');

attr = web.assemble_attributes({'checked' : null, 'id' : 'mything'});
assert.equal(attr, ' checked id="mything"', 'Should have checked id="mything" [' + attr + '] from assoc. array');

src = web.Html('');
assert.equal(web.trim(src), web.trim('<!DOCTYPE html>' + "\n" + '<html lang="en">' + "\n" + '</html>' + "\n"), "Should have an html wrapper:" + src);

src = web.Head('');
assert.equal(web.trim(src), web.trim('<head>' + "\n" + '</head>' + "\n"), "Should have a head elments:" + src);

src = web.Title('hello world');
assert.equal(web.trim(src), web.trim('<title>hello world</title>'), "Should have hello world title:" + src);

src = web.Link('');
assert.equal(web.trim(src), web.trim('<link />'), "Should have <link />:" + src);

src = web.Body('');
assert.equal(web.trim(src), web.trim('<body>' + "\n" + '</body>' + "\n"), "Should have body block.:" + src);

src = web.H1('hello world');
assert.equal(src, '<h1>hello world</h1>', "Should have h1:" + src);

src = web.H2('hello world');
assert.equal(src, '<h2>hello world</h2>', "Should have h2:" + src);

src = web.H3('hello world');
assert.equal(src, '<h3>hello world</h3>', "Should have h3:" + src);

src = web.H4('hello world');
assert.equal(src, '<h4>hello world</h4>', "Should have h4:" + src);

src = web.H5('hello world');
assert.equal(src, '<h5>hello world</h5>', "Should have h5:" + src);

src = web.H6('hello world');
assert.equal(src, '<h6>hello world</h6>', "Should have h6:" + src);

src = web.P();
assert.equal(src, '<p>', "Should have a simple p tag.:" + src);

src = web.P("hello world");
assert.equal(src, '<p>hello world</p>', "Should have a wrapping p tag.:" + src);

src = web.A("", null);
assert.equal(src, '<a></a>', "Should have an empty wrapping anchor tag:" + src);

src = web.A("here", {"href" : "http://example.com"});
assert.equal(src, '<a href="http://example.com">here</a>', "Should have a basic link to example.com:" + src);

src = web.Ul('');
assert.equal(src, '<ul></ul>', "Should have a ul wrapper:" + src);

src = web.Ol('');
assert.equal(src, '<ol></ol>', "Should have a ol wrapper:" + src);

src = web.Li('');
assert.equal(src, '<li></li>', "Should have a li wrapper:" + src);

src = web.Dl('');
assert.equal(src, '<dl></dl>', "Should have a dl wrapper:" + src);

src = web.Dt('');
assert.equal(src, '<dt></dt>', "Should have a dt wrapper:" + src);

src = web.Dd('');
assert.equal(src, '<dd></dd>', "Should have a dd wrapper:" + src);

src = web.Table('');
assert.equal(src, '<table></table>', "Should have a table wrapper:" + src);

src = web.Tr('');
assert.equal(src, '<tr></tr>', "Should have a tr wrapper:" + src);

src = web.Td('');
assert.equal(src, '<td></td>', "Should have a td wrapper:" + src);

src = web.Form();
assert.equal(src, '<form></form>', "Should have a form wrapper:" + src);

src = web.Input();
assert.equal(src, '<input name="" value="" />', "Should have a simple input tag:" + src);

src = web.Select();
assert.equal(src, '<select name=""></select>', "Should have a simple select wrapper:" + src);

src = web.Option();
assert.equal(src, '<option value=""></option>', "Should have a simple select wrapper:" + src);

src = web.Label();
assert.equal(src, '<label></label>', "Should have a simple label wrapper:" + src);

console.log("Success!");

