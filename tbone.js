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
/*jslint devel: true, node: true, maxerr: 50, indent: 4,  vars: true, sloppy: true */

/* Prototype of new TBone */
(function (global) {
	var TBone = {};
	
	var Html = {
		docString: '',
		tag: '',
		innerHTML: '',
		attributes: {}
	};
	
	var tag = function (tag) {
		var i, parts = [];

		if (tag === "html") {
			this.docType = "<!DOCTYPE html>";
		} else {
			this.docType = "";
		}
		this.tag = tag;
		for (i = 1; i < arguments.length; i += 1) {
			if (typeof arguments[i] === "object") {
				parts.push(arguments[i].toString());
			} else {
				parts.push(arguments[i]);
			}
		}
		this.innerHTML = parts.join("");
		return this;
	};

	Html.reset = function () {
		this.docString = '';
		this.tag = '';
		this.innerHTML = '';
		this.attributes = {};
	};

	Html.attr = function (attributes) {
		this.attributes = attributes;
		console.log(this.attributes);
		return this;
	};
	
	Html.toString = function () {
		var attrs = [],
			output = [],
			docString = this.docString,
			tag = this.tag,
			attributes = this.attributes,
			innerHTML = this.innerHTML;
	
		this.reset();
		if (docString.length > 0) {
			output.push(docString + "\n");
		}
		Object.keys(attributes).forEach(function (ky) {
			attrs.push([ky, "=", '"', attributes[ky], '"'].join(""));
		});
	
		if (innerHTML.length > 0) {
			if (output.length > 0) {
				output.push("<" + tag + " " + attrs.join(" ") + ">" +
					innerHTML + "</" + tag + ">");
			} else {
				output.push("<" + tag + ">" + innerHTML + "</" + tag + ">");
			}
		} else {
			if (attrs.length > 0) {
				output.push("<" + tag + " " + attrs.join(" ") + " />");
			} else {
				output.push("<" + tag + " />");
			}
		}
		return output.join("");
	};
	
	Html.html = function () {
		tag('html', arguments);
		return this;
	};

	Html.head = function () {
		tag('head', arguments);
		return this;
	};

	Html.title = function () {
		tag('html', arguments);
		return this;
	};

	Html.link = function () {
		tag('html', arguments);
		return this;
	};
	Html.body = function () {
		tag('body', arguments);
		return this;
	};
	Html.h1 = function () {
		tag('h1', arguments);
		return this;
	};
	Html.h2 = function () {
		tag('h2', arguments);
		return this;
	};
	Html.h3 = function () {
		tag('h3', arguments);
		return this;
	};
	Html.h4 = function () {
		tag('h4', arguments);
		return this;
	};
	Html.h5 = function () {
		tag('h5', arguments);
		return this;
	};
	Html.h6 = function () {
		tag('h6', arguments);
		return this;
	};
	Html.a = function () {
		tag('a', arguments);
		return this;
	};
	Html.p = function () {
		tag('p', arguments);
		return this;
	};
	Html.ul = function () {
		tag('ul', arguments);
		return this;
	};
	Html.ol = function () {
		tag('ol', arguments);
		return this;
	};
	Html.li = function () {
		tag('li', arguments);
		return this;
	};
	Html.dl = function () {
		tag('dl', arguments);
		return this;
	};
	Html.dt = function () {
		tag('dt', arguments);
		return this;
	};
	Html.dd = function () {
		tag('dt', arguments);
		return this;
	};

	Html.table = function () {
		tag('table', arguments);
		return this;
	};

	Html.Th = function () {
		tag('Th', arguments);
		return this;
	};
	Html.tr = function () {
		tag('tr', arguments);
		return this;
	};
	
	Html.td = function () {
		tag('td', arguments);
		return this;
	};
	
	Html.caption = function () {
		tag('caption', arguments);
		return this;
	};

	Html.embed = function () {
		tag('embed', arguments);
		return this;
	};

	Html.form = function () {
		tag('form', arguments);
		return this;
	};

	Html.input = function () {
		tag('input', arguments);
		return this;
	};
	
	Html.button = function () {
		tag('button', arguments);
		return this;
	};

	Html.textarea = function () {
		tag('textarea', arguments);
		return this;
	};

	Html.select = function () {
		tag('select', arguments);
		return this;
	};

	Html.option = function () {
		tag('option', arguments);
		return this;
	};

	Html.label = function () {
		tag('label', arguments);
		return this;
	};
	
	Html.script = function () {
		tag('script', arguments);
		return this;
	};
	
	Html.pre = function () {
		tag('pre', arguments);
		return this;
	};
	
	Html.div = function () {
		tag('div', arguments);
		return this;
	};

	Html.span = function () {
		tag('span', arguments);
		return this;
	};

	Html.menu = function () {
		tag('menu', arguments);
		return this;
	};

	Html.img = function () {
		tag('img', arguments);
		return this;
	};
	
	Html.object = function () {
		tag('object', arguments);
		return this;
	};
	
	Html.param = function () {
		tag('param', arguments);
		return this;
	};

	Html.center = function () {
		tag('center', arguments);
		return this;
	};

	Html.br = function () {
		tag('br', arguments);
		return this;
	};

	Html.base = function () {
		tag('base', arguments);
		return this;
	};

	Html.meta = function () {
		tag('meta', arguments);
		return this;
	};

	Html.style = function () {
		tag('style', arguments);
		return this;
	};

	Html.col = function () {
		tag('col', arguments);
		return this;
	};
	
	Html.colGroup = function () {
		tag('colGroup', arguments);
		return this;
	};
	

	Html.section = function () {
		tag('section', arguments);
		return this;
	};

	Html.tHead = function () {
		tag('thead', arguments);
		return this;
	};
	Html.tBody = function () {
		tag('tbody', arguments);
		return this;
	};
	Html.tFoot = function () {
		tag('tfoot', arguments);
		return this;
	};
	Html.optGroup = function () {
		tag('optGroup', arguments);
		return this;
	};
	Html.fieldSet = function () {
		tag('fieldSet', arguments);
		return this;
	};
	Html.legend = function () {
		tag('legend', arguments);
		return this;
	};
	Html.noScript = function () {
		tag('noScript', arguments);
		return this;
	};
	Html.address = function () {
		tag('address', arguments);
		return this;
	};
	
	Html.blockquote = function () {
		tag('blockquote', arguments);
		return this;
	};
	
	Html.del = function () {
		tag('del', arguments);
		return this;
	};
	Html.hr = function () {
		tag('hr', arguments);
		return this;
	};
	Html.ins = function () {
		tag('ins', arguments);
		return this;
	};
	
	Html.abbr = function () {
		tag('abbr', arguments);
		return this;
	};

	Html.dfn = function () {
		tag('dfn', arguments);
		return this;
	};

	Html["var"] = function () {
		tag('var', arguments);
		return this;
	};

	Html.em = function () {
		tag('em', arguments);
		return this;
	};
	Html.strong = function () {
		tag('strong', arguments);
		return this;
	};
	Html.code = function () {
		tag('code', arguments);
		return this;
	};
	Html.samp = function () {
		tag('samp', arguments);
		return this;
	};
	Html.kbr = function () {
		tag('kbr', arguments);
		return this;
	};
	Html.b = function () {
		tag('b', arguments);
		return this;
	};
	
	Html.i = function () {
		tag('i', arguments);
		return this;
	};
	
	Html.u = function () {
		tag('u', arguments);
		return this;
	};

	Html.s = function () {
		tag('s', arguments);
		return this;
	};

	Html.small = function () {
		tag('small', arguments);
		return this;
	};
	Html.sub = function () {
		tag('sub', arguments);
		return this;
	};
	Html.sup = function () {
		tag('sup', arguments);
		return this;
	};
	Html.tt = function () {
		tag('tt', arguments);
		return this;
	};
	
	Html.bdo = function () {
		tag('bdo', arguments);
		return this;
	};

	Html.cite = function () {
		tag('cite', arguments);
		return this;
	};
	
	Html.q = function () {
		tag('q', arguments);
		return this;
	};
	
	Html.wbr = function () {
		tag('wbr', arguments);
		return this;
	};

	Html.area = function () {
		tag('area', arguments);
		return this;
	};
	Html.map = function () {
		tag('map', arguments);
		return this;
	};
	Html.frame = function () {
		tag('frame', arguments);
		return this;
	};
	Html.noFrame = function () {
		tag('noFrame', arguments);
		return this;
	};
	Html.iFrame = function () {
		tag('iFrame', arguments);
		return this;
	};
	Html.hGroup = function () {
		tag('hGroup', arguments);
		return this;
	};
	Html.header = function () {
		tag('header', arguments);
		return this;
	};
	Html.footer = function () {
		tag('footer', arguments);
		return this;
	};
	
	Html.comment = function (msg) {
		return '<!--' + msg + '-->';
	};
	
	Html.font = function () {
		tag('font', arguments);
		return this;
	}

	Html.create = function () {
		return Object.create(Object.prototype, Html);
	};
	
	// CSS processing
	var CSS = {
		sources: [],
		options: {},
		compressor: null
	};
	
	CSS.create = function () {
		return Object.create(Object.prototype, CSS);
	};
	
	// JavaScript Processing
	var JS = {
		sources: [],
		options: {},
		compressor: null
	};
	
	JS.create = function () {
		return Object.create(Object.prototype, JS);
	};


	TBone.HTML = Html;
	TBone.CSS = CSS;
	TBone.JS = JS;

	//
	// fromHtmlEntities(), toHtmlEntities() are content normalization
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
	
	
	TBone.toHtml5Entities = function (s) {
		return s.replace(re_NewLine, NewLine).replace(re_quot, quot).replace(re_apos, apos).replace(re_acute, acute).replace(re_sbquo, sbquo).replace(re_bdquo, bdquo).replace(re_hellip, hellip).replace(re_dagger, dagger).replace(re_Dagger, Dagger).replace(re_lsquo, lsquo).replace(re_rsquo, rsquo).replace(re_ldquo, ldquo).replace(re_rdquo, rdquo).replace(re_bull, bull).replace(re_ndash, ndash).replace(re_mdash, mdash).replace(re_copy, copyright_mark).replace(re_nbsp, nbsp).replace(re_laquo, laquo).replace(re_raquo, raquo);
	};
	
	TBone.fromHtml5Entities = function (s) {
		return s.replace(re_NewLine, cc_NewLine).replace(re_quot,  cc_quot).replace(re_apos, cc_apos).replace(re_acute, cc_acute).replace(re_sbquo, cc_sbquo).replace(re_bdquo, cc_bdquo).replace(re_hellip, cc_hellip).replace(re_dagger, cc_dagger).replace(re_Dagger, cc_Dagger).replace(re_lsquo, cc_lsquo).replace(re_rsquo, cc_rsquo).replace(re_ldquo, cc_ldquo).replace(re_rdquo, cc_rdquo).replace(re_bull, cc_bull).replace(re_ndash, cc_ndash).replace(re_mdash, cc_mdash).replace(re_copy, cc_copyright_mark).replace(re_nbsp, cc_nbsp).replace(re_laquo, cc_laquo).replace(re_raquo, cc_raquo);
	};
	
	TBone.stripFontTags = function (s) {
		var reFontTag = new RegExp(
			'<font[^>]*>|<font>|</font>',
			'gi'
		);
	
		return s.replace(reFontTag, '');
	};

	if (global.exports === undefined) {
		global.TBone = TBone;
	} else {
		global.exports.HTML = Html;
		global.exports.CSS = CSS;
		global.exports.JS = JS;
	}
}(this));
