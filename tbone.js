/**
 * tbone is a simple library for assembling valid HTML. It is available in
 * three languages - Go, JavaScript and PHP.
 *
 * Inspiration "Behind the Code: Avoiding Spaghetti" by Jason Grosman
 * http://www.npr.org/blogs/inside/2011/02/02/126312263/behind-the-code-avoiding-spaghetti-html
 *
 * HTML markup reference was http://en.wikipedia.org/wiki/HTML_element#HTML401
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

(function (global, exports) {
	if (exports === undefined) {
		exports = {};
	}

	var HTML = function () {
		this.docType =  '';
		this.asTwo = true;
		this.html_tag =  '';
		this.innerHTML = [];
		this.attributes =  {};
	};

	// tag(), setups the tag and innerHTML fields
	HTML.prototype.tag = function (tag, args) {
		var i;
		
		this.html_tag = tag;
		if (args === undefined) {
			return this;
		}
		if (this.innerHTML === undefined) {
			this.innerHTML = [];
		}
		
		for (i = 0; i < args.length; i += 1) {
			this.innerHTML.push(args[i]);
		}
		return this;
	};


	//
	// fromHTMLEntities(), toHTMLEntities() are content normalization
	// methods to improve the quality of the tbone output
	//
	// References notes were
	// See: http://theorem.ca/~mvcorks/code/charsets/latin1.html
	// See: http://en.wikipedia.org/wiki/List_of_XML_and_HTML_character_entity_reference
	var sbquo = '&sbquo;',
		cc_sbquo = String.fromCharCode(8218),
		sbquo_encodings = [
			// iso-8859-1
			String.fromCharCode(130),
			'&#130;',
			// html entity
			cc_sbquo,
			'&#8218;',
			sbquo
		].join("|"),
		re_sbquo = new RegExp(sbquo_encodings, 'g'),
	
		bdquo = '&bdquo;',
		cc_bdquo = String.fromCharCode(8222),
		bdquo_encodings = [
			// iso-8859-1
			String.fromCharCode(132),
			'&#132;',
			// html entity
			cc_bdquo,
			'&#8222;',
			bdquo
		].join("|"),
		re_bdquo = new RegExp(bdquo_encodings, 'g'),
	
		hellip = '&hellip;',
		cc_hellip = String.fromCharCode(8230),
		hellip_encodings = [
			// iso-8859-1
			String.fromCharCode(133),
			'&#133;',
			// html entity
			cc_hellip,
			'&#8230;',
			hellip
		].join("|"),
		re_hellip = new RegExp(hellip_encodings, 'g'),
	
		dagger = '&dagger;',
		cc_dagger = String.fromCharCode(8224),
		dagger_encodings = [
			// iso-8859-1
			String.fromCharCode(134),
			'&#134;',
			// html entity
			cc_dagger,
			'&#8224;',
			dagger
		].join("|"),
		re_dagger = new RegExp(dagger_encodings, 'g'),
	
		Dagger = '&Dagger;',
		cc_Dagger = String.fromCharCode(8225),
		Dagger_encodings = [
			// iso-8859-1
			String.fromCharCode(135),
			'&#135;',
			// html entity
			cc_Dagger,
			'&#8225;',
			Dagger
		].join("|"),
		re_Dagger = new RegExp(Dagger_encodings, 'g'),
	
		// standard quotes
		quot = '&quot;',
		cc_quot = String.fromCharCode(34),
		quot_encodings = [
			'&#34;',
			'&amp;quot;',
			// cc_quot not included because of role in HTML markup
			quot
		].join("|"),
		re_quot = new RegExp(quot_encodings, 'g'),
	
		apos = '&apos;',
		cc_apos = String.fromCharCode(39),
		apos_encodings = [
			'&amp;apos;',
			// cc_apos not included because of role in HTML markup
			'&#39;',
			apos
		].join("|"),
		re_apos = new RegExp(apos_encodings, "g"),
		
		acute = '&acute;',
		cc_acute = String.fromCharCode(180),
		acute_encodings = [
			'&#180;',
			cc_acute,
			acute
		].join("|"),
		re_acute = new RegExp(acute_encodings, "g"),
	
		// Left single quotes
		lsquo = '&lsquo;',
		cc_lsquo = String.fromCharCode(8216),
		lsquo_encodings = [
			// single quote in iso-8856-1
			String.fromCharCode(145),
			// html entity
			cc_lsquo,
			'&#145;',
			'&#8216;',
			lsquo
		].join("|"),
		re_lsquo = new RegExp(lsquo_encodings, 'g'),
	
		// Right Single Quotes
		rsquo = '&rsquo;',
		cc_rsquo = String.fromCharCode(8217),
		rsquo_encodings = [
			// single quote in iso-8856-1
			String.fromCharCode(146),
			// html entity
			cc_rsquo,
			'&#146;',
			'&#8217;',
			rsquo
		].join("|"),
		re_rsquo = new RegExp(rsquo_encodings, 'g'),
		
		// double quotes in iso-8856-1
		ldquo = '&ldquo;',
		cc_ldquo = String.fromCharCode(8220),
		ldquo_encodings = [
			// double quote in iso-8856-1
			String.fromCharCode(147),
			// html entity
			cc_ldquo,
			'&#147;',
			'&#8220;',
			ldquo
		].join("|"),
		re_ldquo = new RegExp(ldquo_encodings, 'g'),
		
		laquo = '&laquo;',
		cc_laquo = String.fromCharCode(171),
		laquo_encodings = [
			// iso-8859-1
			String.fromCharCode(171),
			// html entity
			laquo
		].join("|"),
		re_laquo = new RegExp(laquo_encodings, 'g'),
	
		raquo = '&raquo;',
		cc_raquo = String.fromCharCode(187),
		raquo_encodings = [
			// iso-8859-1
			String.fromCharCode(187),
			// html entity
			raquo
		].join("|"),
		re_raquo = new RegExp(raquo_encodings, 'g'),
	
		rdquo = '&rdquo;',
		cc_rdquo = String.fromCharCode(8221),
		rdquo_encodings = [
			// double quote in iso-8856-1
			String.fromCharCode(148),
			'&#148;',
			// html entity
			cc_rdquo,
			'&#8221;',
			rdquo
		].join("|"),
		re_rdquo = new RegExp(rdquo_encodings, 'g'),
	
		bull = '&bull;',
		cc_bull = String.fromCharCode(149),
		bull_encodings = [
			cc_bull,
			'&#149;',
			bull
		].join("|"),
		re_bull = new RegExp(bull_encodings, 'g'),
	
		ndash = '&ndash;',
		cc_ndash = String.fromCharCode(8211),
		ndash_encodings = [
			String.fromCharCode(150),
			'&#150;',
			cc_ndash,
			'&#8211;',
			ndash
		].join("|"),
		re_ndash = new RegExp(ndash_encodings, 'g'),
	
		mdash = '&mdash;',
		cc_mdash = String.fromCharCode(8212),
		mdash_encodings = [
			// iso-8859-1
			String.fromCharCode(151),
			String.fromCharCode(226),
			'&#151;',
			'&#226;',
			cc_mdash,
			'&#8212;',
			mdash
		].join("|"),
		re_mdash = new RegExp(mdash_encodings, 'g'),
	
		copyright_mark = '&copy;',
		cc_copyright_mark = String.fromCharCode(169),
		copy_encodings = [
			cc_copyright_mark,
			'&#169;',
			copyright_mark
		].join("|"),
		re_copy = new RegExp(copy_encodings, 'g'),
		
		nbsp = '&nbsp;',
		cc_nbsp = String.fromCharCode(160),
		nbsp_encodings = [
			cc_nbsp,
			'&#160;',
			nbsp
		].join("|"),
		re_nbsp = new RegExp(nbsp_encodings, 'g'),
	
		// A new line variants
		NewLine = '&NewLine;',
		cc_NewLine = "\n",
		new_line_encodings = [
			"\n", "\r", "\f",
			String.fromCharCode(10),
			String.fromCharCode(8232),
			//String.fromCharCode(65533),
			NewLine
		].join("|"),
		re_NewLine = new RegExp(new_line_encodings, 'g');

	HTML.prototype.reset = function () {
		this.docType = '';
		this.asTwo = true;
		this.html_tag = '';
		this.innerHTML = [];
		this.attributes = {};
	};

	HTML.prototype.attr = function (attributes) {
		this.attributes = attributes;
		return this;
	};

	HTML.prototype.toString = function () {
		var attrs = [],
			output = [],
			asTwo = this.asTwo,
			docType = this.docType,
			html_tag = this.html_tag,
			attributes = this.attributes,
			innerHTML = this.innerHTML,
			text,
			ky;
	
		this.reset();
		if (docType.length > 0) {
			output.push(docType + "\n");
		}
		for (ky in attributes) {
			if (attributes.hasOwnProperty(ky)) {
				attrs.push([ky, "=", '"', attributes[ky], '"'].join(""));
			}
		}
		if (innerHTML.length > 0) {
			for (i = 0; i < innerHTML.length; i += 1) {
				if (typeof innerHTML[i] === "string") {
					text = innerHTML[i];
				} else {
					text = typeof innerHTML[i] + ", " +
						i + ": " + JSON.stringify(innerHTML[i]);
				}
				if (attrs.length > 0) {
					output.push(String("<" + html_tag + " " +
						attrs.join(" ")).trim() + ">" +
						text + "</" + html_tag + ">");
				} else {
					output.push("<" + html_tag + ">" + text +
						"</" + html_tag + ">");
				}
			}
		} else if (asTwo) {
			if (attrs.length > 0) {
				output.push(String("<" + html_tag + " " +
					attrs.join(" ")).trim() + ">" + "</" + html_tag + ">");
			} else {
				output.push("<" + html_tag + ">" +
					"</" + html_tag + ">");
			}
		} else {
			if (html_tag === "p") {
				if (attrs.length > 0) {
					output.push(String("<p " + attrs.join(" ")).trim() + ">");
				} else {
					output.push("<p>");
				}
			} else {
				if (attrs.length > 0) {
					output.push(String("<" + html_tag + " " + attrs.join(" ")).trim() + " />");
				} else {
					output.push("<" + html_tag + " />");
				}
			}
		}
		return output.join("");
	};

	HTML.prototype.html = function () {
		this.docType = "<!DOCTYPE html>";
		this.tag('html', Array.prototype.slice.call(arguments));
		return this;
	};

	HTML.prototype.head = function () {
		this.tag('head', Array.prototype.slice.call(arguments));
		return this;
	};

	HTML.prototype.title = function () {
		this.tag('title', Array.prototype.slice.call(arguments));
		return this;
	};

	HTML.prototype.link = function () {
		this.asTwo = false;
		this.tag('link');
		return this;
	};

	HTML.prototype.body = function () {
		this.tag('body', Array.prototype.slice.call(arguments));
		return this;
	};

	HTML.prototype.h1 = function () {
		this.tag('h1', Array.prototype.slice.call(arguments));
		return this;
	};

	HTML.prototype.h2 = function () {
		this.tag('h2', Array.prototype.slice.call(arguments));
		return this;
	};

	HTML.prototype.h3 = function () {
		this.tag('h3', Array.prototype.slice.call(arguments));
		return this;
	};

	HTML.prototype.h4 = function () {
		this.tag('h4', Array.prototype.slice.call(arguments));
		return this;
	};

	HTML.prototype.h5 = function () {
		this.tag('h5', Array.prototype.slice.call(arguments));
		return this;
	};

	HTML.prototype.h6 = function () {
		var results = {};
		this.tag('h6', Array.prototype.slice.call(arguments));
		return this;
	};

	HTML.prototype.a = function () {
		this.tag('a', Array.prototype.slice.call(arguments));
		return this;
	};

	HTML.prototype.p = function () {
		var results = {},
			args = Array.prototype.slice.call(arguments);

		if (args.length > 0) {
			this.asTwo = true;
			this.tag('p', args);
		} else {
			this.asTwo = false;
			this.tag('p', args);
		}
		return this;
	};

	HTML.prototype.ul = function () {
		this.tag('ul', Array.prototype.slice.call(arguments));
		return this;
	};

	HTML.prototype.ol = function () {
		this.tag('ol', Array.prototype.slice.call(arguments));
		return this;
	};

	HTML.prototype.li = function () {
		this.tag('li', Array.prototype.slice.call(arguments));
		return this;
	};

	HTML.prototype.dl = function () {
		this.tag('dl', Array.prototype.slice.call(arguments));
		return this;
	};

	HTML.prototype.dt = function () {
		this.tag('dt', Array.prototype.slice.call(arguments));
		return this;
	};

	HTML.prototype.dd = function () {
		this.tag('dd', Array.prototype.slice.call(arguments));
		return this;
	};

	HTML.prototype.table = function () {
		this.tag('table', Array.prototype.slice.call(arguments));
		return this;
	};

	HTML.prototype.th = function () {
		this.tag('th', Array.prototype.slice.call(arguments));
		return this;
	};

	HTML.prototype.tr = function () {
		this.tag('tr', Array.prototype.slice.call(arguments));
		return this;
	};
	
	HTML.prototype.td = function () {
		this.tag('td', Array.prototype.slice.call(arguments));
		return this;
	};
	
	HTML.prototype.caption = function () {
		this.tag('caption', Array.prototype.slice.call(arguments));
		return this;
	};

	HTML.prototype.embed = function () {
		this.tag('embed', Array.prototype.slice.call(arguments));
		return this;
	};

	HTML.prototype.form = function () {
		this.tag('form', Array.prototype.slice.call(arguments));
		return this;
	};

	HTML.prototype.input = function () {
		this.asTwo = false;
		this.tag('input');
		return this;
	};
	
	HTML.prototype.button = function () {
		this.asTwo = false;
		this.tag('button');
		return this;
	};

	HTML.prototype.textarea = function () {
		this.tag('textarea', Array.prototype.slice.call(arguments));
		return this;
	};

	HTML.prototype.select = function () {
		this.tag('select', Array.prototype.slice.call(arguments));
		return this;
	};

	HTML.prototype.option = function () {
		this.tag('option', Array.prototype.slice.call(arguments));
		return this;
	};

	HTML.prototype.label = function () {
		this.tag('label', Array.prototype.slice.call(arguments));
		return this;
	};
	
	HTML.prototype.script = function () {
		this.asTwo = true;
		this.tag('script', Array.prototype.slice.call(arguments));
		return this;
	};
	
	HTML.prototype.pre = function () {
		this.asTwo = true;
		this.tag('pre', Array.prototype.slice.call(arguments));
		return this;
	};
	
	HTML.prototype.div = function () {
		this.tag('div', Array.prototype.slice.call(arguments));
		return this;
	};

	HTML.prototype.span = function () {
		this.tag('span', Array.prototype.slice.call(arguments));
		return this;
	};

	HTML.prototype.menu = function () {
		this.tag('menu', Array.prototype.slice.call(arguments));
		return this;
	};

	HTML.prototype.img = function () {
		this.asTwo = false;
		this.tag('img');
		return this;
	};
	
	HTML.prototype.object = function () {
		this.tag('object', Array.prototype.slice.call(arguments));
		return this;
	};
	
	HTML.prototype.param = function () {
		this.tag('param', Array.prototype.slice.call(arguments));
		return this;
	};

	HTML.prototype.center = function () {
		this.tag('center', Array.prototype.slice.call(arguments));
		return this;
	};

	HTML.prototype.br = function () {
		this.asTwo = false;
		this.tag('br');
		return this;
	};

	HTML.prototype.base = function () {
		this.tag('base', Array.prototype.slice.call(arguments));
		return this;
	};

	HTML.prototype.meta = function () {
		this.asTwo = false;
		this.tag('meta');
		return this;
	};

	HTML.prototype.style = function () {
		this.tag('style', Array.prototype.slice.call(arguments));
		return this;
	};

	HTML.prototype.col = function () {
		this.tag('col', Array.prototype.slice.call(arguments));
		return this;
	};
	
	HTML.prototype.colGroup = function () {
		this.tag('colGroup', Array.prototype.slice.call(arguments));
		return this;
	};

	HTML.prototype.section = function () {
		this.tag('section', Array.prototype.slice.call(arguments));
		return this;
	};

	HTML.prototype.tHead = function () {
		this.tag('thead', Array.prototype.slice.call(arguments));
		return this;
	};
	
	HTML.prototype.tBody = function () {
		this.tag('tbody', Array.prototype.slice.call(arguments));
		return this;
	};
	
	HTML.prototype.tFoot = function () {
		this.tag('tfoot', Array.prototype.slice.call(arguments));
		return this;
	};
	
	HTML.prototype.optGroup = function () {
		var results = {};
		this.tag('optGroup', Array.prototype.slice.call(arguments));
		return this;
	};
	
	HTML.prototype.fieldSet = function () {
		var results = {};
		this.tag('fieldSet', Array.prototype.slice.call(arguments));
		return this;
	};
	
	HTML.prototype.legend = function () {
		var results = {};
		this.tag('legend', Array.prototype.slice.call(arguments));
		return this;
	};
	
	HTML.prototype.noScript = function () {
		var results = {};
		this.tag('noScript', Array.prototype.slice.call(arguments));
		return this;
	};
	
	HTML.prototype.address = function () {
		var results = {};
		this.tag('address', Array.prototype.slice.call(arguments));
		return this;
	};
	
	HTML.prototype.blockquote = function () {
		var results = {};
		this.tag('blockquote', Array.prototype.slice.call(arguments));
		return this;
	};
	
	HTML.prototype.del = function () {
		var results = {};
		this.tag('del', Array.prototype.slice.call(arguments));
		return this;
	};
	
	HTML.prototype.hr = function () {
		var results = {};
		this.asTwo = false;
		this.tag('hr');
		return this;
	};
	
	HTML.prototype.ins = function () {
		var results = {};
		this.tag('ins', Array.prototype.slice.call(arguments));
		return this;
	};
	
	HTML.prototype.abbr = function () {
		var results = {};
		this.tag('abbr', Array.prototype.slice.call(arguments));
		return this;
	};

	HTML.prototype.dfn = function () {
		var results = {};
		this.tag('dfn', Array.prototype.slice.call(arguments));
		return this;
	};

	HTML.prototype.em = function () {
		var results = {};
		this.tag('em', Array.prototype.slice.call(arguments));
		return this;
	};
	
	HTML.prototype.strong = function () {
		var results = {};
		this.tag('strong', Array.prototype.slice.call(arguments));
		return this;
	};
	
	HTML.prototype.code = function () {
		var results = {};
		this.tag('code', Array.prototype.slice.call(arguments));
		return this;
	};
	
	HTML.prototype.samp = function () {
		var results = {};
		this.tag('samp', Array.prototype.slice.call(arguments));
		return this;
	};
	
	HTML.prototype.kbr = function () {
		var results = {};
		this.tag('kbr', Array.prototype.slice.call(arguments));
		return this;
	};
	
	HTML.prototype.var = function () {
		var results = {};
		this.tag('var', Array.prototype.slice.call(arguments));
		return this;
	};

	HTML.prototype.b = function () {
		var results = {};
		this.tag('b', Array.prototype.slice.call(arguments));
		return this;
	};
	
	HTML.prototype.i = function () {
		var results = {};
		this.tag('i', Array.prototype.slice.call(arguments));
		return this;
	};
	
	HTML.prototype.u = function () {
		var results = {};
		this.tag('u', Array.prototype.slice.call(arguments));
		return this;
	};

	HTML.prototype.s = function () {
		var results = {};
		this.tag('s', Array.prototype.slice.call(arguments));
		return this;
	};

	HTML.prototype.small = function () {
		var results = {};
		this.tag('small', Array.prototype.slice.call(arguments));
		return this;
	};
	
	HTML.prototype.sub = function () {
		var results = {};
		this.tag('sub', Array.prototype.slice.call(arguments));
		return this;
	};
	
	HTML.prototype.sup = function () {
		var results = {};
		this.tag('sup', Array.prototype.slice.call(arguments));
		return this;
	};
	
	HTML.prototype.tt = function () {
		var results = {};
		this.tag('tt', Array.prototype.slice.call(arguments));
		return this;
	};
	
	HTML.prototype.bdo = function () {
		var results = {};
		this.tag('bdo', Array.prototype.slice.call(arguments));
		return this;
	};

	HTML.prototype.cite = function () {
		var results = {};
		this.tag('cite', Array.prototype.slice.call(arguments));
		return this;
	};
	
	HTML.prototype.q = function () {
		var results = {};
		this.tag('q', Array.prototype.slice.call(arguments));
		return this;
	};
	
	HTML.prototype.wbr = function () {
		var results = {};
		this.tag('wbr', Array.prototype.slice.call(arguments));
		return this;
	};

	HTML.prototype.area = function () {
		var results = {};
		this.tag('area', Array.prototype.slice.call(arguments));
		return this;
	};

	HTML.prototype.map = function () {
		var results = {};
		this.tag('map', Array.prototype.slice.call(arguments));
		return this;
	};

	HTML.prototype.frame = function () {
		var results = {};
		this.tag('frame', Array.prototype.slice.call(arguments));
		return this;
	};
	
	HTML.prototype.noFrame = function () {
		var results = {};
		this.tag('noFrame', Array.prototype.slice.call(arguments));
		return this;
	};
	
	HTML.prototype.iFrame = function () {
		var results = {};
		this.tag('iFrame', Array.prototype.slice.call(arguments));
		return this;
	};
	
	HTML.prototype.hGroup = function () {
		var results = {};
		this.tag('hGroup', Array.prototype.slice.call(arguments));
		return this;
	};
	
	HTML.prototype.header = function () {
		var results = {};
		this.tag('header', Array.prototype.slice.call(arguments));
		return this;
	};
	
	HTML.prototype.footer = function () {
		var results = {};
		this.tag('footer', Array.prototype.slice.call(arguments));
		return this;
	};
	
	HTML.prototype.comment = function (msg) {
		return '<!--' + msg + '-->';
	};
	
	HTML.prototype.font = function () {
		var results = {};
		this.tag('font', Array.prototype.slice.call(arguments));
		return this;
	};

	// HTML 5 entity and utility methods
	HTML.prototype.toHTML5Entities = function (s) {
		return s.replace(re_NewLine, NewLine).replace(re_quot, quot).replace(re_apos, apos).replace(re_acute, acute).replace(re_sbquo, sbquo).replace(re_bdquo, bdquo).replace(re_hellip, hellip).replace(re_dagger, dagger).replace(re_Dagger, Dagger).replace(re_lsquo, lsquo).replace(re_rsquo, rsquo).replace(re_ldquo, ldquo).replace(re_rdquo, rdquo).replace(re_bull, bull).replace(re_ndash, ndash).replace(re_mdash, mdash).replace(re_copy, copyright_mark).replace(re_nbsp, nbsp).replace(re_laquo, laquo).replace(re_raquo, raquo);
	};
	
	HTML.prototype.fromHTML5Entities = function (s) {
		return s.replace(re_NewLine, cc_NewLine).replace(re_quot,  cc_quot).replace(re_apos, cc_apos).replace(re_acute, cc_acute).replace(re_sbquo, cc_sbquo).replace(re_bdquo, cc_bdquo).replace(re_hellip, cc_hellip).replace(re_dagger, cc_dagger).replace(re_Dagger, cc_Dagger).replace(re_lsquo, cc_lsquo).replace(re_rsquo, cc_rsquo).replace(re_ldquo, cc_ldquo).replace(re_rdquo, cc_rdquo).replace(re_bull, cc_bull).replace(re_ndash, cc_ndash).replace(re_mdash, cc_mdash).replace(re_copy, cc_copyright_mark).replace(re_nbsp, cc_nbsp).replace(re_laquo, cc_laquo).replace(re_raquo, cc_raquo);
	};
	
	HTML.prototype.stripFontTags = function (s) {
		var reFontTag = new RegExp(
			'<font[^>]*>|<font>|</font>',
			'gi'
		);
	
		return s.replace(reFontTag, '');
	};
	
	// CSS processing
	var CSS = function (config) {
		this.sources = [];
		this.options = {};
		this.compressor = null;
		this.fs = null;
		return {
			as: function (collection, filename) {
				throw "CSS.as() not implemented.";
			},
			
			include: function (collection, source_code) {
				throw "CSS.include() not implemented.";
			},
			
			inline: function (collection, options) {
				throw "CSS.inline() not implemented.";
			}
		};
	};
	
	// JavaScript Processing
	var JS = function (config) {
		this.sources = [];
		this.options = {};
		this.compressor = null;
		this.fs = null;
		return {
			as: function (collection, filename) {
				throw "JS.as() not implemented.";
			},
			
			include: function (collection, source_code) {
				throw "JS.include() not implemented.";
			},
			
			inline: function (collection, options) {
				throw "JS.inline() not implemented.";
			}
		};
	};
	
	// Setup for module include
	exports.HTML = HTML;
	exports.CSS = CSS;
	exports.JS = JS;
	
	// Setup for browser
	global.TBone = {
		HTML: HTML,
		CSS: CSS,
		JS: JS
	};
}(this, exports));
