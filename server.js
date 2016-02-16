/*jslint node:true*/
'use strict';
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var app = express();
// var router = express.Router();

mongoose.connect('mongodb://localhost/voice-signup');
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {

	var MemberSchema = mongoose.Schema({
		first_name: String,
		last_name: String,
		email: String,
		interests: String
	});

	var Member = mongoose.model('Member',MemberSchema);

	app.use(bodyParser.urlencoded({
		extended:true
	}));

	app.use(function (req, res, next) {
		// Website you wish to allow to connect
		res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8000');

		// Request methods you wish to allow
		res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

		// Request headers you wish to allow
		res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

		// Set to true if you need the website to include cookies in the requests sent
		// to the API (e.g. in case you use sessions)
		res.setHeader('Access-Control-Allow-Credentials', true);

		// Pass to next layer of middleware
		next();
	});

	app.post('/members',function(req,res){
		console.log(req.body);
		var m = new Member({
			first_name: req.body.first_name,
			last_name: req.body.last_name,
			email: req.body.email || 'none',
			interests: req.body.interests || 'none'
		});
		m.save(function(err,el,affected){
			res.send(el);
		});

	app.get('/',function(req,res){
		res.send("Hello world");
	});

	});

	app.listen(3000);

});
