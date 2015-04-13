/*!
 * nodeclub - route.js
 * Copyright(c) 2012 fengmk2 <fengmk2@gmail.com>
 * MIT Licensed
 */

var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose');

mongoose.connect( 'mongodb://localhost/test' );
var Book = new mongoose.Schema({
    title: String,
    author: String,
    releaseDate: Date
});
var BookModel = mongoose.model( 'Book', Book );

// var config = require('../config'),
//     crypto = require('crypto'),
//     passport = require('passport');

router.get('/api', function(req, res){
    res.send('Api is running');
});

router.get('/api/books', function(req, res){
    return BookModel.find(function(err,books){
        if(!err){
            return res.send(books);
        }else{
            return console.log(err);
        }
    })
});

/*
jQuery.get('/api/books/',function(data, textStatus, jqXHR){
    console.log('Get response');
    console.dir(data);
    console.log(textStatus);
    console.log(jqXHR);
})
**/

// router.get('/help', staticController.help);
// router.get('/news', staticController.news);
// router.get('/about', staticController.about);






module.exports = router;
