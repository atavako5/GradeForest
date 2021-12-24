// Use Express
var express = require("express");
import { Status } from "../interfaces/status";

// Use body-parser
var bodyParser = require("body-parser");

// Create new instance of the express server
var app = express();

// Define the JSON parser as a default way 
// to consume and produce data through the 
// exposed APIs
app.use(bodyParser.json());

// Create link to Angular build directory
// The `ng build` command will save the result
// under the `dist` folder.
var distDir = __dirname + "/dist/";
app.use(express.static(distDir));

// Init the server
var server = app.listen(process.env.PORT || 64200, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
});

class myStatus implements Status{
    status: String;
    constructor(name: String) {
        this.status = name;
    }
}

/*  "/api/status"
 *   GET: Get server status
 *   PS: it's just an example, not mandatory
 */
app.get("/api/status", function (req: any, res: any ) {
    let mystatus = new myStatus("UP");
    
    res.status(200).json(mystatus);
});