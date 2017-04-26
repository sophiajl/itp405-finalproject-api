var bookshelf = require('./../bookshelf');

var Country = bookshelf.Model.extend({
	tableName: 'countries'
});

module.exports = Country;