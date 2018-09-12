'use strict';
var dbpool = require("../Server/mysqlLib.js");
var express = require('express');
var router = express.Router();

router.get('/', function (req, resp) {
    var recordset = 'SELECT * FROM city WHERE Population>6000000';
    dbpool.query(recordset, function (err, recordset) {
        console.log("Still connected...")
        console.log(recordset[0])
        resp.render('layout', {
            news: recordset
        })
    });
});
module.exports = router;
