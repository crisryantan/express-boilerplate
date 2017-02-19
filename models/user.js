const mongoose = require( 'mongoose' );
const Schema   = mongoose.Schema;
const bcrypt   = require( 'bcrypt-nodejs' );

// model definition
const userSchema = new Schema( {
	email    : { type : String, unique : true, lowercase : true },
	password : String
} );

// on save hook, encrypt password
userSchema.pre( 'save', function ( next ) {
	const user = this;

	// generate salt
	bcrypt.genSalt( 10, function ( err, salt ) {
		if ( err ) { return next( err ); }

		// encrypt password using salt
		bcrypt.hash( user.password, salt, null, function ( err, hash ) {
			if ( err ) { return next( err ); }

			// overwrite plain text password with encrypted password.
			user.password = hash;
			next();
		} );
	} );
} );

// model class
const ModelClass = mongoose.model( 'user', userSchema );

// export
module.exports = ModelClass;