// test bones.go - a simple library for assembling valid HTML content
//
// Inspiration "Behind the Code: Avoiding Spaghetti" by Jason Grosman
// http://www.npr.org/blogs/inside/2011/02/02/126312263/behind-the-code-avoiding-spaghetti-html
//
// HTML markup reference was http://en.wikipedia.org/wiki/HTML_element#HTML401
//
// author R. S. Doiel, <rsdoiel@gmail.com>
//
// copyright (c) 2011 all rights reserved
//
// Released under the New BSD License.
// See: http://opensource.org/licenses/bsd-license.php
//
package bones

import (
	"testing"
)


type testAssembleAttribute struct {
	in  map[string]string
	out string
}

var testAssembleAttributes = []testAssembleAttribute{
	testAssembleAttribute{in: map[string]string{"class": "main"},
		out: ` class="main"`},
}


func TestAssembleAttributes(t *testing.T) {
	for _, dt := range testAssembleAttributes {
		r := AssembleAttributes(dt.in)
		if r != dt.out {
			t.Errorf("AssembleAttributes(%s) -> %s != %s", dt.in, r, dt.out)
		}
	}
}

type testAssembleTag struct {
	name, innerHTML string
	attributes      map[string]string
	out             string
}

var testAssembleTags = []testAssembleTag{
	testAssembleTag{name: "a", innerHTML: "click me", attributes: map[string]string{"href": "http://example.com"}, out: `<a href="http://example.com">click me</a>`},
	testAssembleTag{name: "p", innerHTML: "", attributes: nil, out: `<p>`},
	testAssembleTag{name: "p", innerHTML: "As I was saying ...", attributes: nil, out: `<p>As I was saying ...</p>`},
	testAssembleTag{name: "p", innerHTML: "As I was saying ...", attributes: map[string]string{"class": "say-too-much"}, out: `<p class="say-too-much">As I was saying ...</p>`},
}

func TestAssembleTag(t *testing.T) {
	for _, dt := range testAssembleTags {
		r := AssembleTag(dt.name, dt.innerHTML, dt.attributes)
		if r != dt.out {
			t.Errorf("AssembleTag(%s, %s, %s) -> %s != %s\n", dt.name, dt.innerHTML, dt.attributes, r, dt.out)
		}
	}
}

type testHtml struct {
	innerHTML string
	attributes map[string]string
	out string
}

var testHtmls = []testHtml{
	testHtml{innerHTML:"", attributes:nil, out:"<!DOCTYPE html>\n<html></html>",},
}

func TestHtml (t *testing.T) {
	for _, dt := range testHtmls {
		r := Html(dt.innerHTML, dt.attributes)
		if r != dt.out {
			t.Errorf("Html(%s,%s) -> %s != %s\n", dt.innerHTML, dt.attributes, r, dt.out)
		}
	}
}

