// bones.go - a simple library for assembling valid HTML content
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
// Released under New the BSD License.
// See: http://opensource.org/licenses/bsd-license.php
//
package bones

import (
	"strings"
	"bytes"
	"fmt"
)

const (
	VERSION = `0.0.1-a`
)

// Assemble a map of attribute names and values
func AssembleAttributes(attributes map[string]string) string {
	out := new(bytes.Buffer)
	for key, value := range attributes {
		out.Write([]byte(fmt.Sprintf(` %s="%s"`, key, value)))
	}
	return out.String()
}

// Assemble a generic tag from name, the innerHTML and any attributes
func AssembleTag(name string, innerHTML string, attributes map[string]string) string {
	switch {
	case name == "html" && attributes == nil && innerHTML == "":
		return strings.Join([]string{"<", name, "></", name, ">",}, "")
	case name == "html" && attributes != nil && innerHTML == "":
		return strings.Join([]string{"<", name, AssembleAttributes(attributes), "></",name,">",}, "")
	case name == "p" && attributes == nil && innerHTML == "":
		return strings.Join([]string{"<", name, ">"}, "")
	case name == "p" && attributes != nil && innerHTML == "":
		return strings.Join([]string{"<", name, AssembleAttributes(attributes), ">"}, "")
	case attributes == nil && innerHTML != "":
		return strings.Join([]string{"<", name, ">", innerHTML, "</", name, ">"}, "")
	case attributes == nil && innerHTML == "":
		return strings.Join([]string{"<", name, "/>"}, "")
	case innerHTML != "":
		return strings.Join([]string{"<", name, AssembleAttributes(attributes), ">", innerHTML, "</", name, ">"}, "")
	case innerHTML == "":
		return strings.Join([]string{"<", name, AssembleAttributes(attributes), " />"}, "")
	}
	return ""
}

// Outer HTML element including DOCTYPE prefix
func Html (innerHTML string, attributes map[string]string) (string) {
	return fmt.Sprintf("%s\n%s","<!DOCTYPE html>", AssembleTag("html", innerHTML, nil))
}

// Head element
func Head (innerHTML string, attributes map[string]string) (string) {
	return AssembleTag("head", innerHTML, attributes)
}

// Title element
func Title (innerHTML string, attributes map[string]string) (string) {
	return AssembleTag("title", innerHTML, attributes)
}

// Base element
func Base (href string, attributes map[string]string) (string) {
        attributes["href"] = href
	return AssembleTag("base", "", attributes)
}

func Link (attributes map[string]string) (string) {
	return AssembleTag("link", "", attributes)
}

func LinkCSS (href string, attributes map[string]string) (string) {
	attributes["href"] = href
	return AssembleTag("link", "", attributes)
}

func Meta (attributes map[string]string) (string) {
	return AssembleTag("meta","",attributes)
}

func Object (innerHTML string, attributes map[string]string) (string) {
	return AssembleTag("object", innerHTML, attributes)
}

func Style (CSS string, attributes map[string]string) (string) {
	return AssembleTag("style",CSS,attributes)
}

func Body (innerHTML string, attributes map[string]string) (string) {
	return AssembleTag("body", innerHTML, attributes)
}

func H1 (innerHTML string, attributes map[string]string) (string) {
	return AssembleTag("h1",innerHTML, attributes)
}

func H2 (innerHTML string, attributes map[string]string) (string) {
	return AssembleTag("h2", innerHTML, attributes)
}

func H3 (innerHTML string, attributes map[string]string) (string) {
	return AssembleTag("h3", innerHTML, attributes)
}

func H4 (innerHTML string, attributes map[string]string) (string) {
	return AssembleTag("h4", innerHTML, attributes)
}

func H5 (innerHTML string, attributes map[string]string) (string) {
	return AssembleTag("h5", innerHTML, attributes)
}

func H6 (innerHTML string, attributes map[string]string) (string) {
	return AssembleTag("h6", innerHTML, attributes)
}

func P (innerHTML string, attributes map[string]string) (string) {
	return AssembleTag("p",innerHTML, attributes)
}

func A (innerHTML string, href string, attributes map[string]string) (string) {
	attributes["href"] = href
	return AssembleTag("a", innerHTML, attributes)
}

func Img (url string, attributes map[string]string) (string) {
	attributes["src"] = url
	return AssembleTag("img", "", attributes)
}

func Ul (innerHTML string, attributes map[string]string) (string) {
	return AssembleTag("ul", innerHTML, attributes)
}

func Ol (innerHTML string, attributes map[string]string) (string) {
	return AssembleTag("ol", innerHTML, attributes)
}

func Li (innerHTML string, attributes map[string]string) (string) {
	return AssembleTag("li", innerHTML, attributes)
}

func Dl (innerHTML string, attributes map[string]string) (string) {
	return AssembleTag("dl", innerHTML, attributes)
}
 
func Dt (innerHTML string, attributes map[string]string) (string) {
	return AssembleTag("dt", innerHTML, attributes)
}

func Dd (innerHTML string, attributes map[string]string) (string) {
	return AssembleTag("dd", innerHTML, attributes)
}

func Table (innerHTML string, attributes map[string]string) (string) {
	return AssembleTag("table", innerHTML, attributes)
}

func Th (innerHTML string, attributes map[string]string) (string) {
	return AssembleTag("th", innerHTML, attributes)
}

func Tr (innerHTML string, attributes map[string]string) (string) {
	return AssembleTag("tr", innerHTML, attributes)
}

func Col (innerHTML string, attributes map[string]string) (string) {
	return AssembleTag("col", innerHTML, attributes)
}

func Colgroup (innerHTML string, attributes map[string]string) (string) {
	return AssembleTag("colgroup", innerHTML, attributes)
}

func THead (innerHTML string, attributes map[string]string) (string) {
	return AssembleTag("thead", innerHTML, attributes)
}

func TBody (innerHTML string, attributes map[string]string) (string) {
	return AssembleTag("tbody", innerHTML, attributes)
}

func TFoot (innerHTML string, attributes map[string]string) (string) {
	return AssembleTag("tfoot", innerHTML, attributes)
}

func Td (innerHTML string, attributes map[string]string) (string) {
	return AssembleTag("td", innerHTML, attributes)
}

func Form (innerHTML string, attributes map[string]string) (string) {
	return AssembleTag("form", innerHTML, attributes)
}

func Label(innerHTML string, attributes map[string]string) (string) {
	return AssembleTag("label", innerHTML, attributes)
}

func Input (name string, value string, attributes map[string]string) (string) {
	attributes["name"] = name
	attributes["value"] = value
	return AssembleTag("input", "", attributes)
}

func Textarea (name string, value string, attributes map[string]string) (string) {
	attributes["name"] = name
	return AssembleTag("textarea", value, attributes)
}

func Select (name string, innerHTML string, attributes map[string]string) (string) {
	attributes["name"] = name
	return AssembleTag("select", innerHTML, attributes)
}

func Option (value string, label string, attributes map[string]string) (string) {
	attributes["value"] = value
	return AssembleTag("option", label, attributes)
}

func Optgroup (innerHTML string, attributes map[string]string) (string) {
	return AssembleTag("optgroup", innerHTML, attributes)
}

func Button (innerHTML string, attributes map[string]string) (string) {
	return AssembleTag("button", innerHTML, attributes)
}

func Fieldset (innerHTML string, attributes map[string]string) (string) {
	return AssembleTag("fieldset", innerHTML, attributes)
}

func Legend (innerHTML string, attributes map[string]string) (string) {
	return AssembleTag("legend", innerHTML, attributes)
}

func Script (url string, code string, attributes map[string]string) (string) {
	if url != "" {
		attributes["src"] = url
		return AssembleTag("script", "", attributes)
	}
	return AssembleTag("script", code, attributes)
}

func NoScript (innerHTML string) (string) {
	return AssembleTag("noscript", innerHTML, nil)
}

func Address(innerHTML string) (string) {
	return AssembleTag("address", innerHTML, nil)
}

func Blockquote(innerHTML string) (string) {
	return AssembleTag("backquote", innerHTML, nil)
}

func Del(innerHTML string) (string) {
	return AssembleTag("del", innerHTML, nil)
}

func Hr(attributes map[string]string) (string) {
	return AssembleTag("hr", "", attributes)
}

func Ins(innerHTML string) (string) {
	return AssembleTag("ins", innerHTML, nil)
}

func Pre(innerHTML string, attributes map[string]string) (string) {
	return AssembleTag("pre", innerHTML, attributes)
}

func Div (innerHTML string, attributes map[string]string) (string) {
	return AssembleTag("div", innerHTML, attributes)
}

func Span (innerHTML string, attributes map[string]string) (string) {
	return AssembleTag("span", innerHTML, attributes)
}

func Abbr (abbreviation string, full_form string, attributes map[string]string) (string) {
	attributes["title"] = full_form
	return AssembleTag("abbr", abbreviation, attributes)
}

func Acronym (acronym string, full_form string, attributes map[string]string) (string) {
	attributes["title"] = full_form
	return AssembleTag("acronym", acronym, attributes)
}

func Dfn (innerHTML string) (string) {
	return AssembleTag("dfn", innerHTML, nil)
}

func Em (innerHTML string) (string) {
	return AssembleTag("em", innerHTML, nil)
}

func Strong (innerHTML string) (string) {
	return AssembleTag("strong", innerHTML, nil)
}

func Code (innerHTML string, attributes map[string]string) (string) {
	return AssembleTag("code", innerHTML, attributes)
}

func Samp (innerHTML string, attributes map[string]string) (string) {
	return AssembleTag("samp", innerHTML, attributes)
}

func Kbr (innerHTML string, attributes map[string]string) (string) {
	return AssembleTag("kbr", innerHTML, attributes)
}

func Var (innerHTML string, attributes map[string]string) (string) {
	return AssembleTag("var", innerHTML, attributes)
}

func B (innerHTML string, attributes map[string]string) (string) {
	return AssembleTag("b", innerHTML, attributes)
}

func I (innerHTML string, attributes map[string]string) (string) {
	return AssembleTag("i", innerHTML, attributes)
}

func Big (innerHTML string, attributes map[string]string) (string) {
	return AssembleTag("big", innerHTML, attributes)
}

func Small (innerHTML string, attributes map[string]string) (string) {
	return AssembleTag("small", innerHTML, attributes)
}

func Sub (innerHTML string, attributes map[string]string) (string) {
	return AssembleTag("sub", innerHTML, attributes)
}

func Sup (innerHTML string, attributes map[string]string) (string) {
	return AssembleTag("sup", innerHTML, attributes)
}

func Tt (innerHTML string, attributes map[string]string) (string) {
	return AssembleTag("tt", innerHTML, attributes)
}

func Br (attributes map[string]string) (string) {
	return AssembleTag("br", "", attributes)
}

func Bdo (innerHTML string, attributes map[string]string) (string) {
	return AssembleTag("bdo", innerHTML, attributes)
}

func Cite (innerHTML string, attributes map[string]string) (string) {
	return AssembleTag("cite", innerHTML, attributes)
}

func Q (innerHTML string, attributes map[string]string) (string) {
	return AssembleTag("q", innerHTML, attributes)
}

func Area (innerHTML string, attributes map[string]string) (string) {
	return AssembleTag("area", innerHTML, attributes)
}

func Map (innerHTML string, attributes map[string]string) (string) {
	return AssembleTag("map", innerHTML, attributes)
}

func Frame (innerHTML string, attributes map[string]string) (string) {
	return AssembleTag("frame", innerHTML, attributes)
}

func NoFrame (innerHTML string, attributes map[string]string) (string) {
	return AssembleTag("noframe", innerHTML, attributes)
}

func IFrame (innerHTML string, attributes map[string]string) (string) {
	return AssembleTag("iframe", innerHTML, attributes)
}

func HGroup (innerHTML string, attributes map[string]string) (string) {
	return AssembleTag("hgroup", innerHTML, attributes)
}
