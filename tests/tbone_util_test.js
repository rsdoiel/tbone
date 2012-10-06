
	// test for toHtml5Entities()
	var test_strings = [
		"Hello World!",
        "“Hello World!”",
        "Fred" + String.fromCharCode(180) + "s Car",
        "Fred" + String.fromCharCode(8217) + "s Car",
        "this is\nanother line.",
        "&\nthat was it."
	];
	var expected_strings = [
		"Hello World!",
        "&ldquo;Hello World!&rdquo;",
        "Fred&acute;s Car",
        "Fred&rsquo;s Car",
        "this is&NewLine;another line.",
        "&&NewLine;that was it."
	];
	var result_string;

	for (i = 0; i < test_strings.length && i < expected_strings.length; i += 1) {
		result_string = tb.toHTML5Entities(test_strings[i]);
		assert.equal(result_string, expected_strings[i], ['to Expected [', expected_strings[i], '] found [', result_string, ']'].join(""));
	}

	for (i = 0; i < test_strings.length && i < expected_strings.length; i += 1) {
		result_string = tb.fromHTML5Entities(expected_strings[i]);
		assert.equal(result_string, test_strings[i], ['from Expected [', test_strings[i], '] found [', result_string, ']'].join(""));
	}

	test_strings = [
		'big <font>red</font>',
        'big <font color=red>red</font> bus',
        'big <font color="red">red</font> bus',
        'big <font class=\'red-bus\' id="test" style="margin: 30px;">red</font> bus'
	];
	expected_strings = [
		"big red",
        "big red bus",
        "big red bus",
        "big red bus"
	];

	for (i = 0; i < test_strings.length && i < expected_strings.length; i += 1) {
		result_string = tb.stripFontTags(test_strings[i]);
		assert.equal(result_string, expected_strings[i], ["No. ", (i + 1), ' to Expected [', expected_strings[i], '] found [', result_string, ']'].join(""));
	}
