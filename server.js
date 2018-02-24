var express = require('express');
var http = require('http');
var bodyParser = require('body-parser');
var passport = require('passport');
var authController = require('./auth');
var dotenv = require('dotenv').config();

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(passport.initialize());

var router = express.Router();

router.route('/gets')
    .get(function (req, res) {
            var getHeader = req.headers;
            var getQuery = req.query.q;

            if(Object.keys(req.headers) === null){
                getHeader = 'None';
            }
            if(getQuery === undefined){
                getQuery = 'None';
            }

            console.log(req.body);
            res = res.status(200);
            if (req.get('Content-Type')) {
                console.log("Content-Type: " + req.get('Content-Type'));
                res = res.type(req.get('Content-Type'));
            }
            res.json({requestType: 'GET', header: getHeader, query: getQuery, key: process.env.UNIQUE_KEY});
        }
    );

router.route('/posts')
    .post(function (req, res) {
            var postHeader = req.headers;
            var postQuery = req.query.q;

            if(postHeader === null){
                postHeader = 'None';
            }
            if(postQuery === undefined){
                postQuery = 'None';
            }

            console.log(req.body);
            res = res.status(200);
            if (req.get('Content-Type')) {
                console.log("Content-Type: " + req.get('Content-Type'));
                res = res.type(req.get('Content-Type'));
            }
            res.json({requestType: 'POST', header: postHeader, query: postQuery, key: process.env.UNIQUE_KEY});
        }
    );

router.route('/puts')
    .put(function (req, res) {
            var putHeader = req.headers;
            var putQuery = req.query.q;

            if(putHeader === null){
                putHeader = 'None';
            }
            if(putQuery === undefined){
                putQuery = 'None';
            }

            console.log(req.body);
            res = res.status(200);
            if (req.get('Content-Type')) {
                console.log("Content-Type: " + req.get('Content-Type'));
                res = res.type(req.get('Content-Type'));
            }
            res.json({requestType: 'PUT', header: putHeader, query: putQuery, key: process.env.UNIQUE_KEY});
        }
    );

router.route('/deletes')
    .delete(authController.isAuthenticated, function (req, res) {
            var delHeader = req.headers;
            var delQuery = req.query.q;

            if(delHeader === null){
                delHeader = 'None';
            }
            if(delQuery === undefined){
                delQuery = 'None';
            }

            console.log(req.body);
            res = res.status(200);
            if (req.get('Content-Type')) {
                console.log("Content-Type: " + req.get('Content-Type'));
                res = res.type(req.get('Content-Type'));
            }
            res.json({requestType: 'DELETE', header: delHeader, query: delQuery, uniqueKey: process.env.UNIQUE_KEY});
        }
    );

app.use('/', router);
app.listen(process.env.PORT || 5000);
