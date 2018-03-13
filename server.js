"use strict";
const express = require("express");
const path    = require("path");
const routes  = require(path.join(process.cwd(), "app", "routes", "index.js"));

// Creating main application object...
const app     = express();

// Enable access to general resources folder...
app.use('/public', express.static(path.join(process.cwd(), "public")));

// Enable access to controllers folder...
app.use('/controllers', express.static(path.join(process.cwd(), "app", "controllers")));

// Applying routing logic...
routes(app);

// Lauching 3, 2, 1..
app.listen(process.env.PORT, (err) => {
    if (err) throw err;
    console.log("yeah? listening on " + process.env.PORT);
})
