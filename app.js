require('dotenv').config();

var express = require('express');
var app = express();
var bookshelf = require('./bookshelf');
var Wine = require('./models/wine');
var Type = require('./models/type');
var Grape = require('./models/grape');
var Country = require('./models/country');
var bodyParser = require('body-parser');
var cors = require('cors');


// var Wine = bookshelf.Model.extend({
// 	tableName: 'wine_list'
// });

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.get('/api/wine', function(request, response) {
	Wine.fetchAll().then(function(wine) {
	response.json(wine);
});
});

app.get('/api/wine/:id', function(request, response) {
	Wine.where('wine_id', request.params.id)
	// .fetch()
	.fetch({ require: true, withRelated: ['type', 'grape', 'country'] })
	.then(function(wine) {
		response.json(wine);
	}, function() {
		response.json({
			error: 'Wine not found'
		});
	});
});

app.post('/api/wine', function(request, response) {
	var wine = new Wine ({
		wine_id: request.body.wine_id,
		name: request.body.name,
		year: request.body.year,
		price: request.body.price,
		tasting_note: request.body.tasting_note
	});

	wine.save().then(function() {
	response.json(wine);
});
});

app.delete('/api/wine/:id', function(request, response) {
  var wine = new Wine({
    id: request.params.id
  });

  wine
    .destroy({ require: true })
    .then(function(wine) {
      response.json(wine);
    }, function() {
      response.status(404).json({
        error: 'wine not found'
      });
    });
});


app.put('/api/wine/:id', function(request, response) {
  Wine
    .where('wine_id', request.params.id)
    .fetch({ require: true })
    .then(function(wine) {
        // response.json(wine);
      wine.set( 'name', request.body.name );
      return wine.save();
    }, function(e) {
      response.status(404).json({
          error: e
        // error: {
        //   message: 'wine not found'
        // }
      });
    })
    .then(function(wine) {
      response.json(wine);
    });
});


app.listen(8000);

// id: request.body.wine_id, name: request.body.name, year: request.body.year, price:request.body.price