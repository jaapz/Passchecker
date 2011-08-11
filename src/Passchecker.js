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
		checkElement: 'pcPassword', // the element of which we want to check the content
		resultElement: 'pcResult', // the element which will hold the check's result, 

		trigger: 'change', // event that will trigger the checking, possible values: 'change', 'keyup'

		results: ['Garbage', 'Weak', 'Medium', 'Strong', 'Super'], // possible results, from weakest to strongest
		classes: ['pc-garbage', 'pc-weak', 'pc-medium', 'pc-strong', 'pc-super'] // classes that will be given to the result element
	},

	fallback: false, // whether or not to use fallback mode

	initialize: function(options, password) {
		this.setOptions(options);

		if (!$(this.options.resultElement))
			this.fallback = true;

		$(this.options.checkElement).addEvent(this.options.trigger, this.check);
	},

	check: function(event) {
		console.log('Starting check', 'Event: ', event);
		return event;
	}

});
