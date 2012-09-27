//
// A simple test harness to run groups of tests as a simple setInterval
// service.
//
// @author: R. S. Doiel, <rsdoiel@gmail.com>
// copyright (c) 2012 all rights reserved
//
// Released under this Simplified BSD License.
// See: http://opensource.org/licenses/bsd-license.php
//
//
/*jslint devel: true, node: true, maxerr: 50, indent: 4,  vars: true, sloppy: true */
(function (global, undefined) {
    var test_groups = [];
	
	// Push a test batch into harness
	var push = function (test) {
		if (test.callback === undefined) {
			throw "missing function definition.";
		}
		if (test.label === undefined) {
			throw "missing test label.";
		}
		test_groups.push(test);
	};
	
	var RunIt = function (module_name, test_delay) {
		var int_id;
	
		if (module_name === undefined) {
			module_name = "Untitle moduled tests";
		}
		if (test_delay === undefined) {
			test_delay = 1000;
		}
	
		console.log("Starting [" + module_name.trim() + "] ...");
		int_id = setInterval(function () {
			var group_test = test_groups.shift();
		
			if (group_test &&
					typeof group_test.callback === "function" &&
					typeof group_test.label === "string") {
				console.log("\tStarting " + group_test.label + " ...");
				group_test.callback();
				console.log("\t\t" + group_test.label + " OK");
			} else if (group_test === undefined) {
				console.log(module_name.trim() + " Success!");
				clearInterval(int_id);
			} else {
				throw module_name.trim() + " Failed!";
			}
		}, test_delay);
	};
	
	var RunInMongoShell = function (module_name) {
		if (module_name === undefined) {
			module_name = "Untitle moduled tests";
		}
		console.log("Starting [" + module_name.trim() + "] ...");
		(function () {
			var group_test;
			group_test = test_groups.shift();
			while (group_test) {
				if (group_test &&
						typeof group_test.callback === "function" &&
						typeof group_test.label === "string") {
					console.log("\tStarting " + group_test.label + " ...");
					group_test.callback();
					console.log("\t\t" + group_test.label + " OK");
				} else {
					throw module_name.trim() + " Failed!";
				}
				group_test = test_groups.shift();
			}
			console.log(module_name.trim() + " Success!");
		}());
	};
	
	global.harness = {};
	global.harness.push = push;
	global.harness.RunIt = RunIt;
	global.RunInMongoShell = RunInMongoShell;

	try {
		exports.push = push;
		exports.RunIt = RunIt;
		exports.RunInMongoShell = RunInMongoShell;
	} catch (err) {
		console.log("Running in browser.");
	}
}(this));