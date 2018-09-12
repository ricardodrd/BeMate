'use strict';
//const con = require('../Server/ConnectionModule.js')
var dbpool = require("../Server/mysqlLib.js");
var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function (req, res) {
    var recordset = 'SELECT * FROM city';
    dbpool.query(recordset, function (err, recordset) {
        console.log("Connected...");

            res.render('index', {
                news: recordset[0].Name
            }); 
    })

});
module.exports = router;