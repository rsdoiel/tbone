<?php
/**
 * tbone_test.php - basic functionality tests for tbone.php's functions.
 *
 * author R. S. Doiel, <rsdoiel@gmail.com>
 *
 * copyright (c) 2011 all rights reserved
 *
 * Released under New the BSD License.
 * See: http://opensource.org/licenses/bsd-license.php
 */

require_once('assert.php');
require_once('tbone.php');
echo "[tbone_test.php] start ...\n";

$attr = AssembleAttributes();
$assert->equal($attr, '', 'Should have an empty attribute string.');
$attr = AssembleAttributes('class="myclass"');
$assert->equal($attr, ' class="myclass"', 'Should have class="myclass" [' . $attr . '] from string');
$attr = AssembleAttributes(array('class' => 'myclass'));
$assert->equal($attr, ' class="myclass"', 'Should have class="myclass" [' . $attr . '] from assoc. array');
$attr = AssembleAttributes(array('checked' => NULL, 'id' => 'mything'));
$assert->equal($attr, ' checked id="mything"', 'Should have checked id="mything" [' . $attr . '] from assoc. array');

$src = Html('');
$assert->equal(trim($src), trim('<!DOCTYPE html>' . PHP_EOL . '<html lang="en"></html>' . PHP_EOL), "Should have an html wrapper: [$src]");

$src = Head('');
$assert->equal(trim($src), trim('<head></head>' . PHP_EOL), "Should have a head elments [$src]");

$src = Title('hello world');
$assert->equal(trim($src), trim('<title>hello world</title>'), "Should have hello world title [$src]");

$src = tbLink('');
$assert->equal(trim($src), trim('<link />'), "Should have <link /> [$src]");

$src = Body('');
$assert->equal(trim($src), trim('<body></body>' . PHP_EOL), "Should have body block. [$src]");

$src = H1('hello world');
$assert->equal($src, '<h1>hello world</h1>', "Should have h1 [$src]");

$src = H2('hello world');
$assert->equal($src, '<h2>hello world</h2>', "Should have h2 [$src]");

$src = H3('hello world');
$assert->equal($src, '<h3>hello world</h3>', "Should have h3 [$src]");

$src = H4('hello world');
$assert->equal($src, '<h4>hello world</h4>', "Should have h4 [$src]");

$src = H5('hello world');
$assert->equal($src, '<h5>hello world</h5>', "Should have h5 [$src]");

$src = H6('hello world');
$assert->equal($src, '<h6>hello world</h6>', "Should have h6 [$src]");

$src = P();
$assert->equal($src, '<p>', "Should have a simple p tag. [$src]");

$src = P("hello world");
$assert->equal($src, '<p>hello world</p>', "Should have a wrapping p tag. [$src]");

$src = A("", NULL);
$assert->equal($src, '<a></a>', "Should have an empty wrapping anchor tag [$src]");

$src = A("here", 'http://example.com');
$assert->equal($src, '<a href="http://example.com">here</a>', "Should have a basic link to example.com [$src]");

$src = A("here", 'http://example.com', 'title="test"');
$assert->equal($src, '<a title="test" href="http://example.com">here</a>', "Should have a basic link to example.com [$src]");

$src = Ul('');
$assert->equal($src, '<ul></ul>', "Should have a ul wrapper [$src]");

$src = Ol('');
$assert->equal($src, '<ol></ol>', "Should have a ol wrapper [$src]");

$src = Li('');
$assert->equal($src, '<li></li>', "Should have a li wrapper [$src]");

$src = Dl('');
$assert->equal($src, '<dl></dl>', "Should have a dl wrapper [$src]");

$src = Dt('');
$assert->equal($src, '<dt></dt>', "Should have a dt wrapper [$src]");

$src = Dd('');
$assert->equal($src, '<dd></dd>', "Should have a dd wrapper [$src]");

$src = Table('');
$assert->equal($src, '<table></table>', "Should have a table wrapper [$src]");

$src = Tr('');
$assert->equal($src, '<tr></tr>', "Should have a tr wrapper [$src]");

$src = Td('');
$assert->equal($src, '<td></td>', "Should have a td wrapper [$src]");

$src = Form('', NULL);
$assert->equal($src, '<form></form>', "Should have a form wrapper [$src]");

$src = Input('fred','', NULL);
$assert->equal($src, '<input name="fred" value="" />', "Should have a simple input tag [$src]");

$src = Select('', '');
$assert->equal($src, '<select name=""></select>', "Should have a simple select wrapper [$src]");

$src = Option('', '');
$assert->equal($src, '<option value=""></option>', "Should have a simple select wrapper [$src]");

$src = Label('');
$assert->equal($src, '<label></label>', "Should have a simple label wrapper [$src]");

$src = Script();
$assert->equal($src, '<script type="text/javascript"></script>', "Should have an empty script tag. Expected: [<script type=\"text/javascript\"></script>] got:[$src]");

$str = ' one="1" two="2"';
$attributes = DisassembleAttributes($str);
$assert->equal($attributes['one'], '1', "One should be 1: " . print_r($attributes, true));
$assert->equal($attributes['two'], '2', "Two should be 2:" . print_r($attributes, true));

$str = " one='1' two=\"2\"";
$attributes = DisassembleAttributes($str);
$assert->equal($attributes['one'], '1', 
  "One should be 1: " . print_r($attributes, true));
$assert->equal($attributes['two'], '2', 
  "Two should be 2:" . print_r($attributes, true));

echo "Success!\n";
?>
