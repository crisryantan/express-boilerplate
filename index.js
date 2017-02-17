const express    = require( 'express' );
const http       = require( 'http' );
const bodyParser = require( 'body-parser' );
const morgan     = require( 'morgan' );
const app        = express();

// App Setup
app.use( morgan( 'combined' ) ); // logging incoming  requests.
app.use( bodyParser.json( { type : '*/*' } ) ); // parse incoming requests to json

// Server Setup
const port   = process.env.PORT || 3000;
const server = http.createServer( app );

server.listen( port );
console.log( 'Server listening on: ', port );