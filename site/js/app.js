
var app = app || {};

$(function(){
    // var books = [
    //     {
    //         title: 'Javascript: The Good Parts',
    //         author: 'Douglas Crockford',
    //         releaseDate: '2008',
    //         keywords: 'Javascript'
    //     },
    //     {
    //         title: 'Javascript: The Good Parts',
    //         author: 'Douglas Crockford',
    //         releaseDate: '2012',
    //         keywords: 'Javascript'
    //     },
    //     {
    //         title: 'Javascript: The Good Parts',
    //         author: 'Douglas Crockford',
    //         releaseDate: '2011',
    //         keywords: 'Javascript'
    //     },
    //     {
    //         title: 'Javascript: The Good Parts',
    //         author: 'Douglas Crockford',
    //         releaseDate: '1991',
    //         keywords: 'Javascript'
    //     }
    // ];

    $('#releaseDate').datepicker();
    new app.LibraryView();
});
