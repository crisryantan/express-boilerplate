const passport    = require( 'passport' );
const User        = require( '../models/user' );
const config      = require( '../config' );
const JwtStrategy = require( 'passport-jwt' ).Strategy;
const ExtractJwt  = require( 'passport-jwt' ).ExtractJwt;

// setup options for JWT Strategy
const jwtOptions = {
	'jwtFromRequest' : ExtractJwt.fromHeader( 'authorization' ),
	'secretOrKey'    : config.secret
};

// Create JWT Strategy
const jwtLogin = new JwtStrategy( jwtOptions, function ( payload, done ) {
	// See if user ID in the payload exist in the database
	User.findById( payload.sub, function ( err, user ) {
		if ( err ) { return done( err, false ); }

		if ( user ) {
			return done( null, user );
		}
		// user not found
		return done( null, false );
	} );
} );

// tell passport to use this strategy
passport.use( jwtLogin );