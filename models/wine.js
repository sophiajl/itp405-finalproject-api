var bookshelf = require('./../bookshelf');
var Type = require('./type');
var Grape = require('./grape');
var Country = require('./country');

var Wine = bookshelf.Model.extend({
	idAttribute :'wine_id',
	tableName: 'wine_list',
	type: function() {
		return this.belongsTo(Type, 'wine_type_id', 'wine_type_id')
	},
	grape: function() {
		return this.belongsTo(Grape, 'grape_id', 'grape_id');
	},
	country: function() {
	return this.belongsTo(Country, 'country_id', 'country_id');
	}
});

module.exports = Wine;