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

//var YUITest = this.YUITest || require("yuitest");
//var YUI = require("yui").YUI;

if (typeof require !== "undefined") {
    var YUI = require("yui").YUI;
}

YUI({
    useSync: true,
    debug: true,
    modules: {
        "tbone": {
            fullpath: "./src/gallery-tbone/tbone.js"
        }
    }
}).use("test", "tbone", function (Y) {
    var TBone = Y.TBone,
        Assert = Y.Assert,
        testCase;

    Y.log("Setting up test case");

    testCase = new Y.Test.Case({
        name: "TBone Unit Tests",
        "should test attributes" : function (test_label) {
            var s,
                expected_s,
                threw_error = false,
                tb = new TBone.HTML();
            Y.log("should test attributes case");
    
            // assembleAttributes() tests
            expected_s = "";
            s = tb.assembleAttributes();
            Assert.areSame(s, expected_s, "\n" + s + "\n" + expected_s);
        
            expected_s = 'class="content"';
            s = tb.assembleAttributes({"class": "content"});
            Assert.areSame(s, expected_s, "\n" + s + "\n" + expected_s);
    
            expected_s = 'id="me" class="content"';
            s = tb.assembleAttributes({id: "me", "class": "content"});
            Assert.areSame(s, expected_s, "\n" + s + "\n" + expected_s);
    
            try {
                s = tb.assembleAttributes(1);
            } catch (err1) {
                threw_error = true;
            }
            Assert.areSame(threw_error, true, "Should throw an error when passed a number");
    
            // disassembleAttributes() tests
            expected_s = {id: "me"};
            s = tb.disassembleAttributes('id="me"');
            Assert.areSame(s.id, expected_s.id, "\n" + s.id + "\n" + expected_s.id);
    
            // disassembleAttributes() tests
            expected_s = {id: "me", "class": "content"};
            s = tb.disassembleAttributes('id="me" class="content"');
            Assert.areSame(s.id, expected_s.id, "\n" + s.id + "\n" + expected_s.id);
            Assert.areSame(s["class"], expected_s["class"], "\n" + s["class"] + "\n" + expected_s["class"]);
        
            threw_error = false;
            try {
                s = tb.disassembleAttributes(1);
            } catch (err2) {
                threw_error = true;
            }
            Assert.areSame(threw_error, true, "Should throw an error when passed a non-string");
        },

        "Simple toString() tests": function () {
            var s,
                expected_s,
                tb = new TBone.HTML();
            
            expected_s = "<p>";
            s = tb.p();
            Assert.areSame(s, expected_s, "\n" + s + "\n" + expected_s);
        
            expected_s = "<p>";
            s = tb.p("");
            Assert.areSame(s, expected_s, "\n" + s + "\n" + expected_s);
        
            expected_s = '<p>Hi there</p>';
            s = tb.p("Hi there");
            Assert.areSame(s, expected_s, "\n" + s + "\n" + expected_s);

            expected_s = '<p id="me" class="content">';
            s = tb.p().attr({id: "me", "class": "content"});
            Assert.areSame(s, expected_s, "\n" + s + "\n" + expected_s);

            expected_s = '<p id="me" class="content">Hello World</p>';
            s = tb.p("Hello World").attr({id: "me", "class": "content"});
            Assert.areSame(s, expected_s, "\n" + s + "\n" + expected_s);

            expected_s = 'Hello World';
            s = tb.assembleTag(null, "Hello World", null);
            Assert.areSame(s, expected_s, "\n" + s + "\n" + expected_s);

            expected_s = "<br />";
            s = tb.br();
            Assert.areSame(s, expected_s, "\n" + s + "\n" + expected_s);

            expected_s = '<br id="me" class="content" />';
            s = tb.br().attr({id: "me", "class": "content"});
            Assert.areSame(s, expected_s, "\n" + s + "\n" + expected_s);
        },

       "simple tags": function () {
            var s, expected_s, tb = new TBone.HTML();
    
            Assert.isObject(tb, "Should have an object created by new TBone.HTML()");
            expected_s = "<div></div>";
            s = tb.div();
            Assert.areEqual(s, expected_s, "\n[" + s + "]\n[" + expected_s + "]");

            tb.label = 'div';
            tb.attributes = tb.assembleAttributes({id: "me"});
            expected_s = '<div id="me"></div>';
            s = tb.div().attr({id: "me"});
            Assert.areEqual(s, expected_s, "\n[" + s + "]\n[" + expected_s + "]");
    
            tb.label = '';
            tb.attributes = '';
            tb.content = '';
            expected_s = '<div>Hello World</div>';
            s = tb.div("Hello World");
            Assert.areSame(s, expected_s, "\n" + s + "\n" + expected_s);

            tb.label = '';
            tb.attributes = '';
            tb.content = '';
            tb.label = 'div';
            tb.attributes = tb.assembleAttributes({id: "me"});
            expected_s = '<div id="me">Hello World</div>';
            s = tb.div("Hello World").attr({id: "me"});
            Assert.areSame(s, expected_s, "\n" + s + "\n" + expected_s);

            // Now try nesting
            tb.label = '';
            tb.attributes = '';
            tb.content = '';
            expected_s = '<div><div>Hello World</div></div>';
            s = tb.div(tb.div("Hello World"));
            Assert.areSame(s, expected_s, "\n" + s + "\n" + expected_s);

            tb.label = '';
            tb.attributes = '';
            tb.content = '';
            expected_s = '<div id="outer"><div id="inner">Hello World</div></div>';
            s = tb.div(tb.div("Hello World").attr({id: "inner"})).attr({id: "outer"});
            Assert.areSame(s, expected_s, "\n" + s + "\n" + expected_s);

            expected_s = "<p>";
            s = tb.p().attr();
            Assert.areEqual(s, expected_s, "\n" + s + "\n" + expected_s);

            expected_s = '<p id="me">';
            s = tb.p().attr({id: "me"});
            Assert.areEqual(s, expected_s, "\n" + s + "\n" + expected_s + "]");
            expected_s = '<p id="me">me</p>';
            s = tb.p("me").attr({id: "me"});
            Assert.areEqual(s, expected_s, "\n" + s + "\n" + expected_s + "]");
    
            expected_s = "<div><!-- comment --><p></p></div>";
            s = tb.div("<!-- comment -->", "<p></p>").attr();
            Assert.areEqual(s, expected_s, "\n" + s + "\n" + expected_s + "]");

            expected_s = "<div><!-- comment --><p></p><!-- closing comment --></div>";
            s = tb.div("<!-- comment -->", "<p></p>", "<!-- closing comment -->").attr();
            Assert.areEqual(s, expected_s, "\n" + s + "\n" + expected_s + "]");
    
            expected_s = "<div><!-- comment --><p>Hi there.</p></div>";
            s = tb.div("<!-- comment -->", tb.p("Hi there.")).attr();
            Assert.areEqual(s, expected_s, "\n" + s + "\n" + expected_s + "]");
        },

        "a simple document": function () {
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
            Assert.areEqual(s, expected_s, "\n[" + s + "]\n[" + expected_s + "]");
        },

        "Tests 0.0.0 - 0.0.3e": function () {
            // Test the factory method
            var s, expected_s, i, tb;

            tb = new TBone.HTML();

            expected_s = '<!DOCTYPE html>' + "\n" + '<html></html>';
            s = tb.html('');
            Assert.areEqual(s, expected_s, "\n" + s + "\n" + expected_s);

            expected_s = '<!DOCTYPE html>' + "\n" + '<html lang="en"></html>';
            s = tb.html('').attr({lang: "en"});
            Assert.areEqual(s, expected_s, "\n" + s + "\n" + expected_s);

            expected_s = '<head></head>';
            s = tb.head('');
            Assert.areEqual(s, expected_s, "\n" + s + "\n" + expected_s);

            expected_s = '<title>hello world</title>';
            s = tb.title('hello world');
            Assert.areEqual(s, expected_s, "\n" + s + "\n" + expected_s);

            expected_s = '<link>';
            s = tb.link('');
            Assert.areEqual(s, expected_s, "\n" + s + "\n" + expected_s);

            expected_s = '<body></body>';
            s = tb.body('');
            Assert.areEqual(s, expected_s, "\n" + s + "\n" + expected_s);

            expected_s = '<h1>hello world</h1>';
            s = tb.h1('hello world');
            Assert.areEqual(s, expected_s, "\n" + s + "\n" + expected_s);

            expected_s = '<h2>hello world</h2>';
            s = tb.h2('hello world');
            Assert.areEqual(s, expected_s, "\n" + s + "\n" + expected_s);

            expected_s = '<h3>hello world</h3>';
            s = tb.h3('hello world');
            Assert.areEqual(s, expected_s, "\n" + s + "\n" + expected_s);

            expected_s = '<h4>hello world</h4>';
            s = tb.h4('hello world');
            Assert.areEqual(s, expected_s, "\n" + s + "\n" + expected_s);

            expected_s = '<h5>hello world</h5>';
            s = tb.h5('hello world');
            Assert.areEqual(s, expected_s, "\n" + s + "\n" + expected_s);

            expected_s = '<h6>hello world</h6>';
            s = tb.h6('hello world');
            Assert.areEqual(s, expected_s, "\n" + s + "\n" + expected_s);

            expected_s = "<p>";
            s = tb.p();
            Assert.areEqual(s, expected_s, "\n" + s + "\n" + expected_s);

            // If you have attributes, you' should have some sort of
            // inner content...
            expected_s = '<p id="me"> </p>';
            s = tb.p(" ").attr({id: "me"});
            Assert.areEqual(s, expected_s, "\n" + s + "\n" + expected_s);

            expected_s = '<p>1</p>';
            s = tb.p("1");
            Assert.areEqual(s, expected_s, "\n" + s + "\n" + expected_s);

            expected_s = "<p>hello world</p>";
            s = tb.p("hello world");
            Assert.areEqual(s, expected_s, "\n" + s + "\n" + expected_s);

            expected_s = "<a></a>";
            s = tb.a("");
            Assert.areEqual(s, expected_s, "\n" + s + "\n" + expected_s);

            expected_s = "<a href=\"http://example.com\">here</a>";
            s = tb.a("here").attr({href: "http://example.com"});
            Assert.areEqual(s, expected_s, "\n" + s + "\n" + expected_s);

            expected_s = "<a href=\"http://example.com\" title=\"I'm here\">here</a>";
            s = tb.a("here").attr({
                "href": "http://example.com",
                title: "I'm here"
            });
            Assert.areEqual(s, expected_s, "\n" + s + "\n" + expected_s);

            expected_s = "<ul></ul>";
            s = tb.ul('');
            Assert.areEqual(s, expected_s, "\n" + s + "\n" + expected_s);

            expected_s = '<ol></ol>';
            s = tb.ol('');
            Assert.areEqual(s, expected_s, "\n" + s + "\n" + expected_s);

            expected_s = '<li></li>';
            s = tb.li('');
            Assert.areEqual(s, expected_s, "\n" + s + "\n" + expected_s);

            expected_s = '<dl></dl>';
            s = tb.dl('');
            Assert.areEqual(s, expected_s, "\n" + s + "\n" + expected_s);

            expected_s = '<dt></dt>';
            s = tb.dt('');
            Assert.areEqual(s, expected_s, "\n" + s + "\n" + expected_s);

            expected_s = '<dd></dd>';
            s = tb.dd('');
            Assert.areEqual(s, expected_s, "\n" + s + "\n" + expected_s);

            expected_s = '<table></table>';
            s = tb.table('');
            Assert.areEqual(s, expected_s, "\n" + s + "\n" + expected_s);

            expected_s = '<tr></tr>';
            s = tb.tr('');
            Assert.areEqual(s, expected_s, "\n" + s + "\n" + expected_s);

            expected_s = '<td></td>';
            s = tb.td('');
            Assert.areEqual(s, expected_s, "\n" + s + "\n" + expected_s);

            expected_s = '<form></form>';
            s = tb.form();
            Assert.areEqual(s, expected_s, "\n" + s + "\n" + expected_s);

            expected_s = '<input>';
            s = tb.input();
            Assert.areEqual(s, expected_s, "\n" + s + "\n" + expected_s);

            expected_s = '<input value="Something">';
            s = tb.input().attr({value: "Something"});
            Assert.areEqual(s, expected_s, "\n" + s + "\n" + expected_s);

            expected_s = '<select></select>';
            s = tb.select();
            Assert.areEqual(s, expected_s, "\n" + s + "\n" + expected_s);


            expected_s = '<option></option>';
            s = tb.option();
            Assert.areEqual(s, expected_s, "\n" + s + "\n" + expected_s);

            expected_s = '<select name="location"></select>';
            s = tb.select().attr({name: "location"});
            Assert.areEqual(s, expected_s, "\n" + s + "\n" + expected_s);

            expected_s = '<option value="Los Angeles"></option>';
            s = tb.option().attr({value: "Los Angeles"});
            Assert.areEqual(s, expected_s, "\n" + s + "\n" + expected_s);

            expected_s = '<label></label>';
            s = tb.label();
            Assert.areEqual(s, expected_s, "\n" + s + "\n" + expected_s);

            expected_s = '<header></header>';
            s = tb.header();
            Assert.areEqual(s, expected_s, "\n" + s + "\n" + expected_s);

            expected_s = '<footer></footer>';
            s = tb.footer();
            Assert.areEqual(s, expected_s, "\n" + s + "\n" + expected_s);
        },


        "Tests 0.1.0 - 0.1.2": function () {
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

            Assert.areSame(s.length, expected_s.length, "Should be same length: " + s.length + " ~ " + expected_s.length);
            Assert.areSame(s, expected_s, "\n" + s + "\n" + expected_s);
        },

        "Check for HTML5 tags": function () {
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
            Assert.areSame(s, expected_s, "\n" + s + "\n" + expected_s);
            
            expected_s = "<abbr></abbr>";
            s = tb.abbr();
            Assert.areSame(s, expected_s, "\n" + s + "\n" + expected_s);
            
            expected_s = "<address></address>";
            s = tb.address();
            Assert.areSame(s, expected_s, "\n" + s + "\n" + expected_s);
            
            expected_s = "<area>";
            s = tb.area();
            Assert.areSame(s, expected_s, "\n" + s + "\n" + expected_s);

            expected_s = "<article></article>";
            s = tb.article();
            Assert.areSame(s, expected_s, "\n" + s + "\n" + expected_s);
            
            expected_s = "<aside></aside>";
            s = tb.aside();
            Assert.areSame(s, expected_s, "\n" + s + "\n" + expected_s);
            
            expected_s = "<audio></audio>";
            s = tb.audio();
            Assert.areSame(s, expected_s, "\n" + s + "\n" + expected_s);
            

            //
            // Elements starting with B
            //
            expected_s = "<b></b>";
            s = tb.b();
            Assert.areSame(s, expected_s, "\n" + s + "\n" + expected_s);

            expected_s = "<base>";
            s = tb.base();
            Assert.areSame(s, expected_s, "\n" + s + "\n" + expected_s);
            
            expected_s = "<bdi></bdi>";
            s = tb.bdi();
            Assert.areSame(s, expected_s, "\n" + s + "\n" + expected_s);
            
            expected_s = "<bdo></bdo>";
            s = tb.bdo();
            Assert.areSame(s, expected_s, "\n" + s + "\n" + expected_s);
            
            expected_s = "<blockquote></blockquote>";
            s = tb.blockquote();
            Assert.areSame(s, expected_s, "\n" + s + "\n" + expected_s);

            expected_s = "<body></body>";
            s = tb.body();
            Assert.areSame(s, expected_s, "\n" + s + "\n" + expected_s);
            
            expected_s = "<br />";
            s = tb.br();
            Assert.areSame(s, expected_s, "\n" + s + "\n" + expected_s);
            
            expected_s = "<button></button>";
            s = tb.button();
            Assert.areSame(s, expected_s, "\n" + s + "\n" + expected_s);
            
            //
            // Elements starting with C
            //
            expected_s = "<canvas></canvas>";
            s = tb.canvas();
            Assert.areSame(s, expected_s, "\n" + s + "\n" + expected_s);

            expected_s = "<caption></caption>";
            s = tb.caption();
            Assert.areSame(s, expected_s, "\n" + s + "\n" + expected_s);

            expected_s = "<cite></cite>";
            s = tb.cite();
            Assert.areSame(s, expected_s, "\n" + s + "\n" + expected_s);
            
            expected_s = "<code></code>";
            s = tb.code();
            Assert.areSame(s, expected_s, "\n" + s + "\n" + expected_s);

            expected_s = "<col></col>";
            s = tb.col();
            Assert.areSame(s, expected_s, "\n" + s + "\n" + expected_s);

            expected_s = "<colgroup></colgroup>";
            s = tb.colgroup();
            Assert.areSame(s, expected_s, "\n" + s + "\n" + expected_s);

            expected_s = "<command />";
            s = tb.command();
            Assert.areSame(s, expected_s, "\n" + s + "\n" + expected_s);


            //
            // Elements starting with D
            //
            expected_s = "<datalist></datalist>";
            s = tb.datalist();
            Assert.areSame(s, expected_s, "\n" + s + "\n" + expected_s);

            expected_s = "<dd></dd>";
            s = tb.dd();
            Assert.areSame(s, expected_s, "\n" + s + "\n" + expected_s);
            
            expected_s = "<del></del>";
            s = tb.del();
            Assert.areSame(s, expected_s, "\n" + s + "\n" + expected_s);
            
            expected_s = "<details></details>";
            s = tb.details();
            Assert.areSame(s, expected_s, "\n" + s + "\n" + expected_s);
            
            expected_s = "<dfn></dfn>";
            s = tb.dfn();
            Assert.areSame(s, expected_s, "\n" + s + "\n" + expected_s);
            
            expected_s = "<div></div>";
            s = tb.div();
            Assert.areSame(s, expected_s, "\n" + s + "\n" + expected_s);
            
            expected_s = "<dl></dl>";
            s = tb.dl();
            Assert.areSame(s, expected_s, "\n" + s + "\n" + expected_s);
            
            expected_s = "<dt></dt>";
            s = tb.dt();
            Assert.areSame(s, expected_s, "\n" + s + "\n" + expected_s);
            

            //
            // Elements starting with E
            //
            expected_s = "<em></em>";
            s = tb.em();
            Assert.areSame(s, expected_s, "\n" + s + "\n" + expected_s);
            
            expected_s = "<embed>";
            s = tb.embed();
            Assert.areSame(s, expected_s, "\n" + s + "\n" + expected_s);
            

            //
            // Elements starting with F
            //
            expected_s = "<fieldset></fieldset>";
            s = tb.fieldset();
            Assert.areSame(s, expected_s, "\n" + s + "\n" + expected_s);
            
            expected_s = "<figcaption></figcaption>";
            s = tb.figcaption();
            Assert.areSame(s, expected_s, "\n" + s + "\n" + expected_s);
            
            expected_s = "<figure></figure>";
            s = tb.figure();
            Assert.areSame(s, expected_s, "\n" + s + "\n" + expected_s);
            
            expected_s = "<footer></footer>";
            s = tb.footer();
            Assert.areSame(s, expected_s, "\n" + s + "\n" + expected_s);
            
            expected_s = "<form></form>";
            s = tb.form();
            Assert.areSame(s, expected_s, "\n" + s + "\n" + expected_s);
            

            //
            // Elements starting with G (None)
            //

            //
            // Elements starting with H
            //
            expected_s = "<h1></h1>";
            s = tb.h1();
            Assert.areSame(s, expected_s, "\n" + s + "\n" + expected_s);

            expected_s = "<h2></h2>";
            s = tb.h2();
            Assert.areSame(s, expected_s, "\n" + s + "\n" + expected_s);

            expected_s = "<h3></h3>";
            s = tb.h3();
            Assert.areSame(s, expected_s, "\n" + s + "\n" + expected_s);

            expected_s = "<h4></h4>";
            s = tb.h4();
            Assert.areSame(s, expected_s, "\n" + s + "\n" + expected_s);

            expected_s = "<h5></h5>";
            s = tb.h5();
            Assert.areSame(s, expected_s, "\n" + s + "\n" + expected_s);

            expected_s = "<h6></h6>";
            s = tb.h6();
            Assert.areSame(s, expected_s, "\n" + s + "\n" + expected_s);

            expected_s = "<head></head>";
            s = tb.head();
            Assert.areSame(s, expected_s, "\n" + s + "\n" + expected_s);

            expected_s = "<header></header>";
            s = tb.header();
            Assert.areSame(s, expected_s, "\n" + s + "\n" + expected_s);

            expected_s = "<hgroup></hgroup>";
            s = tb.hgroup();
            Assert.areSame(s, expected_s, "\n" + s + "\n" + expected_s);

            expected_s = "<hr />";
            s = tb.hr();
            Assert.areSame(s, expected_s, "\n" + s + "\n" + expected_s);

            expected_s = "<!DOCTYPE html>\n<html></html>";
            s = tb.html();
            Assert.areSame(s, expected_s, "\n" + s + "\n" + expected_s);

            //
            // Elements starting with I
            //
            expected_s = "<i></i>";
            s = tb.i();
            Assert.areSame(s, expected_s, "\n" + s + "\n" + expected_s);

            expected_s = "<iframe></iframe>";
            s = tb.iframe();
            Assert.areSame(s, expected_s, "\n" + s + "\n" + expected_s);

            expected_s = "<img />";
            s = tb.img();
            Assert.areSame(s, expected_s, "\n" + s + "\n" + expected_s);

            expected_s = "<input>";
            s = tb.input();
            Assert.areSame(s, expected_s, "\n" + s + "\n" + expected_s);

            expected_s = "<ins></ins>";
            s = tb.ins();
            Assert.areSame(s, expected_s, "\n" + s + "\n" + expected_s);


            //
            // Elements starting with J (None)
            //

            //
            // Elements starting with K
            //
            expected_s = "<kbd></kbd>";
            s = tb.kbd();
            Assert.areSame(s, expected_s, "\n" + s + "\n" + expected_s);

            expected_s = "<keygen>";
            s = tb.keygen();
            Assert.areSame(s, expected_s, "\n" + s + "\n" + expected_s);


            //
            // Elements starting with L
            //
            expected_s = "<label></label>";
            s = tb.label();
            Assert.areSame(s, expected_s, "\n" + s + "\n" + expected_s);

            expected_s = "<legend></legend>";
            s = tb.legend();
            Assert.areSame(s, expected_s, "\n" + s + "\n" + expected_s);

            expected_s = "<li></li>";
            s = tb.li();
            Assert.areSame(s, expected_s, "\n" + s + "\n" + expected_s);

            expected_s = "<link>";
            s = tb.link();
            Assert.areSame(s, expected_s, "\n" + s + "\n" + expected_s);


            //
            // Elements starting with M
            //
            expected_s = "<map></map>";
            s = tb.map();
            Assert.areSame(s, expected_s, "\n" + s + "\n" + expected_s);

            expected_s = "<mark></mark>";
            s = tb.mark();
            Assert.areSame(s, expected_s, "\n" + s + "\n" + expected_s);

            expected_s = "<menu></menu>";
            s = tb.menu();
            Assert.areSame(s, expected_s, "\n" + s + "\n" + expected_s);

            expected_s = "<meta />";
            s = tb.meta();
            Assert.areSame(s, expected_s, "\n" + s + "\n" + expected_s);

            expected_s = "<meter></meter>";
            s = tb.meter();
            Assert.areSame(s, expected_s, "\n" + s + "\n" + expected_s);


            //
            // Elements starting with N
            //
            expected_s = "<nav></nav>";
            s = tb.nav();
            Assert.areSame(s, expected_s, "\n" + s + "\n" + expected_s);
            
            expected_s = "<noscript></noscript>";
            s = tb.noscript();
            Assert.areSame(s, expected_s, "\n" + s + "\n" + expected_s);
            

            //
            // Elements starting with O
            //
            expected_s = "<object></object>";
            s = tb.object();
            Assert.areSame(s, expected_s, "\n" + s + "\n" + expected_s);
            
            expected_s = "<ol></ol>";
            s = tb.ol();
            Assert.areSame(s, expected_s, "\n" + s + "\n" + expected_s);
            
            expected_s = "<optgroup></optgroup>";
            s = tb.optgroup();
            Assert.areSame(s, expected_s, "\n" + s + "\n" + expected_s);
            
            expected_s = "<option></option>";
            s = tb.option();
            Assert.areSame(s, expected_s, "\n" + s + "\n" + expected_s);
            
            expected_s = "<output></output>";
            s = tb.output();
            Assert.areSame(s, expected_s, "\n" + s + "\n" + expected_s);
            

            //
            // Elements starting with P
            //
            expected_s = "<p>";
            s = tb.p();
            Assert.areSame(s, expected_s, "\n" + s + "\n" + expected_s);
            
            expected_s = "<param></param>";
            s = tb.param();
            Assert.areSame(s, expected_s, "\n" + s + "\n" + expected_s);
            
            expected_s = "<progress></progress>";
            s = tb.progress();
            Assert.areSame(s, expected_s, "\n" + s + "\n" + expected_s);
            
            expected_s = "<pre></pre>";
            s = tb.pre();
            Assert.areSame(s, expected_s, "\n" + s + "\n" + expected_s);
            

            //
            // Elements starting with Q
            //
            expected_s = "<q></q>";
            s = tb.q();
            Assert.areSame(s, expected_s, "\n" + s + "\n" + expected_s);
            

            //
            // Elements starting with R
            //
            expected_s = "<rp></rp>";
            s = tb.rp();
            Assert.areSame(s, expected_s, "\n" + s + "\n" + expected_s);
            
            expected_s = "<rt></rt>";
            s = tb.rt();
            Assert.areSame(s, expected_s, "\n" + s + "\n" + expected_s);
            
            expected_s = "<ruby></ruby>";
            s = tb.ruby();
            Assert.areSame(s, expected_s, "\n" + s + "\n" + expected_s);
            

            //
            // Elements starting with S
            //
            expected_s = "<s></s>";
            s = tb.s();
            Assert.areSame(s, expected_s, "\n" + s + "\n" + expected_s);
            
            expected_s = "<samp></samp>";
            s = tb.samp();
            Assert.areSame(s, expected_s, "\n" + s + "\n" + expected_s);

            expected_s = "<script></script>";
            s = tb.script();
            Assert.areSame(s, expected_s, "\n" + s + "\n" + expected_s);
            
            expected_s = "<section></section>";
            s = tb.section();
            Assert.areSame(s, expected_s, "\n" + s + "\n" + expected_s);
            
            expected_s = "<select></select>";
            s = tb.select();
            Assert.areSame(s, expected_s, "\n" + s + "\n" + expected_s);
            
            expected_s = "<small></small>";
            s = tb.small();
            Assert.areSame(s, expected_s, "\n" + s + "\n" + expected_s);
            
            expected_s = "<span></span>";
            s = tb.span();
            Assert.areSame(s, expected_s, "\n" + s + "\n" + expected_s);

            expected_s = "<strong></strong>";
            s = tb.strong();
            Assert.areSame(s, expected_s, "\n" + s + "\n" + expected_s);

            expected_s = "<style></style>";
            s = tb.style();
            Assert.areSame(s, expected_s, "\n" + s + "\n" + expected_s);
            
            expected_s = "<sub></sub>";
            s = tb.sub();
            Assert.areSame(s, expected_s, "\n" + s + "\n" + expected_s);

            expected_s = "<summary></summary>";
            s = tb.summary();
            Assert.areSame(s, expected_s, "\n" + s + "\n" + expected_s);

            expected_s = "<sup></sup>";
            s = tb.sup();
            Assert.areSame(s, expected_s, "\n" + s + "\n" + expected_s);


            //
            // Elements starting with T
            //
            expected_s = "<table></table>";
            s = tb.table();
            Assert.areSame(s, expected_s, "\n" + s + "\n" + expected_s);

            expected_s = "<tbody></tbody>";
            s = tb.tbody();
            Assert.areSame(s, expected_s, "\n" + s + "\n" + expected_s);

            expected_s = "<td></td>";
            s = tb.td();
            Assert.areSame(s, expected_s, "\n" + s + "\n" + expected_s);

            expected_s = "<textarea></textarea>";
            s = tb.textarea();
            Assert.areSame(s, expected_s, "\n" + s + "\n" + expected_s);

            expected_s = "<tfoot></tfoot>";
            s = tb.tfoot();
            Assert.areSame(s, expected_s, "\n" + s + "\n" + expected_s);

            expected_s = "<thead></thead>";
            s = tb.thead();
            Assert.areSame(s, expected_s, "\n" + s + "\n" + expected_s);

            expected_s = "<time></time>";
            s = tb.time();
            Assert.areSame(s, expected_s, "\n" + s + "\n" + expected_s);

            expected_s = "<title></title>";
            s = tb.title();
            Assert.areSame(s, expected_s, "\n" + s + "\n" + expected_s);

            expected_s = "<tr></tr>";
            s = tb.tr();
            Assert.areSame(s, expected_s, "\n" + s + "\n" + expected_s);

            expected_s = "<track>";
            s = tb.track();
            Assert.areSame(s, expected_s, "\n" + s + "\n" + expected_s);
            

            //
            // Elements starting with U
            //
            expected_s = "<u></u>";
            s = tb.u();
            Assert.areSame(s, expected_s, "\n" + s + "\n" + expected_s);

            expected_s = "<ul></ul>";
            s = tb.ul();
            Assert.areSame(s, expected_s, "\n" + s + "\n" + expected_s);


            //
            // Elements starting with V
            //
            /*
            expected_s = "<var></var>";
            s = tb.var();
            Assert.areSame(s, expected_s, "\n" + s + "\n" + expected_s);
            */

            expected_s = "<video></video>";
            s = tb.video();
            Assert.areSame(s, expected_s, "\n" + s + "\n" + expected_s);
            
            //
            // Elements starting with W
            //
            expected_s = "<wbr>";
            s = tb.wbr();
            Assert.areSame(s, expected_s, "\n" + s + "\n" + expected_s);
            

            //
            // Elements starting with X (None)
            //

            //
            // Elements starting with Y (None)
            //

            //
            // Elements starting with Z (None)
            //
        }
    });

    Y.Test.Runner.add(testCase);
    Y.Test.Runner.run();
});
