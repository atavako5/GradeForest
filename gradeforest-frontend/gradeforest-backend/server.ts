// configure environment
const dotenv = require('dotenv');
dotenv.config({ path: './gradeforest-backend/.env' });

// Express stuff
var express = require('express');
var morgan = require('morgan');
var helmet = require('helmet');
const cors = require('cors');
import { connectDB } from './config/db';
import { jwtCheck } from './authz/check-jwt';

// routes
import { apiRouter } from './routes/apiRoute';

// connect to mongo DB
connectDB();

// Use body-parser
var bodyParser = require('body-parser');

// Create new instance of the express server
var app = express();

app.use(helmet());

if (process.env.NODE_ENV === 'development') {
  console.log('Using Morgan Logger');
  app.use(morgan('dev'));
}

// Define the JSON parser as a default way
// to consume and produce data through the
// exposed APIs
app.use(bodyParser.json());

var corsOptions = {
  origin: process.env.ALLOWED_ORIGIN,
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));

// Create link to Angular build directory
// The `ng build` command will save the result
// under the `dist` folder.
var distDir = __dirname + '/dist/';
app.use(express.static(distDir));

// Init the server
var server = app.listen(process.env.PORT || 64200, function () {
  var port = server.address().port;
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${port}`);
});

/*  "/api/status"
 *   GET: Get server status
 *   PS: it's just an example, not mandatory
 */
app.use(jwtCheck);

app.use('/api', apiRouter);
