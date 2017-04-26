var bookshelf = require('./../bookshelf');

var Type = bookshelf.Model.extend({
	tableName: 'wine_types'
});

module.exports = Type;