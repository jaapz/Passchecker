Passchecker
===========

This plugin checks the content of an input box for password strenght according to a few rules.
It also includes the twitter password blacklist, which is a list of passwords you seriously don't want your users to use.

How to use
----------

To use this plugin, you first have to include both the plugin source and the twitter blacklist.

	<script type="text/javascript" src="src/Passchecker.js"></script>
	<script type="text/javascript" src="src/BannedPasswords.js"></script>

Then you will have to add an input box to your form, for example:

    <div id="form">
	    Password: <input type="password" name="password" id="pcPassword" />
		<div id="pcResult"></div>
	</div>

Then, to start checking the input you can add this:

    document.addEvent('domready', function() {
		var Checker = new Passchecker({
		    checkElement: 'pcPassword', // the element of which we want to check the content
			resultElement: 'pcResult', // the element which will hold the check's result,

			setHtml: true, // whether to set the resultElement content with currentState

			trigger: 'keyup', // event that will trigger the checking, possible values: 'change', 'keyup'
		});
	});

You can also add a callback to the list of options that will be called when checking has finished, for example to tween the resultElement's background color:

    onFinish: function (value) {
	    // red, orange, yellow, blue, green
	    var colors = ["#FFF", "#FF7171", "#FF9A71", "#FFE371","#64F48C", "#74FF71"];
	    $(this.options.resultElement).tween('background-color', colors[this.level]);
	}

You can find a working demo at: http://labs.broekhuizen.nu/demos/passchecker

Options
-------

Here's a description of the options you can use with this plugin:

* checkElement: the id of the element (inputbox) we want to check
* resultElement: the id of the element which will hold the check's result
* setHtml: whether to fill the resultElement with the currentState
* trigger: event that will trigger the checking, possible values: 'change', 'keyup'
* minLength: minimal accepted length of the password
* results: possible result strings, from weakest to strongest, must be an array of 6 strings
* classes: classes that will be given to the result element, must be an array of 6 strings, corresponding with the 'results' array
* bannedPasswords: an additional array of password strings that also will be banned

