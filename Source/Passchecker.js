/*
---

script: Passchecker.js

name: Passchecker

description: This class checks whether a password is safe. Uses twitter password blacklist.

license: MIT-style license

authors:
  - Jaap Broekhuizen

version: 0.1

requires:
  - Core/1.3: '*'

provides:
  - Passchecker

...
*/

var Passchecker = new Class({

	Implements: [Events, Options],

	options: {

		checkElement: 'pcPassword', // the element of which we want to check the content
		resultElement: 'pcResult', // the element which will hold the check's result,

        setHtml: true, // whether to fill the resultElement with the currentState

		trigger: 'keyup', // event that will trigger the checking, possible values: 'change', 'keyup'

		minLength: 4, // minimal length

		results: ['Type a password', 'Garbage', 'Weak', 'Medium', 'Strong', 'Super'], // possible results, from weakest to strongest
		classes: ['pc-empty', 'pc-weak', 'pc-medium', 'pc-strong', 'pc-super'], // classes that will be given to the result element

		bannedPasswords: [] // an array of password strings that also will be banned
	},

	fallback: false, // whether or not to use fallback mode
	level: 0, // current level, ranges between 0 and 5
	bannedPasswords: [], // list of banned passwords

	currentState: function() {

	    return this.options.results[this.level];
	},

	initialize: function(options) {

		this.setOptions(options);

		if (Passchecker.bannedPasswords)
		    this.bannedPasswords = Passchecker.bannedPasswords;

		this.bannedPasswords.combine(this.options.bannedPasswords);

		if (!$(this.options.resultElement))
			this.fallback = true;

		$(this.options.checkElement).addEvent(this.options.trigger, (this.check).bind(this));

		// initial check
		this.check();
	},

	check: function(event) {

	    this.level = 1;
		var value = $(this.options.checkElement).value;

		// test for length > this.options.minLength
		if (value.length > this.options.minLength) {
		    this.level++;

		    // test for special characters
		    if (value.test('([!@#$%&]{1,})'))
		        this.level++;

		    // test for uppercase and lowercase
		    if (value.test('([A-Z]{1,})'))
		        this.level++;

		    // test for numbers
		    var numCount = 0;
		    try {
		        numCount = value.match(new RegExp("[0-9]", 'g')).length;
		    } catch (e) { }

		    if (numCount >= 2)
		        this.level++;
		} else if (value.length == 0) {
		    this.level = 0;
		} else {
		    this.level = 1;
		}

		// test whether value is in blacklist
		if (this.bannedPasswords.indexOf(value) > -1)
		    this.level = 1;

		$(this.options.resultElement).set('class', '')
		    .addClass(this.options.classes[this.level]);

		if (this.options.setHtml)
	        $(this.options.resultElement).set('html', this.currentState());

		this.fireEvent('finish', value);
		return this.level;
	}

});

