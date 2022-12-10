const express = require("express");

// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const recordRoutes = express.Router();

//This will help us connect to the database
const dbo = require("../db/conn");

// This section will help you get a list of all the records.
recordRoutes.route("/record").get(function (req, res) {
  	let db_connect = dbo.getDb();
  	db_connect
    	.collection("records")
    	.find({})
    	.toArray(function (err, result) {
      		if (err) throw err;
      	res.json(result);
    	});
});

// This section will help you create a new record.
recordRoutes.route("/record/add").post(function (req, response) {
  	let db_connect = dbo.getDb();
  	let myobj = {
		date: req.body.date,
		name: req.body.name,
		birth: req.body.birth,
		address: req.body.address,
		phoneno: req.body.phoneno,
		gender: req.body.gender,
		autism: req.body.autism,
		life_func: req.body.life_func,
		race: req.body.race,
		service: req.body.service,
		goals: req.body.goals,
		responsive: req.body.responsive,
  	};
  	db_connect.collection("records").insertOne(req.body, function (err, res) {
    	if (err) throw err;
		response.json(res)
  	});
});

// This section will help you update a record by id.
recordRoutes.route("/update/:id").post(function (req, res) {
  	let db_connect = dbo.getDb();
  	let myquery = { id: req.body.id };
  	let newvalues = {
		$set: {
			person_name: req.body.person_name,
			person_position: req.body.person_position,
			person_level: req.body.person_level,
		},
  	};
	db_connect
		.collection("records")
		.updateOne(myquery, newvalues, function (err, res) {
			if (err) throw err;
		  	console.log("1 document updated");
		});
});

// This section will help you delete a record
recordRoutes.route("/:id").delete((req, res) => {
	let db_connect = dbo.getDb();
	var myquery = { id: req.body.id };
	db_connect.collection("records").deleteOne(myquery, function (err, obj) {
    	if (err) throw err;
    	console.log("1 document deleted");
  	});
});

module.exports = recordRoutes;