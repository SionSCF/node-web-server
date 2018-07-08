//express is a third-party module from npm
//We're going to use a handlebars package (handlebarsjs.com)
//to run multiple extensions, use command 'nodemon server.js -e js,hbs'
const express = require('express');
//Handlebar
const hbs = require('hbs');
const fs = require('fs');

var app = express();

//to support partial view rendering
hbs.registerPartials(__dirname + '/views/partials');

//setting to change view engine to hbs
app.set('view engine', 'hbs');
//To call middleware
//dirname stores the path to our project
app.use(express.static(__dirname + '/public'));

/*app.use((request, response, next) => {
	var now = new Date().toString();
	var log = `${now}: ${request.method} ${request.url}`
	console.log(log);
	fs.appendFileSync('server.log', log + '\n');
	next();
});*/

//advanced middleware. If next(); is not called, then it app will not proceed
app.use((request, response, next) => {
	response.render('maintenance.hbs');
});

//To register hbs Helper. So, we don't have to hardcode the same code for
//multiple functions. In this case, the getCurrentYear (new Date().getFullYear()) function)
//the first argument is the name of the function and the second argument is the function
hbs.registerHelper('getCurrentYear', () => {
	return new Date().getFullYear()
});

hbs.registerHelper('screamIt', (text) => {
	return text.toUpperCase();
});

//This is used for routing
app.get('/', (request, response) => {
	//response.send('<h1>Hello there, General Kenobi!</h1>');
	/*response.send({
		name: 'Jaclyn Regina',
		hobbies: [
			'Ice Cream',
			'Food'
		]
	})*/
	response.render('home.hbs', {
		pageTitle: 'Home',
		welcomeMessage: 'Welcome to my page!',
		//the code below is no longer used due to hbs helper
		//currentYear: new Date().getFullYear()
	})
});

/*app.get('/about', (request,response) => {
	//Sending text/html
	response.send('About the page yoo..');
});*/

app.get('/bad', (request, response) => {
	response.send({
		//Sending JSON data
		errorMessage: '404. Unable to find server'
	});
});

app.get('/about', (request, response) => {
	//Passing a second argument to send data to make dynamic pages.
	//Could be set to whatever you like
	response.render('about.hbs', {
		pageTitle: 'About Page',
		//currentYear: new Date().getFullYear()
	});
});

//bind our application to a port on our machine
//the first argument is the port number
//the second argument is optional. In this case, we will log a message
app.listen(8000, () => {
	console.log('Server is up on port 8000');
});