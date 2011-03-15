<?php
/**
 * bones_test.php - basic functionality tests for bones.php's functions.
 *
 * author R. S. Doiel, <rsdoiel@gmail.com>
 *
 * copyright (c) 2011 all rights reserved
 */

require_once('assert.php');
require_once('bones.php');
echo "[bones_test.php] start ...\n";
$w = new Bones();

$attr = $w->assemble_attributes();
$assert->equal($attr, '', 'Should have an empty attribute string.');
$attr = $w->assemble_attributes('class="myclass"');
$assert->equal($attr, ' class="myclass"', 'Should have class="myclass" [' . $attr . '] from string');
$attr = $w->assemble_attributes(array('class' => 'myclass'));
$assert->equal($attr, ' class="myclass"', 'Should have class="myclass" [' . $attr . '] from assoc. array');
$attr = $w->assemble_attributes(array('checked' => NULL, 'id' => 'mything'));
$assert->equal($attr, ' checked id="mything"', 'Should have checked id="mything" [' . $attr . '] from assoc. array');

$src = $w->Html('');
$assert->equal(trim($src), trim('<!DOCTYPE html>' . PHP_EOL . '<html lang="en"></html>' . PHP_EOL), "Should have an html wrapper: [$src]");

$src = $w->Head('');
$assert->equal(trim($src), trim('<head></head>' . PHP_EOL), "Should have a head elments [$src]");

$src = $w->Title('hello world');
$assert->equal(trim($src), trim('<title>hello world</title>'), "Should have hello world title [$src]");

$src = $w->Link('');
$assert->equal(trim($src), trim('<link />'), "Should have <link /> [$src]");

$src = $w->Body('');
$assert->equal(trim($src), trim('<body></body>' . PHP_EOL), "Should have body block. [$src]");

$src = $w->H1('hello world');
$assert->equal($src, '<h1>hello world</h1>', "Should have h1 [$src]");

$src = $w->H2('hello world');
$assert->equal($src, '<h2>hello world</h2>', "Should have h2 [$src]");

$src = $w->H3('hello world');
$assert->equal($src, '<h3>hello world</h3>', "Should have h3 [$src]");

$src = $w->H4('hello world');
$assert->equal($src, '<h4>hello world</h4>', "Should have h4 [$src]");

$src = $w->H5('hello world');
$assert->equal($src, '<h5>hello world</h5>', "Should have h5 [$src]");

$src = $w->H6('hello world');
$assert->equal($src, '<h6>hello world</h6>', "Should have h6 [$src]");

$src = $w->P();
$assert->equal($src, '<p>', "Should have a simple p tag. [$src]");

$src = $w->P("hello world");
$assert->equal($src, '<p>hello world</p>', "Should have a wrapping p tag. [$src]");

$src = $w->A("", NULL);
$assert->equal($src, '<a></a>', "Should have an empty wrapping anchor tag [$src]");

$src = $w->A("here", 'http://example.com');
$assert->equal($src, '<a href="http://example.com">here</a>', "Should have a basic link to example.com [$src]");

$src = $w->A("here", 'http://example.com', 'title="test"');
$assert->equal($src, '<a title="test" href="http://example.com">here</a>', "Should have a basic link to example.com [$src]");

$src = $w->Ul('');
$assert->equal($src, '<ul></ul>', "Should have a ul wrapper [$src]");

$src = $w->Ol('');
$assert->equal($src, '<ol></ol>', "Should have a ol wrapper [$src]");

$src = $w->Li('');
$assert->equal($src, '<li></li>', "Should have a li wrapper [$src]");

$src = $w->Dl('');
$assert->equal($src, '<dl></dl>', "Should have a dl wrapper [$src]");

$src = $w->Dt('');
$assert->equal($src, '<dt></dt>', "Should have a dt wrapper [$src]");

$src = $w->Dd('');
$assert->equal($src, '<dd></dd>', "Should have a dd wrapper [$src]");

$src = $w->Table('');
$assert->equal($src, '<table></table>', "Should have a table wrapper [$src]");

$src = $w->Tr('');
$assert->equal($src, '<tr></tr>', "Should have a tr wrapper [$src]");

$src = $w->Td('');
$assert->equal($src, '<td></td>', "Should have a td wrapper [$src]");

$src = $w->Form('', NULL);
$assert->equal($src, '<form></form>', "Should have a form wrapper [$src]");

$src = $w->Input('fred','', NULL);
$assert->equal($src, '<input name="fred" value="" />', "Should have a simple input tag [$src]");

$src = $w->Select('', '');
$assert->equal($src, '<select name=""></select>', "Should have a simple select wrapper [$src]");

$src = $w->Option('', '');
$assert->equal($src, '<option value=""></option>', "Should have a simple select wrapper [$src]");

$src = $w->Label('');
$assert->equal($src, '<label></label>', "Should have a simple label wrapper [$src]");

$src = $w->Script();
$assert->equal($src, '<script type="text/javascript"></script>', "Should have an empty script tag. Expected: [<script type=\"text/javascript\"></script>] got:[$src]");

$str = ' one="1" two="2"';
$attributes = $w->attributes_string_to_array($str);
$assert->equal($attributes['one'], '1', "One should be 1: " . print_r($attributes, true));
$assert->equal($attributes['two'], '2', "Two should be 2:" . print_r($attributes, true));

$str = " one='1' two=\"2\"";
$attributes = $w->attributes_string_to_array($str);
$assert->equal($attributes['one'], '1', 
  "One should be 1: " . print_r($attributes, true));
$assert->equal($attributes['two'], '2', 
  "Two should be 2:" . print_r($attributes, true));

echo "Success!\n";
?>
