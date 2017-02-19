const User = require( '../models/user' );

exports.signup = function ( req, res, next ) {
	const email    = req.body.email;
	const password = req.body.password;

	// see if user with the given email exists.
	User.findOne( { 'email' : email }, function ( err, existingUser ) {
		if ( err ) { return next ( err ) }

		// if a user with entered email does exist, return an error
		if ( existingUser ) {
			return res.status( 422 ).send( { 'error' : 'Email is in use' } );
		}

		// if user does not exist, create and save user record.
		const user = new User( {
			'email'    : email,
			'password' : password
		} );

		user.save( function ( err ) {
			if ( err ) { return next( err ); }

			// respond that user was created.
			res.json( user );
		} );
	} );
}