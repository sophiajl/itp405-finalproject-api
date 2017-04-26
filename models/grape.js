var bookshelf = require('./../bookshelf');

var Grape = bookshelf.Model.extend({
	tableName: 'grapes'
});

module.exports = Grape;