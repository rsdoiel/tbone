(function (global) {
	//
	// from HTML_UTILEntities(), toHTML_UTILEntities() are content normalization
	// methods to improve the quality of the tbone output
	//
	// References notes were:
	// See: http://www.w3.org/TR/html4/sgml/entities.html
	// See: http://theorem.ca/~mvcorks/code/charsets/latin1.html
	// See: http://en.wikipedia.org/wiki/List_of_XML_and_HTML_UTIL_character_entity_reference

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
			// cc_quot not included because of role in HTML_UTIL markup
			quot
		].join("|"),
		re_quot = new RegExp(quot_encodings, 'g'),

		apos = '&apos;',
		cc_apos = String.fromCharCode(39),
		apos_encodings = [
			'&amp;apos;',
			// cc_apos not included because of role in HTML_UTIL markup
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

	var HTML_UTIL = functin () {};

	// HTML_UTIL 5 entity and utility methods
	HTML_UTIL.prototype.toHTML_UTIL5Entities = function (s) {
		return s.replace(re_NewLine, NewLine).replace(re_quot, quot).replace(re_apos, apos).replace(re_acute, acute).replace(re_sbquo, sbquo).replace(re_bdquo, bdquo).replace(re_hellip, hellip).replace(re_dagger, dagger).replace(re_Dagger, Dagger).replace(re_lsquo, lsquo).replace(re_rsquo, rsquo).replace(re_ldquo, ldquo).replace(re_rdquo, rdquo).replace(re_bull, bull).replace(re_ndash, ndash).replace(re_mdash, mdash).replace(re_copy, copyright_mark).replace(re_nbsp, nbsp).replace(re_laquo, laquo).replace(re_raquo, raquo);
	};

	HTML_UTIL.prototype.fromHTML_UTIL5Entities = function (s) {
		return s.replace(re_NewLine, cc_NewLine).replace(re_quot,  cc_quot).replace(re_apos, cc_apos).replace(re_acute, cc_acute).replace(re_sbquo, cc_sbquo).replace(re_bdquo, cc_bdquo).replace(re_hellip, cc_hellip).replace(re_dagger, cc_dagger).replace(re_Dagger, cc_Dagger).replace(re_lsquo, cc_lsquo).replace(re_rsquo, cc_rsquo).replace(re_ldquo, cc_ldquo).replace(re_rdquo, cc_rdquo).replace(re_bull, cc_bull).replace(re_ndash, cc_ndash).replace(re_mdash, cc_mdash).replace(re_copy, cc_copyright_mark).replace(re_nbsp, cc_nbsp).replace(re_laquo, cc_laquo).replace(re_raquo, cc_raquo);
	};

	HTML_UTIL.prototype.stripFontTags = function (s) {
		var reFontTag = new RegExp(
			'<font[^>]*>|<font>|</font>',
			'gi'
		);

		return s.replace(reFontTag, '');
	};

	try {
		exports.HTML_UTIL = HTML_UTIL;
	} catch (err) {
		// Toto, I don't think we're not in Node any more
	}
	global.HTML_UTIL = HTML_UTIL;
}(this));