// Web command line.
// Russ Cox <rsc@swtch.com>, February 2007 
// IE syntax fixes (no trailing commas), March 2008

// Simple shortcuts: name: url.
var shortcuts = {
	"m":	"https://mail.google.com/",
	"c":	"https://www.google.com/calendar",
	"t":	"https://www.twitter.com/",
	"hn":	"https://news.ycombinator.com/",
}

// Search shortcuts: name: [url, cgiparam, {extra cgi}]
var searches = {
	"a":	["http://www.amazon.com/s", "field-keywords",
			{"url": "search-alias=aps" }],
	"g":	["http://www.google.com/search", "q"],
	"gi":	["http://www.google.com/images", "q"],
	"gh":	["https://github.com/search", "q"],
	"w":	["http://en.wikipedia.org/wiki/Special:Search", "search"],
}

// Help text to be displayed for shortcuts & commands.
var help = {
	"a":	"amazon",
	"g":	"google search",
	"gi":	"google image search",
	"gh":	"github search",
	"m":	"google mail",
	"c":	"google calendar",
	"w":	"wikipedia",
	"t":	"twitter",
	"hn":	"hacker news",
	"e":	"javascript evaluator",
}

// Commands: args are command name, arg text,
// and array of arg text split by white space.
// Commands must be named cmd_foo where
// foo is the actual command name.

// Evaluate an argument.
function cmd_e(cmd, arg, args)
{
	output(arg + " = " + eval(arg));
}


/////
///// Below here you should not need to fiddle with.
/////

// Compute help text.
function helptext()
{
	var a;
	var i = 0;
	var s = "";
	
	s += "<table cellspacing=0 cellpadding=0 border=0>";

	a = new Array();
	for(var k in searches)
		a[i++] = k;
	a.sort();
	s += "<tr><td colspan=3><b>Searches:</b>";
	for(i=0; i<a.length; i++){
		var h = help[a[i]];
		if(h == undefined)
			h = searches[a[i]][0];
		s += "<tr><td><b>" + a[i] + "</b><td width=10><td>" + h + "\n";
	}
	s += "<tr height=10>\n";

	a = new Array();
	i = 0;
	for(var k in shortcuts)
		a[i++] = k;
	a.sort();
	s += "<tr><td colspan=3><b>Shortcuts:</b>";
	for(i=0; i<a.length; i++){
		var h = help[a[i]];
		if(h == undefined)
			h = shortcuts[a[i]];
		s += "<tr><td><b>" + a[i] + "</b><td width=10><td>" + h + "\n";
	}
	s += "<tr height=10>\n";
	
	a = new Array();
	i = 0;
	for(var k in window)
		if(k.substr(0,4) == "cmd_")
			a[i++] = k.substr(4);
	a.sort();
	s += "<tr><td colspan=3><b>Additional Commands:</b>";
	for(i=0; i<a.length; i++){
		var h = help[a[i]];
		if(h == undefined)
			h = "???";
		s += "<tr><td><b>" + a[i] + "</b><td width=10><td>" + h + "\n";
	}
	s += "<tr height=10>\n";

	s += "</table>\n";
	return s;
}

// Run command.
function runcmd(cmd)
{
	// Check for URL.
	var space = cmd.indexOf(' ');
	if(space == -1 && (cmd.indexOf('/') != -1 || cmd.indexOf('.') != -1)){
		// No spaces, has slash or dot: assume URL.
		if(cmd.indexOf('://') == -1)
			cmd = "http://" + cmd;
		window.location = cmd;
		return false;
	}
	if(space == -1){
		arg = "";
		args = new Array();
	}else{
		arg = cmd.substr(space+1);
		cmd = cmd.substr(0, space);
		args = toarray(arg.split(/\s+/));
	}

	var fn;
	if(searches[cmd] != undefined)
		fn = search;
	else if(shortcuts[cmd] != undefined)
		fn = shortcut;
	else{
		fn = window["cmd_" + cmd];
		if(fn == undefined){
			error("no command: " + cmd);
			return false;
		}
	}
	fn(cmd, arg, args);
	return false;
}

// Print output on page.
function output(s)
{
	document.getElementById("output").innerHTML += s + "<br>";
}

// Print error on page.
function error(s)
{
	document.getElementById("error").innerHTML += s + "<br>";
}

// Convert whatever split returns into an Array.
function toarray(args)
{
	var a = new Array();
	for(var i = 0; i < args.length; i++)
		a[i] = args[i];
	return a;
}

// Return a URL with some CGI args.
function cgiurl(base, params)
{
	var url = base + "?";
	for(var k in params)
		url += k + "=" + escape(params[k]) + "&";
	return url;
}

// Handle search shortcut.
function search(cmd, arg, args)
{
	var a = searches[cmd][2];
	if(a == undefined)
		a = {};
	a[searches[cmd][1]] = arg;
	window.location = cgiurl(searches[cmd][0], a);
}

// Handle simple shortcut.
function shortcut(cmd, arg, args)
{
	window.location = shortcuts[cmd];
}
