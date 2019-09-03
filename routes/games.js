var express = require('express');
var router = express.Router();

//make reference to model for CRUD
var Game = require('../models/game');

/* all /games link goes here */

/* GET method to find all games in db */
router.get('/', function (req, res, next) {

		//get data from database (model) before rendering the page
		Game.find(function (err, gamesResultQuery) {

			if(err) {
				console.log(err);
				res.end(err);
				return;
			}

				//load the view and pass games to it
				res.render('games/index', {
					games: gamesResultQuery
				});
		});
});

/* GET and POST on GAMES/ADD */

//displays games/add page to add new game
router.get('/add', function (req, res, next) {
	res.render('games/add');
});

//adds new record
router.post('/add', function (req, res, next) {

	//quering Game model to create new record
	//with the help of included lib body parser, getting the data from req.body.
	// req.body will get you the data in POST method
	Game.create({
			title: req.body.title,
			developer: req.body.developer,
			genre: req.body.genre,
			year: req.body.year
	}, function (err) {
			if (err) {
				console.log(err);
				res.render('error');
				return;
			}

		//redirecting to page /games, since there is already a query in GET method to update the list
		//showing the updated list

		res.redirect('/games');

	});
});

/* GET on Delete page */
/* GET method for /games/delete/id to delete a record */
router.get('/delete/:_id', function (req, res, next) {

// req.body will get you the data in POST method
// req.params will get you the data from GET method (to get the data from URL)
	Game.remove({
		_id: req.params._id
	}, function (err) {
			if(err) {
				console.log(err);
				res.render('error');
				return;
			}

		//redirecting to page /games, since there is already a query in GET method to update the list
		//showing the updated list
		res.redirect('/games');
	});
});

/*GET and POST on GAMES/EDIT */

//GET /games/:_id - show edit page
router.get('/:_id', function (req, res, next) {

	//look up the selected game
	Game.findById(req.params._id, function (err, gameResultQuery) {

		if(err) {
			console.log(err);
			res.render('error');
			return;
		}
		res.render('games/edit', {
			game: gameResultQuery
		});
	});

});

//POST /games/:_id - saves the editted page
router.post('/:_id', function (req, res, next) {

	let game = new Game({
		_id: req.params._id,
		title: req.body.title,
		developer: req.body.developer,
		genre: req.body.genre,
		year: req.body.year
	});

	//call mongoose update method
	//for update it needs 3 parameters.
	//1. _id
	//2. all its required data (including id)
	//3. callback function
	Game.update( {_id: req.params._id}, game, function (err) {
		if(err) {
			conosle.log(err);
			res.render('error');
			return
		}
		res.redirect('/games');
	});
});

module.exports = router;
