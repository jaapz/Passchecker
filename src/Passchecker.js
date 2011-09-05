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

		trigger: 'keyup', // event that will trigger the checking, possible values: 'change', 'keyup'
		
		minLength: 4, // minimal length

		results: ['Garbage', 'Weak', 'Medium', 'Strong', 'Super'], // possible results, from weakest to strongest
		classes: ['pc-garbage', 'pc-weak', 'pc-medium', 'pc-strong', 'pc-super'] // classes that will be given to the result element
	},

	fallback: false, // whether or not to use fallback mode
	currentState: null, // current state of the password
	bannedPasswords: [], // list of banned passwords

	initialize: function(options) {
	
		this.setOptions(options);
		
		if (Passchecker.bannedPasswords)
		    this.bannedPasswords = Passchecker.bannedPasswords;

		if (!$(this.options.resultElement))
			this.fallback = true;

		$(this.options.checkElement).addEvent(this.options.trigger, (this.check).bind(this));
	},

	check: function(event) {
	
		var level = 0;
		var value = $(this.options.checkElement).value;
		
		// test for length > this.options.minLength
		if (value.length > this.options.minLength)
		    level++;
		
		// test for special characters
		if (value.test('([!@#$%&]{1,})'))
		    level++;
		    
		// test for uppercase and lowercase
		if (value.test('([A-Z]{1,})'))
		    level++;
		
		// test for numbers
		try { 
		    var count = value.match(new RegExp("[0-9]", 'g')).length; 
		} catch (e) { }
		
		if (count >= 2)
		    level++;
		    
		// test whether value is in blacklist
		if (this.bannedPasswords.indexOf(value) > -1)
		    level = 0;
		
		this.currentState = this.options.results[level];
		$(this.options.resultElement).addClass(this.options.classes[level]);
		$(this.options.resultElement).set('html', this.options.results[level]);
			
		this.fireEvent('finish');
		return this.currentState;
	}

});
