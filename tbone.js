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
 * Released under New the BSD License.
 * See: http://opensource.org/licenses/bsd-license.php
 *
 */
/*jslint devel: true, node: true, maxerr: 25, indent: 4,  vars: true, sloppy: true */

var HTML = function () {
	var self = this;

	this.docType =  '';
	this.asTwo = true;
	this.html_tag =  '';
	this.innerHTML = [];
	this.attributes =  {};

	// Private tag(), setups the tag and innerHTML fields
	var tag = function (tag, args) {
		var i;
		self.html_tag = tag;
		if (args === undefined) {
			return this;
		}
		for (i = 0; i < args.length; i += 1) {
			self.innerHTML.push(args[i]);
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
	
	

	return {
		reset: function () {
			self.docType = '';
			self.asTwo = true;
			self.html_tag = '';
			self.innerHTML = [];
			self.attributes = {};
		},

		attr: function (attributes) {
			self.attributes = attributes;
			return this;
		},
		
		toString: function () {
			var attrs = [],
				output = [],
				asTwo = self.asTwo,
				docType = self.docType,
				html_tag = self.html_tag,
				attributes = self.attributes,
				innerHTML = self.innerHTML,
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
						text = typeof innerHTML[i] + ", " + i + ": " + JSON.stringify(innerHTML[i]);
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
		},
		
		html: function () {
			self.docType = "<!DOCTYPE html>";
			tag('html', Array.prototype.slice.call(arguments));
			return this;
		},

		head: function () {
			tag('head', Array.prototype.slice.call(arguments));
			return this;
		},

		title: function () {
			tag('title', Array.prototype.slice.call(arguments));
			return this;
		},

		link: function () {
			self.asTwo = false;
			tag('link');
			return this;
		},

		body: function () {
			tag('body', Array.prototype.slice.call(arguments));
			return this;
		},

		h1: function () {
			tag('h1', Array.prototype.slice.call(arguments));
			return this;
		},

		h2: function () {
			tag('h2', Array.prototype.slice.call(arguments));
			return this;
		},

		h3: function () {
			tag('h3', Array.prototype.slice.call(arguments));
			return this;
		},

		h4: function () {
			tag('h4', Array.prototype.slice.call(arguments));
			return this;
		},

		h5: function () {
			tag('h5', Array.prototype.slice.call(arguments));
			return this;
		},

		h6: function () {
			tag('h6', Array.prototype.slice.call(arguments));
			return this;
		},

		a: function () {
			tag('a', Array.prototype.slice.call(arguments));
			return this;
		},

		p: function () {
			var args = Array.prototype.slice.call(arguments);
			
			if (args.length > 0) {
				self.asTwo = true;
				tag('p', args);
			} else {
				self.asTwo = false;
				tag('p', args);
			}
			return this;
		},

		ul: function () {
			tag('ul', Array.prototype.slice.call(arguments));
			return this;
		},

		ol: function () {
			tag('ol', Array.prototype.slice.call(arguments));
			return this;
		},

		li: function () {
			tag('li', Array.prototype.slice.call(arguments));
			return this;
		},

		dl: function () {
			tag('dl', Array.prototype.slice.call(arguments));
			return this;
		},

		dt: function () {
			tag('dt', Array.prototype.slice.call(arguments));
			return this;
		},

		dd: function () {
			tag('dd', Array.prototype.slice.call(arguments));
			return this;
		},

		table: function () {
			tag('table', Array.prototype.slice.call(arguments));
			return this;
		},

		th: function () {
			tag('th', Array.prototype.slice.call(arguments));
			return this;
		},

		tr: function () {
			tag('tr', Array.prototype.slice.call(arguments));
			return this;
		},
		
		td: function () {
			tag('td', Array.prototype.slice.call(arguments));
			return this;
		},
		
		caption: function () {
			tag('caption', Array.prototype.slice.call(arguments));
			return this;
		},

		embed: function () {
			tag('embed', Array.prototype.slice.call(arguments));
			return this;
		},

		form: function () {
			tag('form', Array.prototype.slice.call(arguments));
			return this;
		},

		input: function () {
			self.asTwo = false;
			tag('input');
			return this;
		},
		
		button: function () {
			self.asTwo = false;
			tag('button');
			return this;
		},

		textarea: function () {
			tag('textarea', Array.prototype.slice.call(arguments));
			return this;
		},

		select: function () {
			tag('select', Array.prototype.slice.call(arguments));
			return this;
		},

		option: function () {
			tag('option', Array.prototype.slice.call(arguments));
			return this;
		},

		label: function () {
			tag('label', Array.prototype.slice.call(arguments));
			return this;
		},
		
		script: function () {
			self.asTwo = true;
			tag('script', Array.prototype.slice.call(arguments));
			return this;
		},
		
		pre: function () {
			self.asTwo = true;
			tag('pre', Array.prototype.slice.call(arguments));
			return this;
		},
		
		div: function () {
			tag('div', Array.prototype.slice.call(arguments));
			return this;
		},

		span: function () {
			tag('span', Array.prototype.slice.call(arguments));
			return this;
		},

		menu: function () {
			tag('menu', Array.prototype.slice.call(arguments));
			return this;
		},

		img: function () {
			self.asTwo = false;
			tag('img');
			return this;
		},
		
		object: function () {
			tag('object', Array.prototype.slice.call(arguments));
			return this;
		},
		
		param: function () {
			tag('param', Array.prototype.slice.call(arguments));
			return this;
		},

		center: function () {
			tag('center', Array.prototype.slice.call(arguments));
			return this;
		},

		br: function () {
			self.asTwo = false;
			tag('br');
			return this;
		},

		base: function () {
			tag('base', Array.prototype.slice.call(arguments));
			return this;
		},

		meta: function () {
			self.asTwo = false;
			tag('meta');
			return this;
		},

		style: function () {
			tag('style', Array.prototype.slice.call(arguments));
			return this;
		},

		col: function () {
			tag('col', Array.prototype.slice.call(arguments));
			return this;
		},
		
		colGroup: function () {
			tag('colGroup', Array.prototype.slice.call(arguments));
			return this;
		},

		section: function () {
			tag('section', Array.prototype.slice.call(arguments));
			return this;
		},

		tHead: function () {
			tag('thead', Array.prototype.slice.call(arguments));
			return this;
		},
		
		tBody: function () {
			tag('tbody', Array.prototype.slice.call(arguments));
			return this;
		},
		
		tFoot: function () {
			tag('tfoot', Array.prototype.slice.call(arguments));
			return this;
		},
		
		optGroup: function () {
			tag('optGroup', Array.prototype.slice.call(arguments));
			return this;
		},
		
		fieldSet: function () {
			tag('fieldSet', Array.prototype.slice.call(arguments));
			return this;
		},
		
		legend: function () {
			tag('legend', Array.prototype.slice.call(arguments));
			return this;
		},
		
		noScript: function () {
			tag('noScript', Array.prototype.slice.call(arguments));
			return this;
		},
		
		address: function () {
			tag('address', Array.prototype.slice.call(arguments));
			return this;
		},
		
		blockquote: function () {
			tag('blockquote', Array.prototype.slice.call(arguments));
			return this;
		},
		
		del: function () {
			tag('del', Array.prototype.slice.call(arguments));
			return this;
		},
		
		hr: function () {
			self.asTwo = false;
			tag('hr');
			return this;
		},
		
		ins: function () {
			tag('ins', Array.prototype.slice.call(arguments));
			return this;
		},
		
		abbr: function () {
			tag('abbr', Array.prototype.slice.call(arguments));
			return this;
		},

		dfn: function () {
			tag('dfn', Array.prototype.slice.call(arguments));
			return this;
		},

		em: function () {
			tag('em', Array.prototype.slice.call(arguments));
			return this;
		},
		
		strong: function () {
			tag('strong', Array.prototype.slice.call(arguments));
			return this;
		},
		
		code: function () {
			tag('code', Array.prototype.slice.call(arguments));
			return this;
		},
		
		samp: function () {
			tag('samp', Array.prototype.slice.call(arguments));
			return this;
		},
		
		kbr: function () {
			tag('kbr', Array.prototype.slice.call(arguments));
			return this;
		},
		
		"var": function () {
			tag('var', Array.prototype.slice.call(arguments));
			return this;
		},

		b: function () {
			tag('b', Array.prototype.slice.call(arguments));
			return this;
		},
		
		i: function () {
			tag('i', Array.prototype.slice.call(arguments));
			return this;
		},
		
		u: function () {
			tag('u', Array.prototype.slice.call(arguments));
			return this;
		},

		s: function () {
			tag('s', Array.prototype.slice.call(arguments));
			return this;
		},

		small: function () {
			tag('small', Array.prototype.slice.call(arguments));
			return this;
		},
		
		sub: function () {
			tag('sub', Array.prototype.slice.call(arguments));
			return this;
		},
		
		sup: function () {
			tag('sup', Array.prototype.slice.call(arguments));
			return this;
		},
		
		tt: function () {
			tag('tt', Array.prototype.slice.call(arguments));
			return this;
		},
		
		bdo: function () {
			tag('bdo', Array.prototype.slice.call(arguments));
			return this;
		},

		cite: function () {
			tag('cite', Array.prototype.slice.call(arguments));
			return this;
		},
		
		q: function () {
			tag('q', Array.prototype.slice.call(arguments));
			return this;
		},
		
		wbr: function () {
			tag('wbr', Array.prototype.slice.call(arguments));
			return this;
		},

		area: function () {
			tag('area', Array.prototype.slice.call(arguments));
			return this;
		},

		"map": function () {
			tag('map', Array.prototype.slice.call(arguments));
			return this;
		},

		"frame": function () {
			tag('frame', Array.prototype.slice.call(arguments));
			return this;
		},
		
		noFrame: function () {
			tag('noFrame', Array.prototype.slice.call(arguments));
			return this;
		},
		
		iFrame: function () {
			tag('iFrame', Array.prototype.slice.call(arguments));
			return this;
		},
		
		hGroup: function () {
			tag('hGroup', Array.prototype.slice.call(arguments));
			return this;
		},
		
		"header": function () {
			tag('header', Array.prototype.slice.call(arguments));
			return this;
		},
		
		footer: function () {
			tag('footer', Array.prototype.slice.call(arguments));
			return this;
		},
		
		comment: function (msg) {
			return '<!--' + msg + '-->';
		},
		
		font: function () {
			tag('font', Array.prototype.slice.call(arguments));
			return this;
		},

		// HTML 5 entity and utility methods
		toHTML5Entities: function (s) {
			return s.replace(re_NewLine, NewLine).replace(re_quot, quot).replace(re_apos, apos).replace(re_acute, acute).replace(re_sbquo, sbquo).replace(re_bdquo, bdquo).replace(re_hellip, hellip).replace(re_dagger, dagger).replace(re_Dagger, Dagger).replace(re_lsquo, lsquo).replace(re_rsquo, rsquo).replace(re_ldquo, ldquo).replace(re_rdquo, rdquo).replace(re_bull, bull).replace(re_ndash, ndash).replace(re_mdash, mdash).replace(re_copy, copyright_mark).replace(re_nbsp, nbsp).replace(re_laquo, laquo).replace(re_raquo, raquo);
		},
		
		fromHTML5Entities: function (s) {
			return s.replace(re_NewLine, cc_NewLine).replace(re_quot,  cc_quot).replace(re_apos, cc_apos).replace(re_acute, cc_acute).replace(re_sbquo, cc_sbquo).replace(re_bdquo, cc_bdquo).replace(re_hellip, cc_hellip).replace(re_dagger, cc_dagger).replace(re_Dagger, cc_Dagger).replace(re_lsquo, cc_lsquo).replace(re_rsquo, cc_rsquo).replace(re_ldquo, cc_ldquo).replace(re_rdquo, cc_rdquo).replace(re_bull, cc_bull).replace(re_ndash, cc_ndash).replace(re_mdash, cc_mdash).replace(re_copy, cc_copyright_mark).replace(re_nbsp, cc_nbsp).replace(re_laquo, cc_laquo).replace(re_raquo, cc_raquo);
		},
		
		stripFontTags: function (s) {
			var reFontTag = new RegExp(
				'<font[^>]*>|<font>|</font>',
				'gi'
			);
		
			return s.replace(reFontTag, '');
		}
	};
};

// CSS processing
var CSS = function (config) {
	this.sources = [];
	this.options = {};
	this.compressor = null;
};

// JavaScript Processing
var JS = function () {
	this.sources = [];
	this.options = {};
	this.compressor = null;
};

exports.HTML = HTML;
exports.CSS = CSS;
exports.JS = JS;
