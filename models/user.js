const mongoose = require( 'mongoose' );
const Schema = mongoose.Schema;

// model definition
const userSchema = new Schema( {
	email    : { type : String, unique : true, lowercase : true },
	password : String
} );

// model class
const ModelClass = mongoose.model( 'user', userSchema );

// export
module.exports = ModelClass;