/*
---

script: Passchecker.js

name: Passchecker

description: This class checks whether a password is safe. Uses twitter password blacklist.

license: MIT-style license

author: Jaap Broekhuizen <jaap@broekhuizen.nu>

version: 0.1

requires:
  - Core/1.3: '*'

provides: [Passchecker]

...
*/

var Passchecker = new Class({

	Implements: [Events, Options],

	options: {
		some: option,
		another: option
	},

	initialize: function(options) {
		this.setOptions(options);

		// do some more stuff
		this.someFunction(true);
	},

	someFunction: function(parameter) {
		return parameter;
	}

});
